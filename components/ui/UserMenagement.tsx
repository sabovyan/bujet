import { goolgeSignInAction } from '@/app/actions/auth.actions';
import { Button } from '@/components/ui/button';

export function GoogleSignIn() {
  return (
    <main>
      <form action={goolgeSignInAction}>
        {/* TODO add icon*/}
        <Button variant="link">Sign In With Google</Button>
      </form>
    </main>
  );
}
