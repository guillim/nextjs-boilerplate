// import { PrismaClient } from '@prisma/client';
import { customers, users } from '../lib/placeholder-data';
import { prismaClientGlobal } from '@/infra/prisma';

const prisma = prismaClientGlobal

export async function seedUsers() {
  try {
    await prisma.user.createMany({
      data: users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password, // You should hash the password before inserting
      })),
    });
    console.log('Seeded users');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
}

export async function seedCustomers() {
  try {
    await prisma.customer.createMany({
      data: customers.map(customer => ({
        id: customer.id,
        name: customer.name,
        email: customer.email,
        imageUrl: customer.image_url,
      })),
    });
    console.log('Seeded customers');
  } catch (error) {
    console.error('Error seeding customers:', error);
  }
}

export async function GET() {
  try {
    await seedUsers();
    await seedCustomers();

    return new Response(JSON.stringify({ message: 'Database seeded successfully with users and customers' }), { status: 200 });
  } catch (error) {
    console.error('Error during seeding:', error);
    return new Response(JSON.stringify({ error }), { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}