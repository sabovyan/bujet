'use client';

import { useState } from 'react';

import Image from 'next/image';

import { Toggle } from '@/components/ui/toggle';

import { toggleRepeatStatus } from '../../listItem.action';
import recurringIcon from '../../recurring_icon.png';

type Props = {
  itemId: string;
  itemType: 'DAILY' | 'ONCE';
};
export function RepeatStatusUpdateForm({ itemId, itemType }: Props) {
  const [repeatStatus, setRepeatStatus] = useState(itemType);

  const isDaily = repeatStatus === 'DAILY';

  return (
    <form
      action={async () => {
        const repeat = repeatStatus === 'DAILY' ? 'ONCE' : 'DAILY';

        const formData = new FormData();

        formData.append('id', itemId);
        formData.append('repeat', repeat);

        setRepeatStatus(repeat);

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
