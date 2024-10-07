export interface CompanyProps {
  id: string;
  name: string;
  stripeId?: string;
  createdAt: Date;
  updatedAt: Date;
  users?: string[];
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