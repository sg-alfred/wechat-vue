/**
 * Created by chenjz on 2017/9/19.
 */
'use strict'

const express = require('express')
const router = express.Router()

const Contact = require('../controller/contact')

router.get('/contacts', Contact.getContacts)

router.get('/contacts/:fid', Contact.getFriendDetail)

router.post('/contacts/:fid', Contact.addFriend)     // 发出好友请求
router.post('/contacts/', Contact.handleFriend)      // 处理好友请求
