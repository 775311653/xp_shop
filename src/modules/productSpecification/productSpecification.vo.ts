import {QueryVo} from '@src/vo/query.vo';
import {QueryListVo} from '@src/vo/query.list.vo';
import {ApiProperty} from '@nestjs/swagger';
import {Column} from "typeorm";
import {ProductEntity} from "@src/modules/product/entities/product.entity";
import {SpecificationOptionVo} from "@src/modules/specificationOption/specificationOption.vo";

export class ProductSpecificationVo extends QueryVo {

  @ApiProperty({description: '产品', type: String})
  product: ProductEntity;

  @ApiProperty({description: '规格配置', type: SpecificationOptionVo})
  specification_options: SpecificationOptionVo[];

  @Column('decimal')
  price: number;
}

export class ProductSpecificationListVo extends QueryListVo {
  @ApiProperty({description: '返回数据列表', type: ProductSpecificationVo, isArray: true})
  data: ProductSpecificationVo[];
}
