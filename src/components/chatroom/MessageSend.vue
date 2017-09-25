<template>
    <section class="send-section">
        <section class="message-section">
            <div @click="speak">
                <i class="fa fa-volume-up fa-15x" aria-hidden="true"></i>
            </div>
            <div>
                <input v-model="contents" @keyup.enter="sendMessage">
            </div>
            <div @click="showEmoji">
                <i class="fa fa-smile-o fa-15x" aria-hidden="true"></i>
            </div>
            <div>
                <el-button v-if="!this.contents" icon="plus" @click=""></el-button>
                <el-button v-else type="success" @click="sendMessage">发送</el-button>
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
    import { mapGetters } from 'vuex'

    export default {
        name: 'Message',
        data() {
            return {
                contents: '',       // 文字
                isShowEmoji: false,
                isShowShortcuts: false,
                chatroomInfo: {}
            }
        },
        computed: {
            ...mapGetters({
                userid: 'getUserid'
            }),
        },
        methods: {
            speak() {

            },
            sendMessage() {
                this.$message(this.contents);
//                this.$http.post('/chatroom/sendMessage', this.message).then((response) => {
//
//                })
                this.contents = '';
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
    }
    .message-section div {
        margin: 0 10px;
        flex: 0 1 0;
    }
    .message-section div:nth-child(2) {
        flex-grow: 1;
    }
    .message-section input {
        border: hidden;
        border-bottom: 1px solid green;
        width: 100%;
    }
    .item-section {
        height: 250px;
    }
    .fa-15x {
        font-size: 1.5em;
    }
</style>