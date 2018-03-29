/**
 * Created by chenjz on 2017/10/27.
 */
'use strict'

import store from '../store'
import router from '../router'
import io from 'socket.io-client'
import config from '../../config'
// import { notification } from '../util'

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

    notifyMe(msgObj)
  })
}


function notifyMe(obj) {

  let notification

  const handle = {
    onclick(note) {
      note.onclick = function(event) {
        event.preventDefault(); // prevent the browser from focusing the Notification's tab

        // 根据chatid 获取通讯录，才能跳转到 聊天室～
        const contact = Object.values(store.state.contacts).find(x => x.chatid === obj.chatid)

        const contactid = contact._id

        router.push(`/chatrooms/${contactid}`)
      }
    }
  }

  // 先检查浏览器是否支持
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // 检查用户是否同意接受通知
  else if (Notification.permission === "granted") {
    notification = new Notification(obj.content);
    handle.onclick(notification)
  }

  // 否则我们需要向用户获取权限
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      if (permission === "granted") {
        notification = new Notification(obj.content);
        handle.onclick(notification)
      }
    });
  }
}

export default initSocketio
