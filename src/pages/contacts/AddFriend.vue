<template>
    <div class="addfriend-page">

        <header-section :go-back="true" :head-title="headTitle"></header-section>

        <section class="searchFriend-section">
            <router-link :to="'/search/friend'" >
                <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <circle cx="18" cy="18" r="7" stroke="rgb(00,80,00)" stroke-width="1" fill="none"/>
                    <line x1="24" y1="24" x2="30" y2="30" style="stroke:rgb(00,80,00);stroke-width:2"/>
                </svg>
            </router-link>
        </section>

        <section class="code-section">
            <span>我的微信号：{{wechatno}}</span>
            <img alt="二维码"/>
        </section>

        <div class="placeholder"></div>

        <section class="menu-section">
            <menu-item2 v-for="item in itemList"
                       :key="item.id" :itemInfo="item"
                       :parent="'addFriend'"
            ></menu-item2>
        </section>
    </div>
</template>

<script>
    import HeaderSection from '../../components/HeaderSection'
    import MenuItem2 from '../../components/MenuItem2'
    export default {
        name: 'AddFriend',
        components: {
            HeaderSection,
            MenuItem2
        },
        data() {
            return {
                headTitle: '添加朋友',
                wechatno: 'sgchenjz',
                itemList: [{
                    id: 0,
                    type: 'friendRadar',
                    name: '雷达加朋友',
                    subname: '添加身边的朋友',
                    imgUrl: 'static/image/friends/icon-radar.png'
                }, {
                    id: 1,
                    type: 'jointGroup',
                    name: '面对面建群',
                    subname: '与身边的朋友进入同一个群聊',
                    imgUrl: 'static/image/friends/icon-group.png'
                }, {
                    id: 2,
                    type: 'scancode',
                    name: '扫一扫',
                    subname: '扫码二维码名片',
                    imgUrl: 'static/image/friends/icon-scancode.png'
                }, {
                    id: 3,
                    type: 'mobileContacts',
                    name: '手机联系人',
                    subname: '添加或邀请通讯录中的朋友',
                    imgUrl: 'static/image/friends/icon-mobile.png'
                }, {
                    id: 4,
                    type: 'official',
                    name: '公众号',
                    subname: '获取更多资讯和服务',
                    imgUrl: 'static/image/friends/icon-official.png'
                }]
            }
        },
        methods: {
        }
    }
</script>

<style scoped>
    .placeholder {
        height: 20px;
        width: auto;
    }
    .addfriend-page {
        background-color: #e8e8e8;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 202;
    }
    .searchFriend-section {
        background-color: white;
        width: 100%;
        margin-top: 20px;
    }
    .code-section {
        padding: 10px;
    }
    .menu-section {
        background-color: #ffffff;
    }
</style>