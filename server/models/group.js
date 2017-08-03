/**
 * Created by chenjz on 2017/8/3.
 */
'use strict'

import mongoose from 'mongoose'
const schema = mongoose.Schema

const GROUP_SCHEMA = {
    // groupid 自动生成
    groupname: {
        type: String,
        default: '群聊'
    },
    owner: {        // 群主
        type: String,
        required: true
    },
    notice: {       // 群公告
        type: String
    },
    createuser: ObjectId,
    createtime: Date,
    updatetime: {
        type: Date,
        default: Date.now()
    }
}

const GroupSchema = schema(GROUP_SCHEMA)

const Group = mongoose.model('Group', UserSchema)

export default Group
