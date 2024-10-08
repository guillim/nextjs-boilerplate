// import { PrismaClient } from '@prisma/client';
import { users } from '../lib/placeholder-data';
import { prismaClientGlobal } from '@/infra/prisma';

const prisma = prismaClientGlobal

async function seedUsers() {
  try {
    await prisma.user.createMany({
      data: users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email
      })),
    });
    console.log('Seeded users');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
}

export async function GET() {
  try {
    await seedUsers();

    return new Response(JSON.stringify({ message: 'Database seeded successfully with users' }), { status: 200 });
  } catch (error) {
    console.error('Error during seeding:', error);
    return new Response(JSON.stringify({ error }), { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}