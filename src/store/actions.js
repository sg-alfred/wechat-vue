/**
 * Created by chenjz on 2017/7/31.
 */
'use strict'
import localStorage from '../util'
import * as types from './mutation-types'

export const changeIsLogin = ({ commit }, value = undefined) => {
    if (typeof value === 'undefined') {
        value = !!localStorage.getItem('userinfo')
    }
    commit(types.CHANGE_ISLOGIN, value);
}

export const setUserinfo = ({ commit }) => {
    commit(types.SET_USERINFO, JSON.parse(localStorage.getItem('userinfo')))
}

export const setUserid = ({ commit }, value) => {
    commit(types.SET_USERID, value)
}


