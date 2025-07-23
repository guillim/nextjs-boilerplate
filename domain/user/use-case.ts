// clean architecture : use-case layer is where you want to put all your logic, because it will be easily testable and maintanalbe
import { Company, CompanyProps } from '../company/company.entity';
import { CreateCompany } from '../company/use-case';
import { User, UserProps } from './user.entity';
import { UserRepository } from './user.repository';

export class GetUser {
  async getUserById(id: string): Promise<User | undefined> {
    const user = await new UserRepository().getUserById(id);
    return user;
  }
}

export class CreateUser {
  async createUser(user: Omit<UserProps, 'id' | 'updatedAt' | 'createdAt' | 'emailVerified' | 'image'>): Promise<User> {
    // check if the user already exists
    const userFound = await new UserRepository().getUserByEmail(user.email);
    if (userFound) {
      throw new Error('User already exists');
    }
    // before we create the user, let's create its company
    const company = await new CreateCompany().createCompany(user.email.split('@')[0]);
    const newUser = await new UserRepository().createUser(user);
    const newUserUpdated = await new UpdateUser().linkCompany(newUser, company);
    return newUserUpdated;
  }
}

// use case to find a user by email
export class GetUserByEmail {
  async getUserByEmail(email: string): Promise<User | undefined> {
    const user = await new UserRepository().getUserByEmail(email);
    return user;
  }
}

export class GetUserCompany {
  async getUserCompany(userId: string): Promise<CompanyProps | undefined> {
    const company = await new UserRepository().getUserCompany(userId);

    console.log("User's company found:", company);
    return company;

  }
}

export class UpdateUser {
  async linkCompany(user: User, company: Company): Promise<User> {
    const newUserProps = { ...user.props, companyId: company.id() };
    const updatedUser = await new UserRepository().updateUser(user, newUserProps);
    return updatedUser;
  }
}