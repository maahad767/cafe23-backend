import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { UpdateLocationDto } from 'src/auth/dto';

export class OfficeDto extends UpdateLocationDto {}

export class BookLunchDto {
  @IsDateString()
  date: Date;

  @IsOptional()
  @IsEnum(['DELICIOUS', 'DIET', 'OFF'])
  lunch_option: string;

  @IsOptional()
  @IsNumber()
  guests: number;

  @IsOptional()
  @Type(() => OfficeDto)
  @ValidateNested()
  office: OfficeDto;
}
