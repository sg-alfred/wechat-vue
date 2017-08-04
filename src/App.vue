<template>
    <div id="app">
        <div>
            <p v-if="!isLogin">你暂未登录！</p>
            <p v-else="isLogin">你已登陆</p>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'app',
        computed: mapGetters({
            isLogin: 'getIsLogin',
            userid: 'getUserid',
            username: 'getUsername'
        }),
        mounted() {
            // 发送请求,判断是否已经登录
            console.log('判断是否已经登录')

            // 如果本地的状态是对的，比如，islogin = false; userid 有值，就不需要查了吧？

            // 刷新一下就又️执行了。。执行顺序！！这个 只执行一次～～
            // getters, 到底什么时候可以使用？如果直接 用 加判断，提示 未定义！
//            if (isLogin && userid) {
//                this.$http.get('/user/isLogin').then( (response) => {
//                    console.log(response.body)
//                    if (response.body === '已登录') {
//                        this.$store.dispatch('changeIsLogin', true)
//
//                        this.$router.push('/wechat');
//
//                    } else {
                        this.$store.dispatch('changeIsLogin', false)
                        this.$router.push('/login');
//                    }
//                })
//            }
        }
    }
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 5px;
}
</style>
