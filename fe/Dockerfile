FROM node:12.12.0 as builder
LABEL maintainer="sgAlfred<sg_chenjz@163.com>"

WORKDIR /home/www/wechat-vue

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn config set registry https://registry.npm.taobao.org

COPY public .
COPY src .
COPY vue.config.js .
COPY main.js .

RUN yarn build

FROM nginx:1.17.6-alpine

COPY --from=builder /root/phoenix_web/fe/dist/ /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
