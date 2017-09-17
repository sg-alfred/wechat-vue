<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import 'normalize.css'

    export default {
        name: 'app',
        computed: {
            ...mapGetters([
                'isLogin'
            ])
        },
        mounted() {
            // 已登录，跳转
            if (this.isLogin) {
                this.$router.push('/wechat');
            } else {        // 如果没有登录

                this.$router.push('/login');

                // 不合理吧，前端浏览器 清楚了缓存，总不能 可以直接登录吧～
//                this.$http.get('/user/isLogin').then( (response) => {
//                    let result = response.data;
//                    console.log('请求后端 isLogin的响应：', result)
//                    if (!result.code && '已登陆' == result.message) {
//
//                        localStorage.setItem('islogin', true);      //
//                        this.$router.push('/wechat');
//                    } else {
//                        localStorage.setItem('islogin', false);
//
//                        // 需要判断一下，如果是注册界面，那就是可以刷新！
//                        this.$message(result.message)
//                        this.$router.push('/login');
//                    }
//                })
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
