import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request }) {
      
      // Logged in users are authenticated, otherwise redirect to login page
      return auth && !!auth.user

      // For the record, this is an example of authorization depending on the route:
      // const isLoggedIn = !!auth?.user;
      // const isOnDashboard = request.nextUrl.pathname.startsWith('/dashboard');
      // console.log('authorized ?',isLoggedIn, isOnDashboard);
      // if (isOnDashboard) {
      //   if (isLoggedIn) return true;
      //   return false; // Redirect unauthenticated users to login page
      // } else if (isLoggedIn) {
      //   return Response.redirect(new URL('/dashboard', request.nextUrl));
      // }
      // return true;

    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;