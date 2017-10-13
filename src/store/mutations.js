/**
 * Created by chenjz on 2017/7/31.
 */
'use strict'
import Vue from 'vue'
import * as types from './mutation-types'

export default {

    // 修改登录信息
    [types.CHANGE_LOGININFO] (state, userinfo) {
        state.isLogin = !!userinfo
        state.userinfo = userinfo
    },

    // 保存 通讯录，不好！！实时查询吧～ 不然问题很多啊！！ 不要现在就想着优化，这个弄不来！
    [types.ALL_CONTACTS] (state, contacts) {

        console.log('vuex 缓存通讯录，现在，有新好友怎么办？--', JSON.stringify(contacts))

        // 不仅仅这样啊！还要 拉平了！
        contacts.forEach(contact => {

            let finfo = Object.assign({}, contact.fid);
            delete finfo._id
            delete finfo.id     // 为嘛还有这一个～

            contact.fid = contact.fid._id
            Object.assign(contact, finfo)

            contact.chatinfo = contact.chatid
            contact.chatid = contact.chatid._id

            contact.messages = []       // 放置 聊天信息

            Vue.set(state.contacts, contact._id, contact)
        })
    },

    // 缓存查询到的用户信息
    [types.SEARCH_STRANGERS] (state, userinfo) {
        Vue.set(state.strangers, userinfo._id, userinfo)
    },

    // 获取所有信息, 不需要这样啊～ 直接加到 messages 里就好了！！
    [types.RECEIVE_ALL] (state, { messages }) {

        // 获取当前的 聊天室
        let chatroom = state.contacts[state.currentContactID]

        chatroom.messages = messages

        /*chatroom.messages.forEach(message => {

            // create new thread if the thread doesn't exist
            // if (!state.chatrooms[message.chatid]) {
            //     createChatrooms(state, message.chatid, message.threadName)
            // }

            // add message
            addMessage(state, chatroom.contact, message)
        })*/
    },

    // 发送新消息
    [types.RECEIVE_MESSAGE] (state, message ) {

        console.log('消息 - mutation', message)

        // 获取当前的 聊天室
        let chatroom = state.contacts[state.currentContactID]

        chatroom.messages.push(message.payload)

        // addMessage(state, message)
    },

    // 切换 聊天室，但是，这个怎么触发？
    [types.SWITCH_CHATROOM] (state, id ) {
        console.log('设置当前聊天室id-11-', id)

        state.currentContactID = id.payload
    }
}


/**
 * 增加一个通讯录 到 vuex
 * ---------------------------------------------
 * @param state
 * @param id
 * @param name
 */
function addContact (state, id, name) {
    Vue.set(state.contacts, id, {
        id,
        name,
        messages: [],
        lastMessage: null
    })
}

/**
 * 增加一条信息到 vuex
 * ---------------------------------------------
 * @param state
 * @param chatroom
 * @param message
 */
function addMessage (state, chatroom, message) {

    // console.log('这个 chatroom', chatroom, message)

    chatroom.messages.push(message._id)

    // add it to the messages map
    Vue.set(state.messages, message._id, message)
}
