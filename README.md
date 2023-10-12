## 请直接看`nest9`分支的代码，那个分支还在迭代，迭代完合并到`master`分支

## 一、项目介绍

* 1、后端项目地址
  * [`github`地址](https://github.com/775311653/xp_shop)
* 项目前端采用`react`开发的。前端项目地址
  * [`github`地址](https://github.com/775311653/xp_shop_react)
* 2、运行项目之后，接口文档地址会出现在控制台，也可以直接访问下面的地址
  * [`swagger`地址](http://wwww.localhost:4000/api/v2/docs/)

## 二、使用项目

* 1、本项目仅仅是实现了`rbac`的权限系统，对于其他的功能需要自己基于这个基础上去扩展

* 2、先在本地创建数据库

* 3、在项目的根目录的`.env`文件修改为你自己的数据库基本配置(地址、用户名、密码、数据库)

  ```properties
  DB_HOST=localhost
  DB_USERNAME=root
  DB_PASSWORD=123456
  DB_DATABASE=nestjs-mysql
  ```

* 4、安装依赖包

* 5、启动项目

  ```shell
  npm run start:dev
  ```

* 5、运行项目会自动初始化菜单数据和用户数据(账号:`admin`,密码:123456)

* 6、如果你想初始化别的数据,可以在`src/modules/shared/services/init-db`中写上你要初始化的数据

## 二、主要实现功能

- [x] 实现用户的登录、登录鉴权、多点登录限制、菜单权限、接口权限

- [x] 基于`RBAC`实现权限控制

- [x] 集成`swagger`文档

- [x] `ecosystem.config.js`是采用`PM2`的配置文件,项目开发完后直接运行命令一键部署

  ```shell
  npm run build
  # 开发环境
  npm run pm2:dev
  # 生产环境
  npm run pm2:prod
  ```

- [x] `winston`日志系统根据小时来划分日志管理,如果要实时查看日志，直接使用`PM2`查看日志

  ```shell
  pm2 log
  ```

- [x] 自定义装饰器，被装饰器装饰的接口会自动进行入库操作
