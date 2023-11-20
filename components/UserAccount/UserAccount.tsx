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
import { GoogleSignIn, Logout } from './AuthComponents';

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
            <DropdownMenuItem className="bg-gray-200 italic bg-secondary text-sm text-gray-950">
              Web Authn comming soon
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
