'use client';

import { api } from '@/convex/_generated/api';
import { useMutation, useQuery } from 'convex/react';
import { useState } from 'react';
import { toast } from 'sonner';
import { formatCurrency } from './Transaction';
import { Id } from '@/convex/_generated/dataModel';

export default function MonthlyBudgetCap({
  authId,
}: {
  authId: string | undefined;
}) {
  const budgetCap = useQuery(
    api.budgetCap.getBudgetCap,
    authId ? { authId } : 'skip'
  );

  const [isEditing, setIsEditing] = useState(false);

  const setBudgetCap = useMutation(api.budgetCap.setBudgetCap);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsEditing(true);
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const newBudget = formData.get('budget') as string;

    if (!newBudget || newBudget.trim() === '') {
      setIsEditing(false);
      toast.error('Please enter a budget amount');
      return;
    }

    if (Number(newBudget) === budgetCap?.amount) {
      setIsEditing(false);
      console.log('Budget is the same');
      return;
    }

    if (Number(newBudget) <= 0) {
      setIsEditing(false);
      toast.error('Budget cannot be negative or zero');
      return;
    }

    if (Number(newBudget) < 0 || Number(newBudget) === 0) {
      toast.error('Budget cannot be negative or zero');
      return;
    }

    try {
      const response = await setBudgetCap({
        authId: authId ?? '',
        amount: Number(newBudget),
      });

      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to set budget cap');
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl">Monthly Budget Cap</h2>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            name="budget"
            type="number"
            // value={budget}
            // onChange={(e) => setBudget(e.target.value)}
            defaultValue={budgetCap?.amount.toString() || ''}
            className="w-fit text-2xl font-bold px-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            autoFocus
            onBlur={(e) => {
              e.currentTarget.form?.requestSubmit();
              setIsEditing(false);
            }}
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
    </div>
  );
}
