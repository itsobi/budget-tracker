import { AddReceiptDialog } from '@/components/AddReceiptDialog';
import { ConvexClientProvider } from '@/components/ConvexClientProvider';
import { ExpenseSheet } from '@/components/ExpenseSheet';
import { Header } from '@/components/Header';
import { SavingsSheet } from '@/components/SavingsSheet';
import { TransactionSheet } from '@/components/TransactionSheet';
import { Toaster } from '@/components/ui/sonner';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ConvexClientProvider>
        <ExpenseSheet />
        <TransactionSheet />
        <SavingsSheet />
        <AddReceiptDialog />
        <div className={`h-screen flex flex-col`}>
          <div className="shadow-sm dark:border-b border-zinc">
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
