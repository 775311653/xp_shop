# 使用带有Yarn的Node.js镜像
FROM node:18.16.0

# 切换工作目录
WORKDIR /app
#复制package到工作目录
COPY package*.json ./
# 安装 pm2
RUN yarn global add pm2

# 因为您之前安装了cnpm，我假设您可能想使用淘宝的镜像加速，但是Yarn推荐使用淘宝的镜像源，这样：
RUN yarn config set registry https://registry.npm.taobao.org/

RUN yarn global add @nestjs/cli

RUN su

# 安装项目依赖
RUN yarn install

# 复制当前所有代码到/app工作目录
COPY . .

# 如果您要运行项目构建命令
#RUN yarn build

EXPOSE 4000

# 在容器启动时执行pm2
#CMD ["yarn", "pm2:prod"]
