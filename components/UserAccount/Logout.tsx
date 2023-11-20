import { signOutAction } from '@/app/actions/auth.actions';
import { Button } from '../ui/button';

export function Logout() {
  return (
    <form action={signOutAction} className="w-full">
      <Button variant="ghost" className="w-full font-bold">
        Log Out
      </Button>
    </form>
  );
}
