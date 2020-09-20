/**
 * Created by chenjz on 2017/8/3.
 */
'use strict';

import mongoose from 'mongoose';
const schema = mongoose.Schema;

const GROUPCONTACT_SCHEMA = {
  _id: false,
  gid: {
    type: schema.Types.ObjectId,
    ref: 'Group',
    required: true,
  },
  uid: {
    type: schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  alias: String, // 群别名，默认为 nickname
  rank: {
    // 排名，升级群主
    type: Number,
    required: true,
  },
  muteNotification: {
    // 是否屏蔽
    type: Boolean,
    default: false,
  },
  stickTop: {
    // 置顶
    type: Boolean,
    default: false,
  },
  status: {
    type: Number,
    default: 0,
  },
};

const GroupContactSchema = schema('GroupContact', GROUPCONTACT_SCHEMA);

GroupContactSchema.index({ gid: 1, uid: 1 }, { unique: true });

const GroupContact = mongoose.model('GroupContact', GroupContactSchema);

export default GroupContact;
