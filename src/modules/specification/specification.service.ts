import {SpecificationDto} from "@src/modules/specification/dto/specification.dto";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {SpecificationEntity} from "@src/modules/specification/entities/specification.entity";
import {Repository} from "typeorm";
import {SpecificationListVo, SpecificationVo} from "@src/modules/specification/specification.vo";
import {SpecificationReqDto} from "@src/modules/specification/dto/specification.req.dto";
import {PageEnum} from "@src/enums";

@Injectable()
export class SpecificationService {
  constructor(
    @InjectRepository(SpecificationEntity)
    private readonly specificationRepository: Repository<SpecificationEntity>,
  ) {
  }

  async createSpecification(createSpecificationDto: SpecificationDto): Promise<string> {
    const specification = this.specificationRepository.create(createSpecificationDto);
    let resCreate = await this.specificationRepository.save(specification);
    if (resCreate) {
      return "创建成功";
    } else {
      throw new Error("创建失败");
    }
  }

  async getSpecification(id: number): Promise<SpecificationVo> {
    let specification = await this.specificationRepository.findOne(id,{
      relations: ["options"]
    });
    if (specification) {
      return specification;
    } else {
      throw new Error("查询失败");
    }
  }

  async getSpecificationList(specificationReqDto: SpecificationReqDto): Promise<SpecificationListVo> {
    const {
      pageSize = PageEnum.PAGE_SIZE,
      pageNumber = PageEnum.PAGE_NUMBER,
    } = specificationReqDto;
    let [list, total] = await this.specificationRepository.findAndCount({
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

  async modifySpecificationById(id: number, specificationDTO: SpecificationDto): Promise<SpecificationVo> {
    let resUpdate = await this.specificationRepository.update(id, specificationDTO);
    if (resUpdate) {
      return await this.getSpecification(id);
    } else {
      throw new Error("修改失败");
    }
  }

  async destroySpecificationById(id: number) {
    let resDelete = await this.specificationRepository.softDelete(id);
    if (resDelete) {
      return "删除成功";
    } else {
      throw new Error("删除失败");
    }
  }
}
