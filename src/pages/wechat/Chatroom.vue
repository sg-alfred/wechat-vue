<!-- 聊天室，一对一或者群聊 -->
<template>
    <div class="chatroom-page">
        <header-section :go-back="true" :head-title="headTitle">
            <router-link :to="'/chatroom/' + chatid + '/chatsetting'" slot="specialIcon" class="head-usericon right">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-myinfo-active"></use>
                </svg>
                <!--<i class="fa fa-user fa-12x" aria-hidden="true"></i>-->
            </router-link>
        </header-section>

        <div id="container">
            <message-item
                    v-for="message in messages"
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
        mounted() {
            this.scrollToBottom();
        },
        data() {
            return {
                headTitle: 'nihao',
                chatid: '',
                messages: []
            }
        },
        methods: {
            async initMessage() {
                const response = await getMessages(this.chatid)
                this.messages = response.data.data;
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
