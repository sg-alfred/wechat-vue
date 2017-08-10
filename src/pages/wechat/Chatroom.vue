<!-- 聊天室，一对一或者群聊 -->

<template>
    <div class="">
        <header-section :goBack="true" :head-title="headTitle">
            <router-link :to="'/userProfile/' + fid" slot="userIcon" class="head-usericon">
                <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <line x1="10" y1="20" x2="30" y2="20" style="stroke:rgb(255,255,255);stroke-width:2"/>
                    <line x1="20" y1="10" x2="20" y2="30" style="stroke:rgb(255,255,255);stroke-width:2"/>
                </svg>
                <!--<svg class="user_avatar">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user"></use>
                </svg>-->
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

        <footer class="send-section">

        </footer>
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
        },
        data() {
            return {
                headTitle: 'nihao',
                fid: '好友的用户id',
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
        margin: 10px 5px 0 0;
    }
</style>
