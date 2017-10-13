<template>
    <section class="send-section">
        <section class="message-section">
            <div @click="speak">
                <svg class="icon fa-12x" aria-hidden="true">
                    <use xlink:href="#icon-yuyin"></use>
                </svg>
                <!--<i class="fa fa-volume-up fa-15x" aria-hidden="true"></i>-->
            </div>
            <div>
                <input v-model="content" @keyup.enter="doSendMessage">
            </div>
            <div @click="showEmoji">
                <svg class="icon fa-12x" aria-hidden="true">
                    <use xlink:href="#icon-biaoqing"></use>
                </svg>
                <!--<i class="fa fa-smile-o fa-15x" aria-hidden="true"></i>-->
            </div>
            <div>
                <el-button v-if="!this.content" icon="plus" @click=""></el-button>
                <el-button v-else type="success" @click="doSendMessage">发送</el-button>
            </div>
        </section>
        <section class="emoji-section" v-if="isShowEmoji">
            <!-- 表情包 -->
            <img src="/static/image/send-emoji.png">
        </section>
        <section class="item-section" v-if="isShowShortcuts">
            <!-- 快捷 发送选项 -->
            <img src="/static/image/send-shortcut.png">
        </section>
    </section>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import { sendMessage } from '../../api'

    export default {
        name: 'Message',
        data() {
            return {
                content: '',       // 文字信息
                isShowEmoji: false,
                isShowShortcuts: false
            }
        },
        props: {
            chatid: {   // 聊天室id
                type: String,
                required: true
            }
        },
        methods: {
            ...mapActions(['addMessage']),
            async doSendMessage() {
                console.log('发送的消息-11-', this.chatid, this.content)

                // 需要和 服务端通讯一下，获取 messageId
                const response = await sendMessage(this.chatid, {
                    content: this.content.trim(),
                    sendtime: Date.now()
                })

                // 成功之后，往 vuex 里面放啊！
                await this.addMessage(response.data.data)

                this.content = '';
            },
            speak() {

            },
            showShortcuts() {
                this.isShowEmoji = false;
                this.isShowShortcuts = !this.isShowShortcuts;
            },
            showEmoji() {
                this.isShowShortcuts = false;
                this.isShowEmoji = !this.isShowEmoji;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .send-section {
        border: ghostwhite solid 2px;
        background-color: white;
        position: fixed;
        bottom: 0;
        height: 50px;
        font-size: 20px;
        width: 100%;
        z-index: 101;
        padding-top: 8px;
    }
    .message-section {
        display: flex;
        justify-content: center;
        align-items: center;
        div {
            margin: 0 10px;
            flex: 0 1 0;
        }
        div:nth-child(2) {
            flex-grow: 1;
            input {
                border: hidden;
                border-bottom: 1px solid green;
                width: 100%;
            }
        }
    }
    .emoji-section, .item-section {
        height: 250px;
    }
    .fa-12x {
        font-size: 1.2em;
    }
</style>