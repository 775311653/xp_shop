import {Module} from '@nestjs/common';
import {SpecificationOptionController} from "@src/modules/specificationOption/specificationOption.controller";
import {SpecificationOptionService} from "@src/modules/specificationOption/specificationOption.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TagEntity} from "@src/modules/tag/entities/tag.entity";
import {SpecificationOptionEntity} from "@src/modules/specificationOption/entities/specificationOption.entity";
import {SpecificationEntity} from "@src/modules/specification/entities/specification.entity";

// import {BrandEntity} from "@src/modules/Brand/entities/brand.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SpecificationOptionEntity,
      // BrandEntity,
      TagEntity,
      SpecificationEntity,
    ]),
  ],
  controllers: [
    SpecificationOptionController,
  ],
  providers: [
    SpecificationOptionService,
  ],
})
export class SpecificationOptionModule {
}
