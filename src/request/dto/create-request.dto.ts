import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';

export class CreateRequestDto {
  @IsNotEmpty()
  @IsString()
  requestType: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  quantity: number;
}
