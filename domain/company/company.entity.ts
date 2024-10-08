export interface CompanyProps {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

interface CustomerDetails {
  address?: {
    city: string | null;
    country: string;
    line1: string | null;
    line2: string | null;
    postal_code: string | null;
    state: string | null;
  };
  email?: string;
  name?: string;
  phone?: string | null;
  tax_exempt?: string;
  tax_ids?: string[];
}

export interface TransactionProps {
    userId?: string;
    companyId?: string;
    priceId?: string;
    created: number;
    currency: string;
    customerDetails?: CustomerDetails;
    amount: number;
  }

export class Company {
  public props: CompanyProps;

  constructor(props: CompanyProps) {
    this.props = { ...props };
  }

  id() {
    return this.props.id;
  }

}