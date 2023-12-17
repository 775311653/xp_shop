import {Module} from '@nestjs/common';
import {SpecificationOptionController} from "@src/modules/specificationOption/specificationOption.controller";
import {SpecificationOptionService} from "@src/modules/specificationOption/specificationOption.service";
import {DatabaseModule} from "@src/modules/database/database.module";

@Module({
  imports: [
    DatabaseModule.forRoot(),
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
