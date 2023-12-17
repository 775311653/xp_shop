import {Module} from "@nestjs/common";
import {BrandController} from "@src/modules/brand/brand.controller";
import {BrandService} from "@src/modules/brand/brand.service";
import {DatabaseModule} from "@src/modules/database/database.module";


@Module({
  imports: [
    DatabaseModule.forRoot(),
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
