
export default class User {
  id!: number;

  fullName!: string;

  email!: string;

  role!: number;

  phone!: string;

  notes!: string;

  lastLogin!: Date;

  schoolId!: number;

  showAgreement!: boolean;

  plusId!: string;

  manager!: User;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
