'use client';

import {
  AlertDialog as AlertDialogWrapper,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface AlertDialogProps {
  title: string;
  description: string;
  error?: boolean;
}

export function AlertDialog({ title, description, error }: AlertDialogProps) {
  const [open, setOpen] = useState(true);
  const router = useRouter();
  return (
    <AlertDialogWrapper open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild className="hidden">
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="dark:border-2">
        <AlertDialogHeader>
          <AlertDialogTitle
            className={cn('text-foreground', error && 'text-destructive')}
          >
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={() => router.replace(error ? '/membership' : '/dashboard')}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogWrapper>
  );
}
