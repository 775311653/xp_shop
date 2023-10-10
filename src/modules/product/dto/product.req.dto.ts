import { QueryOptionsDto } from '@src/dto/query.options.dto';
import {IsDate, IsInt, IsNumber, IsOptional} from 'class-validator';
import {Type} from "class-transformer";

export class ProductReqDto extends QueryOptionsDto {
  @IsInt()
  @IsOptional()
  brand_id: number;

  @IsNumber()
  @IsOptional()
  raw_price: number;

  @IsNumber()
  @IsOptional()
  real_price: number;

  @IsDate()
  @IsOptional()
  @Type(() => Date) // This is to ensure that the input is transformed to a Date object
  maybe_delivery_time_start_at?: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  maybe_delivery_time_end_at?: Date;
}
