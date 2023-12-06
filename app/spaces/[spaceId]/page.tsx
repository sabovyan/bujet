import Link from 'next/link';
import { notFound } from 'next/navigation';

import { prisma } from '@/lib/prisma';

export type SpaceItemParams = { spaceId: string };

export default async function SingleSpace({
  params: { spaceId: paramsSpaceId }
}: {
  params: SpaceItemParams;
}) {
  const space = await prisma.space.findUnique({
    where: { id: paramsSpaceId },
    include: { Lists: true }
  });

  if (!space) {
    notFound();
  }

  return (
    <section>
      <div className="flex gap-4 mb-4 mx-4 items-center justify-start">
        <h2 className="text-3xl border max-w-fit px-4 py-2 rounded-2xl bg-primary text-primary-foreground">
          <Link href={`/spaces/${space.id}`}>☀︎ {space.name}</Link>
        </h2>
        <Link
          href={`/spaces/${space.id}/lists/add`}
          className="text-3xl border px-4 py-2 rounded-2xl"
        >
          +
        </Link>
      </div>
      {!space.Lists.length ? (
        <div>
          <h2 className="text-2xl">No List was Found</h2>
        </div>
      ) : (
        <ul className="flex flex-wrap gap-2">
          {space.Lists.map((list) => (
            <li
              key={list.id}
              className="text-xl text-center min-w-[200px] p-2 rounded-lg border"
            >
              <Link
                href={`/spaces/${space.id}/lists/${list.id}`}
                className="block"
              >
                {list.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
