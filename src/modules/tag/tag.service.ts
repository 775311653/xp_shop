import {TagDto} from "@src/modules/tag/dto/tag.dto";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {TagEntity} from "@src/modules/tag/entities/tag.entity";
import {Repository} from "typeorm";
import {TagListVo, TagVo} from "@src/modules/tag/tag.vo";
import {TagReqDto} from "@src/modules/tag/dto/tag.req.dto";
import {PageEnum} from "@src/enums";

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {
  }

  async createTag(createTagDto: TagDto): Promise<string> {
    const tag = this.tagRepository.create(createTagDto);
    let resCreate = await this.tagRepository.save(tag);
    if (resCreate) {
      return "创建成功";
    } else {
      throw new Error("创建失败");
    }
  }

  async getTag(id: number): Promise<TagVo> {
    let tag = await this.tagRepository.findOne(id);
    if (tag) {
      return tag;
    } else {
      throw new Error("查询失败");
    }
  }

  async getTagList(tagReqDto: TagReqDto): Promise<TagListVo> {
    const {
      pageSize = PageEnum.PAGE_SIZE,
      pageNumber = PageEnum.PAGE_NUMBER,
    } = tagReqDto;
    let [list, total] = await this.tagRepository.findAndCount({
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

  async modifyTagById(id: number, tagDTO: TagDto): Promise<TagVo> {
    let resUpdate = await this.tagRepository.update(id, tagDTO);
    if (resUpdate) {
      return await this.getTag(id);
    } else {
      throw new Error("修改失败");
    }
  }

  async destroyTagById(id: number) {
    let resDelete = await this.tagRepository.softDelete(id);
    if (resDelete) {
      return "删除成功";
    } else {
      throw new Error("删除失败");
    }
  }
}
