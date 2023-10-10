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
import {SpecificationService} from "@src/modules/specification/specification.service";
import {SpecificationDto} from "@src/modules/specification/dto/specification.dto";
import {SpecificationListVo, SpecificationVo} from "@src/modules/specification/specification.vo";
import {SpecificationReqDto} from "@src/modules/specification/dto/specification.req.dto";

@ApiTags('规格管理')
@Controller('specification')
export class SpecificationController {
  constructor(private readonly specificationService: SpecificationService) {
  }

  @Post()
  @ApiOperation({summary: '创建规格', description: '创建规格'})
  @HttpCode(HttpStatus.CREATED)
  async createSpecification(@Body() createSpecificationDto: SpecificationDto): Promise<string> {
    return await this.specificationService.createSpecification(createSpecificationDto);
  }


  @Get('list')
  @ApiOperation({summary: '获取规格列表', description: '获取规格列表'})
  @ApiOkResponse({
    type: SpecificationListVo,
    description: '获取规格列表返回值',
  })
  @HttpCode(HttpStatus.OK)
  async getSpecificationList(@Query() specificationReqDto: SpecificationReqDto): Promise<SpecificationListVo> {
    return await this.specificationService.getSpecificationList(specificationReqDto);
  }

//  写出剩下的删除、修改、查询的接口
  @Get(':id')
  @ApiOperation({summary: '获取规格', description: '根据规格ID获取规格'})
  @ApiOkResponse({
    type: SpecificationVo,
    description: '获取规格返回值',
  })
  @HttpCode(HttpStatus.OK)
  async getSpecification(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<SpecificationVo> {
    return await this.specificationService.getSpecification(id);
  }

  @Patch(':id')
  @ApiOperation({summary: '修改规格', description: '根据规格ID修改规格'})
  @ApiOkResponse({
    type: SpecificationVo,
    description: '修改规格返回值',
  })
  @HttpCode(HttpStatus.OK)
  async modifySpecificationById(@Param('id', new ParseIntPipe()) id: number, @Body() specificationDTO: SpecificationDto): Promise<SpecificationVo> {
    return await this.specificationService.modifySpecificationById(id, specificationDTO);
  }

  @Delete(':id')
  @ApiOperation({summary: '删除规格', description: '根据规格ID删除规格'})
  @HttpCode(HttpStatus.OK)
  async destroySpecificationById(@Param('id', new ParseIntPipe()) id: number): Promise<string> {
    return await this.specificationService.destroySpecificationById(id);
  }
}
