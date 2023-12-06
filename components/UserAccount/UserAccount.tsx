'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Session } from 'next-auth';

import { GoogleSignIn, Logout, WebAuthn } from './AuthComponents';
import profileImage from './profile-user.png';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem
} from '../ui/dropdown-menu';

type Props = {
  session: Session | null;
};

export function UserAccount({ session }: Props) {
  const imageSrc = session?.user?.image || profileImage;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Image
            src={imageSrc}
            alt="profile image"
            width={32}
            height={32}
            className="rounded-full"
          />
        </Button>
      </DropdownMenuTrigger>
      {session?.user ? (
        <DropdownMenuContent>
          <DropdownMenuLabel>
            <Link href="/">{session.user.name}</Link>
          </DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link href="/spaces">Spaces</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Logout />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      ) : (
        <DropdownMenuContent>
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <GoogleSignIn />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <WebAuthn />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
