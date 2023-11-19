import { SignUpForm } from './SignUpForm';
import { generateChallenge } from '@/lib/auth';

export default function SignUp() {
  const challenge = generateChallenge();
  return (
    <main>
      <SignUpForm challenge={challenge} />
    </main>
  );
}
