import { IsDefined, IsEmail } from 'class-validator';

export class CreateEmployeeDto {
  first_name: string;
  last_name: string;

  @IsEmail()
  @IsDefined()
  email: string;

  phoneNumber: number;
}
