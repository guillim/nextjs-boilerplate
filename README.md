# NextJS Boilerplate for SoloPreneurs

Starter Kit to build SaaS, webapp, AI tool... with all you need to `earn $ in 1 day`.

### Main Features

- ☀️ Free
- 👁️ Landing page
- 🔑 Google SSO (NextAuth)
- 💰 Stripe for payments + Charts ⏳
- 📂 Postgres with Prisma 
- 📈 Google Analytics
- 📧 Mailgun ⏳
- 📦 SEO ⏳
- 📝 Blog ⏳
- 📚 Documentation ⏳
- 🫂 Customer support ⏳
- 📱 Responsive
- 🍾 Referal program ⏳
- 🛠️ Customizable

⏳: Coming soon

### Why

As a solo founder, you need to focus on your product, not the stupid integrations with Stripe, Database, Auth... This boilerplate is designed to help you bypass this and build and publish your product in a day.

As calculated by Marc Lou, the great inspiration for this project, the time saved is huge: **22 hours**

- 4 hrs to set up emails
- 6 hrs designing a landing page
- 4 hrs to handle Stripe webhooks
- 2 hrs for SEO tags
- 1 hr applying for Google Oauth
- 3 hrs for DNS records
- 2 hrs for protected API routes
- ∞ hrs researching...

### Pricing

Forever **Free**

But if you want to support the project, you can [buy me a coffee ☕️](https://patreon.com/guillim).

### Costs

I tried to reduce the costs to `0 $` so that you can iterate on 10 products without ruining yourself !

### Tech Stack

It's all Typescript
It's the App Router type of Next.js project
It uses Postgres, hosted on Neon for the database, but you can change it if you want.
It's documented to guide you through the process of customizing it.
It's React for the frontend, with TailwindCSS for the design.
It's going to be hosted on Vercel, but you can change it if you want.
It will be automatically deployed on git push, no worries about that, focus on code.

#### VScode

We recommend using VScode for the project, as it's the most popular editor for web development.
ESlint is automatic on save to get a better developer experience.

#### Github Repository

To host your code on Github, please follow this [guide](https://help.github.com/en/github/getting-started-with-github/create-a-repo).

#### Vercel

Visit [vercel](https://vercel.com/signup) to create an account. Choose the free "hobby" plan. Select Continue with GitHub to connect your GitHub and Vercel accounts. Read [this page](https://nextjs.org/learn/dashboard-app/setting-up-your-database) if you are stuck

#### Neon

We do not chose Vercel Postgresql because it's not free. Neon is a great alternative, and it's free. Visit [supabase](https://neon.tech/) to create an account. Choose the free plan. Read [this page](https://neon.tech/docs/guides/nextjs)

We user [Prisma](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgresql) to connect to the database. Very useful to be error-proof.

More info in our [prisma/README.md file](prisma/README.md)

#### Landing Page
Once you run the project, you can access the landing page at `http://localhost:3000/landing-page`
Feel free to customize it as you want (folder `/landing-page`).

#### Auth
Google Auth is already set up. To use it. please follow this [guide](https://authjs.dev/getting-started/authentication/oauth) TLDR, it begins with creating a project on the [Google Cloud Platform](https://console.cloud.google.com/apis/credentials).  

We recommend reading [NextAuth](https://next-auth.js.org/getting-started/introduction) for other easy ways to authenticate users (google, twitter, github...)

#### Stripe
We use Stripe for payments. Please create an account here [Stripe](https://stripe.com/).
To make things simpler, Stripe is related to a company, not a user here. So, for every user, a company is automatically created. 

For setup, read this [Stripe Tutorial](https://medium.com/@rakeshdhariwal61/integrating-stripe-payment-gateway-in-next-js-14-a-step-by-step-guide-1bd17d164c2c). Use [the Stripe test card](https://docs.stripe.com/testing) for testing.

Here, you simply need to add this button to make the payment work (change for the correct priceId):
```react
<SubscribeComponent 
        priceId="price_1Q6U4ZP9VWutz4pQA1UC2ilX" 
        price="10" 
        description="Basic Plan" />
```

#### Google Analytics
We use Google Analytics to track the users. Please create an account here [Google Analytics](https://analytics.google.com/). Then add your id in the .env file


### Thanks

It's based on the Next.js (App Router) starter template.
For customisation, see the [course](https://nextjs.org/learn) on the Next.js Website.
