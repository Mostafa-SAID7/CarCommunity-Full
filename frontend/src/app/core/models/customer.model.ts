export interface Customer {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
}

export interface CreateCustomerDto {
  fullName: string;
  email: string;
  phoneNumber: string;
}

export interface UpdateCustomerDto {
  fullName: string;
  email: string;
  phoneNumber: string;
}
