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
  Query, ValidationPipe
} from "@nestjs/common";
import {ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {SpecificationOptionService} from "@src/modules/specificationOption/specificationOption.service";
import {SpecificationOptionDto} from "@src/modules/specificationOption/dto/specificationOption.dto";
import {
  SpecificationOptionListVo,
  SpecificationOptionVo
} from "@src/modules/specificationOption/specificationOption.vo";
import {SpecificationOptionReqDto} from "@src/modules/specificationOption/dto/specificationOption.req.dto";

@ApiTags('规格配置管理')
@Controller('specificationOption')
export class SpecificationOptionController {
  constructor(private readonly specificationOptionService: SpecificationOptionService) {
  }

  @Post()
  @ApiOperation({summary: '创建规格配置', description: '创建规格配置'})
  @HttpCode(HttpStatus.CREATED)
  async createSpecificationOption(@Body() createSpecificationOptionDto: SpecificationOptionDto): Promise<string> {
    return await this.specificationOptionService.createSpecificationOption(createSpecificationOptionDto);
  }


  @Get('list')
  @ApiOperation({summary: '获取规格配置列表', description: '获取规格配置列表'})
  @ApiOkResponse({
    type: SpecificationOptionListVo,
    description: '获取规格配置列表返回值',
  })
  @HttpCode(HttpStatus.OK)
  async getSpecificationOptionList(@Query(new ValidationPipe({transform: true})) specificationOptionReqDto: SpecificationOptionReqDto): Promise<SpecificationOptionListVo> {
    return await this.specificationOptionService.getSpecificationOptionList(specificationOptionReqDto);
  }

//  写出剩下的删除、修改、查询的接口
  @Get(':id')
  @ApiOperation({summary: '获取规格配置', description: '根据规格配置ID获取规格配置'})
  @ApiOkResponse({
    type: SpecificationOptionVo,
    description: '获取规格配置返回值',
  })
  @HttpCode(HttpStatus.OK)
  async getSpecificationOption(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<SpecificationOptionVo> {
    return await this.specificationOptionService.getSpecificationOption(id);
  }

  @Patch(':id')
  @ApiOperation({summary: '修改规格配置', description: '根据规格配置ID修改规格配置'})
  @ApiOkResponse({
    type: SpecificationOptionVo,
    description: '修改规格配置返回值',
  })
  @HttpCode(HttpStatus.OK)
  async modifySpecificationOptionById(@Param('id', new ParseIntPipe()) id: number, @Body() specificationOptionDTO: SpecificationOptionDto): Promise<SpecificationOptionVo> {
    return await this.specificationOptionService.modifySpecificationOptionById(id, specificationOptionDTO);
  }

  @Delete(':id')
  @ApiOperation({summary: '删除规格配置', description: '根据规格配置ID删除规格配置'})
  @HttpCode(HttpStatus.OK)
  async destroySpecificationOptionById(@Param('id', new ParseIntPipe()) id: number): Promise<string> {
    return await this.specificationOptionService.destroySpecificationOptionById(id);
  }
}
