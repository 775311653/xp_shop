import {QueryOptionsDto} from '@src/dto/query.options.dto';
import {IsArray, IsDate, IsInt, IsNumber, IsOptional, IsString} from 'class-validator';
import {Transform, Type} from "class-transformer";
import {ApiPropertyOptional} from "@nestjs/swagger";

export class ProductReqDto extends QueryOptionsDto {
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  @ApiPropertyOptional({required: false, description: '品牌id'})
  brand_id: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({required: false, description: '原价'})
  raw_price: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({required: false, description: '实际价格'})
  real_price: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({required: false, description: '真实价格排序', example: 'ASC', enum: ['ASC', 'DESC']})
  real_price_sort: string;

  @IsArray()
  @IsOptional()
  @Type(() => Number)
  @Transform(function ({value}) {
    if (typeof value === 'string' || typeof value === 'number') {
      return [Number(value)];
    }
    return value;
  })
  @ApiPropertyOptional({required: false, description: '标签id数组', example: [1, 2, 3], type: [Number]})
  tag_ids: number[];

  @IsDate()
  @IsOptional()
  @Type(() => Date) // This is to ensure that the input is transformed to a Date object
  maybe_delivery_time_start_at?: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  maybe_delivery_time_end_at?: Date;
}
