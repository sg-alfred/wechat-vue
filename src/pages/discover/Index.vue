<template>
    <div class="discover-page">
        <header-section :head-title="headTitle" :search-type="searchType" :has-dropdown="true"></header-section>

        <section class="menu-section">
            <menu-item v-for="item in itemList" :key="item.id" :itemInfo="item"></menu-item>
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
        name: 'Discover',
        components: {
            HeaderSection,
            FooterSection,
            MenuItem
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
        data() {
            return {
                // 这个是可以配置的！！
                headTitle: '微信',
                searchType: 'all',
                itemList: [{
                    id: 0,
                    isFirst: true,
                    type: 'moments',
                    name: '朋友圈',
                    imgUrl: 'static/image/discover/icon-moments.png'
                }, {
                    id: 1,
                    isFirst: true,
                    type: 'scancode',
                    name: '扫一扫',
                    imgUrl: 'static/image/discover/icon-scancode.png'
                }, {
                    id: 2,
                    type: 'shake',
                    name: '摇一摇',
                    imgUrl: 'static/image/discover/icon-shake.png'
                }, {
                    id: 3,
                    isFirst: true,
                    type: 'topstories',
                    name: '看一看',
                    imgUrl: 'static/image/discover/icon-topstories.png'
                }, {
                    id: 4,
                    isFirst: true,
                    type: 'nearby',
                    name: '附近的人',
                    imgUrl: 'static/image/discover/icon-nearby.png'
                }, {
                    id: 5,
                    isFirst: true,
                    type: 'games',
                    name: '游戏',
                    imgUrl: 'static/image/discover/icon-games.png'
                }, {
                    id: 6,
                    type: 'shopping',
                    name: '购物',
                    imgUrl: 'static/image/discover/icon-shopping.png'
                }, {
                    id: 7,
                    isFirst: true,
                    type: 'miniprograms',
                    name: '小程序',
                    imgUrl: 'static/image/discover/icon-miniprograms.png'
                }]
            }
        },
    }
</script>

<style scoped>
    .discover-page {
        background-color: #e8e8e8;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .menu-section {
        background-color: white;
    }
</style>
