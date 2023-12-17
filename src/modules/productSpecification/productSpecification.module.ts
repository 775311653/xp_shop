import {Module} from '@nestjs/common';
import {ProductSpecificationController} from "@src/modules/productSpecification/productSpecification.controller";
import {ProductSpecificationService} from "@src/modules/productSpecification/productSpecification.service";
import {DatabaseModule} from "@src/modules/database/database.module";

@Module({
  imports: [
    DatabaseModule.forRoot(),
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
