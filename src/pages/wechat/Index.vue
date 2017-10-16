<template>
    <div class="wechat-page">
        <header-section :head-title="headTitle" :search-type="searchType" :has-dropdown="true"></header-section>

        <section class="wechat-container">
            <wechat-item
                    v-for="item in chatrooms"
                    :key="item.id" :chatItem="item"
                    @into-chatroom="intoChatroom"
            ></wechat-item>
        </section>

        <section class="absolute-center">
            <p @click="emitTest">socket信息？还能触发事件嘛？</p>
        </section>

        <footer-section></footer-section>
    </div>
</template>

<script>
    import { mapState } from 'Vuex'
    import { getChatrooms } from '../../api'
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
        computed: {
            ...mapState([
                'contacts'
            ])
        },
        data() {
            return {
                headTitle: '微信',
                searchType: 'all',
                chatrooms: []
            }
        },
        beforeMount() {
            this.chatrooms = Object.values(this.contacts).filter((ele, index) => {
                return ele.messages.length > 0 || !!ele.chatinfo.lastmsgid && (!ele.cleartime || ele.chatinfo.sendtime > ele.cleartime)
            })
//            console.log('聊天室信息--', JSON.stringify(this.chatrooms))
        },
        methods: {
            emitTest() {
                // 显然，这个socket shi 没有定义的！！应该是 保存起来，以 用户id 为键值！！这样，才能够正在这里调用！
                // 但是，要保证不掉线啊！！ 刷新一下就掉了，这又什么用！

                // redis 缓存不错～ 但是，应该如何保存？ 还是要请求后端，然后再数据库？？
                socket.send('hello, server..');
            },
            // 进入特定的聊天室
            intoChatroom(contactid) {
                this.$router.push('/chatrooms/' + contactid);
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../style/mixin.scss";

    .wechat-page {
        @include page(#ffffff);
        padding-bottom: 70px;
    }
    .wechat-container {
        overflow: auto;
        height: 100%;
    }
    .absolute-center {
        @include absoluteCenter();
        width: 80%;
        height: 20%;
    }
    .absoluteCenter p {
        padding: 5px;
    }
</style>
