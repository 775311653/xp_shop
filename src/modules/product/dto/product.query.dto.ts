import {IsString, IsOptional, IsInt, IsArray, IsNumber, IsDate} from 'class-validator';
import {Transform, Type} from 'class-transformer';
import {ApiProperty, ApiPropertyOptional, IntersectionType, PartialType, PickType} from '@nestjs/swagger';
import {ProductDTO} from "@src/modules/product/dto/product.dto";
import {QueryOptionsDto} from "@src/dto/query.options.dto";

class BaseQueryProductDTO extends PartialType(PickType(ProductDTO,
  ['brand_id',
    'raw_price',
    'tag_ids',
  ])) {

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({required: false, description: '真实价格排序', example: 'ASC', enum: ['ASC', 'DESC']})
  real_price_sort: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({required: false, description: '产品名称'})
  product_name: string;

}

// 需要再整合QueryOptionsDto里面的内容
export class QueryProductDTO extends IntersectionType(BaseQueryProductDTO, QueryOptionsDto) {
}
