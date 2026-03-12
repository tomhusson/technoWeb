export class CreateCustomerDto {
  firstName: string;
  lastName: string;
  email?: string;
  photoUrl?: string;
}

export class UpdateCustomerDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  photoUrl?: string;
}