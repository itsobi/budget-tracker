'use client';

import {
  CalendarSync,
  CreditCard,
  DollarSign,
  PiggyBank,
  Home,
  Car,
  Utensils,
  Plug,
  Heart,
  Tv,
  ShoppingBag,
  GraduationCap,
  HelpCircle,
  LucideIcon,
  Coins,
  Wallet,
} from 'lucide-react';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { api } from '@/convex/_generated/api';
import { useMutation, useQuery } from 'convex/react';
import { Id } from '@/convex/_generated/dataModel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useExpenseSheetStore } from '@/store/useExpenseSheetStore';
import { ExpenseCard } from './ExpenseCard';

const expenseTypeToIcon: Record<string, LucideIcon> = {
  housing: Home,
  transportation: Car,
  food: Utensils,
  utilities: Plug,
  healthcare: Heart,
  entertainment: Tv,
  shopping: ShoppingBag,
  education: GraduationCap,
  savings: PiggyBank,
  other: HelpCircle,
  budget: DollarSign,
  expenses: CreditCard,
  recurring: CalendarSync,
};

export function DashboardExpenses({
  userId,
}: {
  userId: Id<'users'> | null | undefined;
}) {
  const expenses = useQuery(
    api.expenses.getExpenses,
    userId ? { userId } : 'skip'
  );
  const updateExpenseOrder = useMutation(api.expenses.updateExpenseOrder);
  const { open } = useExpenseSheetStore();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || !expenses) return;

    if (active.id !== over.id) {
      const oldIndex = expenses.findIndex((item) => item._id === active.id);
      const newIndex = expenses.findIndex((item) => item._id === over.id);
      const newItems = arrayMove(expenses, oldIndex, newIndex);

      // Update the order in the database for each item
      newItems.forEach((item, index) => {
        updateExpenseOrder({ id: item._id, order: index });
      });
    }
  };

  if (!expenses) {
    return (
      <>
        {[...Array(Math.floor(Math.random() * 4) + 1)].map((_, index) => (
          <Card key={index} className="flex items-center p-6 space-x-4">
            <div className="space-y-8 flex-1">
              <div className="flex justify-between items-center">
                <div className="h-4 w-16 bg-muted rounded animate-pulse" />
                <div className="h-4 w-10 bg-muted rounded animate-pulse" />
              </div>
              <div className="flex justify-between items-center">
                <div className="h-8 w-24 bg-muted rounded animate-pulse" />
                <div className="h-4 w-16 bg-muted rounded animate-pulse" />
              </div>
            </div>
          </Card>
        ))}
      </>
    );
  }

  if (!expenses?.length) {
    return (
      <Card className="flex flex-col items-center justify-center p-6 text-center md:col-span-2">
        <CardHeader>
          <Wallet className="h-12 w-12 text-muted-foreground mb-2" />
          <CardTitle>No Fixed Expenses yet</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Currently, you are not tracking any fixed expenses. Click{' '}
            <span
              onClick={() => open()}
              className="underline cursor-pointer underline-offset-1"
            >
              here
            </span>{' '}
            or the "+" button at the top of the dashboard to add your first
            fixed expense.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      id="dashboard-expenses"
    >
      <SortableContext
        items={expenses?.map((e) => e._id) ?? []}
        strategy={rectSortingStrategy}
      >
        {expenses?.map((expense) => (
          <ExpenseCard
            key={expense._id}
            id={expense._id as Id<'expenses'>}
            title={expense.title}
            amount={expense.amount}
            Icon={expenseTypeToIcon[expense.type]}
            // subtitle={expense.subtitle}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
}
