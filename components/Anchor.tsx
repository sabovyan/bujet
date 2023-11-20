import { RouteType } from 'next/dist/lib/load-custom-routes';
import Link, { LinkProps } from 'next/link';
import { PropsWithChildren } from 'react';

export function Anchor(props: PropsWithChildren<LinkProps<RouteType>>) {
  return <Link {...props} className="border px-4 py-2 text-lg" />;
}
