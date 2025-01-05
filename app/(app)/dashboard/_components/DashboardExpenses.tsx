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
import { api } from '@/convex/_generated/api';
import { useMutation, useQuery } from 'convex/react';
import { Id } from '@/convex/_generated/dataModel';

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

interface DashboardExpensesProps {
  userId: string;
}

export function DashboardExpenses({ userId }: DashboardExpensesProps) {
  const expenses = useQuery(api.expenses.getExpenses, { userId });
  const [expensesState, setExpensesState] = useState(expenses);
  const updateExpenseOrder = useMutation(api.expenses.updateExpenseOrder);

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

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={expensesState?.map((e) => e._id) ?? []}
        strategy={rectSortingStrategy}
      >
        {expensesState?.map((expense) => (
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
