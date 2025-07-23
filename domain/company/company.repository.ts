import { prismaClientGlobal } from '@/infra/prisma';
import { Company, CreditTransactionProps, TransactionProps } from './company.entity';
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
      creditBalance: company.creditBalance,
      createdAt: company.createdAt,
      updatedAt: company.updatedAt,
    })
  }

  async registerTransaction(transactionDetails: TransactionProps): Promise<void> {
    if(!transactionDetails.companyId) throw new Error('Company id is required')
    await prismaClientGlobal.paymentTransaction.create({
      data: {
        companyId: transactionDetails.companyId,
        // @ts-expect-error can't figure type of raw
        raw: transactionDetails.raw,
        createdAt: new Date(),
        updatedAt: new Date(),
        creditTransactionId: transactionDetails.creditTransactionId,
      }
    });
  }

  async updateCredits(creditTransactionDetails: CreditTransactionProps, transactionDetails: TransactionProps): Promise<void> {
    if(!creditTransactionDetails.companyId) throw new Error('Company id is required')
    if(creditTransactionDetails.type === "purchase") {
      const credits = await prismaClientGlobal.$transaction([
        prismaClientGlobal.company.update({
          where: { id: creditTransactionDetails.companyId },
          data: {
            creditBalance: {
              increment: creditTransactionDetails.amount
            }
          }
        }),
        prismaClientGlobal.creditTransaction.create({
          data: {
            companyId: creditTransactionDetails.companyId,
            amount: creditTransactionDetails.amount,
            type: creditTransactionDetails.type,
            reference: creditTransactionDetails.reference || null,
            createdAt: new Date(),
            updatedAt: new Date(),
          }
        }),

      ])

      const creditTransaction = credits[1];

      await this.registerTransaction({
        companyId: transactionDetails.companyId,
        amount: transactionDetails.amount,
        raw: transactionDetails.raw,
        creditTransactionId: creditTransaction.id,
      });
    }
  }

  async verifyPayment(paymentId: string, companyId: string): Promise<boolean> {
    if(!companyId) throw new Error('Company id is required')
    const payment = await prismaClientGlobal.paymentTransaction.findFirst({
      where: {
        companyId: companyId,
        raw: {
          path: ["payment_id"],
          equals: paymentId
        }
      }
    });

    console.log("payment id", paymentId, ", Payment found:", payment);

    return payment ? true : false;
  }

  async getCredits(companyId: string): Promise<number> {
    if(!companyId) throw new Error('Company id is required')
    const company = await prismaClientGlobal.company.findFirst({
      where: {
        id: companyId,
      }
    });

    if(!company) throw new Error('Company not found')

    return company.creditBalance || 0;
  }
}
