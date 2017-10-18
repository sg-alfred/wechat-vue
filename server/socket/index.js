/**
 * Created by chenjz on 2017/10/16.
 */
'use strict'

// 原生http 服务，这样的话，跨源了～～
// const server = require('http').createServer(app);

// Socket.io服务
// const io = require('socket.io')(server)

const Context = require('./context')

let ctx = new Context()

// function 获取上下文环境的
const getContext = () => { return ctx }

// 获取当前在线用户
const getOnlineUsers = () => { return ctx.onlineUsers }

module.exports = {
    ctx,
    getContext,
    getOnlineUsers
}


