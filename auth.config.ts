import type { NextAuthConfig } from 'next-auth';
import { GetUser, UpdateUser } from './domain/user/use-case';
import { CreateCompany } from './domain/company/use-case';

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
    async jwt({ token, account, user, trigger }) {
      if (trigger === 'signUp') {
        // we create a company for this user
        const company = await new CreateCompany().createCompany(user.email?.split('@')[0] || `company-${new Date().toUTCString()}`);
        const userObj = await new GetUser().getUserById(user.id as string);
        if(!userObj) throw new Error('user not found')
        await new UpdateUser().linkCompany(userObj, company);
      }
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
    },
  },
  session: {
    strategy: 'jwt'
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;