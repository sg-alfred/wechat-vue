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
    userinfo: {},
    currentSubMenu: 'wechat'
}

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})



