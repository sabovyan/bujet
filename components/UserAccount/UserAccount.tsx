'use client';

import { Session } from 'next-auth';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem
} from '../ui/dropdown-menu';
import { GoogleSignIn } from '../ui/UserMenagement';
import { Logout } from './Logout';

type Props = {
  session: Session | null;
};

export function UserAccount({ session }: Props) {
  const imageSrc = session?.user?.image || '/profile-user.png';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image
          src={imageSrc}
          alt="profile image"
          width={24}
          height={24}
          className="rounded-full"
        />
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
              <p className="text-lg">Web Authn comming soon</p>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
