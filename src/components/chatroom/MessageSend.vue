<template>
    <div class="message-div">

        <el-row>
            <el-col :span="3">
                <i class="el-icon-setting"></i>
            </el-col>
            <el-col :span="15">
                <textarea v-model="message.content" @keyup.enter="sendMessage"></textarea>
            </el-col>
            <el-col :span="3">
                <i class="el-icon-star-off"></i>
            </el-col>
            <el-col :span="3">
                <el-button v-if="!sendFlag" icon="plus"></el-button>
                <el-button v-else type="success" @click="sendMessage">发送</el-button>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'Massege',
        data() {
            return {
                sendFlag: false,
                message: {
                    content: '',
                    imgurl: '',
                    fromid: '',      // 发送方
                    sendtime: ''
                }
            }
        },
        computed: {
            ...mapGetters({
                userid: 'getUserid'
            })
        },
        methods: {
            sendMessage() {
                this.message.fromid = userid;
                this.message.sendtime = new Date();

                this.$http.post('/chat/sendMessage', this.message).then((response) => {

                })
            }
        }
    }
</script>

<style>
    .message-div {
        border: ghostwhite solid 2px;
        background-color: white;
        position: fixed;
        bottom: 0;
        height: 50px;
        font-size: 20px;
        width: 100%;
        z-index: 1000;
    }
</style>