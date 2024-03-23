import {IsString, IsOptional, IsInt, IsArray, IsNumber, IsDate} from 'class-validator';
import {Type} from 'class-transformer';
import {ApiProperty, ApiPropertyOptional, PartialType} from '@nestjs/swagger';
import {ProductDTO} from "@src/modules/product/dto/product.dto";

export class UpdateProductDTO extends PartialType(ProductDTO) {
}
