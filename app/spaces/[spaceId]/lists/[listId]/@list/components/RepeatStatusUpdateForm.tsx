'use client';
import Image from 'next/image';

import { Toggle } from '@/components/ui/toggle';

import { toggleRepeatStatus } from '../../listItem.action';
import recurringIcon from '../../recurring_icon.png';

type Props = {
  listId: string;
  listItemId: string;
  spaceId: string;
  itemType: 'DAILY' | 'ONCE';
};
export function RepeatStatusUpdateForm({
  listId,
  listItemId,
  spaceId,
  itemType
}: Props) {
  const isDaily = itemType === 'DAILY';

  return (
    <form
      action={async () => {
        const formData = new FormData();

        formData.append('listId', listId);
        formData.append('listItemId', listItemId);
        formData.append('spaceId', spaceId);

        formData.append('repeat', itemType === 'DAILY' ? 'ONCE' : 'DAILY');

        await toggleRepeatStatus(formData);
      }}
    >
      <Toggle type="submit" aria-label="toggle Repetition" pressed={isDaily}>
        <Image
          src={recurringIcon}
          alt="recurring icon"
          width={24}
          height={24}
          className={`${isDaily ? 'opacity-100' : 'opacity-20'}`}
        />
      </Toggle>
    </form>
  );
}
