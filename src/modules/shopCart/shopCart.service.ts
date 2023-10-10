import {ShopCartDto} from "@src/modules/shopCart/dto/shopCart.dto";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ShopCartEntity} from "@src/modules/shopCart/entities/shopCart.entity";
import {Repository} from "typeorm";
import {ShopCartListVo, ShopCartVo} from "@src/modules/shopCart/shopCart.vo";
import {ShopCartReqDto} from "@src/modules/shopCart/dto/shopCart.req.dto";
import {PageEnum} from "@src/enums";
import {ProductEntity} from "@src/modules/product/entities/product.entity";
import {ProductSpecificationEntity} from "@src/modules/productSpecification/entities/productSpecification.entity";

@Injectable()
export class ShopCartService {
  constructor(
    @InjectRepository(ShopCartEntity)
    private readonly shopCartRepository: Repository<ShopCartEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(ProductSpecificationEntity)
    private readonly productSpecificationRepository: Repository<ProductSpecificationEntity>,
  ) {
  }

  async createShopCart(createShopCartDto: ShopCartDto): Promise<string> {

    const shopCart = this.shopCartRepository.create(createShopCartDto);
    let product = await this.productRepository.findOne(createShopCartDto.product_id);
    if (!product) throw new Error("商品不存在");
    shopCart.product = product;
    let productSpecification = await this.productSpecificationRepository.findOne(createShopCartDto.product_specification_id);
    if (!productSpecification)  throw new Error("商品规格不存在");
    shopCart.productSpecification = productSpecification;
    shopCart.count = createShopCartDto.count;
    let resCreate = await this.shopCartRepository.save(shopCart);
    if (resCreate) {
      return "创建成功";
    } else {
      throw new Error("创建失败");
    }
  }

  async getShopCart(id: number): Promise<ShopCartVo> {
    let shopCart = await this.shopCartRepository.findOne(id, {
      relations: ["product", "productSpecification"]
    });
    if (shopCart) {
      let total_price = Number(shopCart.productSpecification.price).mul(shopCart.count);
      return {...shopCart, total_price};
    } else {
      throw new Error("查询失败");
    }
  }

  async getShopCartList(shopCartReqDto: ShopCartReqDto): Promise<ShopCartListVo> {
    const {
      pageSize = PageEnum.PAGE_SIZE,
      pageNumber = PageEnum.PAGE_NUMBER,
    } = shopCartReqDto;
    let [list, total] = await this.shopCartRepository.findAndCount({
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      relations: ["product", "productSpecification"]
    });
    let tempList = list.map(item => {
      let total_price = Number(item.productSpecification.price).mul(item.count);
      return {...item, total_price};
    });
    return {
      data: tempList,
      total,
      pageSize,
      pageNumber,
    };
  }

  async modifyShopCartById(id: number, shopCartDTO: ShopCartDto): Promise<ShopCartVo> {
    let resUpdate = await this.shopCartRepository.update(id, shopCartDTO);
    if (resUpdate) {
      return await this.getShopCart(id);
    } else {
      throw new Error("修改失败");
    }
  }

  async destroyShopCartById(id: number) {
    let resDelete = await this.shopCartRepository.softDelete(id);
    if (resDelete) {
      return "删除成功";
    } else {
      throw new Error("删除失败");
    }
  }
}
