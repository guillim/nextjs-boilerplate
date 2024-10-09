import Stripe from 'stripe';
import { NextRequest } from 'next/server';
import { headers } from 'next/headers';
import { RegisterTransaction } from '@/domain/company/use-case';
import { TransactionProps, CustomerDetails } from '@/domain/company/company.entity';

type METADATA = {
  userId: string;
  priceId: string;
  companyId: string;
};
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  const body = await request.text();
  const endpointSecret = process.env.STRIPE_SECRET_WEBHOOK_KEY!;
  const sig = headers().get('stripe-signature') as string;
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return new Response(`Webhook Error: ${err}`, {
      status: 400
    });
  }

  const eventType = event.type;
  if (
    eventType !== 'checkout.session.completed' &&
    eventType !== 'checkout.session.async_payment_succeeded'
  )
    return new Response(`Server Error for unhandled eventType ${eventType}`, {
      status: 500
    });
  const data = event.data.object
  const metadata = data.metadata as METADATA;
  const userId = metadata.userId;
  const priceId = metadata.priceId;
  const companyId = metadata.companyId;
  const created = data.created;
  const currency = data.currency;
  const customerDetails = data.customer_details as unknown as CustomerDetails;
  const amount = data.amount_total;

  const transactionDetails: TransactionProps = {
    userId,
    priceId,
    companyId,
  };

  if (amount){ transactionDetails.amount = amount; }
  if (currency){ transactionDetails.currency = currency; }
  if (created){ transactionDetails.created = created; }
  if(customerDetails){
    transactionDetails.customerDetails = customerDetails
  }
  
  
  try {
    // database update here
    const registerTransaction = new RegisterTransaction();
    if(!transactionDetails) throw new Error('Transaction details not found');
    await registerTransaction.registerTransaction(transactionDetails);
    // console.log('Transaction Details', transactionDetails);
    return new Response('Subscription added', {
      status: 200
    });
  } catch (error) {
    console.log('Error', error);
    return new Response('Server error', {
      status: 500
    });
  }
}