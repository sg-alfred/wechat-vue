/**
 * Created by chenjz on 2017/7/30.
 */
'use strict'

// import mongoose from 'mongoose'

const mongoose = require('mongoose')
const schema = mongoose.Schema

const MESSAGE_SCHAME = {
    // _id，聊天室的 lastid
    chatid: {
        type: schema.Types.ObjectId,
        ref: 'Chatroom'
    },
    fromid: {
        type: schema.Types.ObjectId,
        ref: 'Wxuser'
    },
    content: String,
    imgurl: String,
    sendtime: Date,     // 发送的时间
    status: {
        type: Number,
        enum: [0, 1, 2]     // 状态，(0: 正常; 1: 撤回; 2：删除 等)
    }
}

const MessageSchema = schema(MESSAGE_SCHAME)

// const Message = mongoose.model('Message', MessageSchema)

module.exports = MessageSchema
