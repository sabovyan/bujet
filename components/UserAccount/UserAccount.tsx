import { auth } from '@/lib/auth';
import { Button } from '../ui/button';
import Image from 'next/image';
import { Anchor } from '../Anchor';

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
