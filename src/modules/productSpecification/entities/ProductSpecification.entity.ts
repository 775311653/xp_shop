import {Entity, Column, ManyToOne, JoinColumn} from 'typeorm';
import {ProductEntity} from "@src/modules/Product/entities/product.entity";
import {SpecificationOptionEntity} from "@src/modules/SpecificationOption/entities/SpecificationOption.entity";
import {SharedEntity} from "@src/modules/shared/entities/shared.entity";

@Entity('product_specifications')
export class ProductSpecificationEntity extends SharedEntity {

  @ManyToOne(() => ProductEntity)
  product: ProductEntity;

  @ManyToOne(() => SpecificationOptionEntity)
  @JoinColumn({name: 'option_id1'})
  option1: SpecificationOptionEntity;  // 对应某个规格的选项ID，如“容量”

  @ManyToOne(() => SpecificationOptionEntity)
  @JoinColumn({name: 'option_id2'})
  option2: SpecificationOptionEntity;  // 对应某个规格的选项ID，如“套装”

  @Column('decimal')
  price: number;
}
