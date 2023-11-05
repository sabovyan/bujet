import { userAgent } from 'next/server';
import { AddExpense } from './AddExpense/AddExpense';
import { headers } from 'next/headers';

export function Nav() {
  const headersList = headers();
  const agent = userAgent({ headers: headersList });
  const deviceType = agent.device.type as 'mobile' | undefined;

  return (
    <nav className="fixed bottom-0 w-full flex justify-center ps-2 pe-2 bg-primary">
      <AddExpense deviceType={deviceType || 'desktop'} />
    </nav>
  );
}
