import { PropsWithChildren } from 'react';

import Link from 'next/link';

export default async function Spaces({ children }: PropsWithChildren) {
  return (
    <main>
      <header className="mb-8 flex gap-4">
        <h2 className="text-2xl underline">
          <Link href={`/spaces`}>Your Spaces</Link>
        </h2>

        <Link
          href={`/spaces/add`}
          className="text-xl text-center border rounded-lg min-w-[50px]"
        >
          +
        </Link>
      </header>
      {children}
    </main>
  );
}
