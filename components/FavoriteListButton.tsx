'use client';

import { useOptimistic, useState } from 'react';

import { changeFaveStatus } from '@/app/actions/list.action';

import { Button } from './ui/button';

export function FavoriteListButton({
  isFave = false,
  spaceId,
  listId
}: {
  isFave?: boolean | null;
  listId: string;
  spaceId: string;
}) {
  const [favoriteStatus, setfavoriteStatus] = useState(isFave);

  const [favoriteOptimisticStatus, updateOptimisticStatus] = useOptimistic<
    typeof favoriteStatus,
    typeof favoriteStatus
  >(favoriteStatus, (_, newState) => {
    return newState;
  });

  return (
    <form
      action={async (formData: FormData) => {
        const faveStatus = !!formData.get('favorite');

        updateOptimisticStatus(faveStatus);

        await changeFaveStatus(formData);
        setfavoriteStatus(faveStatus);
      }}
    >
      <input type="text" name="listId" defaultValue={listId} hidden readOnly />
      <input
        type="text"
        name="spaceId"
        defaultValue={spaceId}
        hidden
        readOnly
      />
      <input
        type="checkbox"
        name="favorite"
        checked={!favoriteOptimisticStatus}
        hidden
        readOnly
      />

      <Button variant="secondary" size="icon">
        {favoriteOptimisticStatus ? '★' : '☆'}
      </Button>
    </form>
  );
}
