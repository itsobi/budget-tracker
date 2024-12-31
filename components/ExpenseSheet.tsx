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
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useAuth } from '@clerk/nextjs';

const expenseTypes = [
  { value: 'education', label: 'Education' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'food', label: 'Food' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'housing', label: 'Housing' },
  { value: 'other', label: 'Other' },
  { value: 'savings', label: 'Savings' },
  { value: 'shopping', label: 'Shopping' },
  { value: 'transportation', label: 'Transportation' },
  { value: 'utilities', label: 'Utilities' },
];

export function ExpenseSheet() {
  const { isOpen, close } = useExpenseSheetStore();
  const [isMounted, setIsMounted] = useState(false);
  const [expense, setExpense] = useState({
    title: '',
    amount: '',
    type: '',
  });
  const { userId } = useAuth();
  const existingExpenses = useQuery(api.expenses.getExpenses, {
    userId: userId!,
  });
  const createExpenseMutation = useMutation(api.expenses.createExpense);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await createExpenseMutation({
      ...expense,
      amount: Number(expense.amount) || 0,
      userId: userId!,
      order: existingExpenses?.length || 0,
    });

    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
    setExpense({ title: '', amount: '', type: '' });
    close();
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
          <SheetTitle>Add Expense</SheetTitle>
          <SheetDescription>
            Add an expense to your budget dashboard.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="my-4 flex flex-col gap-4">
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input
              value={expense.title}
              onChange={(e) =>
                setExpense({ ...expense, title: e.target.value })
              }
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="type">Type</Label>
            <Select
              value={expense.type}
              onValueChange={(value) => setExpense({ ...expense, type: value })}
            >
              <SelectTrigger className="">
                <SelectValue placeholder="Select type" />
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
              type="number"
              value={expense.amount}
              onChange={(e) =>
                setExpense({
                  ...expense,
                  amount: e.target.value,
                })
              }
            />
          </div>
          <Button type="submit" className="w-full">
            Add Expense
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
