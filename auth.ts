import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { prismaClientGlobal } from './infra/prisma';
 
export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Google,
    Credentials({
      name: 'Impersonate',
      credentials: {
        email: { label: "Email", type: "email" },
        id: { label: "User ID", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.id) {
          return null;
        }

        const user = await prismaClientGlobal.user.findUnique({
          where: { 
            id: credentials.id as string,
            email: credentials.email as string
          },
        });

        return user;
      },
    }),
  ],
  adapter: PrismaAdapter(prismaClientGlobal),
});