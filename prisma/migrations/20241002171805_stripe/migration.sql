/*
  Warnings:

  - Added the required column `companyId` to the `User` table without a default value. This is not possible if the table is not empty.

*/

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "stripeId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- Insert a default company assigned to all users preexisting in the database
INSERT INTO "Company" ("id", "name") VALUES ('default-company-id', 'Default Company');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "companyId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
