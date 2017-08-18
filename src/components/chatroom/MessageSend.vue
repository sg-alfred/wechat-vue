<template>
    <section class="message-section">
        <div @click="speak">
            <i class="fa fa-volume-up fa-15x" aria-hidden="true"></i>
        </div>
        <div>
            <input v-model="contents" @keyup.enter="sendMessage">
        </div>
        <div @click="">
            <i class="fa fa-smile-o fa-15x" aria-hidden="true"></i>
        </div>
        <div>
            <el-button v-if="!sendFlag" icon="plus"></el-button>
            <el-button v-else type="success" @click="sendMessage">发送</el-button>
        </div>
    </section>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'Massege',
        data() {
            return {
                contents: '',
                imgurl: '',
                chatroomInfo: {}
            }
        },
        computed: {
            ...mapGetters({
                userid: 'getUserid'
            }),
            sendFlag () {
                return this.contents || this.imgurl;
            }
        },
        methods: {
            speak() {

            },
            sendMessage() {
                this.$message(this.contents);
                this.$http.post('/chatroom/sendMessage', this.message).then((response) => {

                })
                this.contents = '';
            }
        }
    }
</script>

<style scoped>
    .message-section {
        border: ghostwhite solid 2px;
        background-color: white;
        position: fixed;
        bottom: 0;
        height: 50px;
        font-size: 20px;
        width: 100%;
        z-index: 101;
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
    .fa-15x {
        font-size: 1.5em;
    }
</style>