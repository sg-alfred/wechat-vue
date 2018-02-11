/**
 * Created by chenjz on 2017/8/2.
 */
'use strict'

// import socket from 'socket.io'

module.exports = (app) => {
  const server = require('http').createServer(app)
  const io = require('socket.io')(server)

  // 监听 当有连接的。。
  io.on('connection', (socket) => {
    socket.emit('open')// 通知客户端已连接

    console.log('连接信息：', socket.id)

    socket.on('message', function (msg) {
      console.log('from client: ', msg)
    })

    // 这个id 需要怎么维护？ store 是一定的吧！！
    socket.on('toSomeone', (id, msg) => {
      // send a private message to the socket with the given id
      socket.to(id).emit('my message', msg)
    })

    socket.join('room 237', () => {
      let rooms = Objects.keys(socket.rooms)
      console.log('加入群聊', rooms) // [ <socket.id>, 'room 237' ]
      io.to('room 237', 'a new user has joined the room') // broadcast to everyone in the room
    })

    // to one room
    socket.to('others').emit('an event', { some: 'data' })
    // to multiple rooms
    socket.to('room1').to('room2').emit('hello')
    // a private message to another socket
    socket.to(/* another socket id */).emit('hey')

    // everyone gets it but the sender
    socket.broadcast.emit('an event', { some: 'data' })

    // the client may or may not receive it
    socket.volatile.emit('an event', { some: 'data' })

    socket.on('disconnect', function () {
      console.log('disconnect!')
    })
  })
}
