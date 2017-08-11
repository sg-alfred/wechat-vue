<template>
    <div class="">
        <header-section :goBack="true" :head-title="headTitle"></header-section>

        <div style="height: 20px"></div>

        <!-- 需要双引号，再单引号？ -->
        <router-link :to="'/search/friend'" >
            <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <circle cx="18" cy="18" r="7" stroke="rgb(00,80,00)" stroke-width="1" fill="none"/>
                <line x1="24" y1="24" x2="30" y2="30" style="stroke:rgb(00,80,00);stroke-width:2"/>
            </svg>
        </router-link>

        <section>
            <span>我的微信号：{{}}</span>
        </section>

        <div style="height: 20px"></div>

        <section class="menu-section">
            <base-item v-for="item in itemList"
                       :key="item.id" :itemInfo="item"
            ></base-item>
        </section>

        <footer>

        </footer>
    </div>
</template>

<script>
    import HeaderSection from '../../components/HeaderSection'
    import BaseItem from '../../components/BaseItem'
    export default {
        name: 'addFriend',
        components: {
            HeaderSection,
            BaseItem,
        },
        data() {
            return {
                headTitle: '添加朋友',
                itemList: [{
                    id: 0,
                    type: 'friendRadar',
                    name: '雷达加朋友',
                    subname: '添加身边的朋友',
                    imgUrl: 'static/image/discover/icon-moments.png'
                }, {
                    id: 1,
                    type: 'jointGroup',
                    name: '面对面建群',
                    subname: '与身边的朋友进入同一个群聊',
                    imgUrl: 'static/image/discover/icon-scancode.png'
                }, {
                    id: 2,
                    type: 'scancode',
                    name: '扫一扫',
                    subname: '扫码二维码名片',
                    imgUrl: 'static/image/discover/icon-scancode.png'
                }, {
                    id: 3,
                    type: 'mobileContacts',
                    name: '手机联系人',
                    subname: '添加或邀请通讯录中的朋友',
                    imgUrl: 'static/image/discover/icon-topstories.png'
                }, {
                    id: 4,
                    type: 'official',
                    name: '公众号',
                    subname: '获取更多资讯和服务',
                    imgUrl: 'static/image/discover/icon-nearby.png'
                }]
            }
        },
        methods: {
        }
    }
</script>

<style scoped>
    .head-section {
        border: ghostwhite solid 2px;
        background-color: #434439;
        color: white;
        /*position: fixed;*/
        /*top: 0;*/
        height: 60px;
        font-size: 20px;
        width: 100%;
        z-index: 1000;
    }
</style>