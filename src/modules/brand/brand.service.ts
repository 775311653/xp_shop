import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {BrandEntity} from "@src/modules/brand/entities/brand.entity";
import {BrandDto} from "@src/modules/brand/dto/brand.dto";

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(BrandEntity)
    private readonly brandRepository: Repository<BrandEntity>,
  ) {
  }

  async createBrand(createBrandDto: BrandDto): Promise<string> {
    const brand = this.brandRepository.create(createBrandDto);
    let resCreate = await this.brandRepository.save(brand);
    if (resCreate) {
      return "创建成功";
    } else {
      throw new Error("创建失败");
    }
  }
}
