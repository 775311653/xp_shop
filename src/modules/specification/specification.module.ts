import {Module} from '@nestjs/common';
import {SpecificationController} from "@src/modules/specification/specification.controller";
import {SpecificationService} from "@src/modules/specification/specification.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {SpecificationEntity} from "@src/modules/specification/entities/specification.entity";
import {TagEntity} from "@src/modules/tag/entities/tag.entity";
import {ProductEntity} from "@src/modules/product/entities/product.entity";

// import {BrandEntity} from "@src/modules/Brand/entities/brand.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SpecificationEntity,
      TagEntity,
      ProductEntity,
    ]),
  ],
  controllers: [
    SpecificationController,
  ],
  providers: [
    SpecificationService,
  ],
})
export class SpecificationModule {
}
