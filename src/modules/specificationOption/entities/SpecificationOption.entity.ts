import {Entity, Column, ManyToOne} from 'typeorm';
import {SpecificationEntity} from "@src/modules/Specification/entities/Specification.entity";
import {SharedEntity} from "@src/modules/shared/entities/shared.entity";

@Entity('specification_options')
export class SpecificationOptionEntity extends SharedEntity {

  @Column({nullable: false, type: 'varchar', length: 255})
  value: string;  // 如“65ml”、“100ml”

  @ManyToOne(() => SpecificationEntity, specification => specification.options)
  specification: SpecificationEntity;
}
