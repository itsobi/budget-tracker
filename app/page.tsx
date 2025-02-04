import { CardSection } from '@/components/landingpage/CardSection';
import { CTASection } from '@/components/landingpage/CTASection';
import { Footer } from '@/components/landingpage/Footer';
import HeroSection from '@/components/landingpage/HeroSection';
import { ImageCarousel } from '@/components/landingpage/ImageCarousel';
import { ThemeButton } from '@/components/ThemeButton';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold italic">TracKiT</div>
          <nav>
            <ul className="flex items-center space-x-4">
              <li>
                <Link href="/auth" className="text-sm hover:underline">
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
          <HeroSection />
        </section>

        <section>
          <ImageCarousel />
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <CardSection />
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto text-center">
            <CTASection />
          </div>
        </section>
      </main>

      <footer className="py-6 px-4 sm:px-6 lg:px-8 border-t">
        <div className="container mx-auto text-center text-sm">
          <Footer />
        </div>
      </footer>
    </div>
  );
}
