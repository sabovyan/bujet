import { notFound } from 'next/navigation';

import { FavoriteListButton } from '@/components/FavoriteListButton';
import { prisma } from '@/lib/prisma';

import { SpaceItemParams } from '../../page';

type ListItemParams = SpaceItemParams & {
  listId: string;
};
export default async function List({ params }: { params: ListItemParams }) {
  const list = await prisma.list.findUnique({
    where: { id: params.listId }
  });

  if (!list) {
    notFound();
  }

  return (
    <main>
      <header className="flex gap-4">
        <h2 className="text-2xl">{list.name}</h2>
        <FavoriteListButton
          spaceId={params.spaceId}
          listId={list.id}
          isFave={list.favorite}
        />
      </header>
    </main>
  );
}
