'use client';

import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { useTransactionSheetStore } from '@/store/useTransactionSheetStore';
import { useRef } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';

const transactionTypes = [
  { value: 'bills', label: 'Bills' },
  { value: 'groceries', label: 'Groceries' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'shopping', label: 'Shopping' },
  { value: 'transportation', label: 'Transportation' },
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'other', label: 'Other' },
];

export function TransactionSheet() {
  const { userId } = useAuth();
  const { isOpen, close } = useTransactionSheetStore();
  const formRef = useRef<HTMLFormElement>(null);

  const createTransaction = useMutation(api.transactions.createTransaction);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    // Extract the values directly
    const title = formData.get('name') as string;
    const type = formData.get('type') as string;
    const amount = Number(formData.get('amount'));

    // When editing, use existing values as fallback
    // const finalTitle = title || existingExpense?.title;
    // const finalType = type || existingExpense?.type;
    // const finalAmount = amount || existingExpense?.amount;

    const response = await createTransaction({
      title,
      type,
      amount,
      userId: userId!,
    });

    if (response.success) {
      toast.success(response.message);
      formRef.current?.reset();
      close();
    } else {
      toast.error(response.message);
    }
  };

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          close();
        }
      }}
    >
      <SheetTrigger asChild className="hidden">
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent className="w-full">
        <SheetHeader className="text-left ">
          <SheetTitle>Add Transaction</SheetTitle>
          <SheetDescription>
            Add a transaction to your budget dashboard.
          </SheetDescription>
        </SheetHeader>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="my-4 flex flex-col gap-4"
        >
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input
              name="name"
              //   defaultValue={expenseId ? existingExpense?.title : ''}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="type">Type</Label>
            <Select
              name="type"
              // defaultValue={expenseId ? existingExpense?.type : undefined}
            >
              <SelectTrigger>
                <SelectValue
                // placeholder={
                //     expenseId ? existingExpense?.type : 'Select type'
                // }
                />
              </SelectTrigger>
              <SelectContent>
                {transactionTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label htmlFor="amount">Amount</Label>
            <Input
              name="amount"
              type="number"
              //   defaultValue={expenseId ? existingExpense?.amount.toString() : ''}
            />
          </div>
          <Button type="submit" className="w-full">
            Add Transaction
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
