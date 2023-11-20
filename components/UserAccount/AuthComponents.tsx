import Image from 'next/image';

import { goolgeSignInAction, signOutAction } from '@/app/actions/auth.actions';
import { Button } from '@/components/ui/button';
import { GoogleIcon } from './GoogleSvg';
import fingerPrint from './fingerprint.png';

export function GoogleSignIn() {
  return (
    <form action={goolgeSignInAction}>
      <Button variant="ghost" className="flex gap-4 align-middle">
        <GoogleIcon />
        Sign In With Google
      </Button>
    </form>
  );
}

export function WebAuthn() {
  return (
    <Button
      variant="ghost"
      className="flex gap-4 align-middle italic opacity-25"
    >
      <Image src={fingerPrint} alt="finger print icon" width={16} height={16} />
      Web Authn comming soon
    </Button>
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
