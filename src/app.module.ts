import * as path from 'path';

import {ClassSerializerInterceptor, Module} from '@nestjs/common';
import {APP_INTERCEPTOR, APP_PIPE} from '@nestjs/core';
import {ConfigModule, ConfigService} from 'nestjs-config';
import {TypeOrmModule} from '@nestjs/typeorm';

import {AdminModule} from './modules/admin/admin.module';
import {FrontModule} from './modules/front/front.module';
import {CommonModule} from './modules/common/common.module';
import {SharedModule} from './modules/shared/shared.module';

import {LoggingInterceptor} from './interceptors/logging/logging.interceptor';
import {ValidationPipe} from './pipe/validation/validation.pipe';
import {TransformInterceptor} from './interceptors/transform/transform.interceptor';
import {ProductModule} from "@src/modules/Product/product.module";
import {BrandModule} from "@src/modules/brand/brand.module";
import {TagModule} from "@src/modules/tag/tag.module";
import {SpecificationModule} from "@src/modules/specification/specification.module";
import {SpecificationOptionModule} from "@src/modules/specificationOption/specificationOption.module";
import {ProductSpecificationModule} from "@src/modules/productSpecification/productSpecification.module";
import {ShopCartModule} from "@src/modules/shopCart/shopCart.module";

@Module({
  imports: [
    // 配置加载配置文件
    ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}'), {
      modifyConfigName: (name: string) => name.replace('.config', ''),
    }),
    // mysql的连接
    TypeOrmModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        type: config.get('database.type'),
        host: config.get('database.host'),
        port: config.get('database.port'),
        username: config.get('database.username'),
        password: config.get('database.password'),
        database: config.get('database.database'),
        entities: [
          __dirname + '/**/*.entity{.ts,.js}',
          __dirname + '/modules/specification/entities/*.entity{.ts,.js}',
          __dirname + '/modules/brand/entities/*.entity{.ts,.js}',
          // __dirname + '/modules/product/entities/*.entity{.ts,.js}',
          __dirname + '/modules/tag/entities/*.entity{.ts,.js}',
          // __dirname + '/modules/**/*entity{.ts,.js}',
        ],
        logging: config.get('database.logging'),
        synchronize: true, // 同步数据库
        timezone: '+08:00', // 东八区
        cache: {
          duration: 60000, // 1分钟的缓存
        },
        extra: {
          poolMax: 32,
          poolMin: 16,
          queueTimeout: 60000,
          pollPingInterval: 60, // 每隔60秒连接
          pollTimeout: 60, // 连接有效60秒
        },
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    AdminModule,
    FrontModule,
    CommonModule,
    SharedModule,
    ProductModule,
    BrandModule,
    TagModule,
    SpecificationModule,
    SpecificationOptionModule,
    ProductSpecificationModule,
    ShopCartModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    // 全局使用管道(数据校验)
    // {
    //   provide: APP_PIPE,
    //   useClass: ValidationPipe,
    // },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {
}
