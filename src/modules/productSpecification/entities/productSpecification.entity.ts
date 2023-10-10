import {Column, Entity, ManyToOne} from "typeorm";
import {SharedEntity} from "@src/modules/shared/entities/shared.entity";
import {ProductEntity} from "@src/modules/product/entities/product.entity";

@Entity('product_specification')
export class ProductSpecificationEntity extends SharedEntity {
  @ManyToOne(() => ProductEntity)
  product: ProductEntity;

  @Column({type: 'json', nullable: false})
  specification_option_ids: number[]; // 如[1, 2]，表示“容量+option值”和“套装+option值”等的选项ID

  @Column('decimal', {nullable: false})
  price: number;
}
