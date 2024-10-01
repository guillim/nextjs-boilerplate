// clean architecture : port is where you want to put all your repository interfaces, this way you centralize the expectations
import { User, UserProps } from './user.entity';

export interface UserPort {
  createUser: (user: UserProps) => Promise<User>;
  // updateUser: (user: User) => Promise<User>;
  // deleteUser: (id: string) => Promise<boolean>;
  getUserById: (id: string) => Promise<User | undefined>;
  getUserByEmail: (email: string) => Promise<User | undefined>;
}