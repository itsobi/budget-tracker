'use client';

import { ExpenseCard } from '@/components/ExpenseCard';
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
} from 'lucide-react';

import { useEffect, useState } from 'react';

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
import { useAuth } from '@clerk/nextjs';
import { api } from '@/convex/_generated/api';
import { useMutation, useQuery } from 'convex/react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

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

const initialExpenses = [
  {
    id: 1,
    title: 'Monthly Budget',
    amount: 1000,
    type: 'budget',
    subtitle: '+20.1% from last month',
  },
  {
    id: 2,
    title: 'Monthly Expenses',
    amount: 1000,
    type: 'expenses',
    subtitle: '+20.1% from last month',
  },
  {
    id: 3,
    title: 'Savings',
    amount: 1000,
    type: 'savings',
    subtitle: '+20.1% from last month',
  },
  {
    id: 4,
    title: 'Recurring Expenses',
    amount: 1000,
    type: 'other',
    subtitle: '+20.1% from last month',
  },
];

interface DashboardExpensesProps {
  preloadedExpensesCount: number;
}

export function DashboardExpenses({
  preloadedExpensesCount,
}: DashboardExpensesProps) {
  const { userId } = useAuth();
  const expenses = useQuery(api.expenses.getExpenses, { userId: userId! });
  const [expensesState, setExpensesState] = useState(expenses);
  const updateExpenseOrder = useMutation(api.expenses.updateOrder);

  useEffect(() => {
    if (expenses) {
      setExpensesState(expenses);
    }
  }, [expenses]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      setExpensesState((items) => {
        if (!items) return items;
        const oldIndex = items.findIndex((item) => item._id === active.id);
        const newIndex = items.findIndex((item) => item._id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);
        newItems.forEach((item, index) => {
          updateExpenseOrder({ id: item._id, order: index });
        });
        return newItems;
      });
    }
  };

  if (!expensesState?.length) {
    return (
      <>
        {[...Array(preloadedExpensesCount)].map((_, i) => (
          <Card key={i} className="w-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-[120px]" />
                <Skeleton className="h-4 w-10" />
              </div>
            </CardHeader>
            <CardContent className="">
              <div className="flex justify-between items-center">
                <Skeleton className="h-8 w-[300px]" />

                <div>
                  <Skeleton className="h-8 w-[140px]" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={expensesState.map((e) => e._id)}
        strategy={rectSortingStrategy}
      >
        {expensesState.map((expense) => (
          <ExpenseCard
            key={expense._id}
            id={expense._id}
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
