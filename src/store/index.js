/**
 * Created by chenjz on 2017/7/31.
 */
'use strict'

import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
    isLogin: false,
    currentSubMenu: 'wechat',
    userid: '',
    userinfo: {
        /*
        id: '',
        username: ''
        */
    },
    contacts: {     // 通讯录
        /*
        id: {
            id,
            alias,
            mobilephone,
        }
        */
    },
    strangers: {    // 查询过的好友信息
        /*
         id: {
             id,
             mobilephone,
         }
         */
    },
    chatrooms: {      // 聊天室！
        /*
        id: {
            id,         // chatid，聊天室id
            name,       // chatname, 聊天室名称
            messages:[...ids],      // 消息id 列表
            lastMessage             // 最后一条消息
        }
        */
    },
    messages: {
        /*
        id: {
            id,     // 消息id
            chatid,       // 聊天室id
            fromid,       // 发送方id
            content,
            imgurl,
            sendtime
        }
        */
    }
}

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})
