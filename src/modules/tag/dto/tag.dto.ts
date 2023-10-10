import {IsString,} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class TagDto {

  @IsString()
  @ApiProperty({description: '标签名称', example: '标签名称'})
  name: string;
}
