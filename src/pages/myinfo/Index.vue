<template>
    <div class="myinfo-page">
        <header-section :head-title="headTitle" :search-type="searchType" :has-dropdown="true"></header-section>

        <article class="myinfo-container">
            <section class="base-info">
                <router-link :to="'/myinfo/profile/' + userid">
                    <span>
                        <img src="../../assets/logo.png">
                    </span>
                    <div>
                        <p>{{info.remark}}</p><i></i>
                        <p>微信号：{{info.wechatno}}</p>
                        <p>昵称：{{info.nickname}}</p>
                    </div>
                    <span id="code-div" @click="showCode($event)">
                        <img alt="二维码">
                    </span>
                </router-link>

                <!-- 但是这样是不对的！！ 因为，事件不是这样的！应该阻止 冒泡
                不能够 写在这个 a标签外面！-->

            </section>

            <section class="menu-section">
                <menu-item v-for="item in itemList" :key="item.id" :itemInfo="item" :parent="'myinfo'"></menu-item>
            </section>
        </article>

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
//            ...mapGetters({
//                isLogin: 'getIsLogin',
//                userid: 'getUserid'
//            })
            isLogin: localStorage.getItem('isLogin'),
            userinfo: localStorage.getItem('userinfo'),
            userid () {
                return JSON.parse(this.userinfo).id;
            }
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
                    isEnd: true,
                    type: 'setting',
                    name: '设置',
                    imgUrl: 'static/image/myinfo/icon-setting.png'
                }]
            }
        },
        methods: {
            showCode(event) {
//                event.cancelBubble = true;
                event.preventDefault();     // 阻止默认事件
                event.stopPropagation();    // 阻止冒泡

                // 跳转到二维码界面
                this.$router.push('/myinfo/mycode');
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../style/mixin.scss";

    .myinfo-page {
        @include page();
        padding-bottom: 70px;
    }
    .myinfo-container {
        overflow: auto;
        height: 100%;
    }
    .base-info {
        background-color: white;
        padding: 20px;
        text-align: left;
        width: 100%;
    }
    .base-info a {
        display: flex;
        align-items: center;
        span {
            margin: 0 20px;
            flex: 0 1 0;
            img {
                height: 80px;
            }
        }
        div {
            flex-grow: 1;
            p {
                padding: 5px 0;
            }
        }
    }
    .menu-section {
        background-color: #ffffff;
        clear: both;
    }
    .router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }
</style>
