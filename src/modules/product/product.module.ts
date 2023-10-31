import {Module} from '@nestjs/common';
import {ProductController} from "@src/modules/Product/product.controller";
import {ProductService} from "@src/modules/Product/product.service";
import {TypeOrmModule} from "@nestjs/typeorm";
// import {TagEntity} from "@src/modules/tag/entities/tag.entity";
// // import {ProductEntity} from "@src/modules/Product/entities/product.entity";
// import {ProductSpecificationEntity} from "@src/modules/productSpecification/entities/productSpecification.entity";
// import {SpecificationEntity} from "@src/modules/specification/entities/specification.entity";
// import {SpecificationOptionEntity} from "@src/modules/specificationOption/entities/specificationOption.entity";
// import {BrandEntity} from "@src/modules/Brand/entities/brand.entity";
import dbEntities from "@src/utils/dbEntities";

@Module({
  imports: [
    TypeOrmModule.forFeature(dbEntities),
  ],
  controllers: [
    ProductController,
  ],
  providers: [
    ProductService,
  ],
})
export class ProductModule {
}
