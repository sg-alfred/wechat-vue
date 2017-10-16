/**
 * Created by chenjz on 2017/7/31.
 */
'use strict'

import { localStorage, kindOf } from '../util'
import { checkLogin, getContacts } from '../api'
import * as types from './mutation-types'


/**
 * 修改登录状态，设置 userinfo
 * 当发生 登录、退出、界面刷新 及 服务端session 失效时
 * ---------------------------------------------
 * @param commit
 * @param isLogin
 */
export const changeLoginInfo = async ({ commit }, isLogin = null) => {
    let userinfo = null
    // 这个时候请求后台合适吗？就是 应该这个时候！！
    // 检查 session 是否失效
    const response = await checkLogin()

    if (false === response.data.message) {
        localStorage('userinfo', null)
    } else {
        const localUserinfo = localStorage('userinfo')
        if (isLogin !== false && !!localUserinfo) {
            userinfo = JSON.parse(localUserinfo)
        }
    }
    // console.log('登录～～', response.data.message, isLogin, userinfo)

    commit(types.CHANGE_LOGININFO, userinfo);
}


export const initSocket = async ({ commit }, socket) => {
    console.log('initSocket--', socket)
    commit(types.INIT_SOCKET, socket)
}

/**
 * 保存查询到的 用户？没有必要！！
 * 每次查询的话都是最新的，然后直接替换掉 之前保存的
 * ---------------------------------------------
 * @param commit
 * @param userinfo
 * @returns {Promise.<void>}
 */
export const storeSearchUser = async ({ commit }, userinfo) => {
    commit(types.SEARCH_STRANGERS, userinfo)
}


/**
 * 初始化通讯录！这个可以有！
 * 一开始的时候就获取 通讯录，并根据这个 获取聊天室信息
 * ---------------------------------------------
 * @param commit
 * @param payload
 * @returns {Promise.<void>}
 */
export const initContacts = async ({ commit }, payload) => {
    const response = await getContacts();
    commit(types.ALL_CONTACTS, response.data.data)
}


/**
 * 更新 某个contact
 * ---------------------------------------------
 * @param commit
 * @param updateParams
 * @returns {Promise.<void>}
 */
export const updateContact = async ({ commit }, updateParams) => {
    commit(types.UPDATE_CONTACT, updateParams)
}


/**
 * 切换到新的聊天室
 * ---------------------------------------------
 * @param commit
 * @param contactid
 */
export const switchChatroom = ({ commit }, contactid) => {

    console.log('设置当前聊天室id-00-', contactid)

    commit(types.SWITCH_CHATROOM, { contactid })
}


/**
 * 初始化所有聊天记录，没有必要，耗时可能较长
 * 因此现在是 进入聊天室之后，分别加到 vuex
 * ---------------------------------------------
 * @param commit
 * @param messages
 */
export const syncMessages = ({ commit }, messages) => {
    commit(types.RECEIVE_ALL, { messages })
}


/**
 * 逐条增加信息，
 * 除了初始化，还包括之后的信息发送
 * ---------------------------------------------
 * @param commit
 * @param message
 */
export const addMessage = ({ commit }, message) => {
    console.log('消息 - action', message)
    commit(types.RECEIVE_MESSAGE, { message })
}
