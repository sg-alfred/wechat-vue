<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import 'normalize.css'
    import io from 'socket.io-client'

    export default {
        name: 'app',
        computed: {
            ...mapState([
                'isLogin',
                'userinfo'
            ])
        },
        async created() {
            console.log('app-00-', this.isLogin)

            await this.changeLoginInfo()

            // 这是否设置
            console.log('app没有跳转？-11-', this.isLogin);

            if (!this.isLogin) {
                console.log('app 跳转到 login 界面')
                this.$router.push('/login');
            } else {

                // 这时候直接 获取通讯录，渲染出聊天列表
                await this.initContacts()

                await this.connectSocket(this.userinfo)

                console.log('初始化通讯录后跳转到 WeChat')
                this.$router.push('/wechat');
            }
        },
        methods: {
            ...mapActions(['changeLoginInfo', 'initContacts', 'initSocket', 'addMessage']),
            async connectSocket(userinfo) {
                // 登录成功 创建与 服务端的 socket 的连接～～
                // 但是，刷新一下就掉了？ 控制台 显示 disconnect 了～～ 就是掉了嘛～

                const socket = io.connect('http://localhost:8081')

                await this.initSocket(socket)

                // 连接到服务器
                socket.on('connect', () => {
                    socket.send('hello, server.. app.vue')
                    socket.emit('login', userinfo)
                })

                // 处理获取到的消息！！
                socket.on('send.msg', (msgObj) => {
                    console.log('app 新消息', msgObj)
                    this.addMessage(msgObj)
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
