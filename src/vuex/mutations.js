/**
 * Created by chenjz on 2017/7/31.
 */
'use strict'

export default {
    CHANGE_ISLOGIN (state, value) {
        state.isLogin = value
    },
    SET_USERID (state, value) {
        state.userid = value
    },
    SET_USERINFO (state, value) {
        state.userinfo = value
    }
}