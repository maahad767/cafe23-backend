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

  @IsEnum(['EMPLOYEE', 'SUPPORT'], {
    message: "Invalid role, must be one of ['EMPLOYEE', 'SUPPORT']",
  })
  @IsString()
  role: string;
}
