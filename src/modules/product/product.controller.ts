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
import {ApiTags} from "@nestjs/swagger";
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
  @HttpCode(HttpStatus.CREATED)
  async createProduct(@Body() createProductDto: ProductDTO): Promise<string> {
    return await this.productService.createProduct(createProductDto);
  }


  @Get('list')
  @HttpCode(HttpStatus.OK)
  async getProductList( @Query() productReqDto: ProductReqDto ): Promise<ProductListVo> {
    return await this.productService.getProductList(productReqDto);
  }

//  写出剩下的删除、修改、查询的接口
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getProduct(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<ProductVo> {
    return await this.productService.getProduct(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async modifyProductById( @Param('id', new ParseIntPipe()) id: number, @Body() productDTO: ProductDTO ): Promise<ProductVo> {
    return await this.productService.modifyProductById(id, productDTO);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async destroyProductById( @Param('id', new ParseIntPipe()) id: number ): Promise<string> {
    return await this.productService.destroyProductById(id);
  }
}
