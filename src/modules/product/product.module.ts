import {Module} from '@nestjs/common';
import {ProductController} from "@src/modules/Product/product.controller";
import {ProductService} from "@src/modules/Product/product.service";
import {DatabaseModule} from "@src/modules/database/database.module";

@Module({
  imports: [
    DatabaseModule.forRoot(),
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
