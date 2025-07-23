import { DodoPayment } from "@/app/api/payment/validate_credits/route";
import { InputJsonValue, JsonValue } from "@prisma/client/runtime/library";

export interface CompanyProps {
  id: string;
  name: string;
  creditBalance: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CustomerDetails {
  address?: {
    city?: string | null;
    country?: string;
    line1?: string | null;
    line2?: string | null;
    postal_code?: string | null;
    state?: string | null;
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
  // priceId?: string;
  created?: number;
  currency?: string;
  // customerDetails?: CustomerDetails;
  amount?: number;
  raw?: InputJsonValue | JsonValue | DodoPayment;
  creditTransactionId: string; 
}

export interface CreditTransactionProps {
  /**
   * Company (account) this transaction belongs to.
   */
  companyId: string;

  /**
   * Amount of credits changed:
   * - Positive = credit top-up
   * - Negative = credit usage or deduction
   */
  amount: number;

  /**
   * Type/category of the transaction
   * e.g. 'PURCHASE', 'USAGE', 'ADJUSTMENT', 'INITIAL_SEED', 'REVERSAL'
   */
  type: "purchase" | "usage" | "adjustment" | "initial_seed" | "reversal";

  /**
   * Optional reference ID (e.g. paymentTransactionId, orderId) for traceability.
   */
  reference?: string;

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