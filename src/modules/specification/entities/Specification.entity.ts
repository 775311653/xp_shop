import {Entity, Column, OneToMany} from 'typeorm';
import {SpecificationOptionEntity} from "@src/modules/SpecificationOption/entities/SpecificationOption.entity";
import {SharedEntity} from "@src/modules/shared/entities/shared.entity";

@Entity('specifications')
export class SpecificationEntity extends SharedEntity {

  @Column({nullable: false, type: 'varchar', length: 255, unique: true})
  name: string;  // 如“容量”、“套装”

  @OneToMany(() => SpecificationOptionEntity, option => option.specification)
  options: SpecificationOptionEntity[];
}
