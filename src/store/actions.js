/**
 * Created by chenjz on 2017/7/31.
 */
'use strict'
import { localStorage, kindOf } from '../util'
import * as types from './mutation-types'

/**
 * 界面刷新时
 * @param commit
 * @param value
 */
export const changeLoginInfo = ({ commit }, value = null) => {

    console.log('hhh, 是否登录？--', value);

    let userinfo = localStorage.getItem('userinfo')
        ? JSON.parse(localStorage.getItem('userinfo'))
        : null;

    if ( kindOf(value) === 'null') {
        value = !!userinfo
    }

    commit(types.CHANGE_ISLOGIN, value);        // 设置 isLogin
    commit(types.SET_USERINFO, userinfo);       // 设置 userinfo

}

