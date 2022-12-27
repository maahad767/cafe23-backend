import { Office } from '../schemas';

export class CreateUserDto {
  email: string;
  name: string;
  phone: string;
  bsid: string;
  role: string;
}
