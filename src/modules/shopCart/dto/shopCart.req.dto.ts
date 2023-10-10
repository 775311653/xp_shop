import {QueryOptionsDto} from '@src/dto/query.options.dto';
import {IsInt, IsNotEmpty, IsOptional} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";
import {Type} from "class-transformer";

export class ShopCartReqDto extends QueryOptionsDto {
  @IsNotEmpty()
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({description: '用户ID', example: 1})
  user_id: number;
}
