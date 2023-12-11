import { Toggle } from '@/components/ui/toggle';

import { deleteListItem, toggleCompleteStatus } from '../../listItem.action';

type Props = {
  listId: string;
  spaceId: string;
  itemId: string;
};

export function RemoveForm({ listId, spaceId, itemId }: Props) {
  return (
    <form
      action={async (formData) => {
        'use server';
        formData.append('listId', listId);
        formData.append('listItemId', itemId);
        formData.append('spaceId', spaceId);

        await deleteListItem(formData);
      }}
    >
      <Toggle type="submit" aria-label="remove">
        &#x292B;
      </Toggle>
    </form>
  );
}

export function ToggleCompleteForm({
  listId,
  spaceId,
  itemId,
  type
}: Props & { type: 'ONGOING' | 'COMPLETED' }) {
  return (
    <form
      action={async (formData) => {
        'use server';
        formData.append('listId', listId);
        formData.append('listItemId', itemId);
        formData.append('spaceId', spaceId);
        if (type === 'ONGOING') {
          formData.append('isComplete', 'on');
        }

        await toggleCompleteStatus(formData);
      }}
    >
      <Toggle type="submit" aria-label="complete">
        {type === 'COMPLETED' ? '↻' : '✓'}
      </Toggle>
    </form>
  );
}
