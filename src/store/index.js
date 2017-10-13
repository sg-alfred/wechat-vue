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
    userid: '',
    userinfo: {
        /*
        id: '',
        username: ''
        */
    },
    currentContactID: null,
    contacts: {     // 通讯录
        /*
        id: {
            id,
            alias,
            mobilephone,
            chatid,
            chatinfo: {       // 聊天室信息，存有 最后一条信息，这个怎么看～

            },
            messages: [...ids], 【如果 有的话，那就显示在 聊天里！！】
            lastMessage
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
