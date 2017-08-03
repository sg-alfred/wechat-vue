/**
 * Created by chenjz on 2017/7/31.
 */
'use strict'

export const changeIsLogin = ({commit}, value) => {
    commit('CHANGE_ISLOGIN', value)
}

export const setUserid = ({commit}, value) => {
    commit('SET_USERID', value)
}

export const setUsername = ({commit}, value) => {
    commit('SET_USERNAME', value)
}
