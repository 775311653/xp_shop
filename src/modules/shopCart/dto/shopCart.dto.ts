import {IsInt, IsNotEmpty,} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class ShopCartDto {

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({description: '用户ID', example: 1})
  user_id: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({description: '商品ID', example: 1})
  product_id: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({description: '商品规格ID', example: 1})
  product_specification_id: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({description: '商品数量', example: 1})
  count: number;
}
