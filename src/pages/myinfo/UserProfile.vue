<!-- 用户的详情界面，展示 ……
    可能从 通讯录点击，或者朋友圈的头像和 昵称点击 进来～
 -->
<template>
    <div class="">
        <header-section :goBack="true" :head-title="headTitle">
            <section slot="userOperate" class="head-operate" @click="showOperate">
                <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <circle cx="20" cy="12" r="2" stroke-width="1" fill="rgb(255,255,255)"/>
                    <circle cx="20" cy="20" r="2" stroke-width="1" fill="rgb(255,255,255)"/>
                    <circle cx="20" cy="28" r="2" stroke-width="1" fill="rgb(255,255,255)"/>
                </svg>
            </section>
        </header-section>

        <section class="profile-container">
            <section class="base-info">
                <!-- 还不如直接用 table -->
                <el-row>
                    <el-col :span="4">
                    </el-col>
                    <el-col :span="20">
                        <p>{{info.remark}}</p><i></i>
                        <p>微信号：{{info.wechatno}}</p>
                        <p>昵称：{{info.nickname}}</p>
                    </el-col>
                </el-row>
            </section>

            <section class="tag">
                <el-row>
                    <el-col :span="4">
                        标签
                    </el-col>
                    <el-col :span="20">
                        family
                    </el-col>
                </el-row>
            </section>

            <section class="">
                <span>{{info.country}}</span>
                <div class="album">
                    图片展示
                </div>
                <span>更多</span>
            </section>

            <div style="height: 20px;"></div>

            <section class="contact-section">
                <div v-if="isFriend">
                    <el-button type="success">发送消息</el-button>
                    <br/>
                    <el-button :plain="true" type="success">视频聊天</el-button>
                </div>
                <div v-else>
                    <el-button type="success" @click="addFriend">添加好友</el-button>
                </div>
            </section>
            <section class="add-section" >

            </section>
        </section>

        <section class="operate-section">
            <ul>
                <operate-item v-for="item in operateList"
                              :key="item.id" :operate="item">
                </operate-item>
            </ul>
        </section>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { mapGetters } from 'vuex'
    import HeaderSection from '../../components/HeaderSection'

    Vue.component('operate-item', {
        props: ['operate'],
        template: `
            <li>
                <img :src="operate.icon" />
                <span class="operate-text">{{operate.name}}</span>
            </li>
        `,
    })

    export default {
        name: 'UserProfile',
        data() {
            return {
                headTitle: '详细资料',
                isFriend: false,
                fid: '',
                info: {
                    id: 0,
                    wechatno: 'sgchenjz',
                    nickname: '钻',
                    remark: 'hehe',
                    gender: '男',
                    country: '中国',
                    headimgurl: '',
                    tags: ''
                },
                operateList: [{
                    id: 0,
                    icon: 'static/image/operate/icon-setRemark.png',
                    name: '设置备注及标签'
                }, {
                    id: 1,
                    icon: 'static/image/operate/icon-starred.png',
                    name: '标为星标朋友'
                }, {
                    id: 2,
                    icon: 'static/image/operate/icon-moment.png',
                    name: '朋友圈设置'
                }, {
                    id: 3,
                    icon: 'static/image/operate/icon-shareContact.png',
                    name: '发送该名片'
                }, {
                    id: 4,
                    icon: 'static/image/operate/icon-report.png',
                    name: '投诉'
                }, {
                    id: 5,
                    icon: 'static/image/operate/icon-addToBlock.png',
                    name: '加入黑名单'
                }, {
                    id: 6,
                    icon: 'static/image/operate/icon-delete.png',
                    name: '删除'
                }, {
                    id: 7,
                    icon: 'static/image/operate/icon-addToDesk.png',
                    name: '添加到桌面'
                }]
            }
        },
        components: {
            HeaderSection
        },
        computed: {
            ...mapGetters({
                isLogin: 'getIsLogin',
                uid: 'getUserid'
            })
        },
        created() {
            if (!this.isLogin) {
                this.$router.push('/login');
            }
            this.fid = this.$route.params.fid;
        },
        methods: {
            showOperate() {

            },
            addFriend() {
                this.$router.push('/addSend/' + this.fid)
            }
        }
    }
</script>

<!-- ? 加了 scoped, operate-section 的样式全变了？ -->
<style scoped>
    .head-operate {
        float: right;
        margin: 10px 5px 0 5px;
    }
    .operate-section {
        height: 300px;
        background-color: honeydew;
        overflow: scroll;
        z-index: 10;
        bottom: 0;
        position: absolute;
        width: 100%;
    }
    ul {
         list-style: none;
    }
    .operate-section li {
        height: 30px;
        padding: 5px;
    }
    .operate-section li img {
        height: 20px;
        padding: 5px;
    }
    .operate-section .operate-text {
        padding-top: -5px;
        width: 80%;
    }
    .contact-section button {
        margin: 5px;
        width: 60%;
    }
</style>
