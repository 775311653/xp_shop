import {SpecificationOptionDto} from "@src/modules/specificationOption/dto/specificationOption.dto";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {SpecificationOptionEntity} from "@src/modules/specificationOption/entities/specificationOption.entity";
import {Repository} from "typeorm";
import {SpecificationOptionListVo, SpecificationOptionVo} from "@src/modules/specificationOption/specificationOption.vo";
import {SpecificationOptionReqDto} from "@src/modules/specificationOption/dto/specificationOption.req.dto";
import {PageEnum} from "@src/enums";
import {SpecificationEntity} from "@src/modules/specification/entities/specification.entity";

@Injectable()
export class SpecificationOptionService {
  constructor(
    @InjectRepository(SpecificationOptionEntity)
    private readonly specificationOptionRepository: Repository<SpecificationOptionEntity>,

    @InjectRepository(SpecificationEntity)
    private readonly specificationRepository: Repository<SpecificationEntity>,
  ) {
  }

  async createSpecificationOption(createSpecificationOptionDto: SpecificationOptionDto): Promise<string> {
    const specification = await this.specificationRepository.findOne(createSpecificationOptionDto.specification_id);
    const specificationOption = this.specificationOptionRepository.create(createSpecificationOptionDto);
    if (specification) {
      specificationOption.specification = specification;
    }
    let resCreate = await this.specificationOptionRepository.save(specificationOption);
    if (resCreate) {
      return "创建成功";
    } else {
      throw new Error("创建失败");
    }
  }

  async getSpecificationOption(id: number): Promise<SpecificationOptionVo> {
    let specificationOption = await this.specificationOptionRepository.findOne(id);
    if (specificationOption) {
      return specificationOption;
    } else {
      throw new Error("查询失败");
    }
  }

  async getSpecificationOptionList(specificationOptionReqDto: SpecificationOptionReqDto): Promise<SpecificationOptionListVo> {
    let {
      pageSize = PageEnum.PAGE_SIZE,
      pageNumber = PageEnum.PAGE_NUMBER,
      ...otherParams
    } = specificationOptionReqDto;

    const queryBuilder = this.specificationOptionRepository.createQueryBuilder("specificationOption");
    queryBuilder.skip((pageNumber - 1) * pageSize);
    queryBuilder.take(pageSize);
    queryBuilder.where(otherParams ?? {});

    const [list, total] = await queryBuilder.getManyAndCount();


    return {
      data: list,
      total,
      pageSize,
      pageNumber,
    };
  }

  async modifySpecificationOptionById(id: number, specificationOptionDTO: SpecificationOptionDto): Promise<SpecificationOptionVo> {
    let resUpdate = await this.specificationOptionRepository.update(id, specificationOptionDTO);
    if (resUpdate) {
      return await this.getSpecificationOption(id);
    } else {
      throw new Error("修改失败");
    }
  }

  async destroySpecificationOptionById(id: number) {
    let resDelete = await this.specificationOptionRepository.softDelete(id);
    if (resDelete) {
      return "删除成功";
    } else {
      throw new Error("删除失败");
    }
  }
}
