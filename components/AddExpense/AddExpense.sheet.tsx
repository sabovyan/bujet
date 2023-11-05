import { PropsWithChildren } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '../ui/sheet';

export function AddExpenseSheet({
  children,
  title
}: PropsWithChildren<{ title: string }>) {
  return (
    <Sheet>
      <SheetTrigger className="w-16 aspect-square bg-primary text-white text-2xl border border-white rounded-full shadow-md -translate-y-8">
        +
      </SheetTrigger>
      <SheetContent side={'top'}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {children}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
