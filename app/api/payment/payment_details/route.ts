import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    try {
        const body: { paymentId: string } = await request.json();
        // console.log("Request body:", body);

        // console.log("api call", {
        //     method: "GET",
        //     headers: {
        //         "Content-Type": "application/json",
        //         Authorization: `Bearer ${process.env.DODO_API_KEY}`
        //     }
        // })

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_DODO_TEST_API}/payments/${body.paymentId}`,
            // `https://test.dodopayments.com/payments/pay_6vGlmf5SE56E5AHDLDhVz`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.DODO_API_KEY}`
                }
            }
        );
        const responseText = await response.text();

        if (!response.ok) {
            return NextResponse.json(
                { error: "Coudn't check payment", details: responseText },
                { status: response.status }
            );
        }

        const data = JSON.parse(responseText);
        return NextResponse.json({ payment_details: data });
    } catch (e) {
        console.error("Error in GET /api/payment/validate:", e);
        return NextResponse.json(
            { error: "Internal server error", details: e },
            { status: 500 }
        );
    }
}

