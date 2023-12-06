'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { SpaceItemParams } from '../../page';

export default function NotFound() {
  const params = useParams<SpaceItemParams>();

  return (
    <div>
      <h3 className="text-3xl">Oops Your List was not found</h3>

      <div className="flex flex-col gap-2 mt-4">
        <p>
          Go back to{' '}
          <Link href={`/spaces/${params.spaceId}`} className="underline">
            Your Lists
          </Link>{' '}
          or{' '}
          <Link href="/" className="underline">
            Home Page
          </Link>
        </p>
      </div>
    </div>
  );
}
