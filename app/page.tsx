import { SpaceList } from '@/components/ListItem';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function Home() {
  const session = await auth();

  if (!session) {
    return (
      <main>
        <h1>hello</h1>
      </main>
    );
  }

  const lists = await prisma.list.findMany({
    where: {
      favorite: true,
      creatorId: session.user.id
    },
    include: {
      items: {
        include: {
          creator: {
            select: {
              name: true
            }
          }
        }
      }
    }
  });

  return (
    <main>
      <section className="px-2">
        <h2 className="text-4xl">Favorites</h2>
        {lists.length > 0 && (
          <ul className="flex flex-col gap-4 mt-4 max-w-[450px]">
            {lists.map((list) => (
              <SpaceList list={list} key={list.id} />
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
