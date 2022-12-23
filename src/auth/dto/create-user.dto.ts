import { Office } from '../schemas';

export class CreateUserDto {
  email: string;
  name: string;
  phone: string;
  bsId: string;
  role: string;
}
