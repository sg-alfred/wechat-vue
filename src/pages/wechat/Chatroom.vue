<!-- 聊天室，一对一或者群聊 -->
<template>
    <div class="chatroom-page">
        <header-section :go-back="true" :head-title="headTitle">
            <router-link :to="'/chatrooms/' + contactid + '/chatsetting'" slot="specialIcon" class="head-usericon right">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-myinfo-active"></use>
                </svg>
                <!--<i class="fa fa-user fa-12x" aria-hidden="true"></i>-->
            </router-link>
        </header-section>

        <div id="container" ref="container">
            <message-item
                    v-for="message in allMessages"
                    :key="message.id"
                    :contact="contactInfo"
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
    import { mapGetters, mapActions } from 'vuex'
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
        data() {
            return {
                headTitle: 'hello~',
                contactid: '',
                chatid: '',
            }
        },
        computed: {
            ...mapGetters({
                contactInfo: 'currentChatroom'
            }),
            allMessages() {
                // 不要，要获取到详细的信息了！而不仅仅是 id
                console.log('聊天信息的id', this.contactInfo.messages)
                return this.contactInfo.messages
            }
        },
        beforeMount() {
            this.contactid = this.$route.params.contactid
            this.chatid = this.contactInfo.chatid

            this.headTitle = this.contactInfo.nickname || this.contactInfo.alias || this.contactInfo.mobilephone

            // 如果没有 聊天记录则初始化。。
            if (this.contactInfo.messages.length === 0) {
                this.initMessages();
            } else {
                console.log('聊天室数据已初始化', this.contactInfo.messages.length)
            }
        },
        updated() {
            // 数据加载是 异步函数，mounted 的话，又可能落后了～
            // updated 就好了，数据加载完毕后再次执行～
            this.scrollToBottom();
        },
        methods: {
            ...mapActions(['syncMessages']),
            async initMessages() {

                // 已经不能这样获取数据了！！
                const response = await getMessages(this.chatid)

                // 这些信息都要存到 vuex 里面！！
//                let chatroom = {};
//                chatroom.contact = this.contactInfo
//                chatroom.messages = response.data.data

                this.syncMessages(response.data.data)

                console.log('初始化聊天室信息', JSON.stringify(this.contactInfo), this.chatid)
            },
            scrollToBottom() {
                this.$nextTick(() => {
                    // 有什么区别？～ 前者操作 DOM,
                    const container = this.$el.querySelector('#container');
                    // const container = this.$refs.container;
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
