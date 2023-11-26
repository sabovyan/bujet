import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function Groups() {
  const session = await auth();

  const email = session?.user?.email;

  if (!email) {
    redirect('/');
  }

  const user = await prisma.user.findUnique({
    where: {
      email
    },
    include: {
      spaces: true
    }
  });

  if (!user) {
    // TODO handle it - either redirect it to sign it page or show not sign in view
    throw new Error('handle it');
  }

  return (
    <main>
      <header>
        <h2>Your Space Management</h2>
      </header>
      {user.spaces.length ? (
        <div>your spaces</div>
      ) : (
        <div>no space was found</div>
      )}
    </main>
  );
}
