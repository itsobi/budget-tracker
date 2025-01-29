'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useExpenseSheetStore } from '@/store/useExpenseSheetStore';
import { useRef } from 'react';
import { toast } from 'sonner';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';

const expenseTypes = [
  { value: 'food', label: 'Food' },
  { value: 'housing', label: 'Housing' },
  { value: 'other', label: 'Other' },
  { value: 'savings', label: 'Savings' },
  { value: 'transportation', label: 'Transportation' },
  { value: 'utilities', label: 'Utilities' },
];

export function ExpenseSheet() {
  const { isOpen, close, expenseId } = useExpenseSheetStore();
  const formRef = useRef<HTMLFormElement>(null);
  const userId = useQuery(api.helpers.getUserId);

  const existingExpenses = useQuery(
    api.expenses.getExpenses,
    userId ? { userId } : 'skip'
  );

  const existingExpense = useQuery(
    api.expenses.getExpense,
    typeof expenseId === 'string' ? { id: expenseId as Id<'expenses'> } : 'skip'
  );

  const createExpenseMutation = useMutation(api.expenses.createExpense);
  const updateExpenseMutation = useMutation(api.expenses.updateExpense);

  const today = new Date();
  const dateString = today.toISOString().split('T')[0];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userId) return;

    const formData = new FormData(e.currentTarget);

    // Extract the values directly
    const title = formData.get('name') as string;
    const type = formData.get('type') as string;
    const amount = formData.get('amount');

    // When editing, use existing values as fallback
    const finalTitle = title || existingExpense?.title;
    const finalType = type || existingExpense?.type;
    const finalAmount = amount || existingExpense?.amount;

    // Validate required fields
    if (!finalTitle || !finalType || !finalAmount) {
      toast.error('Please fill in all fields');
      return;
    }

    const data = {
      title: finalTitle.trim(),
      type: finalType,
      amount: Number(finalAmount),
    };

    let response;

    if (expenseId) {
      response = await updateExpenseMutation({
        id: expenseId as Id<'expenses'>,
        ...data,
      });
    } else {
      response = await createExpenseMutation({
        userId: userId,
        order: existingExpenses?.length || 0,
        date: dateString,
        ...data,
      });
    }

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
          <SheetTitle>
            {expenseId ? 'Edit Fixed Expense' : 'Add Fixed Expense'}
          </SheetTitle>
          <SheetDescription>
            {expenseId
              ? 'Edit your expense.'
              : 'Add an expense to your budget dashboard.'}
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
              defaultValue={expenseId ? existingExpense?.title : ''}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="type">Type</Label>
            <Select
              name="type"
              defaultValue={expenseId ? existingExpense?.type : undefined}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={expenseId ? existingExpense?.type : ''}
                />
              </SelectTrigger>
              <SelectContent>
                {expenseTypes.map((type) => (
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
              step="0.01"
              defaultValue={expenseId ? existingExpense?.amount.toString() : ''}
            />
          </div>
          <Button type="submit" className="w-full">
            {expenseId ? 'Update' : 'Add'}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
