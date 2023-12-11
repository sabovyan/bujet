import clsx from 'clsx';
import Image from 'next/image';

import { Label } from '@/components/ui/label';
import { Toggle } from '@/components/ui/toggle';

import { deleteListItem, toggleCompleteStatus } from '../listItem.action';
import recurringIcon from '../recurring_icon.png';

type ListItems = Array<{
  id: string;
  type: 'DAILY' | 'ONCE';
  name: string;
  creator: { name: string | null };
}>;

type Props<List extends ListItems> = {
  type: 'ONGOING' | 'COMPLETED';
  items: List;
  listId: string;
  spaceId: string;
  title: string;
};

export function ListComponent<T extends ListItems>({
  items,
  type,
  listId,
  spaceId,
  title
}: Props<T>) {
  return (
    <>
      <h3 className="text-lg mt-8">{title}</h3>
      <ul
        className={clsx(
          'flex flex-col gap-4 mt-4 max-w-[450px]',
          type === 'COMPLETED' && 'line-through'
        )}
      >
        {items?.map((item) => {
          const isDaily = item.type === 'DAILY';

          return (
            <li
              key={item.id}
              className="flex gap-4 items-center justify-between border "
            >
              <div className="flex gap-4 items-center">
                <Toggle title="toggle recursive state" pressed={isDaily}>
                  <Image
                    src={recurringIcon}
                    alt="recurring icon"
                    width={24}
                    height={24}
                    className={`${isDaily ? 'opacity-100' : 'opacity-20'}`}
                  />
                </Toggle>
                <Label
                  className={clsx(
                    'text-sm mb-0',
                    type === 'COMPLETED' && 'opacity-40'
                  )}
                >
                  {item.name}{' '}
                  <span className="text-xs text-gray-400">
                    (By {item.creator.name?.split(' ')[0]})
                  </span>
                </Label>
              </div>
              <div className="flex gap-2">
                <form
                  action={async (formData) => {
                    'use server';
                    formData.append('listId', listId);
                    formData.append('listItemId', item.id);
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
                <form
                  action={async (formData) => {
                    'use server';
                    formData.append('listId', listId);
                    formData.append('listItemId', item.id);
                    formData.append('spaceId', spaceId);

                    await deleteListItem(formData);
                  }}
                >
                  <Toggle type="submit" aria-label="remove">
                    &#x292B;
                  </Toggle>
                </form>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
