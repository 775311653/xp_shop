import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query
} from "@nestjs/common";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {BrandService} from "@src/modules/brand/brand.service";
import {BrandDto} from "@src/modules/brand/dto/brand.dto";
import {BrandListVo, BrandVo} from "@src/modules/brand/brand.vo";
import {BrandReqDto} from "@src/modules/brand/dto/brand.req.dto";


@ApiTags('品牌管理')
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {
  }

  @Post()
  @ApiOperation({summary: '创建品牌', description: '创建品牌'})
  @HttpCode(HttpStatus.CREATED)
  async createBrand(@Body() createBrandDto: BrandDto): Promise<string> {
    return await this.brandService.createBrand(createBrandDto);
  }

  @Post('list')
  @ApiOperation({summary: '获取品牌列表', description: '获取品牌列表'})
  @HttpCode(HttpStatus.OK)
  async getBrandList(@Query() brandReqDto: BrandReqDto): Promise<BrandListVo> {
    return await this.brandService.getBrandList(brandReqDto);
  }

  @Get(':id')
  @ApiOperation({summary: '获取品牌', description: '根据品牌ID获取品牌'})
  @HttpCode(HttpStatus.OK)
  async getBrand(@Param('id', new ParseIntPipe()) id: number): Promise<BrandVo> {
    return await this.brandService.getBrand(id);
  }

  @Patch(':id')
  @ApiOperation({summary: '修改品牌', description: '根据品牌ID修改品牌'})
  @HttpCode(HttpStatus.OK)
  async modifyBrandById(
    @Param('id', new ParseIntPipe()) id: number, @Body() brandDto: BrandDto
  ): Promise<BrandVo> {
    return await this.brandService.modifyBrandById(id, brandDto);
  }

  @Delete(':id')
  @ApiOperation({summary: '删除品牌', description: '根据品牌ID删除品牌'})
  @HttpCode(HttpStatus.OK)
  async destroyBrandById(@Param('id', new ParseIntPipe()) id: number): Promise<string> {
    return await this.brandService.destroyBrandById(id);
  }


}
