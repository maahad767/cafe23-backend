import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

export class UpdateDto {
  @IsEnum(['Served', 'Cancelled'], {
    message: "Invalid status, must be one of ['Served', 'Cancelled']",
  })
  @IsNotEmpty()
  @IsString()
  status: string;
}
