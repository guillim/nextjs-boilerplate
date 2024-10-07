import Stripe from 'stripe';
import { NextRequest } from 'next/server';
import { headers } from 'next/headers';
type METADATA = {
  userId: string;
  priceId: string;
};
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  const body = await request.text();
  const endpointSecret = process.env.STRIPE_SECRET_WEBHOOK_KEY!;
  const sig = headers().get('stripe-signature') as string;
  let event: Stripe.Event;
  console.log('Webhook received');
  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    console.log('event',event);
  } catch (err) {
    console.log('Webhook Error', err);
    return new Response(`Webhook Error: ${err}`, {
      status: 400
    });
  }

  const eventType = event.type;
  if (
    eventType !== 'checkout.session.completed' &&
    eventType !== 'checkout.session.async_payment_succeeded'
  )
    return new Response('Server Error', {
      status: 500
    });
  const data = event.data.object;
  const metadata = data.metadata as METADATA;
  const userId = metadata.userId;
  const priceId = metadata.priceId;
  const created = data.created;
  const currency = data.currency;
  const customerDetails = data.customer_details;
  const amount = data.amount_total;
  const transactionDetails = {
    userId,
    priceId,
    created,
    currency,
    customerDetails,
    amount,
  };
  try {
    // database update here
    console.log('Transaction Details', transactionDetails);
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