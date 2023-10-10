import {IsString, IsOptional, IsInt, IsArray, IsNumber, IsDate} from 'class-validator';
import {Type} from 'class-transformer';
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';

export class ProductDTO {

  @IsString()
  @ApiProperty({
    description: '产品主图的URL',
    example: '/static/imgs/product1.png'
  })
  main_img_url: string;

  @IsArray()
  @IsString({each: true})
  @IsOptional()
  @ApiProperty({
    description: '产品图片的URL',
    example: ['/static/imgs/product1.png', '/static/imgs/product2.png']
  })
  img_urls?: string[];

  @IsString()
  @ApiProperty({
    description: '产品名称',
    example: 'Example Product Name'
  })
  name: string;

  @IsInt()
  @ApiProperty({
    description: '品牌ID',
    example: 2
  })
  brand_id: number;

  @IsNumber()
  @ApiProperty({
    description: '原始价格',
    example: 100.20
  })
  raw_price: number;

  @IsNumber()
  @ApiProperty({
    description: '实际价格',
    example: 90.30
  })
  real_price: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '产品简介',
    example: '这是产品简介内容'
  })
  intro?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '产品详细介绍',
    example: '这是产品详细介绍内容'
  })
  detail?: string;

  @IsArray()
  @IsOptional()
  @ApiPropertyOptional({required: false, description: '标签id数组', example: [1, 2, 3]})
  tag_ids: number[];

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  @ApiProperty({
    description: '产品预计物流发货开始时间',
    example: '2023-10-10T12:00:00Z'
  })
  maybe_delivery_time_start_at?: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  @ApiProperty({
    description: '产品预计物流发货结束时间',
    example: '2023-10-15T12:00:00Z'
  })
  maybe_delivery_time_end_at?: Date;
}
