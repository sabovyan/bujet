import { prisma } from '@/lib/prisma';

export default async function SingleSpace({
  params
}: {
  params: { id: string };
}) {
  const space = await prisma.space.findUnique({ where: { id: params.id } });

  return space ? (
    <div>
      <h1>{space.name}</h1>
    </div>
  ) : null;
}
