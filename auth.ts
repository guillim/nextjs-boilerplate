import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Google from "next-auth/providers/google"
import { prismaClientGlobal } from './infra/prisma';
 
export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [Google],
  adapter: PrismaAdapter(prismaClientGlobal),
});