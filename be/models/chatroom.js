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
    type: schema.Types.ObjectId,
    ref: 'Message'
    // 没必要创建唯一索引！
  },
  // 最后信息冗余！
  content: String,
  imgurl: String,
  sendtime: Date
}

const ChatroomSchema = schema(CHATROOM_SCHEMA)

const Chatroom = mongoose.model('Chatroom', ChatroomSchema)

export default Chatroom
