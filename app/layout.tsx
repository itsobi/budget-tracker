import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/ThemProvider';
import { Lato } from 'next/font/google';
import { ConvexClientProvider } from '@/components/ConvexClientProvider';
import { AuthSessionProvider } from '@/components/AuthSessionProvider';

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
    <html lang="en" className={lato.className} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthSessionProvider>{children}</AuthSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
