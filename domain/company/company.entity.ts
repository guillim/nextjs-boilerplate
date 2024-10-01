export interface CompanyProps {
  id: string;
  name: string;
  // createdAt: Date;
  updatedAt: Date;
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