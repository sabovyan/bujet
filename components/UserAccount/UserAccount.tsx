'use client';

import Image from 'next/image';
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
          <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
          <DropdownMenuGroup>
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
