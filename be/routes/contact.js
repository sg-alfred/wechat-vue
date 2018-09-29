/**
 * Created by chenjz on 2017/9/19.
 */
'use strict'

import express from 'express'
import Contact from '../controller/contact'

const router = express.Router()

// 获取全部通讯录
router.get('/', Contact.getContacts)

// 更新通讯录
router.patch('/:id', Contact.updateContact)

// router.get('/:fid', Contact.getFriendDetail)

// 获取 添加我为好友 的用户列表
// 不对吧，应该是用 过滤信息的！！
router.get('/new', Contact.getNewFriends)

// 添加好友请求
router.post('/new', Contact.addNewFriend)

// 处理好友请求
router.post('/handle', Contact.handleFriend)

export default router
