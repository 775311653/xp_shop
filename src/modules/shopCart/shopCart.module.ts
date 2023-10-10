import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {SpecificationEntity} from "@src/modules/specification/entities/specification.entity";
import {TagEntity} from "@src/modules/tag/entities/tag.entity";
import {ProductEntity} from "@src/modules/product/entities/product.entity";
import {SpecificationOptionEntity} from "@src/modules/specificationOption/entities/specificationOption.entity";
import {ShopCartEntity} from "@src/modules/shopCart/entities/shopCart.entity";
import {ShopCartController} from "@src/modules/shopCart/shopCart.controller";
import {ShopCartService} from "@src/modules/shopCart/shopCart.service";
import {ProductSpecificationEntity} from "@src/modules/productSpecification/entities/productSpecification.entity";

// import {BrandEntity} from "@src/modules/Brand/entities/brand.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SpecificationEntity,
      SpecificationOptionEntity,
      TagEntity,
      ProductEntity,
      ShopCartEntity,
      ProductSpecificationEntity
    ]),
  ],
  controllers: [
    ShopCartController,
  ],
  providers: [
    ShopCartService,
  ],
})
export class ShopCartModule {
}
