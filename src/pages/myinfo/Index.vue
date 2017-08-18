<template>
    <div class="myinfo-page">
        <header-section :head-title="headTitle" :search-type="searchType" :has-dropdown="true"></header-section>

        <section class="myinfo-container">
            <el-row class="base-info">
                <router-link :to="'/myinfo/profile/' + userid">
                    <el-col :span="6" class="headimg-div">
                        <span><img src="../../assets/logo.png"></span>
                    </el-col>
                    <el-col :span="18" class="name-info">
                        <p>{{info.remark}}</p><i></i>
                        <p>微信号：{{info.wechatno}}</p>
                        <p>昵称：{{info.nickname}}</p>
                    </el-col>
                </router-link>
            </el-row>

            <section class="menu-section">
                <menu-item v-for="item in itemList" :key="item.id" :itemInfo="item" :parent="'myinfo'"></menu-item>
            </section>

        </section>

        <footer-section></footer-section>

        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import HeaderSection from '../../components/HeaderSection'
    import FooterSection from '../../components/FooterSection'
    import MenuItem from '../../components/MenuItem'

    export default {
        name: 'MyInfo',
        components: {
            HeaderSection,
            FooterSection,
            MenuItem
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
        },
        data() {
            return {
                headTitle: '微信',
                searchType: 'all',
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
                itemList: [{
                    id: 0,
                    isFirst: true,
                    type: 'wallet',
                    name: '钱包',
                    imgUrl: 'static/image/myinfo/icon-wallet.png'
                }, {
                    id: 1,
                    isFirst: true,
                    type: 'favorite',
                    name: '收藏',
                    imgUrl: 'static/image/myinfo/icon-favorite.png'
                }, {
                    id: 2,
                    type: 'album',
                    name: '相册',
                    imgUrl: 'static/image/myinfo/icon-album.png'
                }, {
                    id: 3,
                    type: 'cards',
                    name: '卡包',
                    imgUrl: 'static/image/myinfo/icon-cards.png'
                }, {
                    id: 4,
                    type: 'sticker',
                    name: '表情',
                    imgUrl: 'static/image/myinfo/icon-sticker.png'
                }, {
                    id: 5,
                    isFirst: true,
                    type: 'setting',
                    name: '设置',
                    imgUrl: 'static/image/myinfo/icon-setting.png'
                }]
            }
        }
    }
</script>

<style scoped>
    * {
        margin: 0;
    }
    .myinfo-page {
        background-color: #e8e8e8;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .menu-section {
        background-color: #ffffff;
    }
    .base-info {
        background-color: white;
        padding: 20px 20px;
        text-align: left;
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
    .router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }
</style>
