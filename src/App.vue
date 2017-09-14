<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
//    import { mapGetters } from 'vuex'
    import 'normalize.css'

    export default {
        name: 'app',
        computed: {
            isLogin: localStorage.getItem('isLogin')
        },
        mounted() {
            // 发送请求,判断是否已经登录
            console.log('判断是否已经登录？')
            // 如果本地的状态是对的，比如，islogin = false; userid 有值，就不需要查了吧？
            // 刷新一下就又️执行了。。执行顺序！！这个 只执行一次～～
            if (this.isLogin) {        // 如果
                this.$http.get('/user/isLogin').then( (response) => {
                    let result = response.data;
                    console.log('请求后端 isLogin的响应：', result)
                    if (!result.code && '已登陆' == result.message) {

                        localStorage.setItem('islogin', true);      //
                        this.$router.push('/wechat');
                    } else {
                        localStorage.setItem('islogin', false);

                        // 需要判断一下，如果是注册界面，那就是可以刷新！
                        this.$message(result.message)
                        this.$router.push('/login');
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
    @import "./style/common.scss";

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
    a {
        color: #000000;
    }
    .router-fade-enter-active, .router-fade-leave-active {
        transition: opacity .3s;
    }
    .router-fade-enter, .router-fade-leave-active {
        opacity: 0;
    }
</style>
