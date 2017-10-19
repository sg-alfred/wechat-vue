/**
 *
 * Created by chenjz on 2017/9/18.
 */
'use strict'

import express from 'express'
import User from '../controller/user'

const router = express.Router()

// 注册新用户
router.post('/', User.register)

// 更新用户信息
router.patch('/:id', User.updateUser)

// 搜索用户, 这个应该带上个参数吧？
// 获取当前也不用，因为目前不存在根据 id 查的情况
router.get('/:keyword', User.searchUser)

export default router