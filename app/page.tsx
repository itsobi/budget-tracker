import { ThemeButton } from '@/components/ThemeButton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold italic">Track iT</div>
          <nav>
            <ul className="flex items-center space-x-4">
              <li>
                <Link href="/sign-in" className="text-sm hover:underline">
                  Login
                </Link>
              </li>
              <li>
                <ThemeButton />
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              No BS. No Extra Bells and Whistles. Just Simple, Effective
              Budgeting.
            </h1>
            <p className="text-xl sm:text-2xl mb-12 text-muted-foreground max-w-3xl mx-auto">
              Track your spending effortlessly and take control of your finances
              – no distractions, no fluff.
            </p>
            <Button asChild size="lg">
              <Link href="/sign-up" className="font-semibold">
                Start Tracking Now
              </Link>
            </Button>
          </div>
        </section>

        <section
          id="features"
          className="py-20 px-4 sm:px-6 lg:px-8 bg-muted dark:bg-zinc"
        >
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Why Choose TrackIt?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                title="Simple Interface"
                description="No complicated menus or confusing charts. Upload your receipts, savings goals, and fixed expenses and we'll do the rest."
              />
              <FeatureCard
                title="Quick Setup"
                description="Ger started in minutes. No lengthy onboarding process or complex configurations."
              />
              <FeatureCard
                title="Focus on Results"
                description="See your financial progress at a glance. We highlight what matters most."
              />
            </div>
          </div>
        </section>

        <section id="cta" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Take Control of Your Finances?
            </h2>
            <p className="text-xl mb-12 text-muted-foreground max-w-2xl mx-auto">
              Simplify your budgeting process and achieve your financial goals!
            </p>
            <Button asChild size="lg">
              <Link href="/signup" className="font-semibold">
                Create Your Free Account
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="py-6 px-4 sm:px-6 lg:px-8 bg-muted dark:bg-zinc">
        <div className="container mx-auto text-center text-sm">
          &copy; {new Date().getFullYear()} TrackIt. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-card p-6 rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
