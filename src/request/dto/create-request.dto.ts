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

export class Address {
  @IsNotEmpty()
  @IsString()
  branch: string;

  @IsNotEmpty()
  @IsString()
  floor: string;

  @IsNotEmpty()
  @IsString()
  room: string;
}

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
  @Type(() => Address)
  address: Address;
}
