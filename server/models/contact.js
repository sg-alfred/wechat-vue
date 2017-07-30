/**
 * Created by chenjz on 2017/7/30.
 */
'use strict'

import mongoose from 'mongoose'
const schema = mongoose.Schema

const CONTACT_SCHEMA = {
    uid : {
        type: schema.types.ObjectId,       // 这个应该是 用户表的主键！
        ref: 'User',        // 关联的是这个！！
        required: true
    },
    fid : {
        type: schema.types.ObjectId,
        ref: 'User',
        required: true
    },
    alias : String,
    description: String,
    status: {       // 0: 添加好友; 1: 已被同意; 2: 被拒绝; 3: 主动删除好友; 4: 被删除
        type: Number,
        required: true
    },
    addtime: Date,
    agreetime: Date,
    deletetime: Date,
    isshare: {      // 是否分享朋友圈信息
        type: Boolean,
        default: true
    },
    chatid: {
        type: schema.types.ObjectId,
        ref: 'Chatroom',
    },
    cleartime: Date,        // 最后一次聊天记录清除时间
    createtime : Date,
    updatetime : {
        type : Date,
        default : Date.now
    }
}

let ContactSchema = schema(CONTACT_SCHEMA)

// 创建 好友映射唯一索引
ContactSchema.index({'uid': 1, 'fid': 1}, {'unique': true})

const Contact = mongoose.model('Contact', ContactSchema)

// 可以做一些初始化！

export default Contact
