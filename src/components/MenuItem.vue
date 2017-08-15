<template>
<section class="item-section">
    <!-- 头部占位、分割 -->
    <div :class="{placeholder: itemInfo.isFirst}"></div>
    <!-- 真正的功能菜单 -->
    <router-link :to="'/discover/' + itemInfo.type">
        <span><img :src=itemInfo.imgUrl /></span>
        <span>{{itemInfo.name}}</span>
    </router-link>
</section>
</template>

<script>
    export default {
        name: 'BaseItem',
        props: {
            itemInfo: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
            }
        },
        methods: {
            goto(path) {
                // 跳转之前，需要设置一下 状态吧？
                this.$router.push(path)
            }
        }
    }
</script>

<style scoped>
    .placeholder {
        height: 20px;
        background-color: #e8e8e8;
        z-index: 50;
    }
    img {
        width: 20px;
    }
    .item-section a {
        margin: 0 10px;
        padding: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid #e8e8e8;
        text-decoration:none;
        text-align: left;
    }
    .item-section span {
        margin: 0 20px;
        flex: 0 1 0;
    }
    .item-section span:nth-child(2) {
        flex-grow: 1;
    }
</style>
