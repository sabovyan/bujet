// import NextAuth from 'next-auth';
// import { authConfig } from './services/auth/auth.config';

// export default NextAuth(authConfig).auth;

export { auth as middleware } from '@/lib/auth';

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
};
