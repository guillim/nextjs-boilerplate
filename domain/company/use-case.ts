import { Company, CreditTransactionProps, TransactionProps } from './company.entity';
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

export class CreditTransaction {
  async updateCredits(creditTransactioDetails: CreditTransactionProps, transactionDetails: TransactionProps): Promise<void> {
    await new CompanyRepository().updateCredits(creditTransactioDetails, transactionDetails);
  }
}

export class VerifyTransaction {
  async verifyPayment(paymentId: string, companyId: string): Promise<boolean> {
    const isPaymentUsed = await new CompanyRepository().verifyPayment(paymentId, companyId);

    return isPaymentUsed;
  }
}

export class Credits {
  async getCredits(companyId: string): Promise<number> {
    const credits = await new CompanyRepository().getCredits(companyId);
    return credits;
  }
}