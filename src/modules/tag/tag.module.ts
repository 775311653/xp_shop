import {Module} from '@nestjs/common';
import {TagController} from "@src/modules/tag/tag.controller";
import {TagService} from "@src/modules/tag/tag.service";
import {DatabaseModule} from "@src/modules/database/database.module";

@Module({
  imports: [
    DatabaseModule.forRoot(),
  ],
  controllers: [
    TagController,
  ],
  providers: [
    TagService,
  ],
})
export class TagModule {
}
