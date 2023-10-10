import {Column, Entity, ManyToOne} from "typeorm";
import {SharedEntity} from "@src/modules/shared/entities/shared.entity";
import {SpecificationEntity} from "@src/modules/specification/entities/specification.entity";

@Entity('specification_option')
export class SpecificationOptionEntity extends SharedEntity {
  @Column({nullable: false, type: 'varchar', length: 255})
  value: string;  // 如“65ml”、“100ml”

  @ManyToOne(() => SpecificationEntity, specification => specification.options)
  specification: SpecificationEntity;
}
