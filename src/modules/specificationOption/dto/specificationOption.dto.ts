import {IsInt, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class SpecificationOptionDto {
  @IsString()
  @ApiProperty({
    description: '规格配置值',
    example: '65ml',
  })
  value: string;

  @IsInt()
  @ApiProperty({ description: '规格ID', example: 1 })
  specification_id: number;
}
