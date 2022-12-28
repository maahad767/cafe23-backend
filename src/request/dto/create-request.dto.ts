import {
  IsNotEmpty,
  IsString,
  IsInt,
  Min,
  ValidateNested,
  IsDefined,
  IsNotEmptyObject,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateLocationDto } from '../../auth/dto';

export class CreateRequestDto {
  @IsNotEmpty()
  @IsString()
  requestType: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  quantity: number;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => UpdateLocationDto)
  address: UpdateLocationDto;
}
