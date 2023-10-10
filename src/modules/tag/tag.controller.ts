import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query
} from "@nestjs/common";
import {ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {TagService} from "@src/modules/tag/tag.service";
import {TagDto} from "@src/modules/tag/dto/tag.dto";
import {TagListVo, TagVo} from "@src/modules/tag/tag.vo";
import {TagReqDto} from "@src/modules/tag/dto/tag.req.dto";

@ApiTags('标签管理')
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {
  }

  @Post()
  @ApiOperation({summary: '创建标签', description: '创建标签'})
  @HttpCode(HttpStatus.CREATED)
  async createTag(@Body() createTagDto: TagDto): Promise<string> {
    return await this.tagService.createTag(createTagDto);
  }


  @Get('list')
  @ApiOperation({summary: '获取标签列表', description: '获取标签列表'})
  @ApiOkResponse({
    type: TagListVo,
    description: '获取标签列表返回值',
  })
  @HttpCode(HttpStatus.OK)
  async getTagList(@Query() tagReqDto: TagReqDto): Promise<TagListVo> {
    return await this.tagService.getTagList(tagReqDto);
  }

//  写出剩下的删除、修改、查询的接口
  @Get(':id')
  @ApiOperation({summary: '获取标签', description: '根据标签ID获取标签'})
  @ApiOkResponse({
    type: TagVo,
    description: '获取标签返回值',
  })
  @HttpCode(HttpStatus.OK)
  async getTag(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<TagVo> {
    return await this.tagService.getTag(id);
  }

  @Patch(':id')
  @ApiOperation({summary: '修改标签', description: '根据标签ID修改标签'})
  @ApiOkResponse({
    type: TagVo,
    description: '修改标签返回值',
  })
  @HttpCode(HttpStatus.OK)
  async modifyTagById(@Param('id', new ParseIntPipe()) id: number, @Body() tagDTO: TagDto): Promise<TagVo> {
    return await this.tagService.modifyTagById(id, tagDTO);
  }

  @Delete(':id')
  @ApiOperation({summary: '删除标签', description: '根据标签ID删除标签'})
  @HttpCode(HttpStatus.OK)
  async destroyTagById(@Param('id', new ParseIntPipe()) id: number): Promise<string> {
    return await this.tagService.destroyTagById(id);
  }
}
