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
        @include page();
        z-index: 202;
    }
    section {
        margin-top: 20px;
        background-color: white;
        padding: 15px 20px;
        text-align: left;
    }
</style>