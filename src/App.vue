<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import 'normalize.css'

    export default {
        name: 'app',
        computed: {
            ...mapGetters([
                'isLogin'
            ])
        },
        async created() {
            console.log('app-00-', this.isLogin)

            await this.changeLoginInfo()

            // 这是否设置
            console.log('app没有跳转？-11-', this.isLogin);

            if (!this.isLogin) {
                this.$router.push('/login');
            } else {

                // 这时候直接 获取通讯录，渲染出聊天列表
                await this.initContacts()

                console.log('初始化通讯录后跳转到 WeChat')

                this.$router.push('/wechat');
            }
        },
        methods: {
            ...mapActions(['changeLoginInfo', 'initContacts']),
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
