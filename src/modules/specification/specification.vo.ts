import {QueryVo} from '@src/vo/query.vo';
import {QueryListVo} from '@src/vo/query.list.vo';
import {ApiProperty} from '@nestjs/swagger';

export class SpecificationVo extends QueryVo {
  @ApiProperty({description: '标签名称', type: String})
  name: string;
}

export class SpecificationListVo extends QueryListVo {
  @ApiProperty({description: '返回数据列表', type: SpecificationVo, isArray: true})
  data: SpecificationVo[];
}
