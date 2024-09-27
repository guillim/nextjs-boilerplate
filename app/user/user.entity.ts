export interface UserProps {
  id: string;
  name: string;
  email: string;
  password: string;
  // createdAt: Date;
  updatedAt: Date;
}

export class User {
  public props: UserProps;

  constructor(props: UserProps) {
    this.props = { ...props };
  }

  id() {
    return this.props.id;
  }


}