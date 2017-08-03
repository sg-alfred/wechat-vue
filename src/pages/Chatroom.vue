<!-- 聊天室，一对一或者群聊 -->

<template>
    <div class="">
        <div class="head-section">
            <i class="el-icon-arrow-left" @click="goback()"></i>
        </div>
        <div class="container">
            <p>这里是聊天的滚动部分！</p>
            <ul class="message-list" ref="list">
                <!--<message-->
                        <!--v-for="message in sortedMessages"-->
                        <!--:key="message.id"-->
                        <!--:message="message">-->
                <!--</message>-->
            </ul>
        </div>
        <message-send></message-send>
        <div class="send-section">

        </div>
    </div>
</template>

<script>
    import MessageItem from '../components/chatroom/MessageItem'
    import MessageSend from '../components/chatroom/MessageSend'

    export default {
        name: 'chatroom',
        components: {
            MessageSend
        },
        data() {
            return {
                sortedMessages: [{

                }]
            }
        },
        methods: {
            goback() {
                this.$router.go(-1)
            }
        }
    }
</script>

<style>
    .head-section {
        border: ghostwhite solid 2px;
        background-color: #434439;
        color: white;
        /*position: fixed;*/
        /*top: 0;*/
        height: 60px;
        font-size: 20px;
        width: 100%;
        z-index: 1000;
    }
</style>
