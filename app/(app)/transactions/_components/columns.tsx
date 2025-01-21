'use client';

import { ColumnDef } from '@tanstack/react-table';

import { ArrowUpDown, MoreHorizontal, Pencil } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { Id } from '@/convex/_generated/dataModel';
import { Actions } from './actions';

export enum TransactionType {
  BILLS = 'bills',
  ENTERTAINMENT = 'entertainment',
  GROCERIES = 'groceries',
  OTHER = 'other',
  RESTAURANT = 'restaurant',
  SHOPPING = 'shopping',
  TRANSPORTATION = 'transportation',
}

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Transaction = {
  id: string;
  type: TransactionType;
  title: string;
  amount: number;
  date: string;
};

export const columns: ColumnDef<Transaction>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'type',
    header: ({ column }) => {
      return (
        <p
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="flex items-center hover:cursor-pointer hover:text-green-500 transition-all duration-100 ease-in-out"
        >
          Type
          <ArrowUpDown className="ml-2 h-4 w-4 " />
        </p>
      );
    },
    cell: ({ row }) => {
      const type = row.getValue('type') as TransactionType;
      return <span className="capitalize">{type}</span>;
    },
  },
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);

      return <span>{formatted}</span>;
    },
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      const dateStr = row.getValue('date') as string;
      // Append T00:00:00 to ensure it's interpreted in local timezone
      const date = new Date(`${dateStr}T00:00:00`);
      return <span>{date.toLocaleDateString()}</span>;
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const transaction = row.original;

      return <Actions transaction={transaction} />;
    },
  },
];
