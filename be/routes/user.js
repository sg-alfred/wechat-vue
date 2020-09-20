/**
 *
 * Created by chenjz on 2017/9/18.
 */
'use strict';

import express from 'express';
import User from '../controller/user';

const router = express.Router();

// 注册新用户
router.post('/', User.register);

// 更新用户信息
router.patch('/:id', User.updateUser);

router.post('/:id/avatar', User.uploadImg);

// 按照微信号、手机号精确搜索
router.get('/:keyword', User.searchUser);

export default router;
