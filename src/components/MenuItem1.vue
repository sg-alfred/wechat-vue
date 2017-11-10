<!-- 菜单基本样式之一，一个图标，跟着一行！， -->
<template>
    <section class="item-section">

        <!-- 头部占位、分割 -->
        <div :class="{placeholder: itemInfo.isFirst}"></div>

        <!-- 真正的功能菜单 -->
        <router-link :to="'/' + parent + '/' + itemInfo.type">
            <span>
                <img :src="itemInfo.imgUrl" />

                <!-- 换成 阿里矢量图的？ -->
                <!--<svg class="icon fa-12x" aria-hidden="true">
                    <use xlink:href="'#' + itemInfo.imgUrl"></use>
                </svg>-->
            </span>
            <span>{{ itemInfo.name }}</span>
        </router-link>

        <!-- 底部占位、分割 -->
        <div :class="{placeholder: itemInfo.isEnd}"></div>

    </section>
</template>

<script>
    export default {
        name: 'MenuItem1',
        props: {
            parent: String,
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

<style lang="scss" scoped>
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
        text-align: left;
        span {
            margin: 0 20px 0 0;
            flex: 0 1 0;
        }
        span:nth-child(2) {
            flex-grow: 1;
        }
    }
    .fa-12x {
        font-size: 1.2rem;
        color: #000000;
    }
</style>
