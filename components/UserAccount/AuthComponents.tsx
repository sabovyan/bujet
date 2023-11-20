import { goolgeSignInAction, signOutAction } from '@/app/actions/auth.actions';
import { Button } from '@/components/ui/button';

export function GoogleSignIn() {
  return (
    <main>
      <form action={goolgeSignInAction}>
        {/* TODO add icon*/}
        <Button variant="ghost">Sign In With Google</Button>
      </form>
    </main>
  );
}

export function Logout() {
  return (
    <form action={signOutAction} className="w-full">
      <Button variant="ghost" className="w-full font-bold">
        Log Out
      </Button>
    </form>
  );
}
