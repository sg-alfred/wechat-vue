<!-- 用户的详情界面，展示 ……
    可能从 通讯录点击，或者朋友圈的头像和 昵称点击 进来～

头部，应该重新写！！
 -->

<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div>
        <div class="header">

        </div>
        <div class="container">
            <div class="base-info">
                <el-row>
                    <el-col :span="4">
                        头像<img v-bind:src="" />
                    </el-col>
                    <el-col :span="20">
                        <p>{{info.remark}}</p><i></i>
                        <p>微信号：{{info.wechatno}}</p>
                        <p>昵称：{{info.nickname}}</p>
                    </el-col>
                </el-row>
            </div>

            <div class="tag">
                <el-row>
                    <el-col :span="4">
                        标签
                    </el-col>
                    <el-col :span="20">
                        family
                    </el-col>
                </el-row>
            </div>

            <div class="">
                <span>{{info.country}}</span>
                <div class="album">
                    图片展示
                </div>
                <span>更多</span>
            </div>

            <div>
                <el-button type="success">发送消息</el-button>
                <el-button :plain="true" type="success">视频聊天</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'Userprofile',
        data() {
            return {
                info: {
                    id: 0,
                    wechatno: 'sgchenjz',
                    nickname: '钻',
                    remark: 'hehe',
                    gender: '男',
                    country: '中国',
                    headimgurl: '',
                    tags: ''
                }
            }
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
    }
</script>