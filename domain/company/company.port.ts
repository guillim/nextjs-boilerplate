import { Company } from "./company.entity";

export interface CompanyPort {
  createCompany(name: string): Promise<Company>;

}