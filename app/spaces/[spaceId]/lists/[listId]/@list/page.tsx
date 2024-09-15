import { prisma } from '@/lib/prisma';
import { isCompleted } from '@/utils/listItem';

import { ListComponent } from './components/ListCompoent';
import { SpaceItemParams } from '../../../page';

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

  const { ongoingItems, completedItems } = items.reduce<{
    ongoingItems: typeof items;
    completedItems: typeof items;
  }>(
    (acc, item) => {
      if (isCompleted(item.completedAt)) {
        acc.completedItems.push(item);

        return acc;
      }

      acc.ongoingItems.push(item);

      return acc;
    },
    { ongoingItems: [], completedItems: [] }
  );

  return (
    <>
      <ListComponent
        type="ONGOING"
        items={ongoingItems}
        listId={params.listId}
        spaceId={params.spaceId}
        title="Ongoing"
      />

      <ListComponent
        type="COMPLETED"
        items={completedItems}
        listId={params.listId}
        spaceId={params.spaceId}
        title="Completed"
      />
    </>
  );
}
