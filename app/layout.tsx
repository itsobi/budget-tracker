import type { Metadata } from 'next';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from '@/components/ThemProvider';
import { Poppins } from 'next/font/google';

export const metadata: Metadata = {
  title: 'Track iT',
  description: 'No BS budgeting. Plug & play.',
};

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '400', '500', '600', '700'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={poppins.className} suppressHydrationWarning>
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
