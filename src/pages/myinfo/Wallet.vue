<template>
    <div class="wallet-page">
        <header-section :go-back="true" :head-title="headTitle">
            <section slot="userOperate" class="head-operate" @click="showOperate">
                <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <circle cx="20" cy="12" r="2" stroke-width="1" fill="rgb(255,255,255)"/>
                    <circle cx="20" cy="20" r="2" stroke-width="1" fill="rgb(255,255,255)"/>
                    <circle cx="20" cy="28" r="2" stroke-width="1" fill="rgb(255,255,255)"/>
                </svg>
            </section>
        </header-section>
        这是 钱包界面！

        <section class="base-section"></section>
        <section class="hot-section"></section>
        <section class="promotion-section"></section>
        <section class="third-section"></section>

    </div>
</template>

<script>
    import HeaderSection from '../../components/HeaderSection'
    export default {
        name: 'Wallet',
        components: {
            HeaderSection
        },
        data() {
            return {
                headTitle: '钱包'
            }
        },
        methods: {
            showOperate() {

            }
        }
    }
</script>

<style scoped>
    .wallet-page {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 202;
        background-color: #e3e3e3;
    }
    .head-operate {
        float: right;
        margin: 10px 10px 0;
    }
    .hot-section, .promotion-section, .third-section {
        display: flex;

    }
</style>