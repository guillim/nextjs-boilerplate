import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);


export async function POST(request: NextRequest) {
  try {
    const user = await auth();
    if(!user || !user?.user?.id) return new NextResponse('User not detected', { status: 500 });
    // you can implement some basic check here like, is user valid or not
    const data = await request.json();
    const priceId = data.priceId;
    const checkoutSession: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId,
            quantity: 1
          }
        ],
        mode: 'payment',
        success_url: `${process.env.NEXT_BASE_URL}/billing`,
        cancel_url: `${process.env.NEXT_BASE_URL}/billing`,
        metadata: {
          userId: user.user?.id,
          priceId
        }
      });
    return NextResponse.json({ result: checkoutSession, ok: true });
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Server', { status: 500 });
  }
}
