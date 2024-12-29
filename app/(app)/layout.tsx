import { ConvexClientProvider } from '@/components/ConvexClientProvider';
import { Header } from '@/components/Header';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ConvexClientProvider>
          <div className="min-h-screen flex flex-col">
            <div className="shadow-sm dark:border-b border-zinc mb-4">
              <Header />
            </div>
            <div className="w-full max-w-7xl mx-auto px-4 xl:px-0">
              {children}
            </div>
          </div>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
