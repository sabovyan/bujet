'use client';

import { FormEvent, useEffect, useState } from 'react';
import { supported, create } from '@github/webauthn-json';

import { FormField } from '@/components/formField';
import { Button } from '@/components/ui/button';
import { singupAction } from '../actions/signup.action';
import { object, z } from 'zod';

const schema = z.object({
  userName: z.string(),
  email: z.string().email()
});

export function SignUpForm({ challenge }: { challenge: string }) {
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget as HTMLFormElement);

    const data = Object.fromEntries(formData);

    try {
      const { email, userName } = schema.parse(data);

      const credential = await create({
        publicKey: {
          challenge: challenge,
          rp: {
            // Change these later
            name: 'dev',
            id: 'localhost'
          },
          user: {
            // Maybe change these later
            id: window.crypto.randomUUID(),
            name: email,
            displayName: userName
          },
          // Don't change these later
          pubKeyCredParams: [{ alg: -7, type: 'public-key' }],
          // timeout: 60000,
          attestation: 'direct',
          authenticatorSelection: {
            residentKey: 'required',
            userVerification: 'required'
          }
        }
      });
      // Call our registration endpoint with the new account details
      // const result = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   body: JSON.stringify({ email, username, credential }),
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // });
      // // Redirect to the admin page or render errors
      // if (result.ok) {
      //   router.push('/admin');
      // } else {
      //   const { message } = await result.json();
      //   setError(message);
      // }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const checkAvailability = async () => {
      // const available =
      //   await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
      setIsAvailable(supported());
    };
    checkAvailability();
  }, []);

  return isAvailable === false ? (
    <p>Oops!</p>
  ) : (
    <form onSubmit={handleFormSubmit}>
      <FormField type="text" name="userName" label="Name" />
      <FormField type="email" name="email" label="Email" />
      {/* <FormField type="password" name="password" label="Password" /> */}

      <Button>Submit</Button>
    </form>
  );
}
