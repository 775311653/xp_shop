import {Module} from '@nestjs/common';
import {ProductSpecificationController} from "@src/modules/productSpecification/productSpecification.controller";
import {ProductSpecificationService} from "@src/modules/productSpecification/productSpecification.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TagEntity} from "@src/modules/tag/entities/tag.entity";
import {ProductSpecificationEntity} from "@src/modules/productSpecification/entities/productSpecification.entity";
import {SpecificationEntity} from "@src/modules/specification/entities/specification.entity";
import {SpecificationOptionEntity} from "@src/modules/specificationOption/entities/specificationOption.entity";
import {ProductEntity} from "@src/modules/product/entities/product.entity";
// import {BrandEntity} from "@src/modules/Brand/entities/brand.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductSpecificationEntity,
      // BrandEntity,
      TagEntity,
      SpecificationEntity,
      SpecificationOptionEntity,
      ProductEntity,
    ]),
  ],
  controllers: [
    ProductSpecificationController,
  ],
  providers: [
    ProductSpecificationService,
  ],
})
export class ProductSpecificationModule {
}
