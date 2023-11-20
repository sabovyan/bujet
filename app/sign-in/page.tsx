import { Button } from '@/components/ui/button';
import { signIn } from '@/lib/auth';

export default function SignIn() {
  return (
    <main>
      <form
        action={async () => {
          'use server';
          await signIn('google');
        }}
      >
        <Button>Sign In</Button>
      </form>
    </main>
  );
}
