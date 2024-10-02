import { PrismaClient } from "@prisma/client"

// To improve performance using Prisma ORM, we can set up the Prisma instance to ensure 
// only one instance is created throughout the project and then import it from any 
// file as needed. This approach avoids recreating instances of PrismaClient every time 
// it is used. Finally, we can import the Prisma instance from the auth.ts file configuration.
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
 
export const prismaClientGlobal = globalForPrisma.prisma || new PrismaClient()
 
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prismaClientGlobal