import { Company, TransactionProps } from './company.entity';
import { CompanyRepository } from './company.repository';

export class CreateCompany {
  async createCompany(name: string): Promise<Company> {
    const newCompany = await new CompanyRepository().createCompany(name);
    return newCompany;
  }
}

export class RegisterTransaction {
  async registerTransaction(transactionDetails: TransactionProps): Promise<void> {
    await new CompanyRepository().registerTransaction(transactionDetails);
  }
}