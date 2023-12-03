import Link from 'next/link';
import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function Spaces() {
  const session = await auth();

  const id = session?.user?.id;

  if (!id) {
    redirect('/');
  }

  const spaces = await prisma.space.findMany({
    where: {
      creator: {
        id
      }
    }
  });

  return (
    <main className="flex">
      {spaces.length ? (
        <section>
          <ul className="flex gap-2">
            {spaces.map((sp) => (
              <li
                key={sp.id}
                className="text-xl text-center min-w-[200px] p-2 rounded-lg border"
              >
                <Link href={`/spaces/${sp.id}`} className="block">
                  {sp.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <div>no space was found</div>
      )}
    </main>
  );
}
