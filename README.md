# wechat-vue

> 基于 Vue 模仿微信 App，实现部分微信功能。

## 技术栈

- Vue 全家桶：vue2 + vuex + vue-router
- 后台服务：express
- 网络请求：axios
- 数据库：mongodb
- 打包工具：webpack4

## Build Setup

```bash
# download
git clone https://github.com/sgAlfred/wechat-vue.git
```

For backend：

```bash
# install dependencies
cd be && npm install

# serve at localhost:8081
npm start
```

For frontend：

```bash
# install dependencies
cd be && npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## TODO

- [x] 基本的样式搭建及主要界面
- [x] 简单的注册、登录功能
  - [ ] 必要的验证码认证
- [x] 好友添加功能
- [x] 即时通讯聊天功能（socket.io）
  - [ ] 消息加密，非对称加密传递/对称加密密钥
- [ ] 朋友圈: 发状态 + 好友点赞／评论
- [x] 使用 electron 打包成桌面应用 —— 2018 年 2 月 4 日
- [ ] 内置一些有趣的公众号，引入有趣的技术。
- [ ] 其他尝试
  - [x] 结合百度 AI 做人脸登录
  - [ ] redis 队列做数据推送？

## License

[MIT](http://opensource.org/licenses/MIT)
Copyright (c) 2017-present
