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
import { useRef } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { useSavingsSheetStore } from '@/store/useSavingsSheetStore';
import { Id } from '@/convex/_generated/dataModel';
import { useSession } from 'next-auth/react';

const savingsTypes = [
  { value: 'car', label: 'Car' },
  { value: 'emergency', label: 'Emergency' },
  { value: 'home', label: 'Home' },
  { value: 'other', label: 'Other' },
  { value: 'retirement', label: 'Retirement' },
  { value: 'vacation', label: 'Vacation' },
];

export function SavingsSheet() {
  const { data: session } = useSession();
  const authId = session?.user?.id;
  const { isOpen, close, savingsId } = useSavingsSheetStore();
  const formRef = useRef<HTMLFormElement>(null);

  const existingSaving = useQuery(
    api.savings.getSavingsGoal,
    typeof savingsId === 'string' ? { id: savingsId as Id<'savings'> } : 'skip'
  );

  const updateSavingsGoalMutation = useMutation(api.savings.updateSavingsGoal);

  const createSavingsGoal = useMutation(api.savings.createSavingsGoal);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!authId) return;

    const formData = new FormData(e.currentTarget);

    // Extract the values directly
    const title = formData.get('name') as string;
    const type = formData.get('type') as string;
    const goalAmount = formData.get('goalAmount');
    const currentAmount = formData.get('currentAmount');

    // When editing, use existing values as fallback
    const finalTitle = title || existingSaving?.title;
    const finalType = type || existingSaving?.type;
    const finalGoalAmount = goalAmount || existingSaving?.goalAmount;
    const finalCurrentAmount = currentAmount || existingSaving?.currentAmount;

    // Validate required fields
    if (!finalTitle || !finalType || !finalGoalAmount || !finalCurrentAmount) {
      toast.error('Please fill in all fields');
      return;
    }

    const data = {
      title: finalTitle.trim(),
      type: finalType,
      goalAmount: Number(finalGoalAmount),
      currentAmount: Number(finalCurrentAmount),
    };

    let response;

    try {
      if (savingsId) {
        response = await updateSavingsGoalMutation({
          id: savingsId as Id<'savings'>,
          authId,
          savingsAuthId: existingSaving?.authId ?? '',
          ...data,
        });
      } else {
        response = await createSavingsGoal({
          authId,
          savingsAuthId: authId,
          ...data,
        });
      }

      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }

      formRef.current?.reset();
      close();
    } catch (error) {
      console.log(error);
      toast.error('Failed to save changes');
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
        <SheetHeader className="text-left">
          <SheetTitle>
            {savingsId ? 'Edit Savings Goal' : 'Add Savings Goal'}
          </SheetTitle>
          <SheetDescription>
            {savingsId
              ? 'Edit your existing savings goal'
              : 'Add a savings goal to your budget dashboard'}
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
              defaultValue={savingsId ? existingSaving?.title : ''}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="type">Type</Label>
            <Select
              name="type"
              defaultValue={savingsId ? existingSaving?.type : undefined}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    savingsId
                      ? (existingSaving?.type ?? '').charAt(0).toUpperCase() +
                        (existingSaving?.type ?? '').slice(1)
                      : ''
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {savingsTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label htmlFor="goalAmount">Goal Amount</Label>
            <Input
              name="goalAmount"
              type="number"
              step="0.01"
              defaultValue={savingsId ? existingSaving?.goalAmount : ''}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="currentAmount">Current Amount</Label>
            <Input
              name="currentAmount"
              type="number"
              defaultValue={savingsId ? existingSaving?.currentAmount : ''}
            />
          </div>
          <Button type="submit" className="w-full">
            {savingsId ? 'Update Savings Goal' : 'Add Savings Goal'}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
