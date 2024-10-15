import { prismaClientGlobal } from '@/infra/prisma';
import { Company, TransactionProps } from './company.entity';
import { CompanyPort } from './company.port';

export class CompanyRepository implements CompanyPort {
  async createCompany(name : string): Promise<Company> {
    // use the prisma code here
    const company = await prismaClientGlobal.company.create({
      data: {
        name: name,
      }
    });
    return await this.getCompany(company.id)
  }

  async getCompany(id: string): Promise<Company> {
    const company = await prismaClientGlobal.company.findFirst(
      {
        where: {
          id: id,
        }
      })
    if(!company) throw new Error('company not found')
    return new Company({
      id: company.id,
      name: company.name,
      createdAt: company.createdAt,
      updatedAt: company.updatedAt,
    })
  }

  async registerTransaction(transactionDetails: TransactionProps): Promise<void> {
    if(!transactionDetails.companyId) throw new Error('Company id is required')
    await prismaClientGlobal.paymentTransaction.create({
      data: {
        companyId: transactionDetails.companyId,
        raw: JSON.stringify(transactionDetails),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    });
  }
}
