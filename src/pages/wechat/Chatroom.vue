<!-- 聊天室，一对一或者群聊 -->
<template>
    <div class="chatroom-page">
        <header-section :go-back="true" :head-title="headTitle">
            <router-link :to="'/chatrooms/' + chatid + '/chatsetting'" slot="specialIcon" class="head-usericon right">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-myinfo-active"></use>
                </svg>
                <!--<i class="fa fa-user fa-12x" aria-hidden="true"></i>-->
            </router-link>
        </header-section>

        <div id="container" ref="container">
            <message-item
                    v-for="message in messages"
                    :key="message.id"
                    :contact="contactInfo.fid"
                    :message="message">
            </message-item>
        </div>

        <message-send
                    :chatid="chatid">
        </message-send>

        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { getMessages } from '../../api'
    import HeaderSection from '../../components/HeaderSection'
    import MessageItem from '../../components/chatroom/MessageItem'
    import MessageSend from '../../components/chatroom/MessageSend'

    export default {
        name: 'Chatroom',
        components: {
            HeaderSection,
            MessageItem,
            MessageSend
        },
        beforeMount() {
            this.chatid = this.$route.params.chatid;
            this.initMessage();
        },
        updated() {
            // 数据加载是 异步函数，mounted 的话，又可能落后了～
            // updated 就好了，数据加载完毕后再次执行～
            this.scrollToBottom();
        },
        data() {
            return {
                headTitle: 'hello~',
                chatid: '',
                contactInfo: {fid: {}},
                messages: []
            }
        },
        methods: {
            async initMessage() {
                const response = await getMessages(this.chatid)
                this.contactInfo = response.data.data.contactInfo;
                this.messages = response.data.data.allMessages;

                this.headTitle = this.contactInfo.fid.mobilephone
            },
            scrollToBottom() {
                this.$nextTick(() => {
                    // 有什么区别？～ 前者操作 DOM,
                    const container = this.$el.querySelector('#container');
                    // const container = this.$ref.container;
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
