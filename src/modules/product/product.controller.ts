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
import {ProductService} from "@src/modules/Product/product.service";
import {ProductDTO} from "@src/modules/Product/dto/product.dto";
import {ProductListVo, ProductVo} from "@src/modules/product/product.vo";
import {ProductReqDto} from "@src/modules/product/dto/product.req.dto";

@ApiTags('商品管理')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {
  }

  @Post()
  @ApiOperation({summary: '创建商品', description: '创建商品'})
  @HttpCode(HttpStatus.CREATED)
  async createProduct(@Body() createProductDto: ProductDTO): Promise<string> {
    return await this.productService.createProduct(createProductDto);
  }


  @Get('list')
  @ApiOperation({summary: '获取商品列表', description: '获取商品列表'})
  @ApiOkResponse({
    type: ProductListVo,
    description: '获取商品列表返回值',
  })
  @HttpCode(HttpStatus.OK)
  async getProductList(@Query(new ValidationPipe({ transform: true })) productReqDto: ProductReqDto): Promise<ProductListVo> {
    return await this.productService.getProductList(productReqDto);
  }

//  写出剩下的删除、修改、查询的接口
  @Get(':id')
  @ApiOperation({summary: '获取商品', description: '根据商品ID获取商品'})
  @ApiOkResponse({
    type: ProductVo,
    description: '获取商品返回值',
  })
  @HttpCode(HttpStatus.OK)
  async getProduct(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<ProductVo> {
    return await this.productService.getProduct(id);
  }

  @Patch(':id')
  @ApiOperation({summary: '修改商品', description: '根据商品ID修改商品'})
  @ApiOkResponse({
    type: ProductVo,
    description: '修改商品返回值',
  })
  @HttpCode(HttpStatus.OK)
  async modifyProductById(@Param('id', new ParseIntPipe()) id: number, @Body() productDTO: ProductDTO): Promise<ProductVo> {
    return await this.productService.modifyProductById(id, productDTO);
  }

  @Delete(':id')
  @ApiOperation({summary: '删除商品', description: '根据商品ID删除商品'})
  @HttpCode(HttpStatus.OK)
  async destroyProductById(@Param('id', new ParseIntPipe()) id: number): Promise<string> {
    return await this.productService.destroyProductById(id);
  }
}
