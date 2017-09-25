<!-- 聊天室，一对一或者群聊 -->
<template>
    <div class="chatroom-page">
        <header-section :go-back="true" :head-title="headTitle">
            <router-link :to="'/chatroom/chatsetting/' + fid" slot="specialIcon" class="head-usericon">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-myinfo-active"></use>
                </svg>
                <!--<i class="fa fa-user fa-12x" aria-hidden="true"></i>-->
            </router-link>
        </header-section>

        <div id="container">
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
    import { getMessage } from '../../api'
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
        },
        created() {
            this.chatid = this.$route.params.chatid;
        },
        beforeMount() {
            this.initMessage();
        },
        mounted() {
            this.scrollToBottom();
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
                    content: '吃了啊～吃了啊～吃了啊～吃了啊～吃了啊～吃了啊～吃了啊～吃了啊～吃了啊～吃了啊～吃了啊～',
                    sendtime: '2017-08-19 14:10:42'
                }, {
                    fromid: '5986e71f72eff410624cb879',
                    content: '吃啥了？',
                    sendtime: '2017-08-19 14:10:45'
                }, {
                    fromid: '5986e71f72eff410624cb874',
                    content: '不告诉你～',
                    sendtime: '2017-08-19 14:10:47'
                }, {
                    fromid: '5986e71f72eff410624cb874',
                    content: '你呢？',
                    sendtime: '2017-08-19 14:10:49'
                }, {
                    fromid: '5986e71f72eff410624cb879',
                    content: '吃了啊～',
                    sendtime: '2017-08-19 14:10:50'
                }, {
                    fromid: '5986e71f72eff410624cb874',
                    content: '那你吃啥了？',
                    sendtime: '2017-08-19 14:10:54'
                }, {
                    fromid: '5986e71f72eff410624cb879',
                    content: '我也不告诉你～',
                    sendtime: '2017-08-19 14:10:59'
                }, {
                    fromid: '5986e71f72eff410624cb874',
                    content: '傲娇！',
                    sendtime: '2017-08-19 14:12:23'
                }, {
                    fromid: '5986e71f72eff410624cb874',
                    content: '傲娇！',
                    sendtime: '2017-08-19 14:12:25'
                }, {
                    fromid: '5986e71f72eff410624cb874',
                    content: '傲娇！',
                    sendtime: '2017-08-19 14:12:27'
                }]
            }
        },
        methods: {
            async initMessage() {
                const response = await getMessage(this.chatid)
                this.chatroomInfo = response.data.data;
            },
            scrollToBottom() {
                this.$nextTick(() => {
                    let container = this.$el.querySelector("#container");
                    container.scrollTop = container.scrollHeight;
                })
            }
        },
        watch: {
            // 有新消息的时候自动最下方！
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../style/mixin.scss";

    .head-usericon {
        float: right;
        padding: 18px 20px;
        color: white;
    }
    .chatroom-page {
        @include page();
        padding-bottom: 60px;
    }
    #container {
        overflow: auto;
        width: 100%;
        height: 100%;
    }
    .fa-12x {
        font-size: 1.2em;
    }
</style>
