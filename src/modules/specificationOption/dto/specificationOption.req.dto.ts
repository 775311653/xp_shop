import {QueryOptionsDto} from '@src/dto/query.options.dto';
import {IsInt, IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {Type} from "class-transformer";

export class SpecificationOptionReqDto extends QueryOptionsDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '规格名称',
    example: '容量'
  })
  name: string;


  @IsInt()
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({ description: '规格ID', example: 1 })
  specification_id: number;
}
