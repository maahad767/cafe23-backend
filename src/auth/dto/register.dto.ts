import {
  IsStrongPassword,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  IsEnum,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?:B|b)(?:S|s)\d{4,}$/, { message: 'Invalid BSID' })
  bsId: string;

  @IsNotEmpty()
  @IsEmail()
  @Matches(/^(?:\w|\w\.\w)+@brainstation-23.com$/, {
    message: 'Email must be brainstation-23 official email.',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string;

  @IsString()
  name: string;

  @IsString()
  @Matches(/^(?:\+?88)?01[3-9][0-9]{8}$/, {
    message: 'Invalid phone(BD) number',
  })
  phone: string;

  @IsEnum(['EMPLOYEE', 'SUPPORT', 'ADMIN'], {
    message: "Invalid role, must be one of ['EMPLOYEE', 'SUPPORT', 'ADMIN']",
  })
  @IsString()
  role: string;
}
