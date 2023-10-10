import {
  Entity,
  Column,
} from 'typeorm';
import {SharedEntity} from "@src/modules/shared/entities/shared.entity";

@Entity('specification')
export class SpecificationEntity extends SharedEntity {
  @Column({type: 'varchar', length: 255, unique: true, nullable: false, comment: '规格名称'})
  name: string;
}
