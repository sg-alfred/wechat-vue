/**
 * Created by chenjz on 2017/8/3.
 */
'use strict'

import io from 'socket.io-client'

import kindOf from './kind-of'
import localStorage from './localstorage'


// 连接到 socket
const connectSocket = () => {

    // 登录成功 创建与 服务端的 socket 的连接～～
    // 但是，刷新一下就掉了？ 控制台 显示 disconnect 了～～ 就是掉了嘛～

    const socket = io.connect('http://localhost:8080')

    this.initSocket(socket)

    socket.on('connect', () => {
        socket.send('hello, server..')

        socket.emit('login', userinfo)
    })

    socket.on('send.msg', (msg) => {
        console.log(msg)
    })
}

// 判断对象是否为空
const isEmptyObject = (value) => {
    if (kindOf(value) !== 'object') return false
    for (let t in value) return false
    return true
}

// this ！！function ? 箭头函数 ?
export const gotoAddress = (path) => {
    console.log('调转到：', path);
    if (-1 === path) {
        this.$router.go(-1)
    } else {
        this.$router.push(path)
    }
}

export {
    kindOf,
    isEmptyObject,
    localStorage
}

// export default {
//     install(Vue, options) {
//         Vue.prototype.gotoAddress =  (path) => {
//             console.log('调转到：', path);
//             this.$router.push(path)
//         }
//         Vue.prototype.goback = () => {
//             this.$router.go(-1)
//         }
//     }
// }
