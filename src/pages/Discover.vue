<template>
    <div class="">
        <header-section></header-section>
        <div class="contacts-container">
            <span>这是发现 界面！</span>

            <base-item v-for="item in itemList" :key="item.id" :itemInfo="item"></base-item>

            <div class="placeholder"></div>

        </div>
        <footer-section></footer-section>
    </div>
</template>

<script>
    import HeaderSection from '../components/HeaderSection'
    import FooterSection from '../components/FooterSection'
    import BaseItem from '../components/BaseItem'

    export default {
        name: 'Contacts',
        components: {
            HeaderSection,
            FooterSection,
            BaseItem,
        },
        data() {
            return {
                // 这个是可以配置的！！
                itemList: [{
                    id: 0,
                    type: 'moments',
                    name: '朋友圈',
                    imgUrl: 'static/image/discover/icon-moments.png'
                }, {
                    id: 1,
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
                    type: 'topstories',
                    name: '看一看',
                    imgUrl: 'static/image/discover/icon-topstories.png'
                }, {
                    id: 4,
                    type: 'nearby',
                    name: '附近的人',
                    imgUrl: 'static/image/discover/icon-nearby.png'
                }, {
                    id: 5,
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
                    type: 'miniprograms',
                    name: '小程序',
                    imgUrl: 'static/image/discover/icon-miniprograms.png'
                }]
            }
        },
    }
</script>

<style>
    .placeholder {
        height: 8px;
        width: auto;
    }
</style>
