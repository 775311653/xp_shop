//导出所有的entities和他们的repository

// import {ProductEntity} from "@src/modules/product/entities/product.entity";
// import {ProductSpecificationEntity} from "@src/modules/productSpecification/entities/productSpecification.entity";
// import {SpecificationEntity} from "@src/modules/specification/entities/specification.entity";
// import {SpecificationOptionEntity} from "@src/modules/specificationOption/entities/specificationOption.entity";
// import {TagEntity} from "@src/modules/tag/entities/tag.entity";
// import {BrandEntity} from "@src/modules/brand/entities/brand.entity";
import fs from "fs";
import path from "path";

// import {getRepository} from "typeorm";

let entities: any = [];

// entities.push(ProductEntity);
// entities.push(ProductSpecificationEntity);
// entities.push(SpecificationEntity);
// entities.push(SpecificationOptionEntity);
// entities.push(TagEntity);
// entities.push(BrandEntity);


//从modules文件夹下面读取所有的entity，可能会有嵌套文件夹，所以需要递归，entity的名字类似于product.entity.ts
async function readEntities(dir: string) {
  fs.readdirSync(dir).forEach(async file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      readEntities(fullPath);
    } else {
      if (file.endsWith('.entity.ts')) {
        const entity = await import(fullPath);
        entities.push(entity);
      }
    }
  });
}

await readEntities(path.join(__dirname, '../modules'));

// let dbEntities = {
//   entities: entities,
//   // product: getRepository(ProductEntity),
//   // productSpecification: getRepository(ProductSpecificationEntity),
//   // specification: getRepository(SpecificationEntity),
//   // specificationOption: getRepository(SpecificationOptionEntity),
//   // tag: getRepository(TagEntity),
//   // brand: getRepository(BrandEntity),
//   // shared: getRepository(SharedEntity),
// }

export default entities;
