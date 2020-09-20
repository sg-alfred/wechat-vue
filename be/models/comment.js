/**
 * 朋友圈的评论
 * Created by chenjz on 2017/10/19.
 */
'use strict';

import mongoose from 'mongoose';
const schema = mongoose.Schema;

const COMMENT_SCHEMA = {
  // 唯一id
  mid: {
    // 状态 id
    type: schema.Types.ObjectId,
    ref: 'Moment',
  },
  content: String, // 评论内容
  uid: String, // 评论人
  toid: String, // 给那条记录评论的
  touid: String, // 给谁评论的
  createtime: {
    type: Date,
    default: new Date(),
  },
};

const CommentSchema = schema(COMMENT_SCHEMA);

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;
