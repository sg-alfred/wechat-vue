<template>
    <div class="chatSetting-page">
        <header-section :go-back="true" :head-title="headTitle"></header-section>

        <article class="setting-container">
            <section class=""></section>

            <section class="">
                <span>查找聊天记录</span>
            </section>

            <section class="">
                <span>清空聊天记录</span>
            </section>

            <section class="">
                <span>设置当前聊天背景</span>
            </section>

            <section class="">
                <span>清空聊天记录</span>
            </section>

            <section class="">
                <span>投诉</span>
            </section>
        </article>
    </div>
</template>

<script>
    import HeaderSection from '../../components/HeaderSection'

    export default {
        name: 'ChatSetting',
        components: {
            HeaderSection
        },
        data() {
            return {
                headTitle: '聊天信息'
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../style/mixin.scss";

    .chatSetting-page {
        padding-top: 60px;
        background-color: #e8e8e8;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 202;
    }
    section {
        margin-top: 20px;
        background-color: white;
        padding: 15px 20px;
        text-align: left;
    }
</style>