import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn, ManyToMany, JoinTable, OneToMany, Index,
} from 'typeorm';
import {BrandEntity} from '@src/modules/Brand/entities/brand.entity';
import {TagEntity} from "@src/modules/tag/entities/tag.entity";
import {ProductSpecificationEntity} from "@src/modules/ProductSpecification/entities/ProductSpecification.entity";
import {SharedEntity} from "@src/modules/shared/entities/shared.entity";

@Entity('product')
@Index(['name']) // Indexed as it might be a commonly searched field
@Index(['brand_id']) // Indexed as it might be a common filter or relation resolution
export class ProductEntity extends SharedEntity {
  @Column({type: 'varchar', length: 300, nullable: false})
  main_img_url: string;

  @Column({type: 'json', nullable: true}) // Assuming img_urls can be nullable and is an array of text
  img_urls?: string[];

  @Column({type: 'varchar', length: 255, nullable: false})
  name: string;

  @Column({type: 'int', nullable: false})
  brand_id: number;

  @Column('decimal', {precision: 10, scale: 2, default: 0})
  raw_price: number;

  @Column('decimal', {precision: 10, scale: 2, default: 0})
  real_price: number;

  @Column({type: 'text', nullable: true})
  intro?: string;

  @Column({type: 'text', nullable: true})
  detail?: string;

  @Column({type: 'timestamp', nullable: true})
  maybe_delivery_time_start_at?: Date;

  @Column({type: 'timestamp', nullable: true})
  maybe_delivery_time_end_at?: Date;

  @JoinColumn({name: 'brand_id'})
  @ManyToOne(() => BrandEntity, brand => brand.products)
  brand: BrandEntity;

  @ManyToMany(() => TagEntity, tag => tag.products)
  @JoinTable()
  tags: TagEntity[];

  @OneToMany(() => ProductSpecificationEntity, spec => spec.product)
  specifications: ProductSpecificationEntity[];
}
