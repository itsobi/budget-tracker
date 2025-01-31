import { AlertDialog } from '@/components/AlertDialog';
import { redirect } from 'next/navigation';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const queryParams = await searchParams;

  if (!queryParams.session_id) {
    redirect('/dashboard');
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(
      queryParams.session_id as string
    );

    if (!session || session.status !== 'complete') {
      redirect('/dashboard');
    }

    if (queryParams.success === 'true' && session.status === 'complete') {
      return (
        <AlertDialog
          title="Congratulations! 🎉"
          description="Your are now a member. You have been granted access to all features of TracKiT!"
        />
      );
    } else {
      return (
        <AlertDialog
          title="Error ❌"
          description="Something went wrong during the checkout process. Please try again."
          error
        />
      );
    }
  } catch (error) {
    console.error(error);
    return (
      <AlertDialog
        title="Error"
        description="Something went wrong during the checkout process. Please try again."
        error
      />
    );
  }
}
