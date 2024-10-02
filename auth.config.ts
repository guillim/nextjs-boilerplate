import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  // debug: process.env.NODE_ENV !== "production" ? true : false,
  callbacks: {
    authorized({ auth, request }) {
      // Logged in users are authenticated, otherwise redirect to login page
      return auth && !!auth.user
    },
  },
  session: {
    strategy: 'jwt'
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;