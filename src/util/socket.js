/**
 * Created by chenjz on 2017/10/27.
 */
'use strict'

import { mapAction } from 'vuex'
import io from 'socket.io-client'

const methods = {
    ...mapAction(['initSocket'])
}


// 连接到 socket
const initSocketio = () => {

    // 登录成功 创建与 服务端的 socket 的连接～～
    // 但是，刷新一下就掉了？ 控制台 显示 disconnect 了～～ 就是掉了嘛～

    const socket = io.connect('http://localhost:8080')

    // 保存 socket 到 vuex ..
    // methods.initSocket(socket)

    socket.on('connect', () => {
        socket.send('hello, server..')
        socket.emit('login', userinfo)
    })

    socket.on('send.msg', (msg) => {
        console.log(msg)
    })
}

export default initSocketio
