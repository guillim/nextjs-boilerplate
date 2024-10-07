import { Company } from './company.entity';
import { CompanyRepository } from './company.repository';

export class CreateCompany {
  async createCompany(name: string): Promise<Company> {
    const newCompany = await new CompanyRepository().createCompany(name);
    return newCompany;
  }
}