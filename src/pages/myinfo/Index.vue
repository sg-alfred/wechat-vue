<template>
    <div class="">
        <header-section :head-title="headTitle"></header-section>
        <div class="contacts-container">
            <span>这是我的 界面！</span>

            <div>
                <img src="../../assets/logo.png" />
            </div>

            <base-item v-for="item in itemList" :key="item.id" :itemInfo="item"></base-item>

        </div>
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
                headTitle: '微信',
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
