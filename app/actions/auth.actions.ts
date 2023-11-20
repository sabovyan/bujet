'use server';

import { signIn, signOut } from '@/lib/auth';

export async function goolgeSignInAction() {
  await signIn('google');
}

export async function signOutAction() {
  return signOut();
}
