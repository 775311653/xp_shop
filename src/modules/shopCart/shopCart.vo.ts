import {QueryVo} from '@src/vo/query.vo';
import {QueryListVo} from '@src/vo/query.list.vo';
import {ApiProperty} from '@nestjs/swagger';
import {ProductVo} from "@src/modules/product/product.vo";
import {ProductSpecificationEntity} from "@src/modules/productSpecification/entities/productSpecification.entity";

export class ShopCartVo extends QueryVo {
  @ApiProperty({description: '用户ID'})
  user_id: number;

  @ApiProperty({description: '商品'})
  product: ProductVo;

  @ApiProperty({description: '商品规格'})
  productSpecification: ProductSpecificationEntity;

  @ApiProperty({description: '商品数量'})
  count: number;

  @ApiProperty({description: '商品总价'})
  total_price: number;
}

export class ShopCartListVo extends QueryListVo {
  @ApiProperty({description: '返回数据列表', type: ShopCartVo, isArray: true})
  data: ShopCartVo[];
}
