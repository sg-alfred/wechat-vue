<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <header class="header-container">
        <!-- 微信聊天室的 右上角的用户icon，点击 跳转到 聊天信息 的功能-->
        <!-- 朋友圈右上角的 icon,点击弹出 视频或图片 发布  -->
        <slot name="specialIcon"></slot>

        <!-- 通讯录点击 进入 详细资料后，右上角有用户设置，点击下弹出，比如屏蔽、设置用户名等-->
        <slot name="userOperate"></slot>

        <section class="head_goback" v-if="goBack" @click="$router.go(-1)">
            <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <polyline points="20,10 10,20 20,30" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
                <line x1="10" y1="20" x2="30" y2="20" style="stroke:rgb(255,255,255);stroke-width:2"/>
            </svg>
        </section>
        
        <section class="head_title" v-if="headTitle">
            <span class="title_text">{{headTitle}}</span>
        </section>

        <section class="head_dropdown" v-if="hasDropdown">
            <el-dropdown @command="handleCommand" trigger="click">
                <span class="el-dropdown-link">
                    <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" version="1.1">
                        <line x1="10" y1="20" x2="30" y2="20" style="stroke:rgb(255,255,255);stroke-width:2"/>
                        <line x1="20" y1="10" x2="20" y2="30" style="stroke:rgb(255,255,255);stroke-width:2"/>
                    </svg>
                </span>
                <el-dropdown-menu sole="dropdown">
                    <el-dropdown-item command="groupChat">
                        <img src="static/image/icon-groupchat.png">
                        <span>发起群聊</span>
                    </el-dropdown-item>
                    <el-dropdown-item command="addFriend">
                        <img src="static/image/icon-addFriend.png">
                        <span>添加好友</span>
                    </el-dropdown-item>
                    <el-dropdown-item command="scanQRCode">
                        <img src="static/image/icon-scancode.png">
                        <span>扫一扫</span>
                    </el-dropdown-item>
                    <el-dropdown-item command="payment">
                        <img src="static/image/icon-payment.png">
                        <span>收付款</span>
                    </el-dropdown-item>
                    <el-dropdown-item command="help">
                        <img src="static/image/icon-help.png">
                        <span>帮助与反馈</span>
                    </el-dropdown-item>
                    <el-dropdown-item command="logout">
                        <i class="fa fa-sign-out" aria-hidden="true"></i>
                        <span>退出账号</span></span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </section>

        <router-link :to="'/search/' + searchType" class="head_search" v-if="searchType">
            <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <circle cx="18" cy="18" r="7" stroke="rgb(255,255,255)" stroke-width="1" fill="none"/>
                <line x1="24" y1="24" x2="30" y2="30" style="stroke:rgb(255,255,255);stroke-width:2"/>
            </svg>
        </router-link>

        <!-- 搜索输入框 -->
        <slot name="searchFrm"></slot>

        <!-- 汉字，添加好友 -->
        <slot name="addFriend"></slot>
        <!-- 发送好友申请 按钮 -->
        <slot name="sendBtn"></slot>
    </header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'HeaderSection',
    props: ['headTitle', 'goBack', 'hasDropdown', 'searchType'],
    data() {
        return {
            messages: 0,
            iconDivStyle: {
                display: 'inline',
                'padding-right': '10px'
            }
        }
    },
    methods: {
        ...mapActions(['changeIsLogin']),
        handleCommand(command) {
            if ('logout' == command) {
                this.logout();
            } else {
                this.$router.push('/' + command);
            }
        },
        logout() {
            this.$http.get('/user/logout').then((response) => {
                let result = response.data
                if (!result.code) {
                    this.$message(result.message)

                    localStorage.removeItem('userinfo');
                    this.changeIsLogin(false);

                    this.$router.push('/login');
                }
            })
        }
    },
    created() {
        if (!this.isLogin) {
            this.$router.push('/login');
        }
    },
    computed: {
        ...mapGetters({
            isLogin: 'isLogin'
        }),
        // 计算未读消息，还是得用 store～
        getTotalMessages() {
            return parseInt(Math.random() * 10);
        }
    },
    watch: {
        // 这个应该是要如何监控，本来是 监听 socket d的～
        getTotalMessages: (newvalue, oldvalue) => {
            console.log(newvalue);
            return this.messages = newvalue;
        }
    }
}
</script>

<style scoped>
    .header-container {
        background-color: #434439;
        color: white;
        height: 60px;
        font-size: 20px;
        top: 0;
        position: fixed;
        width: 100%;
        z-index: 100;
    }
    .head_goback {
        float: left;
        margin: 10px 0 0 5px;
    }
    .head_title {
        float: left;
        margin-top: 18px;
        text-align: left;
    }
    .head_title .title_text{
        margin: 0 0 0 20px;
    }
    .head_dropdown, .head_search {
        float: right;
        margin: 10px 10px 0 5px;
    }

    /* 下拉菜单！ */
    .el-dropdown-menu {
        margin-top: 6px;
        padding: 0;
        border: 0;
        background-color: #434439;
        color: white;
    }
    .el-dropdown-menu .el-dropdown-menu__item {
        display: flex;
        height: 45px;
        width: 200px;
        border-top: 1px solid #000000;
        text-align: left;
        padding: 0 20px;
        justify-content: center;
        align-items: center;
    }
    .el-dropdown-menu .el-dropdown-menu__item:hover {
        background-color: #000000;
        color: white;
    }
    .el-dropdown-menu .el-dropdown-menu__item span {
        flex: 0 1 0;
        margin: 0 20px;
    }
    .el-dropdown-menu .el-dropdown-menu__item span:nth-child(2) {
        flex-grow: 1;
    }
    .el-dropdown-menu .el-dropdown-menu__item img {
        width: 25px;
    }
</style>
