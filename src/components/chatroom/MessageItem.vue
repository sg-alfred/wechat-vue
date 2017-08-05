<template>
    <div class="">
        <div v-if="!sendFlag">
            <p>我是接收方！</p>
        </div>
        <div v-else="sendFlag">
            <p>我是发送方！</p>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'MessageItem',
        props: {
            chatItemDetail: {
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
            // 这其实是一个简写！！ 这是计算属性！因此 不是方法！！
            sendFlag() {
                // 如果 消息来源是 当前用户名的话，
                // 这样写 还真是 简便～ 反正结果就是 true/false
                sendFlag = chatItemDetail.fromid == userid;
            }
        },
        data() {
            return {
            }
        },
    }
</script>