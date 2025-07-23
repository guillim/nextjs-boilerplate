import { CreditTransaction, VerifyTransaction } from '@/domain/company/use-case';
// import { prismaClientGlobal } from '@/infra/prisma';
import { NextRequest, NextResponse } from 'next/server';

type DodoPaymentCustomer = {
    customer_id: string;
    name: string;
    email: string;
};

type DodoPaymentProductCart = {
    product_id: string;
    quantity: number;
};

type DodoPaymentBilling = {
    country: string;
    state: string;
    city: string;
    street: string;
    zipcode: string;
};

export type DodoPayment = {
    payment_id: string;
    business_id: string;
    status: string | "succeeded" | "failed";
    total_amount: number;
    currency: string;
    payment_method: string;
    payment_method_type: string | null;
    created_at: string;
    updated_at: string | null;
    disputes: undefined;
    refunds: undefined;
    customer: DodoPaymentCustomer;
    subscription_id: string | null;
    product_cart: DodoPaymentProductCart[];
    payment_link: string;
    tax: number;
    metadata: Record<string, unknown>;
    error_message: string | null;
    error_code: string | null;
    discount_id: string | null;
    settlement_amount: number;
    settlement_tax: number;
    settlement_currency: string;
    billing: DodoPaymentBilling;
    card_last_four: string;
    card_issuing_country: string;
    card_type: string;
    card_network: string;
    brand_id: string;
    digital_products_delivered: boolean;
}

export type ValidateCreditsResponse = {
  success: boolean;
  error: string;
  alreadyProcessed: boolean;
  creditsAdded: number;
  companyId: string;
  payment_details: DodoPayment;
};

type DodoPaymentChecked = {
    payment_details: DodoPayment
};
// Dummy functions for illustration. Replace with your actual implementations.
type DodoPaymentCheckedWithCredits = DodoPaymentChecked & { credits: number };

async function verifyDodoPayment(paymentId: string): Promise<DodoPaymentCheckedWithCredits> {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/payment_details`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.DODO_API_KEY}`
            },
            body: JSON.stringify({ paymentId })
        }
    );

    const text = await response.text();
    // console.log("DodoPayments API response status:", response.status);

    let data: DodoPaymentChecked;
    try {
        data = JSON.parse(text);
    } catch (e) {
        throw new Error(`DodoPayments API did not return valid JSON. Error: ${e}. Status: ${response.status}, Body: ${text}`);
    }

    const credits = 100;

    // console.log("DodoPayments API response data:", { ...data, credits });
    return { ...data, credits };
}

async function addCreditsToUser(companyId: string, credits: number, payment_details: DodoPaymentChecked): Promise<boolean> {
    // Update user's credits in your database
    // Example:
    // await db.users.update({ id: userId }, { $inc: { credits } });
    await new CreditTransaction().updateCredits({
        companyId: companyId,
        amount: credits,
        type: "purchase",
        reference: `payment-${Date.now()}`
    },
        {
            companyId: companyId,
            raw: payment_details.payment_details,
            amount: credits,
            creditTransactionId: `credit-${Date.now()}`,
        });
    // console.log(payment_details.payment_details);
    return true;
}

export async function POST(req: NextRequest) {
    try {
        const { paymentId, companyId } = await req.json();

        if (!paymentId || !companyId) {
            return NextResponse.json({ error: 'Missing paymentId or companyId' }, { status: 400 });
        }

        const { payment_details, credits } = await verifyDodoPayment(paymentId);

        // console.log("Payment verification result:", payment_details);

        if (payment_details.status !== "succeeded") {
            return NextResponse.json({ error: 'Payment with the given ID was not successful', response: payment_details }, { status: 400 });
        }



        // check if payment id has already been used to credit the user
        const isPaymentUsed = await new VerifyTransaction().verifyPayment(paymentId, companyId);
        console.log("Is payment used:", isPaymentUsed);

        if (!isPaymentUsed) {
            // check the product ID for the number of credits

            // credit the user with the number of credits
            const dbResult = await addCreditsToUser(companyId, credits, { payment_details });

            if (!dbResult) {
                return NextResponse.json({ error: 'Failed to update credits' }, { status: 500 });
            }
            return NextResponse.json({ success: true, error: "", alreadyProcessed: false, creditsAdded: credits, companyId, payment_details }, { status: 200 });
        } else {
            return NextResponse.json({ success: false, alreadyProcessed: true, creditsAdded: 0, companyId, error: 'Payment with the given ID has already been used', payment_details }, { status: 200 });
        }
    } catch (e) {
        return NextResponse.json({ success: false, error: 'Failed to update credits: ' + e }, { status: 500 });
    }
}