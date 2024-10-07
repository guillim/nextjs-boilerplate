import { Company } from './company.entity';
import { CompanyPort } from './company.port';
import { CreateCompany } from './use-case';

export class CompanyRepository implements CompanyPort {
  async createCompany(name : string): Promise<Company> {
    const company = new CreateCompany().createCompany(name);
    return company
  }
}