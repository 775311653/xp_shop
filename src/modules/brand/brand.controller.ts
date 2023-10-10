import {Body, Controller, HttpCode, HttpStatus, Post} from "@nestjs/common";
import {ApiTags} from "@nestjs/swagger";
import {BrandService} from "@src/modules/brand/brand.service";
import {BrandDto} from "@src/modules/brand/dto/brand.dto";


@ApiTags('品牌管理')
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createBrand(@Body() createBrandDto: BrandDto): Promise<string> {
    return await this.brandService.createBrand(createBrandDto);
  }
}
