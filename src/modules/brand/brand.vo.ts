import { QueryVo } from '@src/vo/query.vo';
import { QueryListVo } from '@src/vo/query.list.vo';
import { ApiProperty } from '@nestjs/swagger';

export class BrandVo extends QueryVo {
  /**
   *
   *   @Column({type: 'varchar', length: 255, nullable: false})
   *   name: string;
   *
   *   @OneToMany(() => BrandEntity, brand => brand.products)
   *   products: BrandEntity[];
   */

  @ApiProperty({ description: '品牌名称', type: String })
  name: string;
}

export class BrandListVo extends QueryListVo {
  @ApiProperty({ description: '返回数据列表', type: BrandVo, isArray: true })
  data: BrandVo[];
}
