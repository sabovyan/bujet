import { PropsWithChildren } from 'react';

import { RouteType } from 'next/dist/lib/load-custom-routes';
import Link, { LinkProps } from 'next/link';

export function Anchor(props: PropsWithChildren<LinkProps<RouteType>>) {
  return <Link {...props} className="text-sm w-full" />;
}
