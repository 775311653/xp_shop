import {DynamicModule, Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {SpecificationEntity} from "@src/modules/specification/entities/specification.entity";
import {SpecificationOptionEntity} from "@src/modules/specificationOption/entities/specificationOption.entity";
import {TagEntity} from "@src/modules/tag/entities/tag.entity";
import {ProductEntity} from "@src/modules/product/entities/product.entity";
import {ShopCartEntity} from "@src/modules/shopCart/entities/shopCart.entity";
import {ProductSpecificationEntity} from "@src/modules/productSpecification/entities/productSpecification.entity";
import {BrandEntity} from "@src/modules/brand/entities/brand.entity";

@Module({})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    return TypeOrmModule.forFeature([
      SpecificationEntity,
      SpecificationOptionEntity,
      TagEntity,
      ProductEntity,
      ShopCartEntity,
      ProductSpecificationEntity,
      BrandEntity,
    ]);
  }
}
