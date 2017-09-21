/**
 * Created by chenjz on 2017/8/3.
 */
'use strict'

import kindOf from './kind-of'
import localStorage from './localstorage'

// 判断对象是否为空
const isEmptyObject = (value) => {
    if (kindOf(value) !== 'object') return false
    for (let t in value) return false
    return true
}


/*
const localStorage = {

    /!**
     * 存储localStorage
     *!/
    setItem : (name, content) => {
        if (!name) return;
        if (typeof content !== 'string') {
            content = JSON.stringify(content);
        }
        window.localStorage.setItem(name, content);
    },

    /!**
     * 获取localStorage
     *!/
    getItem : name => {
        if (!name) return;
        return window.localStorage.getItem(name);
    },

    /!**
     * 删除localStorage
     *!/
    removeItem : name => {
        if (!name) return;
        window.localStorage.removeItem(name);
    }
};
*/

// this ！！
export const gotoAddress = (path) => {
    console.log('调转到：', path);
    if (-1 === path) {
        this.$router.go(-1)
    } else {
        this.$router.push(path)
    }
}

export {
    kindOf,
    isEmptyObject,
    localStorage
}

// export default {
//     install(Vue, options) {
//         Vue.prototype.gotoAddress =  (path) => {
//             console.log('调转到：', path);
//             this.$router.push(path)
//         }
//         Vue.prototype.goback = () => {
//             this.$router.go(-1)
//         }
//     }
// }


