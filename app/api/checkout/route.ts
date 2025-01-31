import { NextResponse } from 'next/server';
import { Stripe } from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const userId = formData.get('userId') as string;

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is not found' },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: 'price_1QmobAPLJdDj5tSD7RedCv7e', // TODO: Update to PROD priceId
          quantity: 1,
        },
      ],
      mode: 'payment',
      payment_method_types: ['card', 'us_bank_account', 'amazon_pay'],
      success_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/checkout?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/pro`,
      metadata: {
        userId: userId,
      },
      //   automatic_tax: { enabled: true },
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
