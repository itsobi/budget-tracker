import { ConvexClientProvider } from '@/components/ConvexClientProvider';
import { ExpenseSheet } from '@/components/ExpenseSheet';
import { Header } from '@/components/Header';
import { TransactionSheet } from '@/components/TransactionSheet';
import { Toaster } from '@/components/ui/sonner';

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ConvexClientProvider>
        <ExpenseSheet />
        <TransactionSheet />
        <div className="min-h-screen flex flex-col">
          <div className="shadow-sm dark:border-b border-zinc mb-4">
            <Header />
          </div>
          <div className="w-full max-w-7xl mx-auto px-4 xl:px-0">
            {children}
          </div>
        </div>
      </ConvexClientProvider>
      <Toaster richColors />
    </>
  );
}
