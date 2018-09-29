# wechat-server

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

> 基于 exprees+mongodb，为仿微信项目提供后端服务

## Build Setup

``` bash
# download
git clone https://github.com/sgAlfred/wechat-server.git

# install dependencies
npm install

# serve at localhost:8081
npm start
```

## 目录树

- config           — 配置文件
- controller       — 业务处理
    + chatroom
    + contact
    + moment
    + user
- dbHandle         — mongodb 数据库链接
- middlewares      — 中间件
    + baiduAip
    + elasticsearch
    + log4js
- models           — mongodb 实例
    + chatroom
    + comment
    + contact
    + message
    + moment
    + user
- routes           — 后端路由
- test             — 单元测试
- app.js           — 入口文件
- package.json

## TODO(接口能力)

提供 RESTful API, 支持跨域资源共享。

* [X] GET /session：检测是否登录
* [X] POST /session: 登录(支持人类登录)
* [X] DELETE /session: 注销登录

* [X] GET /users：注册新用户
* [X] PATCH /users/:uid: 更新用户信息
* [X] POST /users/:uid/avatar: 更新用户头像
* [X] GET /users/:keyword: 按照微信号或手机号精确搜索

* [X] GET /contacts: 获取通讯录列表
* [X] GET /contacts/:fid: 获取好友信息详情(内部调用 /users/:id, 并数据脱敏)
* [ ] DELETE /contacts/:fid: 删除好友
* [X] GET /contacts/new: 添加我为好友的用户列表
* [X] POST /contacts/new: 发起好友请求
* [X] POST /contacts/handle: 处理好友请求(暂只支持同意)

* [X] GET /chatrooms: 获取聊天列表
* [X] GET /chatrooms/:chatid?offset=: 获取某聊天的信息，包括聊天记录(懒加载)
* [X] POST /chatrooms/:chatid: 发送聊天信息

* [ ] GET /moments: 朋友圈记录
* [ ] POST /moments: 发朋友圈
* [ ] DELETE /moments: 删除某条朋友圈
* [ ] GET /moments/:mid/comments: 获取某条朋友圈的评论
* [ ] POST /moments/:mid/comments: 发表评论(点赞？)

## License
[MIT](http://opensource.org/licenses/MIT)
Copyright (c) 2017-present