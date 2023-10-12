# 然后构建 docker build -t xp-shop-img -f Dockerfile .生成应用镜像,然后后面
FROM node:20

# 安装 pm2
RUN npm install -g pm2

RUN npm install -g cnpm

# 切换工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
#COPY package*.json ./

# 将其他代码复制到容器中
COPY . ./

# 安装项目依赖
RUN cnpm install
# 构建NestJS项目
#RUN npm run build

EXPOSE 4000

# 在容器启动时执行pm2
#CMD ["npm", "run", "pm2:prod"]


