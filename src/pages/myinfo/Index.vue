<template>
    <div class="myinfo-page">
        <header-section :head-title="headTitle" :search-type="searchType" :has-dropdown="true"></header-section>

        <section class="contacts-container">
            <el-row>
                <el-col :span="6">
                    <router-link :to="'/myinfo/profile/' + userid" class="base-info">
                        <span><img src="../../assets/logo.png"></span>
                    </router-link>
                </el-col>
                <el-col :span="18" class="name-info">
                    <p>{{info.remark}}</p><i></i>
                    <p>微信号：{{info.wechatno}}</p>
                    <p>昵称：{{info.nickname}}</p>
                </el-col>
            </el-row>

            <base-item v-for="item in itemList" :key="item.id" :itemInfo="item"></base-item>
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
    import BaseItem from '../../components/BaseItem'

    export default {
        name: 'MyInfo',
        components: {
            HeaderSection,
            FooterSection,
            BaseItem
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
                    type: 'wallet',
                    name: '钱包',
                    imgUrl: 'static/image/myinfo/icon-wallet.png'
                }, {
                    id: 1,
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
                    type: 'setting',
                    name: '设置',
                    imgUrl: 'static/image/myinfo/icon-setting.png'
                }]
            }
        }
    }
</script>

<style scoped>
    .myinfo-page {
        background-color: #e8e8e8;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .base-info {
        height: 80px;
        display: table;
        text-align: center;
        background-color: white;
    }
    .base-info span {
        display: table-cell;
        vertical-align: middle;
    }
    .base-info span img {
        height: 60px;
        display: inline-block;
        margin-left: 20px;
    }
    .router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }
</style>
