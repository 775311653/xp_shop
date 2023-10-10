import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {BrandEntity} from "@src/modules/brand/entities/brand.entity";
import {BrandController} from "@src/modules/brand/brand.controller";
import {BrandService} from "@src/modules/brand/brand.service";


@Module({
  imports: [
    TypeOrmModule.forFeature([
      BrandEntity,
      // TagEntity
    ]),
  ],
  controllers: [
    BrandController,
  ],
  providers: [
    BrandService,
  ],
})
export class BrandModule {
}
