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

        <!--<main>-->
            <section id="container" ref="container">
                <message-item
                        v-for="message in allMessages"
                        :key="message.id"
                        :contact="contactInfo"
                        :message="message">
                </message-item>
            </section>

            <message-send
                    :chatid="chatid">
            </message-send>
        <!--</main>-->

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
        // TODO 数据需要等待 headerSection 之后加载，不然，必然报错！
        data() {
            return {
                headTitle: 'A ChatRoom',
                contactid: '',
                chatid: '',
                currentHeight: 0
            }
        },
        computed: {
            ...mapGetters({
                contactInfo: 'currentChatroom'
            }),
            // 需要排序！顺便处理一下
            allMessages() {
                return this.contactInfo
                    ? this.contactInfo.messages.slice().sort((a, b) => new Date(a.sendtime) - new Date(b.sendtime))
                    : []
            }
        },
        async beforeMount() {
            this.contactid = this.$route.params.contactid

            // 还是觉得这样去获取 当前聊天室靠谱！！
            // 诶，可以这个时候设置 currentContactID 啊！
            await this.switchChatroom(this.contactid)

            this.chatid = this.contactInfo.chatid || ''

            this.headTitle = this.contactInfo.nickname || this.contactInfo.alias || this.contactInfo.mobilephone

            // 如果没有聊天记录, 则进行初始化。。
            if (this.allMessages.length === 0) {

                // 懒加载！ 一次加载一点点，比如，20条。并保存到 vuex
                // 后端必须是 递减的查找，前端需要 反置后 插入，使得 排序复杂度降到 0。。
                const response = await getMessages(this.chatid)
                await this.syncMessages(response.data.data.reverse())

                console.log('初始化聊天室信息', this.chatid)
            } else {
                console.log('聊天室数据已初始化', this.allMessages.length)
            }
        },
        updated() {
            // 数据加载是 异步函数，mounted 的话，又可能落后了～
            // updated 就好了，数据加载完毕后再次执行～
            this.$nextTick(() => {
                // 有什么区别？～ 前者操作 DOM,
                const container = this.$el.querySelector('#container');
//              const container = this.$refs.container;

                container.scrollTop = this.currentHeight !== 0
                    ? container.scrollHeight - this.currentHeight
                    : container.scrollHeight;
            })
        },
        mounted() {
            this.$el.querySelector('#container').addEventListener('scroll', this.handleScroll);
        },
        methods: {
            ...mapActions(['switchChatroom', 'syncMessages']),
            async handleScroll() {
                const container = this.$el.querySelector('#container');

                if (this.allMessages.length > 0 && container.scrollTop == 0 && !this.allMessages[0].first ) {

                    const sendtimeLt = this.allMessages[0].sendtime

                    // 获取到 第一条信息的时间，然后 传入，再次查询！
                    // 懒加载！ 一次加载一点点，比如，20条。并保存到 vuex
                    const response = await getMessages(this.chatid, { sendtimeLt })

                    let messages = response.data.data.reverse()

                    // 标记 最开始的一条信息～ 如果 小于限制值，则，判断没有更早的消息，
                    // 但是，如果正好等于20 ?? 那就再取一次，这样的话，又得操作 vuex..
                    if (messages.length < 20) messages[0].first = 1

                    // 这个时候 不能再跳回到 底端！！
                    // 需要记住 当前的位置！因为 不能一下子跳到最上面！最好有一个 动画的过渡过程！
                    this.currentHeight = container.scrollHeight

                    // 后端是 递减排序，前端改为 递增后再存入 vuex
                    await this.syncMessages(messages)
                }
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
        /*width: 100%;*/
        height: 100%;
    }
    .fa-12x {
        font-size: 1.2em;
    }
</style>
