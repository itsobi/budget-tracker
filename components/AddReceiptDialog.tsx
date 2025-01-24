'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { convertReceiptToText } from '@/lib/converter';
import { useReceiptDialogStore } from '@/store/useReceiptDialogStore';
import { Upload } from 'lucide-react';
import { useRef, useState, useTransition } from 'react';
import { toast } from 'sonner';
import { Input } from './ui/input';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Label } from './ui/label';
import { transactionTypes } from './TransactionSheet';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useAuth } from '@clerk/nextjs';

export function AddReceiptDialog() {
  const { userId } = useAuth();
  const { isOpen, open, close } = useReceiptDialogStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [receipt, setReceipt] = useState<{
    storeName: string | null;
    total: number | null;
  } | null>(null);
  const [transactionType, setTransactionType] = useState<string>('other');
  const [isPending, startTransition] = useTransition();
  const createTransaction = useMutation(api.transactions.createTransaction);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    if (image && image.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(image);

      startTransition(async () => {
        const { storeName, total } = await convertReceiptToText(imageUrl);
        setReceipt({ storeName, total });
      });
    } else {
      toast.error('Please upload a valid image file');
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!receipt?.storeName || !receipt?.total) {
      toast.error('Please fill all fields');
      return;
    }

    if (!userId) {
      return;
    }

    const response = await createTransaction({
      title: receipt.storeName,
      amount: receipt.total,
      type: transactionType,
      userId: userId,
      date: new Date().toISOString(),
    });

    if (response.success) {
      toast.success('Transaction added successfully');
    } else {
      toast.error('Failed to add transaction');
    }
    setReceipt(null);
    close();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(openParam) => {
        if (!openParam) {
          setReceipt(null);
          close();
        } else {
          open();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Receipt</DialogTitle>
        </DialogHeader>
        {receipt === null ? (
          <div
            className="flex justify-center items-center bg-muted-foreground/50 rounded-md p-10 cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
            onChange={handleImageUpload}
          >
            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              accept="image/*"
            />
            {isPending ? (
              <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
                <p className="text-sm text-white animate-pulse">
                  Reading your receipt...
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <p className="text-xs text-muted-foreground">
                  Click to upload receipt
                </p>
                <Upload className="text-muted-foreground" />
              </div>
            )}
          </div>
        ) : null}
        {receipt?.storeName && receipt?.total && (
          <form
            onSubmit={onSubmit}
            ref={formRef}
            className="flex flex-col gap-2"
          >
            <Label>Name</Label>
            <Input
              value={receipt.storeName}
              onChange={(e) =>
                setReceipt({ ...receipt, storeName: e.target.value })
              }
            />
            <Label>Amount</Label>
            <Input
              type="number"
              value={receipt.total}
              onChange={(e) =>
                setReceipt({ ...receipt, total: parseFloat(e.target.value) })
              }
            />
            <Label>Type</Label>
            <Select defaultValue="other" onValueChange={setTransactionType}>
              <SelectTrigger>
                <SelectValue placeholder="other" />
              </SelectTrigger>
              <SelectContent>
                {transactionTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex justify-between mt-4 gap-2">
              <Button variant="outline" onClick={() => setReceipt(null)}>
                Clear
              </Button>
              <Button>Add Transaction</Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
