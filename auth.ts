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
      name: 'Impersonate (Admin only)',
      credentials: {
        email: { label: "Email", type: "email" },
        id: { label: "User ID", type: "text" },
        adminToken: { label: "Admin Token", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.id) {
          return null;
        }

        // Require an internal admin token to prevent direct credential attacks
        // Only the /api/impersonate route (which checks admin session) can supply this token
        const INTERNAL_ADMIN_TOKEN = process.env.INTERNAL_ADMIN_TOKEN;
        if (!INTERNAL_ADMIN_TOKEN || credentials.adminToken !== INTERNAL_ADMIN_TOKEN) {
          console.error('Unauthorized credential auth attempt blocked');
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