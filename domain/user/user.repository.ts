// clean architecture : repository layer is where you want to put all your database logic, this way you could easily change the database without changing the use-case logic
// import { PrismaClient } from '@prisma/client';
import { UserPort } from './user.port';
import { User, UserProps } from './user.entity';
import { prismaClientGlobal } from '@/infra/prisma';

const prisma = prismaClientGlobal;

export class UserRepository implements UserPort {
  async getUserById(id: string): Promise<User | undefined> {
    const userRecord = await prisma.user.findUnique({
      where: { id },
    });

    if (!userRecord) {
      return undefined;
    }

    return new User({
      id: userRecord.id,
      name: userRecord.name,
      email: userRecord.email,
      updatedAt: userRecord.updatedAt,
      createdAt: userRecord.createdAt,
      emailVerified: userRecord.emailVerified,
      image: userRecord.image,
    });
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const userRecord = await prisma.user.findFirst({
      where: { email },
    });

    if (!userRecord) {
      return undefined;
    }

    return new User({
      id: userRecord.id,
      name: userRecord.name,
      email: userRecord.email,
      updatedAt: userRecord.updatedAt,
      createdAt: userRecord.createdAt,
      emailVerified: userRecord.emailVerified,
      image: userRecord.image,
    });
  }

  async createUser(user: Omit<UserProps, 'id' | 'updatedAt' | 'createdAt' | 'emailVerified' | 'image'>): Promise<User> {
    const userRecord = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        updatedAt: new Date(),
      },
    });

    return new User({
      id: userRecord.id,
      name: userRecord.name,
      email: userRecord.email,
      updatedAt: userRecord.updatedAt,
      createdAt: userRecord.createdAt,
      emailVerified: userRecord.emailVerified,
      image: userRecord.image,
    });
  }

}