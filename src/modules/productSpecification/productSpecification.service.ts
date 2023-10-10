import {ProductSpecificationDto} from "@src/modules/productSpecification/dto/productSpecification.dto";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ProductSpecificationEntity} from "@src/modules/productSpecification/entities/productSpecification.entity";
import {Repository} from "typeorm";
import {
  ProductSpecificationListVo,
  ProductSpecificationVo
} from "@src/modules/productSpecification/productSpecification.vo";
import {ProductSpecificationReqDto} from "@src/modules/productSpecification/dto/productSpecification.req.dto";
import {PageEnum} from "@src/enums";
import {SpecificationOptionEntity} from "@src/modules/specificationOption/entities/specificationOption.entity";
import {ProductEntity} from "@src/modules/product/entities/product.entity";

@Injectable()
export class ProductSpecificationService {
  constructor(
    @InjectRepository(ProductSpecificationEntity)
    private readonly productSpecificationRepository: Repository<ProductSpecificationEntity>,
    @InjectRepository(SpecificationOptionEntity)
    private readonly specificationOptionRepository: Repository<SpecificationOptionEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {
  }

  async createProductSpecification(createProductSpecificationDto: ProductSpecificationDto): Promise<string> {
    const productSpecification = this.productSpecificationRepository.create(createProductSpecificationDto);
    let product = await this.productRepository.findOne(createProductSpecificationDto.product_id);
    if (product) {
      productSpecification.product = product;
    }
    let resCreate = await this.productSpecificationRepository.save(productSpecification);
    if (resCreate) {
      return "创建成功";
    } else {
      throw new Error("创建失败");
    }
  }

  async getProductSpecification(id: number): Promise<ProductSpecificationVo> {
    let productSpecification = await this.productSpecificationRepository.findOne(id, {
      relations: ["product"]
    });
    if (productSpecification) {

      let specification_option_ids = productSpecification.specification_option_ids;
      let specificationOptions = await this.specificationOptionRepository.findByIds(specification_option_ids);
      return {...productSpecification, specification_options: specificationOptions};
    } else {
      throw new Error("查询失败");
    }
  }

  async getProductSpecificationList(productSpecificationReqDto: ProductSpecificationReqDto): Promise<ProductSpecificationListVo> {
    let {
      pageSize = PageEnum.PAGE_SIZE,
      pageNumber = PageEnum.PAGE_NUMBER,
      ...otherParams
    } = productSpecificationReqDto;

    const queryBuilder = this.productSpecificationRepository.createQueryBuilder("productSpecification");
    queryBuilder.skip((pageNumber - 1) * pageSize);
    queryBuilder.take(pageSize);
    queryBuilder.where(otherParams ?? {});

    let [list, total] = await queryBuilder.getManyAndCount();
    let tempListPromises = list.map(async item => {
      let specification_option_ids = item.specification_option_ids;
      let specificationOptions = await this.specificationOptionRepository.findByIds(specification_option_ids);
      return {...item, specification_options: specificationOptions};
    });
    let tempList = await Promise.all(tempListPromises);

    return {
      data: tempList,
      total,
      pageSize,
      pageNumber,
    };
  }

  async modifyProductSpecificationById(id: number, productSpecificationDTO: ProductSpecificationDto): Promise<ProductSpecificationVo> {
    let resUpdate = await this.productSpecificationRepository.update(id, productSpecificationDTO);
    if (resUpdate) {
      return await this.getProductSpecification(id);
    } else {
      throw new Error("修改失败");
    }
  }

  async destroyProductSpecificationById(id: number) {
    let resDelete = await this.productSpecificationRepository.softDelete(id);
    if (resDelete) {
      return "删除成功";
    } else {
      throw new Error("删除失败");
    }
  }
}
