'use client';

import { useRef } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { createListItem } from './listItem.action';

type Props = {
  listId: string;
  spaceId: string;
};

export function AddListItemForm({ listId, spaceId }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const handleAction = async (formdata: FormData) => {
    await createListItem(formdata);
    formRef.current?.reset();
  };

  return (
    <form ref={formRef} action={handleAction} className="flex gap-4">
      <Input type="text" name="name" />
      <Input
        type="text"
        name="listId"
        defaultValue={listId}
        readOnly
        hidden
        className="hidden"
      />
      <Input
        type="text"
        name="spaceId"
        defaultValue={spaceId}
        readOnly
        hidden
        className="hidden"
      />
      <Button>Add</Button>
    </form>
  );
}
