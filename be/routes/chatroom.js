/**
 * Created by chenjz on 2017/10/18.
 */
'use strict';

import express from 'express';
import Chatroom from '../controller/chatroom';

const router = express.Router();

// 获取聊天室信息
router.get('/', Chatroom.getChatrooms);

// 获取聊天室的 聊天记录
router.get('/:chatid', Chatroom.getMessages);

// 发送聊天信息
router.post('/:chatid', Chatroom.sendMessage);

export default router;
