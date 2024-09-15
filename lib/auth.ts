import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

import { prisma } from '@/lib/prisma';

declare module '../node_modules/.pnpm/@auth+core@0.0.0-manual.e9863699/node_modules/@auth/core/types.d.ts' {
  // eslint-disable-next-line
  interface Session {
    user: {
      id: string;
    } & DefaultSession['user'];
  }
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  // pages: {
  //   signIn: '/login',
  //   error: '/auth/error'
  // },
  providers: [Google],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session: ({ session, user }) => {
      return { ...session, user };
    }
  }
});
