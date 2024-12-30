import { Pencil, Trash } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ConfirmDialog } from './ConfirmDialog';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/lib/utils';

interface ExpenseCardProps {
  id: number;
  title: string;
  amount: number;
  Icon: React.ElementType;
  subtitle: string;
}

export function ExpenseCard({
  id,
  title,
  amount,
  Icon,
  subtitle,
}: ExpenseCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({ id });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-grab active:cursor-grabbing"
    >
      <Card
        className={cn(
          'shadow-md dark:border-white/60',
          isDragging && 'bg-secondary'
        )}
      >
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <h2 className="text-sm font-normal">{title}</h2>
            <Icon />
          </CardTitle>
        </CardHeader>
        <CardContent className="">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-2xl font-bold">${amount}</p>
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            </div>
            <div className="">
              <Button variant="ghost" size="icon">
                <Pencil />
              </Button>
              <ConfirmDialog
                triggerComponent={
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-red-500 hover:text-white"
                  >
                    <Trash />
                  </Button>
                }
                title="Are you sure?"
                description="This action cannot be undone. This will permanently delete this expense."
                confirmText="Delete"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
