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
    jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token
        token.id = user?.id
      }
      return token
    },
    session({ session, token }) {
      // addding the user id from the database in order to use it in the app
      session.user = {
        ...session.user,
        id: token.id as string
      }
      return session
    }
  },
  session: {
    strategy: 'jwt'
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;