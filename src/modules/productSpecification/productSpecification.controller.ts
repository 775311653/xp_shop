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
  Query, ValidationPipe
} from "@nestjs/common";
import {ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {ProductSpecificationService} from "@src/modules/productSpecification/productSpecification.service";
import {ProductSpecificationDto} from "@src/modules/productSpecification/dto/productSpecification.dto";
import {
  ProductSpecificationListVo,
  ProductSpecificationVo
} from "@src/modules/productSpecification/productSpecification.vo";
import {ProductSpecificationReqDto} from "@src/modules/productSpecification/dto/productSpecification.req.dto";

@ApiTags('产品规格配置管理')
@Controller('productSpecification')
export class ProductSpecificationController {
  constructor(private readonly productSpecificationService: ProductSpecificationService) {
  }

  @Post()
  @ApiOperation({summary: '创建产品规格配置', description: '创建产品规格配置'})
  @HttpCode(HttpStatus.CREATED)
  async createProductSpecification(@Body() createProductSpecificationDto: ProductSpecificationDto): Promise<string> {
    return await this.productSpecificationService.createProductSpecification(createProductSpecificationDto);
  }


  @Get('list')
  @ApiOperation({summary: '获取产品规格配置列表', description: '获取产品规格配置列表'})
  @ApiOkResponse({
    type: ProductSpecificationListVo,
    description: '获取产品规格配置列表返回值',
  })
  @HttpCode(HttpStatus.OK)
  async getProductSpecificationList(@Query(new ValidationPipe({transform: true})) productSpecificationReqDto: ProductSpecificationReqDto): Promise<ProductSpecificationListVo> {
    return await this.productSpecificationService.getProductSpecificationList(productSpecificationReqDto);
  }

//  写出剩下的删除、修改、查询的接口
  @Get(':id')
  @ApiOperation({summary: '获取产品规格配置', description: '根据产品规格配置ID获取产品规格配置'})
  @ApiOkResponse({
    type: ProductSpecificationVo,
    description: '获取产品规格配置返回值',
  })
  @HttpCode(HttpStatus.OK)
  async getProductSpecification(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<ProductSpecificationVo> {
    return await this.productSpecificationService.getProductSpecification(id);
  }

  @Patch(':id')
  @ApiOperation({summary: '修改产品规格配置', description: '根据产品规格配置ID修改产品规格配置'})
  @ApiOkResponse({
    type: ProductSpecificationVo,
    description: '修改产品规格配置返回值',
  })
  @HttpCode(HttpStatus.OK)
  async modifyProductSpecificationById(@Param('id', new ParseIntPipe()) id: number, @Body() productSpecificationDTO: ProductSpecificationDto): Promise<ProductSpecificationVo> {
    return await this.productSpecificationService.modifyProductSpecificationById(id, productSpecificationDTO);
  }

  @Delete(':id')
  @ApiOperation({summary: '删除产品规格配置', description: '根据产品规格配置ID删除产品规格配置'})
  @HttpCode(HttpStatus.OK)
  async destroyProductSpecificationById(@Param('id', new ParseIntPipe()) id: number): Promise<string> {
    return await this.productSpecificationService.destroyProductSpecificationById(id);
  }
}
