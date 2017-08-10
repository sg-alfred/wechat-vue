<template>
    <div class="">
        <header-section :head-title="headTitle" :search-type="searchType" :has-dropdown="true"></header-section>

        <div style="height: 10px;"></div>

        <section class="contacts-container">
            <router-link :to="'/myprofile/' + userid" class="base-info">
                <span><img src="../../assets/logo.png"></span>
            </router-link>
            <base-item v-for="item in itemList" :key="item.id" :itemInfo="item"></base-item>
        </section>

        <footer-section></footer-section>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import HeaderSection from '../../components/HeaderSection'
    import FooterSection from '../../components/FooterSection'
    import BaseItem from '../../components/BaseItem'

    export default {
        name: 'Contacts',
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
    .base-info {
        height: 80px;
        display: table;
        text-align: center;
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
</style>
