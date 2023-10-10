import { IsString, IsOptional, IsInt, IsArray, IsNumber, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ProductDTO {

  @IsString()
  @ApiProperty({
    description: 'The main image URL of the product.',
    example: '/static/imgs/product1.png'
  })
  main_img_url: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @ApiProperty({
    description: 'An array of URLs for additional product images.',
    example: ['/static/imgs/product1.png', '/static/imgs/product2.png']
  })
  img_urls?: string[];

  @IsString()
  @ApiProperty({
    description: 'The name of the product.',
    example: 'Example Product Name'
  })
  name: string;

  @IsInt()
  @ApiProperty({
    description: 'The ID representing the brand of the product.',
    example: 2
  })
  brand_id: number;

  @IsNumber()
  @ApiProperty({
    description: 'The raw price of the product before any discounts.',
    example: 100.20
  })
  raw_price: number;

  @IsNumber()
  @ApiProperty({
    description: 'The actual selling price of the product after any applicable discounts.',
    example: 90.30
  })
  real_price: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'A brief introduction of the product.',
    example: 'This is a brief introduction of the product.'
  })
  intro?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Detailed information about the product.',
    example: 'This is a detailed description of the product. It may include its features, benefits, and any other relevant information.'
  })
  detail?: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  @ApiProperty({
    description: 'The potential start date and time for the delivery of the product.',
    example: '2023-10-10T12:00:00Z'
  })
  maybe_delivery_time_start_at?: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  @ApiProperty({
    description: 'The potential end date and time for the delivery of the product.',
    example: '2023-10-15T12:00:00Z'
  })
  maybe_delivery_time_end_at?: Date;
}
