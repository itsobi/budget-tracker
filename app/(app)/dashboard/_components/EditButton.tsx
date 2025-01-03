import { Button } from '@/components/ui/button';
import { Id } from '@/convex/_generated/dataModel';
import { useExpenseSheetStore } from '@/store/useExpenseSheetStore';
import { Pencil } from 'lucide-react';

export default function EditButton({ id }: { id: string }) {
  const { open } = useExpenseSheetStore();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => open(id as Id<'expenses'>)}
    >
      <Pencil />
    </Button>
  );
}
