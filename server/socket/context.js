/**
 * socket 的上下文环境
 *
 * Created by chenjz on 2017/10/17.
 */
'use strict'

// 上下文
class Context {
    constructor () {
        // this.socket = null
        this.onlineUsers = []
    }
    initSocket (socket) {
        // 初始化 socket 事件

        socket.on('login', (userinfo) => {
            console.log('服务端-userinfo-', userinfo)

            let info = {}
            info.socket = socket
            info.uid = userinfo.id
            info.username = userinfo.mobilephone

            this.onlineUsers[userinfo.id] = info
            // this.socket.emit('send.msg', 'hello, new user..')
        })

        socket.on('message', (msg) => {
            console.log('from client: ', msg);
        });

        // 如何主动断开连接？ socket.close()
        socket.on('disconnect', () => {
            console.log('disconnect!', socket.id);

            // Object.values(this.onlineUsers).find(x => x.socket.id === socket.id)

            Object.values(this.onlineUsers).forEach((ele, index) => {
                if (ele.socket.id === socket.id) {
                    delete this.onlineUsers[ele.uid]
                }
            })
        });
    }
}

module.exports = Context
