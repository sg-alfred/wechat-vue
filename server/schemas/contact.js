/**
 * Created by chenjz on 2017/7/30.
 */
'use strict'

// import mongoose from 'mongoose'

const mongoose = require('mongoose')
const schema = mongoose.Schema

const CONTACT_SCHEMA = {
    uid : {
        type: schema.Types.ObjectId,       // 这个应该是 用户表的主键！
        ref: 'User',        // 关联的是这个！！
        required: true
    },
    fid : {
        type: schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    nickname : String,         // 好友设置的昵称
    remark: String,            // 发送给好友的第一句话，我是……
    description: String,
    status: {       // 0: 添加好友; 1: 已被同意; 2: 被拒绝; 3: 主动删除好友; 4: 被删除
        type: Number,
        required: true
    },
    addtime: Date,      // TODO 如何知道是 加还是被加？根据 status ?
    agreetime: Date,
    deletetime: Date,
    isshare: {      // 是否分享朋友圈信息
        type: Boolean,
        default: true
    },
    chatid: {
        type: schema.Types.ObjectId,
        ref: 'Chatroom',
    },
    lasttime: Date,         // 最近一次进入聊天室时间，统计未读记录
    cleartime: Date,        // 聊天记录清除时间
    createtime : Date,
    updatetime: {
        type: Date,
        default: Date.now
    }
}

const ContactSchema = schema(CONTACT_SCHEMA)

// 创建 好友映射唯一索引
ContactSchema.index({'uid': 1, 'fid': 1}, {'unique': true})

ContactSchema.pre('save', function(next) {
    if (this.isNew) {
        this.createtime = this.updatetime = Date.now()
    } else {
        this.updatetime = Date.now()
    }
    next()
})

// const Contact = mongoose.model('Contact', ContactSchema)

// 可以做一些初始化！

module.exports = ContactSchema
