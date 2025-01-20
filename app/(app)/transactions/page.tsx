import PageHeader from '@/components/PageHeader';
import { TransactionsTable } from './_components/transactions-table';
import { columns, Transaction } from './_components/columns';
import { api } from '@/convex/_generated/api';
import { preloadQuery } from 'convex/nextjs';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function TransactionsPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const preloadedTransactions = await preloadQuery(
    api.transactions.getTransactions,
    {
      userId: userId,
    }
  );

  // @ts-ignore
  const data = preloadedTransactions._valueJSON?.map(
    (transaction: Transaction) => ({
      id: transaction._id,
      type: transaction.type,
      title: transaction.title,
      amount: transaction.amount,
      date: transaction.date,
    })
  );

  return (
    <div>
      <PageHeader title="Transactions" />
      <TransactionsTable columns={columns} data={data} />
    </div>
  );
}
