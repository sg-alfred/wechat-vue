/**
 * Created by chenjz on 2017/10/19.
 */
'use strict';

import express from 'express';
import Moment from '../controller/moment';

const router = express.Router();

// 获取朋友圈
router.get('/', Moment.getAllMoments);

// 做评论
router.post('/:mid', Moment.makeComment);

// 删除某条评论
// router.delete('/:id', Moment.deleteComment)

export default router;
