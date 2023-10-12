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
import {ShopCartService} from "@src/modules/shopCart/shopCart.service";
import {ShopCartDto} from "@src/modules/shopCart/dto/shopCart.dto";
import {ShopCartListVo, ShopCartVo} from "@src/modules/shopCart/shopCart.vo";
import {ShopCartReqDto} from "@src/modules/shopCart/dto/shopCart.req.dto";
import {UpdateShopCartDto} from "@src/modules/shopCart/dto/update.shopCart.dto";

@ApiTags('购物车管理')
@Controller('shopCart')
export class ShopCartController {
  constructor(private readonly shopCartService: ShopCartService) {
  }

  @Post()
  @ApiOperation({summary: '创建购物车', description: '创建购物车'})
  @HttpCode(HttpStatus.CREATED)
  async createShopCart(@Body() createShopCartDto: ShopCartDto): Promise<string> {
    return await this.shopCartService.createShopCart(createShopCartDto);
  }


  @Get('list')
  @ApiOperation({summary: '获取购物车列表', description: '获取购物车列表'})
  @ApiOkResponse({
    type: ShopCartListVo,
    description: '获取购物车列表返回值',
  })
  @HttpCode(HttpStatus.OK)
  async getShopCartList(@Query(new ValidationPipe({ transform: true })) shopCartReqDto: ShopCartReqDto): Promise<ShopCartListVo> {
    return await this.shopCartService.getShopCartList(shopCartReqDto);
  }

//  写出剩下的删除、修改、查询的接口
  @Get(':id')
  @ApiOperation({summary: '获取购物车', description: '根据购物车ID获取购物车'})
  @ApiOkResponse({
    type: ShopCartVo,
    description: '获取购物车返回值',
  })
  @HttpCode(HttpStatus.OK)
  async getShopCart(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<ShopCartVo> {
    return await this.shopCartService.getShopCart(id);
  }

  @Patch(':id')
  @ApiOperation({summary: '修改购物车', description: '根据购物车ID修改购物车'})
  @ApiOkResponse({
    type: ShopCartVo,
    description: '修改购物车返回值',
  })
  @HttpCode(HttpStatus.OK)
  async modifyShopCartById(@Param('id', new ParseIntPipe()) id: number, @Body() updateShopCartDto: UpdateShopCartDto): Promise<ShopCartVo> {
    return await this.shopCartService.modifyShopCartById(id, updateShopCartDto);
  }

  @Delete(':id')
  @ApiOperation({summary: '删除购物车', description: '根据购物车ID删除购物车'})
  @HttpCode(HttpStatus.OK)
  async destroyShopCartById(@Param('id', new ParseIntPipe()) id: number): Promise<string> {
    return await this.shopCartService.destroyShopCartById(id);
  }
}
