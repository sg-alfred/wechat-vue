<!-- 聊天室，一对一或者群聊 -->

<template>
    <div class="">
        <header-section :go-back="true" :head-title="headTitle">
            <router-link :to="'/chatroom/chatsetting/' + fid" slot="userIcon" class="head-usericon">
                <!--<svg class="user_avatar">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user"></use>
                </svg>-->
                <i class="fa fa-user fa-15x" aria-hidden="true"></i>
            </router-link>
        </header-section>

        <div class="container">
            <p>这里是聊天的滚动部分！</p>
            <ul class="message-list" ref="list">
                <!--<message
                        v-for="message in sortedMessages"
                        :key="message.id"
                        :message="message">
                </message>-->
            </ul>
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
    .fa-15x {
        font-size: 1.5em;
    }
</style>
