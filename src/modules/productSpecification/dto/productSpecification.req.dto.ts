import {QueryOptionsDto} from '@src/dto/query.options.dto';
import {IsInt, IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class ProductSpecificationReqDto extends QueryOptionsDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '规格名称',
    example: '容量'
  })
  name: string;

  @IsInt()
  @IsOptional()
  @ApiProperty({description: '产品ID', example: 1})
  product_id: number;
}
