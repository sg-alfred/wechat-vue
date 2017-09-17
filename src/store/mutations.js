/**
 * Created by chenjz on 2017/7/31.
 */
'use strict'
import * as types from './mutation-types'

export default {
    [types.CHANGE_ISLOGIN] (state, value) {
        state.isLogin = value
    },
    [types.SET_USERINFO] (state, value) {
        state.userinfo = value
    },
    [types.SET_USERID] (state, value) {
        state.userid = value
    },
}