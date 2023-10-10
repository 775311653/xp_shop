import {
  Entity,
  Column, OneToMany,
} from 'typeorm';
import {SharedEntity} from "@src/modules/shared/entities/shared.entity";
import {SpecificationOptionEntity} from "@src/modules/specificationOption/entities/specificationOption.entity";

@Entity('specification')
export class SpecificationEntity extends SharedEntity {
  @Column({type: 'varchar', length: 255, unique: true, nullable: false, comment: '规格名称'})
  name: string;

  @OneToMany(() => SpecificationOptionEntity, option => option.specification)
  options: SpecificationOptionEntity[];
}
