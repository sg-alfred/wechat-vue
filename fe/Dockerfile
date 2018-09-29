FROM node:last
MAINTAINER sgAlfred<sg_chenjz@163.com>

RUN apt-get update && apt-get install -y nginx

WORKDIR /home/www/wechat-vue

RUN yarn config set registry https://registry.npm.taobao.org

COPY package.json .
COPY build build
COPY config config
COPY src src
COPY static static
COPY .babelrc .bablerc
COPY index.html index.html
COPY main.js main.js
COPY faicon@256.ico faicon@256.ico

RUN yarn install && yarn run build \
	&& cp -r dist/* /var/www/html \
	&& rm -rf ./*

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
