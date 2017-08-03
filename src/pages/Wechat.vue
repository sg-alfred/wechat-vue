<template>
    <div class="">
        <header-section></header-section>
        <div class="contacts-container">
            <span>这是微信 界面！</span>

            <div>
                <img src="../assets/wechat.png" />
            </div>
        </div>

        <div>
            <p @click="getLoginState">isLogin? {{isLogin}}</p>
            <p>userid的值：{{userid}}</p>

            <p @click="emitTest">socket信息？还能触发事件嘛？</p>
        </div>
        <footer-section></footer-section>
    </div>
</template>

<script>
    import HeaderSection from '../components/HeaderSection'
    import FooterSection from '../components/FooterSection'

    import {mapGetters} from 'Vuex'

    export default {
        name: 'Contacts',
        components: {
            HeaderSection,
            FooterSection
        },
        computed: mapGetters({
            isLogin: 'getIsLogin',
            userid: 'getUserid',
            username: 'getUsername'
        }),
        methods: {
            getLoginState() {
                console.log(this.isLogin)
                console.log(this.userid)
            },
            emitTest() {

                // 显然，这个socket shi 没有定义的！！应该是 保存起来，以 用户id 为键值！！这样，才能够正在这里调用！
                // 但是，要保证不掉线啊！！ 刷新一下就掉了，这又什么用！

                // redis 缓存不错～ 但是，应该如何保存？ 还是要请求后端，然后再数据库？？
                socket.send('hello, server..');
            }
        }
    }
</script>

<style scoped>
    .contacts-container {

    }
    img {
        width: 200px;
    }
</style>
