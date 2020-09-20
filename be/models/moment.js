/**
 * 朋友圈的状态
 * Created by chenjz on 2017/10/19.
 */
'use strict';

import mongoose from 'mongoose';
const schema = mongoose.Schema;

const MOMENT_SCHEMA = {
  // 唯一id
  uid: {
    type: schema.Types.ObjectId,
    ref: 'User',
  },
  content: String, // 文字信息
  photos: Array, // 图片，最多九张
  video: String, // 视频地址
  createtime: Date,
  upvote: Array, // 点赞用户
};

const MomentSchema = schema(MOMENT_SCHEMA);

const Moment = mongoose.model('Moment', MomentSchema);

export default Moment;
