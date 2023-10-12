import {ShopCartDto} from "@src/modules/shopCart/dto/shopCart.dto";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ShopCartEntity} from "@src/modules/shopCart/entities/shopCart.entity";
import {Repository} from "typeorm";
import {ShopCartVo} from "@src/modules/shopCart/shopCart.vo";
import {ShopCartReqDto} from "@src/modules/shopCart/dto/shopCart.req.dto";
import {PageEnum} from "@src/enums";
import {ProductEntity} from "@src/modules/product/entities/product.entity";
import {ProductSpecificationEntity} from "@src/modules/productSpecification/entities/productSpecification.entity";
import {SpecificationOptionEntity} from "@src/modules/specificationOption/entities/specificationOption.entity";
import {Big} from "big.js";
import config from "@src/config";
import {UpdateShopCartDto} from "@src/modules/shopCart/dto/update.shopCart.dto";

@Injectable()
export class ShopCartService {
  constructor(
    @InjectRepository(ShopCartEntity)
    private readonly shopCartRepository: Repository<ShopCartEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(ProductSpecificationEntity)
    private readonly productSpecificationRepository: Repository<ProductSpecificationEntity>,
    @InjectRepository(SpecificationOptionEntity)
    private readonly specificationOptionRepository: Repository<SpecificationOptionEntity>,
  ) {
  }

  async createShopCart(createShopCartDto: ShopCartDto): Promise<string> {

    const shopCart = this.shopCartRepository.create(createShopCartDto);
    let product = await this.productRepository.findOne(createShopCartDto.product_id);
    if (!product) throw new Error("商品不存在");
    shopCart.product = product;
    let productSpecification = await this.productSpecificationRepository.findOne(createShopCartDto.product_specification_id);
    if (!productSpecification) throw new Error("商品规格不存在");
    shopCart.productSpecification = productSpecification;
    shopCart.count = createShopCartDto.count;

    //如果购物车中已经存在该商品且规格相同，则数量相加,只会有一条记录
    let shopCartExist = await this.shopCartRepository.findOne({
      where: {
        product: product,
        productSpecification: productSpecification
      }
    });
    if (shopCartExist) {
      shopCartExist.count = Big(shopCartExist.count).plus(shopCart.count).toNumber();
      let resUpdate = await this.shopCartRepository.update(shopCartExist.id, shopCartExist);
      if (resUpdate) {
        return "更新成功";
      } else {
        throw new Error("更新失败");
      }
    }

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
      shopCart.product.main_img_url = config.url.baseUrl + shopCart.product.main_img_url;
      shopCart.product.img_urls = shopCart.product.img_urls?.map((item) => config.url.baseUrl + item);
      let total_price = new Big(shopCart.productSpecification.price).mul(shopCart.count).toNumber();
      return {...shopCart, total_price};
    } else {
      throw new Error("查询失败");
    }
  }

  async getShopCartList(shopCartReqDto: ShopCartReqDto): Promise<any> {
    const {
      pageSize = PageEnum.PAGE_SIZE,
      pageNumber = PageEnum.PAGE_NUMBER,
      user_id,
    } = shopCartReqDto;
    let queryOption: any = {
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      relations: ["product", "productSpecification"]
    };
    if (user_id) {
      queryOption.where = {user_id};
    }
    let [list, total] = await this.shopCartRepository.findAndCount(queryOption);
    let tempList = list.map(async item => {
      item.product.main_img_url = config.url.baseUrl + item.product.main_img_url;
      item.product.img_urls = item.product.img_urls?.map((item) => config.url.baseUrl + item);
      let total_price = new Big(item.productSpecification.price).mul(item.count).toNumber();
      let specOptions = await this.specificationOptionRepository.findByIds(item.productSpecification.specification_option_ids, {relations: ["specification"]});
      return {...item, total_price, specOptions};
    });
    // @ts-ignore
    tempList = await Promise.all(tempList);
    return {
      data: tempList,
      total,
      pageSize,
      pageNumber,
    };
  }

  async modifyShopCartById(id: number, updateShopCartDto: UpdateShopCartDto): Promise<ShopCartVo> {
    let resUpdate = await this.shopCartRepository.update(id, updateShopCartDto);
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
