import { userAgent } from 'next/server';
// import { AddExpense } from './AddExpense/AddExpense';
import { headers } from 'next/headers';
import { UserAccount } from './UserAccount/UserAccount';
import { auth } from '@/lib/auth';

export async function Nav() {
  const headersList = headers();
  const agent = userAgent({ headers: headersList });
  const deviceType = agent.device.type as 'mobile' | undefined;

  const session = await auth();

  return (
    <nav className="fixed bottom-0 w-full justify-end items-center flex p-2 border">
      {/* TODO move to general place */}
      {/* <AddExpense deviceType={deviceType || 'desktop'} /> */}
      <UserAccount session={session} />
    </nav>
  );
}
