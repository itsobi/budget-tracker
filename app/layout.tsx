import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/ThemProvider';
import { ConvexAuthNextjsServerProvider } from '@convex-dev/auth/nextjs/server';
import { Lato } from 'next/font/google';

export const metadata: Metadata = {
  title: 'TracKiT',
  description: 'No BS budgeting. Plug & play.',
};

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en" className={lato.className} suppressHydrationWarning>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
