import {IsArray, IsInt} from "class-validator";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";


export class ProductSpecificationDto {
  @IsInt()
  @ApiProperty({description: '产品id', example: 1})
  product_id: number;

  @IsArray()
  @ApiPropertyOptional({required: false, description: '规格配置id列表', example: [1, 2, 3]})
  specification_option_ids: number[];

  @IsInt()
  @ApiProperty({description: '价格', example: 1})
  price: number;
}
