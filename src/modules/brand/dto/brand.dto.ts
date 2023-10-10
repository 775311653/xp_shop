import {IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class BrandDto {
  @IsString()
  @ApiProperty({description: '品牌名称', example: '品牌名称'})
  name: string;
}
