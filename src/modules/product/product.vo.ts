import { QueryVo } from '@src/vo/query.vo';
import { QueryListVo } from '@src/vo/query.list.vo';
import { ApiProperty } from '@nestjs/swagger';
import {BrandVo} from "@src/modules/brand/brand.vo";

export class ProductVo extends QueryVo {

  @ApiProperty({ description: '主图', type: String })
  main_img_url: string;

  @ApiProperty({ description: '图片列表', type: String, isArray: true })
  img_urls?: string[];

  @ApiProperty({ description: '商品名称', type: String })
  name: string;

  @ApiProperty({ description: '品牌id', type: Number })
  brand_id: number;

  @ApiProperty({ description: '原价', type: Number })
  raw_price: number;

  @ApiProperty({ description: '现价', type: Number })
  real_price: number;

  @ApiProperty({ description: '简介', type: String })
  intro?: string;

  @ApiProperty({ description: '详情', type: String })
  detail?: string;

  @ApiProperty({ description: '预计发货开始时间', type: Date })
  maybe_delivery_time_start_at?: Date;

  @ApiProperty({ description: '预计发货结束时间', type: Date })
  maybe_delivery_time_end_at?: Date;

  @ApiProperty({ description: '品牌', type: BrandVo })
  brand: BrandVo;

  @ApiProperty({ description: '商品规格', isArray: true })
  specifications?: any[];
}

export class ProductListVo extends QueryListVo {
  @ApiProperty({ description: '返回数据列表', type: ProductVo, isArray: true })
  data: ProductVo[];
}
