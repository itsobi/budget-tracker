'use client';

import { ExpenseCard } from '@/components/ExpenseCard';
import { CalendarSync, CreditCard, DollarSign, PiggyBank } from 'lucide-react';
import { useState } from 'react';

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

const initialExpenses = [
  {
    id: 1,
    title: 'Monthly Budget',
    amount: 1000,
    Icon: DollarSign,
    subtitle: '+20.1% from last month',
  },
  {
    id: 2,
    title: 'Monthly Expenses',
    amount: 1000,
    Icon: CreditCard,
    subtitle: '+20.1% from last month',
  },
  {
    id: 3,
    title: 'Savings',
    amount: 1000,
    Icon: PiggyBank,
    subtitle: '+20.1% from last month',
  },
  {
    id: 4,
    title: 'Recurring Expenses',
    amount: 1000,
    Icon: CalendarSync,
    subtitle: '+20.1% from last month',
  },
];

export function DashboardExpenses() {
  const [expenses, setExpenses] = useState(initialExpenses);

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
      setExpenses((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
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
        items={expenses.map((e) => e.id)}
        strategy={rectSortingStrategy}
      >
        {expenses.map((expense) => (
          <ExpenseCard
            key={expense.id}
            id={expense.id}
            title={expense.title}
            amount={expense.amount}
            Icon={expense.Icon}
            subtitle={expense.subtitle}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
}
