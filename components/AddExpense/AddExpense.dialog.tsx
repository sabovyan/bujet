import { PropsWithChildren } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

export function AddExpenseDialog({
  children,
  title
}: PropsWithChildren<{ title: string }>) {
  return (
    <Dialog>
      <DialogTrigger className="w-16 aspect-square bg-primary text-white text-2xl border border-white rounded-full shadow-md -translate-y-8">
        +
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
