import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h3 className="text-3xl">Oops Your Space was not found</h3>

      <div className="flex flex-col gap-2 mt-4">
        <p>
          Go back to{' '}
          <Link href="/spaces" className="underline">
            Your Spaces
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
