<template>
    <section class="">
        <span class="sendtime-info">{{message.sendtime}}</span>
        <div v-if="message.fromid != userid">
            <div class="message-friend">
                <span><img alt="好友头像"></span>
                <span>{{message.content}}</span>
            </div>
        </div>
        <div v-else>
            <div class="message-self">
                <span>{{message.content}}</span>
                <span><img alt="自己头像"></span>
            </div>
        </div>
    </section>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'MessageItem',
        props: {
            message: {
                type: Object,
            }
        },
        // 为什么映射到 计算属性当中？
        // 1、实时计算的？
        computed: {
            // 展开运算符
            ...mapGetters({
                userid: 'getUserid',
            }),
        },
        data() {
            return {
            }
        },
    }
</script>

<style scoped>
    .sendtime-info {
        font-size: 0.8rem;
        background-color: #e3e3e3;
        padding: 5px;
    }
    .message-friend, .message-self {
        display: flex;
        align-items: center;
    }
    .message-friend {
        justify-content: flex-start;
    }
    .message-self {
        justify-content: flex-end;
    }
    .message-friend span, .message-self span {
        text-align: left;
        margin: 0 20px;
        /*flex: 0 1 0;*/
        border-radius: 8px;
    }
    .message-friend span:nth-child(2) {
        background-color: white;
        margin: 10px 50px 10px 10px;
        padding: 10px;
        max-width: 80%;
        /*flex-grow: 1;*/
    }
    .message-self span:nth-child(1) {
        background-color: #92e748;
        margin: 10px 10px 10px 50px;
        padding: 10px;
        max-width: 80%;
        /*flex-grow: 1;*/
    }
    img {
        width: 30px;
    }
</style>