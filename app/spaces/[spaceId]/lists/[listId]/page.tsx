import { notFound, redirect } from 'next/navigation';

import { FavoriteListButton } from '@/components/FavoriteListButton';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

import { AddListItemForm } from './AddListItemForm';
import { SpaceItemParams } from '../../page';

type ListItemParams = SpaceItemParams & {
  listId: string;
};

export default async function List({ params }: { params: ListItemParams }) {
  const session = await auth();

  const id = session?.user?.id;

  if (!id) {
    redirect('/');
  }
  const list = await prisma.list.findUnique({
    where: { id: params.listId }
  });

  if (!list) {
    notFound();
  }

  return (
    <header className="flex gap-8">
      <div className="flex gap-4">
        <h2 className="text-2xl">{list.name}</h2>
        <FavoriteListButton
          spaceId={params.spaceId}
          listId={list.id}
          isFave={list.favorite}
        />
      </div>
      <AddListItemForm listId={list.id} spaceId={params.spaceId} />
    </header>
  );
}
