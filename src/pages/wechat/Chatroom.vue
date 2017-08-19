<!-- 聊天室，一对一或者群聊 -->
<template>
    <div class="chatroom-page">
        <header-section :go-back="true" :head-title="headTitle">
            <router-link :to="'/chatroom/chatsetting/' + fid" slot="userIcon" class="head-usericon">
                <i class="fa fa-user fa-15x" aria-hidden="true"></i>
            </router-link>
        </header-section>

        <div class="container">
            <message-item
                    v-for="message in sortedMessages"
                    :key="message.id"
                    :message="message">
            </message-item>
        </div>

        <message-send></message-send>

        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import HeaderSection from '../../components/HeaderSection'
    import MessageItem from '../../components/chatroom/MessageItem'
    import MessageSend from '../../components/chatroom/MessageSend'

    export default {
        name: 'chatroom',
        components: {
            HeaderSection,
            MessageItem,
            MessageSend
        },
        computed: {
            ...mapGetters({
                isLogin: 'getIsLogin'
            })
        },
        created() {
            if (!this.isLogin) {
                this.$router.push('/login');
            }
            this.chatid = this.$route.params.chatid;
        },
        mounted() {
            // 应该是要获取 历史聊天记录！
            this.$http.get('/chatroom/getChatById', this.chatid).then((response) => {
                this.chatroomInfo = response.body.data;
            })
        },
        data() {
            return {
                headTitle: 'nihao',
                chatid: '',
                fid: '好友的用户id',
                chatroomInfo: {},
                sortedMessages: [{
                    fromid: '5986e71f72eff410624cb879',
                    content: '你吃了吗？',
                    sendtime: '2017-08-19 14:10:00'
                }, {
                    fromid: '5986e71f72eff410624cb874',
                    content: '吃了啊～',
                    sendtime: '2017-08-19 14:10:40'
                }, {
                    fromid: '5986e71f72eff410624cb879',
                    content: '吃啥了？',
                    sendtime: '2017-08-19 14:10:40'
                }, {
                    fromid: '5986e71f72eff410624cb874',
                    content: '不告诉你～',
                    sendtime: '2017-08-19 14:10:40'
                }, {
                    fromid: '5986e71f72eff410624cb874',
                    content: '你呢？',
                    sendtime: '2017-08-19 14:10:40'
                }, {
                    fromid: '5986e71f72eff410624cb879',
                    content: '吃了啊～',
                    sendtime: '2017-08-19 14:10:40'
                }, {
                    fromid: '5986e71f72eff410624cb874',
                    content: '那你吃啥了？',
                    sendtime: '2017-08-19 14:10:40'
                }, {
                    fromid: '5986e71f72eff410624cb879',
                    content: '我也不告诉你～',
                    sendtime: '2017-08-19 14:10:40'
                }, {
                    fromid: '5986e71f72eff410624cb874',
                    content: '傲娇！',
                    sendtime: '2017-08-19 14:10:40'
                }, {
                    fromid: '5986e71f72eff410624cb874',
                    content: '傲娇！',
                    sendtime: '2017-08-19 14:10:40'
                }, {
                    fromid: '5986e71f72eff410624cb874',
                    content: '傲娇！',
                    sendtime: '2017-08-19 14:10:40'
                }]
            }
        },
        methods: {
        }
    }
</script>

<style scoped>
    .head-usericon {
        float: right;
        padding: 15px 20px;
        color: white;
    }
    .chatroom-page {
        padding: 60px 0;
        background-color: #e8e8e8;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        height: 100%;
    }
    .container {
        overflow: auto;
        width: 100%;
        height: 100%;
    }
    .fa-15x {
        font-size: 1.5em;
    }
</style>
