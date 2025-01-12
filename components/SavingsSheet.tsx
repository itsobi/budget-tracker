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
import { useAuth } from '@clerk/nextjs';

const savingsTypes = [
  { value: 'home', label: 'Home' },
  { value: 'car', label: 'Car' },
  { value: 'retirement', label: 'Retirement' },
  { value: 'emergency', label: 'Emergency' },
  { value: 'vacation', label: 'Vacation' },
  { value: 'other', label: 'Other' },
];

export function SavingsSheet() {
  const { userId } = useAuth();
  const { isOpen, close } = useSavingsSheetStore();
  const formRef = useRef<HTMLFormElement>(null);

  const createSavingsGoal = useMutation(api.savings.createSavingsGoal);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userId) return;

    const formData = new FormData(e.currentTarget);

    const title = formData.get('name') as string;
    const type = formData.get('type') as string;
    const goalAmount = Number(formData.get('goalAmount'));
    const currentAmount = Number(formData.get('currentAmount'));

    if (!title || !type || !goalAmount || !currentAmount) {
      toast.error('Please fill in all fields');
      return;
    }

    const response = await createSavingsGoal({
      userId,
      title,
      type,
      goalAmount,
      currentAmount,
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
        <SheetHeader className="text-left">
          <SheetTitle>Add Savings Goal</SheetTitle>
          <SheetDescription>
            Add a savings goal to your budget dashboard.
          </SheetDescription>
        </SheetHeader>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="my-4 flex flex-col gap-4"
        >
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input name="name" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="type">Type</Label>
            <Select name="type">
              <SelectTrigger>
                <SelectValue />
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
            <Input name="goalAmount" type="number" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="currentAmount">Current Amount</Label>
            <Input name="currentAmount" type="number" />
          </div>
          <Button type="submit" className="w-full">
            Add Transaction
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
