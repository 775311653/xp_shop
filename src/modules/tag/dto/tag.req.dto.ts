import {QueryOptionsDto} from '@src/dto/query.options.dto';
import {IsOptional, IsString} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class TagReqDto extends QueryOptionsDto {
  @IsString()
  @IsOptional()
  @ApiProperty({description: '标签名称', example: '标签名称'})
  name: string;
}
