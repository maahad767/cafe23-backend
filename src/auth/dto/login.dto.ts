import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?:B|b)(?:S|s)\d{4,}$/, { message: 'Invalid BSID' })
  bsId: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
