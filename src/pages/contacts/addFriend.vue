<template>
    <div class="">
        <header class="head-section">
            <i class="el-icon-arrow-left" @click="goback()"></i>
            <span> | 添加朋友</span>
        </header>

        <div style="height: 20px"></div>

        <section class="search-section">
            <i class="el-icon-search"></i>
        </section>

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
    import BaseItem from '../../components/BaseItem'
    export default {
        name: 'addFriend',
        components: {
            BaseItem,
        },
        data() {
            return {
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
            goback() {
                this.$router.go(-1)
            }
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