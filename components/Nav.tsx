import { headers } from 'next/headers';
import { userAgent } from 'next/server';

import { auth } from '@/lib/auth';

// import { AddExpense } from './AddExpense/AddExpense';
import { UserAccount } from './UserAccount/UserAccount';

export async function Nav() {
  const headersList = headers();
  const agent = userAgent({ headers: headersList });
  const deviceType = agent.device.type as 'mobile' | undefined;

  const session = await auth();

  return (
    <nav className="fixed bottom-0 w-full justify-end items-center flex px-4 py-2 border gap-3">
      {/* TODO move to general place */}
      {/* <AddExpense deviceType={deviceType || 'desktop'} /> */}

      <UserAccount session={session} />
    </nav>
  );
}
