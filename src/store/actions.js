/**
 * Created by chenjz on 2017/7/31.
 */
'use strict'
import { localStorage, kindOf } from '../util'
import { checkLogin, getContacts } from '../api'
import * as types from './mutation-types'

/**
 * 登录、退出、界面刷新 及 服务端session 失效时，设置 userinfo
 * ---------------------------------------------
 * @param commit
 * @param isLogin
 */
export const changeLoginInfo = async ({ commit }, isLogin = null) => {

    let userinfo = null;
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


export const initContacts = async ({ commit }, userid) => {
    console.log('初始化通讯录', userid);
    const response = await getContacts(userid);
    commit(types.ALL_CONTACTS, response.data.data)
}


export const storeSearchUser = async ({ commit }, userinfo) => {
    commit(types.SEARCH_STRANGERS, userinfo)
}

/**
 * 初始化所有聊天记录，没有必要，耗时可能较长
 * @param commit
 */
export const getAllMessages = ({ commit }) => {
    // 必然根据 用户id 获取聊天室信息，然后再 根据聊天室 获取信息。。
    // 这样的存储格式，不需要前端有 太多的 逻辑处理！
}


/**
 *
 * @param commit
 * @param payload
 */
export const addMessage = ({ commit }, payload) => {
    commit(types.RECEIVE_MESSAGE, {
        message
    })
}
