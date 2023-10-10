import {
  Entity,
  Column, ManyToOne,
} from 'typeorm';
import {SharedEntity} from "@src/modules/shared/entities/shared.entity";
import {ProductEntity} from "@src/modules/product/entities/product.entity";
import {ProductSpecificationEntity} from "@src/modules/productSpecification/entities/productSpecification.entity";

@Entity('shop_cart')
export class ShopCartEntity extends SharedEntity {

  @Column({type: 'int', nullable: false})
  user_id: number;

  @ManyToOne(() => ProductEntity, { nullable: false })
  product: ProductEntity;

  @ManyToOne(() => ProductSpecificationEntity, { nullable: false })
  productSpecification: ProductSpecificationEntity;

  @Column({type: 'int', nullable: false})
  count: number;
}

