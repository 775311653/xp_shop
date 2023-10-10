import {IsString,} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class SpecificationDto {

  @IsString()
  @ApiProperty({description: '规格名称', example: '规格名称'})
  name: string;
}
