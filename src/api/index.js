/**
 * 前端请求 后端统一入口地址
 *
 * Created by chenjz on 2017/9/18.
 */
'use strict'

import axios from 'axios'

// 来一个中间件！！

export const checkLogin = () => axios.get('/user/checkLogin');

export const userRegister = (registerInfo) => axios.post('/user/register', registerInfo)

export const userLogin = (loginInfo) => axios.post('/user/login', loginInfo)

export const userLogout = () => axios.get('/user/logout')

export const getChatrooms = () => axios.get('../../static/initData/chatroom.json')

export const getMessage = (chatid) => axios.get('/chatroom/:id', chatid)

export const getContacts = (uid) => axios.get('/contacts', uid)

export const getUserOperate = () => axios.get('../../static/initData/operate.json')


