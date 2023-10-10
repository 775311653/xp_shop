import {
  Entity,
  Column,
  ManyToMany,
} from 'typeorm';
import {ProductEntity} from "@src/modules/Product/entities/product.entity";
import {SharedEntity} from "@src/modules/shared/entities/shared.entity";

@Entity('tag')
export class TagEntity extends SharedEntity {

  @Column({type: 'varchar', length: 255, unique: true, nullable: false})
  name: string;

  @ManyToMany(() => ProductEntity, product => product.tags)
  products: ProductEntity[];
}
