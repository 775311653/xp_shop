import {QueryOptionsDto} from '@src/dto/query.options.dto';
import {IsOptional, IsString} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class SpecificationReqDto extends QueryOptionsDto {
  @IsString()
  @IsOptional()
  @ApiProperty({description: '规格名称', example: '规格名称'})
  name: string;
}
