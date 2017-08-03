/**
 * Created by chenjz on 2017/8/3.
 */
'use strict'

import mongoose from 'mongoose'
const schema = mongoose.Schema

const GROUPCONTACTSCHEMA = {
    gid: {
        type: schema.types.ObjectId,
        ref: Group
    },
    uid: {
        type: schema.types.ObjectId,
        ref: User
    },
    alias: String,      // 群别名，默认为 nickname
    rank: {         // 排名，升级群主
        type: Number,
        required: true
    },
    muteNotification: {     // 是否屏蔽
        type: Boolean,
        default: false
    },
    stickTop: {     // 置顶
        type: Boolean,
        default: false
    },
    status: {
        type: Number,
        default: 0
    }
}

const GroupContactSchema = schema('GroupContact', GROUPCONTACTSCHEMA)

export default GroupContactSchema
