import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { getConvexClient } from '@/lib/convexClient';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { Stripe } from 'stripe';

const stripe = new Stripe(
  process.env.NODE_ENV === 'development'
    ? process.env.DEV_STRIPE_SECRET_KEY!
    : process.env.STRIPE_SECRET_KEY!
);
const webhookSecret =
  process.env.NODE_ENV === 'development'
    ? process.env.DEV_STRIPE_WEBHOOK_SECRET!
    : process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');

  const convex = getConvexClient();

  if (!signature) {
    return new NextResponse('Missing stripe signature', { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    return new NextResponse(`Webhook error: ${error}`, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.async_payment_failed':
      const checkoutSessionAsyncPaymentFailed = event.data.object;
      console.log(
        '--- CHECKOUT SESSION ASYNC PAYMENT FAILED ---',
        checkoutSessionAsyncPaymentFailed
      );
      break;
    case 'checkout.session.completed':
      const checkoutSessionCompleted = event.data.object;
      console.log(
        '--- CHECKOUT SESSION COMPLETED ---',
        checkoutSessionCompleted
      );
      await convex.mutation(api.users.updateUserMembershipStatus, {
        userId: checkoutSessionCompleted?.metadata?.userId as Id<'users'>,
        isMember: true,
      });
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new NextResponse(null, { status: 200 });
}
