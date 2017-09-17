/**
 * Created by chenjz on 2017/8/3.
 */
'use strict'

import kindOf from './kind-of'

const localStorage = {

    /**
     * 存储localStorage
     */
    setItem : (name, content) => {
        if (!name) return;
        if (typeof content !== 'string') {
            content = JSON.stringify(content);
        }
        window.localStorage.setItem(name, content);
    },

    /**
     * 获取localStorage
     */
    getItem : name => {
        if (!name) return;
        return window.localStorage.getItem(name);
    },

    /**
     * 删除localStorage
     */
    removeItem : name => {
        if (!name) return;
        window.localStorage.removeItem(name);
    }
};


// 这里面的 this 早就已经变样了！不指向 Vue !
export const gotoAddress = (path) => {
    console.log('调转到：', path);
    this.$router.push(path)
}

export const goback = () => {
    this.$router.go(-1)
}

export {
    kindOf,
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


