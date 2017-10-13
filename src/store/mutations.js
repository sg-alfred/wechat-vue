/**
 * Created by chenjz on 2017/7/31.
 */
'use strict'
import Vue from 'vue'
import * as types from './mutation-types'

export default {

    /**
     * 修改登录信息
     * ---------------------------------------------
     * @param state
     * @param userinfo
     */
    [types.CHANGE_LOGININFO] (state, userinfo) {
        state.isLogin = !!userinfo
        state.userinfo = userinfo
        if (!userinfo) {
            state.currentContactID = null
            state.contacts = {}
        }
    },

    /**
     * vuex 保存 通讯录
     * 若有新好友 则附加进去
     * ---------------------------------------------
     * @param state
     * @param contacts
     */
    [types.ALL_CONTACTS] (state, contacts) {

        console.log('vuex 缓存通讯录', JSON.stringify(contacts))

        contacts.forEach(contact => {
            addContact(state, contact)
        })
    },


    /**
     * 更新某个 contact
     * ---------------------------------------------
     * @param state
     * @param updateParams
     */
    [types.UPDATE_CONTACT] (state, updateParams) {
        let contact = state.contacts[updateParams._id]
        Object.assign(contact, updateParams)
    },

    /**
     * 获取所有信息, 直接加到 messages 里就好了！
     * ---------------------------------------------
     * @param state
     * @param messages
     */
    [types.RECEIVE_ALL] (state, { messages }) {
        // 获取当前的 聊天室
        let chatroom = getCurrentContact(state)
        chatroom.messages = messages

        /* 不需要这样！！
        chatroom.messages.forEach(message => {
            // create new thread if the thread doesn't exist
            // if (!state.chatrooms[message.chatid]) {
            //     createChatrooms(state, message.chatid, message.threadName)
            // }

            // add message
            addMessage(state, chatroom.contact, message)
        })*/
    },

    /**
     * 增加一条信息到 vuex
     * 包括发送和接收到的新消息
     * ---------------------------------------------
     * @param state
     * @param message
     */
    [types.RECEIVE_MESSAGE] (state, { message } ) {

        console.log('消息 - mutation', message)

        // 获取当前的 聊天室
        let chatroom = getCurrentContact(state)

        chatroom.messages.push(message)

        // 还需要维护 最后一条聊天
        chatroom.chatinfo = message
    },

    /**
     * 切换 聊天室，进入聊天室触发
     * ---------------------------------------------
     * @param state
     * @param contactid
     */
    [types.SWITCH_CHATROOM] (state, { contactid } ) {

        console.log('设置当前聊天室id-11-', contactid)

        state.currentContactID = contactid
    }

}

/**
 * 增加一个通讯录 到 vuex
 * ---------------------------------------------
 * @param state
 * @param contact
 */
function addContact (state, contact) {

    let finfo = Object.assign({}, contact.fid);
    delete finfo._id
    delete finfo.id     // 为嘛还有这一个～

    contact.fid = contact.fid._id
    Object.assign(contact, finfo)

    contact.chatinfo = contact.chatid
    contact.chatid = contact.chatid._id

    contact.messages = []       // 放置 聊天信息

    Vue.set(state.contacts, contact._id, contact)
}


/**
 * 删除指定通讯录
 * ---------------------------------------------
 * @param state
 * @param contactid
 */
function deleteContact (state, contactid) {
    Vue.delete(state.contacts, contactid)
}

/**
 * 获取当前聊天室
 * ---------------------------------------------
 * @param state
 */
function getCurrentContact (state) {
    return state.currentContactID
        ? state.contacts[state.currentContactID]
        : {}
}

