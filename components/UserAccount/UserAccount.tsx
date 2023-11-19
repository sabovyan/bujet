import { RouteType } from 'next/dist/lib/load-custom-routes';
import Link, { LinkProps } from 'next/link';
import React from 'react';

function ALink(props: LinkProps<RouteType>) {
  return <Link {...props} className="border px-4 py-2 text-lg" />;
}

export function UserAccount() {
  return (
    <div className="flex gap-4">
      <ALink href="/sign-in">Sign In</ALink>
      <ALink href="/sign-up">Sign Up</ALink>
    </div>
  );
}
