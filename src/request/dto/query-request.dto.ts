import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

export class RequestQueryDto {
  @IsEnum(['All', 'Requested', 'Served', 'Cancelled'], {
    message:
      "Invalid status, must be one of ['All','Requested', 'Served', 'Cancelled']",
  })
  @IsNotEmpty()
  @IsString()
  readonly status: string;

  @IsNotEmpty()
  @IsString()
  readonly limit: string;

  @IsNotEmpty()
  @IsString()
  readonly skip: string;
}
