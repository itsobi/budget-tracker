import { auth } from '@/auth';
import { APP_URL } from '@/lib/constants';
import { NextResponse } from 'next/server';
import { Stripe } from 'stripe';

const stripe = new Stripe(
  process.env.NODE_ENV === 'development'
    ? process.env.DEV_STRIPE_SECRET_KEY!
    : process.env.STRIPE_SECRET_KEY!
);

const priceId =
  process.env.NODE_ENV === 'development'
    ? process.env.DEV_STRIPE_PRICE_ID!
    : process.env.STRIPE_PRICE_ID!;

export async function POST(request: Request) {
  const authSession = await auth();

  if (!authSession) {
    return NextResponse.json(
      { error: 'User is not authenticated' },
      { status: 401 }
    );
  }

  try {
    const authId = authSession?.user?.id;
    if (!authId) {
      return NextResponse.json(
        { error: 'User ID is not found' },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      payment_method_types: ['card', 'us_bank_account', 'amazon_pay'],
      success_url: `${APP_URL}/checkout?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${APP_URL}/membership`,
      metadata: {
        authId: authId,
        email: authSession.user?.email as string,
        name: authSession.user?.name as string,
        image: authSession.user?.image as string,
      },
      automatic_tax: { enabled: true },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: 'No checkout session URL' },
        { status: 500 }
      );
    }

    return NextResponse.redirect(session.url, 303);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    );
  }
}
