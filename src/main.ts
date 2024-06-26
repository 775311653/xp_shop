import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {Logger, ValidationPipe} from '@nestjs/common';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import {join} from "path";
import {NestExpressApplication} from "@nestjs/platform-express";
// import { TransformInterceptor } from './interceptors/transform/transform.interceptor';

// @ts-ignore
import {NumberOperation} from "@src/utils/libs/NumberOperation";

const PORT = process.env.PORT || 8080;
const PREFIX = process.env.PREFIX || '/';
export const IS_DEV = process.env.NODE_ENV !== 'production';
async function bootstrap() {
  const logger: Logger = new Logger('main.ts');
  console.log(IS_DEV, '是否为开发环境');
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    // 开启日志级别打印
    logger: IS_DEV ? ['log', 'debug', 'error', 'warn'] : ['error', 'warn'],
  });
  //允许跨域请求
  app.enableCors();
  // 给请求添加prefix
  app.setGlobalPrefix(PREFIX);

  // 配置api文档信息(不是生产环境配置文档)
  if (IS_DEV) {
    const options = new DocumentBuilder()
      .setTitle('权限系统管理  api文档')
      .setDescription('权限系统管理  api接口文档')
      .setBasePath(PREFIX)
      .addBearerAuth({ type: 'apiKey', in: 'header', name: 'token' })
      .setVersion('0.0.1')
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(`${PREFIX}/docs`, app, document);
    // 浏览器直接访问 http://localhost:5000/api-json
    SwaggerModule.setup('api', app, document);
  }
  // Web漏洞的
  app.use(helmet());

  // 全局注册错误的过滤器(错误异常)
  app.useGlobalFilters(new HttpExceptionFilter());

  app.useStaticAssets(join(__dirname,'..', 'public'),{
    prefix: '/static/',   //设置虚拟路径
  });
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    transformOptions: {
      enableImplicitConversion: true
    },
  }));

  // 全局注册拦截器(成功返回格式)
  // app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(PORT, () => {
    // logger.log(`服务已经启动,接口请访问:http://wwww.localhost:${PORT}/${PREFIX}`);
    logger.log(`服务已经启动,文档请访问:http://wwww.localhost:${PORT}/${PREFIX}/docs`);
  });
}
bootstrap();
