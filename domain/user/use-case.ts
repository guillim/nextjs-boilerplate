// clean architecture : use-case layer is where you want to put all your logic, because it will be easily testable and maintanalbe
import { User, UserProps } from './user.entity';
import { UserRepository } from './user.repository';

export class GetUser {
  async getUserById(id: string): Promise<User | undefined> {
    const user = await new UserRepository().getUserById(id);
    return user;
  }
}

export class CreateUser {
  async createUser(user: Omit<UserProps, 'id' | 'updatedAt'>): Promise<User> {
    // check if the user already exists
    const userFound = await new UserRepository().getUserByEmail(user.email);
    if (userFound) {
      throw new Error('User already exists');
    }
    const newUser = await new UserRepository().createUser(user);
    return newUser;
  }
}

// use case to find a user by email
export class GetUserByEmail {
  async getUserByEmail(email: string): Promise<User | undefined> {
    const user = await new UserRepository().getUserByEmail(email);
    return user;
  }
}