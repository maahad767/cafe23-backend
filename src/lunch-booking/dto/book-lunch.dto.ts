import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { UpdateLocationDto } from 'src/auth/dto';

export class OfficeDto extends UpdateLocationDto {}

export class BookLunchDto {
  @IsDateString()
  date: Date;

  @IsEnum(['DELICIOUS', 'DIET', 'OFF'])
  lunch_option: string;

  @IsNumber()
  guests: number;

  @IsNotEmptyObject()
  @Type(() => OfficeDto)
  @ValidateNested()
  office: OfficeDto;
}
