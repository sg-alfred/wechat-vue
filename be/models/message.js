/**
 * Created by chenjz on 2017/7/30.
 */
'use strict'

import mongoose from 'mongoose'
const schema = mongoose.Schema

const MESSAGE_SCHEMA = {
  // _id，聊天室的 lastid
  chatid: { // 必然会 先得道聊天室 id 然后在 得到消息，没有必要双向，一样的，前端处理！
    type: schema.Types.ObjectId,
    ref: 'Chatroom'
  },
  fromid: { // 没有必要 带！ 这样数据量会太大！ 前端处理一下就好！
    type: schema.Types.ObjectId,
    ref: 'User'
  },
  content: String,
  imgurl: String,
  sendtime: Date, // 发送的时间
  status: {
    type: Number,
    enum: [0, 1, 2] // 状态，(0: 正常; 1: 撤回; 2：删除 等)
  }
}

const MessageSchema = schema(MESSAGE_SCHEMA)

const Message = mongoose.model('Message', MessageSchema)

export default Message
