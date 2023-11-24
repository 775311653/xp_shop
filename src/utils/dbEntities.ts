//导出所有的entities和他们的repository

import {ProductEntity} from "@src/modules/product/entities/product.entity";
import {ProductSpecificationEntity} from "@src/modules/productSpecification/entities/productSpecification.entity";
import {SpecificationEntity} from "@src/modules/specification/entities/specification.entity";
import {SpecificationOptionEntity} from "@src/modules/specificationOption/entities/specificationOption.entity";
import {TagEntity} from "@src/modules/tag/entities/tag.entity";
import {BrandEntity} from "@src/modules/brand/entities/brand.entity";
import fs from "fs";
import path from "path";

// import {getRepository} from "typeorm";

let entities: any = [];

entities.push(ProductEntity);
entities.push(ProductSpecificationEntity);
entities.push(SpecificationEntity);
entities.push(SpecificationOptionEntity);
entities.push(TagEntity);
entities.push(BrandEntity);

export default entities;
