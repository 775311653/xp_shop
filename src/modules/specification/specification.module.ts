import {Module} from '@nestjs/common';
import {SpecificationController} from "@src/modules/specification/specification.controller";
import {SpecificationService} from "@src/modules/specification/specification.service";
import {DatabaseModule} from "@src/modules/database/database.module";

@Module({
  imports: [
    DatabaseModule.forRoot(),
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
