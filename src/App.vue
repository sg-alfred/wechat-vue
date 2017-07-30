<template>
    <div id="app">
        <div v-if="!isLogin">
            <p>你暂未登录！</p>
        </div>
        <!-- <img src="./assets/logo.png"> -->
        <router-view></router-view>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'app',
        mounted() {
            // 发送请求,判断是否已经登录
            console.log('判断是否已经登录')
            this.$http.get('/user/isLogin').then(function (response) {
                console.log(response.body)
                if (response.body === '已登录') {
                    this.$store.dispatch('changeIsLogin', true)
                } else {
                    this.$store.dispatch('changeIsLogin', false)
                }
            })
        },
        computed: mapGetters({
            isLogin: 'getIsLogin'
        })
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
