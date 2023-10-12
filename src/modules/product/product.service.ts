import {ProductDTO} from "@src/modules/Product/dto/product.dto";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ProductEntity} from "@src/modules/Product/entities/product.entity";
import {Repository} from "typeorm";
import {ProductListVo, ProductVo} from "@src/modules/product/product.vo";
import {ProductReqDto} from "@src/modules/product/dto/product.req.dto";
import {PageEnum} from "@src/enums";
import {TagEntity} from "@src/modules/tag/entities/tag.entity";
import {SpecificationOptionEntity} from "@src/modules/specificationOption/entities/specificationOption.entity";
import config from "@src/config";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
    @InjectRepository(SpecificationOptionEntity)
    private readonly specificationOptionRepository: Repository<SpecificationOptionEntity>,
  ) {
  }

  async createProduct(createProductDto: ProductDTO): Promise<string> {
    const tags = await this.tagRepository.findByIds(createProductDto.tag_ids);
    const product = this.productRepository.create(createProductDto);
    if (tags && tags.length > 0) {
      product.tags = tags;
    }
    let resCreate = await this.productRepository.save(product);
    if (resCreate) {
      return "创建成功";
    } else {
      throw new Error("创建失败");
    }
  }

  async getProduct(id: number): Promise<ProductVo> {
    const queryBuilder = this.productRepository.createQueryBuilder("product");
    queryBuilder.leftJoinAndSelect("product.brand", "brand");
    queryBuilder.leftJoinAndSelect("product.tags", "tag");
    queryBuilder.leftJoinAndSelect("product.product_specifications", "product_specification");
    queryBuilder.where("product.id = :id", {id});
    const product = await queryBuilder.getOne();
    let specifications: any = [];
    if (product) {
      product.main_img_url = config.url.baseUrl + product.main_img_url;
      product.img_urls = product.img_urls?.map((item) => config.url.baseUrl + item);

      //如果product_specifications不为空，就取出所有的规格和规格选项，返回。然后前端根据规格和规格选项组合出所有的sku。
      if (product.product_specifications && product.product_specifications.length > 0) {
        let specificationOptionIds: any = [];
        product.product_specifications.forEach((item) => {
          specificationOptionIds.push(...item.specification_option_ids);
        });
        specificationOptionIds = [...new Set(specificationOptionIds)];
        let specificationOptions = await this.specificationOptionRepository.findByIds(specificationOptionIds, {
          relations: ["specification",],
        });
        // 需要把specification放到specificationOption的外部，因为前端需要根据specification来分组规格选项
        specifications = specificationOptions.reduce((acc:any, currOption:any) => {
          const foundSpec = acc.find((spec: { id: any; }) => spec.id === currOption.specification.id);

          const newOption = {
            id: currOption.id,
            createdAt: currOption.createdAt,
            updatedAt: currOption.updatedAt,
            value: currOption.value,
            specificationId: currOption.specification.id,
          };

          if (foundSpec) {
            foundSpec.options.push(newOption);
          } else {
            acc.push({
              id: currOption.specification.id,
              createdAt: currOption.specification.createdAt,
              updatedAt: currOption.specification.updatedAt,
              name: currOption.specification.name,
              options: [newOption]
            });
          }

          return acc;
        }, []);
      }

      return {...product, specifications: specifications};
    } else {
      throw new Error("查询失败");
    }
  }

  async getProductList(productReqDto: ProductReqDto): Promise<ProductListVo> {
    let {
      pageSize = PageEnum.PAGE_SIZE,
      pageNumber = PageEnum.PAGE_NUMBER,
      real_price_sort = "ASC",
      tag_ids,
      ...otherParams
    } = productReqDto;

    const queryBuilder = this.productRepository.createQueryBuilder("product");
    queryBuilder.skip((pageNumber - 1) * pageSize);
    queryBuilder.take(pageSize);
    queryBuilder.leftJoinAndSelect("product.brand", "brand");
    queryBuilder.where(otherParams ?? {});
    if (real_price_sort === 'ASC' || real_price_sort === 'DESC') {
      queryBuilder.orderBy("product.real_price", real_price_sort);
    }
    if (tag_ids && tag_ids.length > 0) {
      tag_ids = tag_ids.map((item) => parseInt(String(item)));
      queryBuilder
        .leftJoinAndSelect("product.tags", "tag")
        .where("tag.id IN (:...tag_ids)", {tag_ids});
    }

    const [list, total] = await queryBuilder.getManyAndCount();

    list.forEach((item) => {
      item.main_img_url = config.url.baseUrl + item.main_img_url;
      item.img_urls = item.img_urls?.map((item) => config.url.baseUrl + item);
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
