import {QueryOptionsDto} from '@src/dto/query.options.dto';
import {IsOptional, IsString} from 'class-validator';


export class BrandReqDto extends QueryOptionsDto {
  @IsString()
  @IsOptional()
  name: number;
}
