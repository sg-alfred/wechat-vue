# wechat-vue


[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


> 基于 Vue 模仿微信App，实现部分微信功能。

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 技术栈

* Vue 全家桶：vue2 + vuex + vue-router + webpack
* 后台服务：express
* 网络请求：axios
* 数据库：mongodb

## TODO

* [X] 基本的样式搭建及主要界面
* [X] 简单的注册功能，真的是简单的，然后登录，之后至少加上 验证码
* [X] 好友添加功能
* [X] 即时通讯聊天功能（socket.io）
* [ ] 朋友圈: 发状态 + 好友点赞／评论
* [X] 使用 electron 打包成桌面应用 —— 2018年2月4日
* [ ] 其他尝试
    * [X] 结合百度AI做人脸登录
    * [ ] redis 队列做数据推送？


## License
[MIT](http://opensource.org/licenses/MIT)
Copyright (c) 2017-present