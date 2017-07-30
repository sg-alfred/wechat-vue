/**
 * Created by chenjz on 2017/7/30.
 */
'use strict'

import mongoose from 'mongoose'
const schema = mongoose.Schema

const CHATROOM_SCHEMA = {
    // chatid，就是自动生成的 _id
    chatname: {
        type: String
    },
    lastmsgid: {
        type: schema.types.ObjectId,
        ref: 'Message'
        // 没必要创建唯一索引！
    },
}

const Chatroom = mongoose.model('Chatroom', CHATROOM_SCHEMA)

export default Chatroom
