/**
 * Created by chenjz on 2017/8/3.
 */
'use strict'

// export const gotoAddress = (path) => {
//     console.log('调转路径：', path);
//
//     this.$router.push(path)
// }

// 这个 this，$router 未定义！！

export default {
    install(Vue, options) {
        Vue.prototype.gotoAddress =  (path) => {
            console.log('调转到：', path);
            this.$router.push(path)
        }
        Vue.prototype.goback = () => {
            this.$router.go(-1)
        }
    }
}


