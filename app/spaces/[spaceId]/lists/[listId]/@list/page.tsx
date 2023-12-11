import Image from 'next/image';

import { Label } from '@/components/ui/label';
import { Toggle } from '@/components/ui/toggle';
import { prisma } from '@/lib/prisma';

import { SpaceItemParams } from '../../../page';
import { deleteListItem } from '../listItem.action';
import recurringIcon from '../recurring_icon.png';

type ListItemParams = SpaceItemParams & {
  listId: string;
};

export default async function List({ params }: { params: ListItemParams }) {
  const items = await prisma.listItem.findMany({
    where: {
      list: { id: params.listId }
    },
    include: { creator: { select: { name: true } } }
  });

  const ongoingItems = items.filter((item) => !item.completedAt);

  return (
    <>
      <h3 className="text-lg mt-8">Ongoing</h3>
      <ul className="flex flex-col gap-4 mt-4 max-w-[450px]">
        {ongoingItems?.map((item) => {
          const isDaily = item.type === 'DAILY';

          return (
            <li
              key={item.id}
              className="flex gap-4 items-center justify-between border"
            >
              <div className="flex gap-4 items-center">
                <Toggle title="toggle recursive state" pressed={isDaily}>
                  <Image
                    src={recurringIcon}
                    alt="recurring icon"
                    width={24}
                    height={24}
                  />
                </Toggle>
                <Label className="mb-0">
                  {item.name}{' '}
                  <span className="text-xs text-gray-400">
                    (By {item.creator.name?.split(' ')[0]})
                  </span>
                </Label>
              </div>
              <div className="flex gap-2">
                <Toggle aria-label="complete">&#x2713;</Toggle>
                <form
                  action={async (formData) => {
                    'use server';
                    // listId, listItemId, spaceId
                    formData.append('listId', params.listId);
                    formData.append('listItemId', item.id);
                    formData.append('spaceId', params.spaceId);

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
