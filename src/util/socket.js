/**
 * Created by chenjz on 2017/10/27.
 */
'use strict'

import store from '../store'
import io from 'socket.io-client'
import config from '../../config'

const proxypath = process.env.NODE_ENV === 'production' ? config.build.proxypath : config.dev.proxypath

// 连接到 socket
const initSocketio = async (userinfo, from) => {
  // 登录成功 创建与 服务端的 socket 的连接～～
  // 但是，刷新一下就掉了？ 控制台 显示 disconnect 了～～ 就是掉了嘛～

  console.log('成功进入 socket.io 模块！')

  const socket = io.connect(proxypath)

  // 保存 socket 到 vuex ..
  await store.dispatch('initSocket', socket)

  // 连接到服务器后，发送给服务器
  socket.on('connect', () => {
    socket.send(`hello, server.. ${from}`)
    socket.emit('login', userinfo)
  })

  // 监听事件，接受新消息后 更新聊天室
  socket.on('send.msg', (msgObj) => {
    console.log(`${from} 新消息`, msgObj)
    store.dispatch('addMessage', msgObj)
  })
}

export default initSocketio
