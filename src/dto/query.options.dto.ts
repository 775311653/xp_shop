import { ApiPropertyOptional } from '@nestjs/swagger';
import {IsNumber, IsOptional} from 'class-validator';

export class QueryOptionsDto {
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({required: false, description: 'id'})
  id: number;

  @ApiPropertyOptional({ required: false, description: '一页显示多少条' })
  @IsOptional()
  readonly pageSize?: number;

  @ApiPropertyOptional({ required: false, description: '当前页' })
  @IsOptional()
  readonly pageNumber?: number;
}
