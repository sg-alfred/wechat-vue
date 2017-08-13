<template>
    <div class="wechat-page">
        <header-section :head-title="headTitle" :search-type="searchType" :has-dropdown="true"></header-section>

        <div style="height: 10px"></div>

        <section class="wechat-container">
            <!--<img src="../../assets/wechat.png" />-->
            <wechat-item
                    v-for="item in userList"
                    :key="item.id" :chatItem="item"
                    @into-chatroom="intoChatroom"
            ></wechat-item>
        </section>

        <div style="height: 20px;"></div>

        <section>
            <p @click="getLoginState">isLogin? {{isLogin}}</p>
            <p>userid的值：{{userid}}</p>

            <p @click="emitTest">socket信息？还能触发事件嘛？</p>
        </section>

        <footer-section></footer-section>
    </div>
</template>

<script>
    import { mapGetters } from 'Vuex'
    import HeaderSection from '../../components/HeaderSection'
    import FooterSection from '../../components/FooterSection'
    import WechatItem from '../../components/WechatItem'

    export default {
        name: 'Wechat',
        components: {
            HeaderSection,
            FooterSection,
            WechatItem
        },
        computed: mapGetters({
            isLogin: 'getIsLogin',
            userid: 'getUserid'
        }),
        created() {
            if (!this.isLogin) {
                this.$router.push('/login');
            }
        },
        data() {
            return {
                headTitle: '微信',
                searchType: 'all',
                userList: []
            }
        },
        mounted() {
            this.$http.get('../../static/initData/chatroom.json')
                .then(response => {
                // 这个闭包，this 应该不一样才对啊！
                this.userList = response.body.chatList;
            }, response => {
                alert("调用失败");
            })
        },
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
            },
            // 进入特定的聊天室
            intoChatroom(chatid) {
                console.log(chatid)
                this.$router.push('/chatroom');
            }
        }
    }
</script>

<style scoped>
    img {
        width: 200px;
    }
</style>
