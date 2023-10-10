import {ProductDTO} from "@src/modules/Product/dto/product.dto";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ProductEntity} from "@src/modules/Product/entities/product.entity";
import {Repository} from "typeorm";
import {ProductListVo, ProductVo} from "@src/modules/product/product.vo";
import {ProductReqDto} from "@src/modules/product/dto/product.req.dto";
import {PageEnum} from "@src/enums";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {
  }

  async createProduct(createProductDto: ProductDTO): Promise<string> {
    const product = this.productRepository.create(createProductDto);
    let resCreate = await this.productRepository.save(product);
    if (resCreate) {
      return "创建成功";
    } else {
      throw new Error("创建失败");
    }
  }

  async getProduct(id: number): Promise<ProductVo> {
    let product = await this.productRepository.findOne(id);
    if (product) {
      return product;
    } else {
      throw new Error("查询失败");
    }
  }

  async getProductList(productReqDto: ProductReqDto): Promise<ProductListVo> {
    const {
      pageSize = PageEnum.PAGE_SIZE,
      pageNumber = PageEnum.PAGE_NUMBER,
    } = productReqDto;
    let [list, total] = await this.productRepository.findAndCount({
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
    });
    return {
      data: list,
      total,
      pageSize,
      pageNumber,
    };
  }

  async modifyProductById(id: number, productDTO: ProductDTO): Promise<ProductVo> {
    let resUpdate = await this.productRepository.update(id, productDTO);
    if (resUpdate) {
      return await this.getProduct(id);
    } else {
      throw new Error("修改失败");
    }
  }

  async destroyProductById(id: number) {
    let resDelete = await this.productRepository.softDelete(id);
    if (resDelete) {
      return "删除成功";
    } else {
      throw new Error("删除失败");
    }
  }
}
