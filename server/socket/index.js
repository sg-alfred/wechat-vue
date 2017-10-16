/**
 * Created by chenjz on 2017/10/16.
 */
'use strict'

module.exports = (server) => {

    // 原生http 服务，这样的话，跨源了～～
    // const server = require('http').createServer(app);

    // Socket.io服务
    const io = require('socket.io')(server)

    let onlineUsers = {}

    // 监听 当有连接的。。
    io.on('connection', (socket) => {

        console.log('连接信息：', socket.id);

        socket.on('login', (userinfo) => {

            console.log('服务端-userinfo-', userinfo)

            let info = {}
            info.socketid = socket.id
            info.uid = userinfo.id
            info.username = userinfo.mobilephone

            onlineUsers[userinfo.id] = info

            socket.emit('send.msg', 'hello, new user..')
        })

        socket.on('message', (msg) => {
            console.log('from client: ', msg);
        });

        // 如何主动断开连接？ socket.close()
        socket.on('disconnect', (uid) => {
            console.log('disconnect!', uid, socket.id);

            Object.values(onlineUsers).forEach((ele, index) => {
                if (ele.socketid === socket.id) {
                    delete onlineUsers[ele.uid]
                }
            })
        });
    });

    // 获取当前在线用户
    setInterval(() => {
        // 所有的 onlineUsers
        console.log('已连接的所有用户: ', onlineUsers)

        // 获取所有连接，包括下面的 namespace
        io.clients((error, clients) => {
            if (error) throw error;
            console.log(clients);
        });

    }, 10000)

}

