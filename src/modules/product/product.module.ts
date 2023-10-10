import {Module} from '@nestjs/common';
import {ProductController} from "@src/modules/Product/product.controller";
import {ProductService} from "@src/modules/Product/product.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TagEntity} from "@src/modules/tag/entities/tag.entity";
import {ProductEntity} from "@src/modules/Product/entities/product.entity";
// import {BrandEntity} from "@src/modules/Brand/entities/brand.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      // BrandEntity,
      TagEntity
    ]),
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
