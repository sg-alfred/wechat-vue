/**
 * 前端请求 后端统一入口地址
 *
 * Created by chenjz on 2017/9/18.
 */
'use strict'

import axios from 'axios'

// 来一个中间件！！

/**
 * 检测是否登录
 */
export const checkLogin = () => axios.get('/user/checkLogin');

/**
 * 用户注册
 * @param registerInfo 注册信息
 */
export const userRegister = (registerInfo) => axios.post('/user/register', registerInfo)

/**
 * 用户登录
 * @param loginInfo  登录信息
 */
export const userLogin = (loginInfo) => axios.post('/user/login', loginInfo)

/**
 * 用户登出
 */
export const userLogout = () => axios.get('/user/logout')

/**
 * 更新自己的信息
 *  如 设置别名，性别，地区，个性签名等
 * @param id
 * @param updateInfo
 */
export const updateAlias = (id, updateInfo) => axios.patch('/users/' + id, updateInfo)

/**
 * 根据 条件搜用户，微信id 或 电话号码
 * @param keyword
 */
export const searchUser = (keyword) => axios.get('/users/' + keyword)

/**
 * 获取所有未被清空的聊天室信息
 */
export const getChatrooms = () => axios.get('../../static/initData/chatroom.json')

/**
 * 获取某聊天室的信息
 * @param chatid
 */
export const getMessage = (chatid) => axios.get('/chatrooms/' + chatid)

/**
 * 获取好友通讯录
 * @param uid
 */
export const getContacts = (uid) => axios.get('/contacts', uid)

/**
 * 这个是没有啥用的！
 */
export const getUserOperate = () => axios.get('../../static/initData/operate.json')

/**
 * 添加好友
 * @param addInfo
 */
export const addNewFriend = (addInfo) => axios.post('/contact/addNewFriend', addInfo)

/**
 * 获取添加我为好友的用户列表
 */
export const getNewFriends = () => axios.get('/contact/friends')

/**
 * 处理好友信息
 */
export const handleNewFriend = (contactid) => axios.post('/contact/handleFriend', contactid)

