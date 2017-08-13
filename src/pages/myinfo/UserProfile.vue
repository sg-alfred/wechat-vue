<!-- 用户的详情界面，展示 ……
    可能从 通讯录点击，或者朋友圈的头像和 昵称点击 进来～
 -->
<template>
    <div class="userprofile-page">
        <header-section :goBack="true" :head-title="headTitle">
            <section slot="userOperate" class="head-operate" @click="showOperate">
                <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <circle cx="20" cy="12" r="2" stroke-width="1" fill="rgb(255,255,255)"/>
                    <circle cx="20" cy="20" r="2" stroke-width="1" fill="rgb(255,255,255)"/>
                    <circle cx="20" cy="28" r="2" stroke-width="1" fill="rgb(255,255,255)"/>
                </svg>
            </section>
        </header-section>

        <div class="placeholder"></div>

        <section class="">

            <section class="base-info">
                <el-row>
                    <el-col :span="6" class="headimg-div">
                        <span><img src="../../assets/logo.png"></span>
                    </el-col>
                    <el-col :span="18" class="name-info">
                        <p>{{info.remark}}</p><i></i>
                        <p>微信号：{{info.wechatno}}</p>
                        <p>昵称：{{info.nickname}}</p>
                    </el-col>
                </el-row>
            </section>

            <div class="placeholder"></div>

            <section class="tag-section">
                <div v-if="!info.tags" @click="setAlias">
                    <span>设置备注和标签</span>
                </div>
                <div v-else>
                    <el-row>
                        <el-col :span="6">
                            标签
                        </el-col>
                        <el-col :span="18">
                            family
                        </el-col>
                    </el-row>
                </div>
            </section>

            <div class="placeholder"></div>

            <section class="more-section">
                <el-row>
                    <el-col :span="6">
                        地区
                    </el-col>
                    <el-col :span="18">
                        {{info.country}}
                    </el-col>
                </el-row>
                <el-row class="album-div">
                    <el-col :span="6" class="album-text">
                        个人相册
                    </el-col>
                    <el-col :span="18" class="album">
                        <img src="../../assets/logo.png">
                    </el-col>
                </el-row>
                <el-row>
                    <span>更多</span>
                </el-row>
            </section>

            <div class="placeholder"></div>

            <section class="contact-section">
                <div v-if="isFriend">
                    <el-button type="success">发送消息</el-button>
                    <br/>
                    <el-button :plain="true" type="success">视频聊天</el-button>
                </div>
                <div v-else>
                    <el-button type="success" @click="addFriend">添加好友</el-button>
                </div>
                <div>
                    <el-button type="success">通过验证</el-button>
                    <br/>
                    <el-button :plain="true" type="success">加入黑名单</el-button>
                </div>
            </section>
        </section>

        <section class="operate-section" v-if="isShowOperate">
            <ul>
                <!-- 需要拆开？因为每个操作功能都不一样！！？ -->
                <li v-for="item in operateList" :key="item.id">
                    <img :src="item.icon" />
                    <span class="operate-text">{{item.name}}</span>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { mapGetters } from 'vuex'
    import HeaderSection from '../../components/HeaderSection'

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
                isShowOperate: false,
                operateList: []
            }
        },
        components: {
            HeaderSection
        },
        computed: {
            ...mapGetters({
                isLogin: 'getIsLogin',
                userid: 'getUserid'
            })
        },
        created() {
            if (!this.isLogin) {
                this.$router.push('/login');
            }
            this.fid = this.$route.params.fid;
        },
        mounted() {
            this.$http.get('../../static/initData/operate.json')
                .then(response => {
                    // 这个闭包，this 应该不一样才对啊！
                    this.operateList = response.body.operateList;
                }, response => {
                    alert("调用失败");
                })
        },
        methods: {
            showOperate() {
                this.isShowOperate = !this.isShowOperate;
                // 界面置灰

            },
            addFriend() {
                this.$router.push('/addSend/' + this.fid)
            },
            setAlias() {

            }
        }
    }
</script>

<style scoped>
    * {
        margin: 0;
    }
    .placeholder {
        height: 20px;
        width: auto;
    }
    .userprofile-page {
        background-color: #e8e8e8;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .head-operate {
        float: right;
        margin: 10px 10px 0;
    }
    .base-info, .tag-section, .more-section, .operate-section {
        text-align: left;
        background-color: white;
        padding: 20px;
    }
    .base-info .headimg-div {
        display: table;
        height: 80px;
    }
    .base-info .headimg-div span {
        display: table-cell;
        vertical-align: middle;
    }
    .base-info .headimg-div span img {
        height: 60px;
    }
    .base-info .name-info p {
        padding: 5px 0;
    }
    .more-section .el-row {
        padding: 10px 0;
    }
    .more-section .album {
        height: 100px;
    }
    .contact-section button {
        margin: 5px;
        width: 60%;
    }
    .operate-section {
        height: 300px;
        width: 90%;
        overflow: scroll;
        z-index: 10;
        bottom: 0;
        position: absolute;
        border-top: 1px solid #e8e8e8;
    }
    ul {
        list-style: none;
        padding-left: 0;
    }
    li {
        height: 30px;
        padding: 10px;
        width: auto;
        display: table;
    }
    img {
        height: 20px;
        padding: 5px;
        display: table-cell;
        vertical-align: middle;
    }
    .operate-section .operate-text {
        padding: 0 0 0 20px;
        display: table-cell;
        vertical-align: middle;
    }
</style>
