// this file is a provider detector that uses the globalThis object to store the different providers that are availble
// based on the environment file .env
// everytime the app starts, it creates an object providersList that stores the different providers that are available
// note that some are mandatory, they are marked optional: false

export const providersList = {
  prisma: {
    name: "Prisma",
    isAvailable: true,
    optional: false,
  },
  googleAuth: {
    name: "Google Auth",
    isAvailable: !!process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_ID !== '',
    optional: false,
  },
  googleAnalytics: {
    name: "Google Analytics",
    isAvailable: process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID !== undefined,
    optional: true,
    id: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || '',
  },
  googleTagManager: {
    name: "Google Tag Manager",
    isAvailable: process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID !== undefined,
    id : process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID || '',
    optional: true,
  },
  landingPage: {
    name: "Landing Page",
    isAvailable: true,
    optional: false,
  },
  stripe: {
    name: "Stripe",
    isAvailable: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY !== undefined,
    optional: true,
  },
  mailgun: {
    name: "Mailgun",
    isAvailable: process.env.MAILGUN_API_KEY !== undefined,
    optional: true,
  },
}