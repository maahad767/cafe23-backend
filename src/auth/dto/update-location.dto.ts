import { IsEnum, IsNumber, IsOptional, Max, Min } from 'class-validator';

export class UpdateLocationDto {
  @IsEnum(['Mohakhali-Main', 'Mohakhali-New', 'Mirpur-DOHS'], {
    message:
      'branch must be one of the following values: Mohakhali-Main, Mohakhali-New, Mirpur-DOHS',
  })
  branch: string;

  @Max(10)
  @Min(1)
  @IsNumber()
  floor: number;

  @IsOptional()
  @IsNumber()
  room: number;
}
