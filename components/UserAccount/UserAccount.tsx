import { auth } from '@/lib/auth';
import { RouteType } from 'next/dist/lib/load-custom-routes';
import Link, { LinkProps } from 'next/link';
import React, { PropsWithChildren } from 'react';

function Anchor(props: PropsWithChildren<LinkProps<RouteType>>) {
  return <Link {...props} className="border px-4 py-2 text-lg" />;
}

export async function UserAccount() {
  const session = await auth();

  return !session?.user ? (
    <div className="flex gap-4">
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <Anchor href="/sign-in">Sign In</Anchor>
      <Anchor href="/sign-up">Sign Up</Anchor>
    </div>
  ) : (
    <pre>{JSON.stringify(session.user, null, 2)}</pre>
  );
}
