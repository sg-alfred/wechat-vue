/**
 * Created by chenjz on 2017/8/3.
 */
'use strict'

let localStorage = {

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

export default localStorage

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


