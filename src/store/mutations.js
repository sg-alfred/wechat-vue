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

            Vue.set(state.contacts, contact._id, contact)
        })
    },

    // 缓存查询到的用户信息
    [types.SEARCH_STRANGERS] (state, userinfo) {
        Vue.set(state.strangers, userinfo._id, userinfo)
    },

    // 获取所有信息
    [types.RECEIVE_ALL] (state, { messages }) {
        let latestMessage
        messages.forEach(message => {
            // create new thread if the thread doesn't exist
            if (!state.threads[message.threadID]) {
                createChatrooms(state, message.threadID, message.threadName)
            }
            // mark the latest message
            if (!latestMessage || message.timestamp > latestMessage.timestamp) {
                latestMessage = message
            }
            // add message
            addMessage(state, message)
        })
    },

    // 发送新消息
    [types.RECEIVE_MESSAGE] (state, { message }) {
        addMessage(state, message)
    },
}


function createChatrooms (state, id, name) {
    Vue.set(state.chatrooms, id, {
        id,
        name,
        messages: [],
        lastMessage: null
    })
}

/**
 * 增加一条信息到 vuex
 *
 * @param state
 * @param message
 */
function addMessage (state, message) {
    // add a `isRead` field before adding the message
    message.isRead = message.threadID === state.currentThreadID
    // add it to the thread it belongs to
    const thread = state.threads[message.threadID]
    if (!thread.messages.some(id => id === message.id)) {
        thread.messages.push(message.id)
        thread.lastMessage = message
    }
    // add it to the messages map
    Vue.set(state.messages, message.id, message)
}
