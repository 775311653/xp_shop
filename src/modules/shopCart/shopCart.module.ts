import {Module} from '@nestjs/common';
import {ShopCartController} from "@src/modules/shopCart/shopCart.controller";
import {ShopCartService} from "@src/modules/shopCart/shopCart.service";
import {DatabaseModule} from "@src/modules/database/database.module";

@Module({
  imports: [
    DatabaseModule.forRoot(),
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
