import clsx from 'clsx';
import Image from 'next/image';

import { Label } from '@/components/ui/label';
import { Toggle } from '@/components/ui/toggle';

import { RemoveForm, ToggleCompleteForm } from './listsForms';
import recurringIcon from '../../recurring_icon.png';

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
                <ToggleCompleteForm
                  listId={listId}
                  itemId={item.id}
                  spaceId={spaceId}
                  type={type}
                />
                <RemoveForm
                  listId={listId}
                  itemId={item.id}
                  spaceId={spaceId}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
