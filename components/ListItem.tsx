import { List, ListItem } from '@prisma/client';
import Link from 'next/link';

import { ListComponent } from '@/app/spaces/[spaceId]/lists/[listId]/@list/components/ListCompoent';
import { isCompleted } from '@/utils/listItem';

import { FavoriteListButton } from './FavoriteListButton';

type Props = {
  list: List & {
    items?: (ListItem & { creator: { name: string | null } })[];
  };
  isListItem?: boolean;
};

export function SpaceList({ list, isListItem }: Props) {
  const { ongoingItems } = list.items?.reduce<{
    ongoingItems: NonNullable<typeof list.items>;
    completedItems: typeof list.items;
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
  ) || { ongingItems: [], completedItems: [] };

  return (
    <ItemWrapper key={list.id} asListItem={isListItem}>
      <div className="text-xl text-center min-w-[200px] p-2 rounded-lg border flex justify-between">
        <Link
          href={`/spaces/${list.spaceId}/lists/${list.id}`}
          className="block flex-grow"
        >
          {list.name}
        </Link>
        <FavoriteListButton
          spaceId={list.spaceId}
          listId={list.id}
          isFave={list.favorite}
        />
      </div>
      <ListComponent
        type="ONGOING"
        spaceId={list.spaceId}
        listId={list.id}
        items={ongoingItems}
      />
    </ItemWrapper>
  );
}

function ItemWrapper({
  children,
  asListItem = true
}: {
  children: React.ReactNode;
  asListItem?: boolean;
  className?: string;
}) {
  if (asListItem) {
    return <li>{children}</li>;
  }

  return <div>{children}</div>;
}
