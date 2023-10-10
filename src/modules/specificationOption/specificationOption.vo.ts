import { QueryVo } from '@src/vo/query.vo';
import { QueryListVo } from '@src/vo/query.list.vo';
import { ApiProperty } from '@nestjs/swagger';
import {SpecificationVo} from "@src/modules/specification/specification.vo";

export class SpecificationOptionVo extends QueryVo {

  @ApiProperty({ description: '规格配置', type: String})
  value: string;  // 如“65ml”、“100ml”

  @ApiProperty({description: '规格', type: SpecificationVo})
  specification: SpecificationVo;
}

export class SpecificationOptionListVo extends QueryListVo {
  @ApiProperty({ description: '返回数据列表', type: SpecificationOptionVo, isArray: true })
  data: SpecificationOptionVo[];
}
