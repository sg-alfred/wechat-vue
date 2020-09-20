/**
 * Created by chenjz on 2017/10/19.
 */
'use strict';

import express from 'express';
import User from '../controller/user';

const router = express.Router();

// 检查用户登录
router.get('/', User.checkLogin);

// 用户登录
router.post('/', User.login);

// 注销登录
router.delete('/', User.logout);

export default router;
