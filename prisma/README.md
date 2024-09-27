# Prisma shortcuts

If you are new to Primsa, here are a few commands to get you started.

### Invoke Prisma

No need to install it globally on your machine. Just use `npx` to invoke it. For instance :

```bash
npx prisma version
```

All commands are available in the [Prisma documentation](https://www.prisma.io/docs/orm/reference/prisma-cli-reference).

### Schema / Models

- At first, we want to run `npx prisma migrate dev --name init` to creates SQL migration & run this migration file. It will init your Postgres database. You may sometimes need to run `npx prisma generate` for the prisma client.

- We already created basics in the directory called `prisma`. Check out the file called `schema.prisma`, which contains your models. This is where you can define your database tables, and update it.

#### Update the schema / models / Postgres Tables

If you happen to update the schema, you can run the following command to update the database tables:

```bash
npx prisma migrate dev
```
