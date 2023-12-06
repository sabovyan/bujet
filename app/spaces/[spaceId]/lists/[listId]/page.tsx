import { notFound } from 'next/navigation';

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
    <div>
      <h1>{params.spaceId}</h1>
    </div>
  );
}
