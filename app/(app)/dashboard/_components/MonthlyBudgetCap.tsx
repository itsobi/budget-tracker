'use client';

import { formatCurrency } from '@/components/Transaction';
import { api } from '@/convex/_generated/api';
import { Preloaded, useMutation, usePreloadedQuery } from 'convex/react';
import { useState } from 'react';
import { toast } from 'sonner';

interface MonthlyBudgetCapProps {
  userId: string;
  preloadedBudgetCap: Preloaded<typeof api.budgetCap.getBudgetCap>;
}

export default function MonthlyBudgetCap({
  userId,
  preloadedBudgetCap,
}: MonthlyBudgetCapProps) {
  const [isEditing, setIsEditing] = useState(false);
  const budgetCap = usePreloadedQuery(preloadedBudgetCap);
  const [budget, setBudget] = useState(budgetCap?.amount.toString() || '');
  const setBudgetCap = useMutation(api.budgetCap.setBudgetCap);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!budget || budget.trim() === '') {
      toast.error('Please enter a budget amount');
      return;
    }

    const budgetNumber = Number(budget);
    if (budgetNumber === budgetCap?.amount) {
      console.log('Budget is the same');
      setIsEditing(false);
      return;
    }

    if (Number(budget) < 0 || Number(budget) === 0) {
      toast.error('Budget cannot be negative or zero');
      return;
    }

    const response = await setBudgetCap({
      userId: userId,
      amount: Number(budget),
    });

    if (response.success) {
      toast.success('Budget cap set successfully');
    } else {
      toast.error('Failed to set budget cap');
    }

    setIsEditing(false);
  };

  return (
    <div>
      <h2 className="text-xl">Monthly Budget Cap</h2>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-fit text-2xl font-bold px-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            autoFocus
            onBlur={() => setIsEditing(false)}
          />
        </form>
      ) : (
        <p
          className="w-fit text-2xl font-bold cursor-pointer hover:opacity-75"
          onClick={() => setIsEditing(true)}
        >
          {formatCurrency(budgetCap?.amount || 0)}
        </p>
      )}

      <p className="text-xs text-muted-foreground">
        Total budget for all expenses this month
      </p>
    </div>
  );
}
