import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BrandEntity } from "@src/modules/Brand/entities/brand.entity";
import { Repository } from "typeorm";
import { PageEnum } from "@src/enums";
import {BrandDto} from "@src/modules/brand/dto/brand.dto";
import {BrandReqDto} from "@src/modules/brand/dto/brand.req.dto";

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

  async getBrand(id: number): Promise<BrandEntity> {
    let brand = await this.brandRepository.findOne(id);
    if (brand) {
      return brand;
    } else {
      throw new Error("查询失败");
    }
  }

  async getBrandList(brandReqDto:BrandReqDto): Promise<{ data: BrandEntity[], total: number, pageSize: number, pageNumber: number }> {
    const {
      pageSize = PageEnum.PAGE_SIZE,
      pageNumber = PageEnum.PAGE_NUMBER,
    } = brandReqDto;
    let [list, total] = await this.brandRepository.findAndCount({
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

  async modifyBrandById(id: number, updateBrandDto: { name: string }): Promise<BrandEntity> {
    let resUpdate = await this.brandRepository.update(id, updateBrandDto);
    if (resUpdate) {
      return await this.getBrand(id);
    } else {
      throw new Error("修改失败");
    }
  }

  async destroyBrandById(id: number): Promise<string> {
    let resDelete = await this.brandRepository.softDelete(id);
    if (resDelete) {
      return "删除成功";
    } else {
      throw new Error("删除失败");
    }
  }
}
