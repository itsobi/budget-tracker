import type { Metadata } from 'next';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from '@/components/ThemProvider';
import { Lato } from 'next/font/google';

export const metadata: Metadata = {
  title: 'Track iT',
  description: 'No BS budgeting. Plug & play.',
};

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
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
    </ClerkProvider>
  );
}
