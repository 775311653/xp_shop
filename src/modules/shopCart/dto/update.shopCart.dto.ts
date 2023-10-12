import {IsInt, IsNotEmpty, IsOptional,} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";
import {Type} from "class-transformer";

export class UpdateShopCartDto {

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  @ApiProperty({description: '用户ID', example: 1})
  user_id: number;
  //
  // @IsNotEmpty()
  // @IsInt()
  // @Type(() => Number)
  // @ApiProperty({description: '商品ID', example: 1})
  // product_id: number;
  //
  // @IsNotEmpty()
  // @IsInt()
  // @Type(() => Number)
  // @ApiProperty({description: '商品规格ID', example: 1})
  // product_specification_id: number;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  @ApiProperty({description: '商品数量', example: 1})
  count: number;
}
