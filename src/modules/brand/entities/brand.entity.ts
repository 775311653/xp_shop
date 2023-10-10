import {Column, Entity, OneToMany} from "typeorm";
import {SharedEntity} from "@src/modules/shared/entities/shared.entity";


@Entity('brand')
export class BrandEntity extends SharedEntity {

  @Column({type: 'varchar', length: 255, nullable: false})
  name: string;

  @OneToMany(() => BrandEntity, brand => brand.products)
  products: BrandEntity[];
}
