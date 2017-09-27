<template>
    <div class="qrcode-page">
        <header-section :go-back="true" :head-title="headTitle">
            <section slot="userOperate" class="head-operate right" @click="showOperate">
                <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <circle cx="20" cy="12" r="2" stroke-width="1" fill="rgb(255,255,255)"/>
                    <circle cx="20" cy="20" r="2" stroke-width="1" fill="rgb(255,255,255)"/>
                    <circle cx="20" cy="28" r="2" stroke-width="1" fill="rgb(255,255,255)"/>
                </svg>
            </section>
        </header-section>

        <article class="code-article absolute-center">
            <!-- 可以直接用绝对居中的！ -->
            <section class="code-header">
                <span>
                    <img src="../../../assets/logo.png">
                </span>
                <div>
                    <p>{{info.remark}}</p><i></i>
                    <p>微信号：{{info.wechatno}}</p>
                    <p>昵称：{{info.nickname}}</p>
                </div>
            </section>
            <section class="code-content">
                <span><img src="../../../assets/icon-wechat.png"></span>
            </section>
            <section class="code-footer">
                <span>扫码添加我为好友</span>
            </section>
        </article>
    </div>
</template>

<script>
    import HeaderSection from '../../../components/HeaderSection'

    export default {
        name: 'QRCode',
        components: {
            HeaderSection
        },
        data() {
            return {
                headTitle: '我的二维码',
                info: {
                    id: 0,
                    wechatno: 'sgchenjz',
                    nickname: '钻',
                    remark: 'hehe',
                    gender: '男',
                    country: '中国',
                    headimgurl: '',
                    tags: ''
                },
            }
        },
        methods: {
            showOperate() {

            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../style/mixin.scss";

    .qrcode-page {
        @include page();
        z-index: 202;
    }
    .head-operate {
        margin: 10px 10px 0;
    }
    .absolute-center {
        @include absoluteCenter();
        width: 80%;
        height: 60%;
        background-color: #ffffff;
    }
    .code-article {
        padding: 20px;
        display: flex;
        flex-direction: column;
    }
    .code-article section {
        flex: 0 1 0;
    }
    .code-article section:nth-child(2) {
        flex-grow: 1;
        padding: 20px;
        margin: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #222222;
        img {
            height: 200px;
        }
    }
    .code-header {
        display: flex;
        text-align: left;
        align-items: center;
        span {
            margin: 0 20px;
            flex: 0 1 0;
            img {
                height: 80px;
            }
        }
        div {
            flex-grow: 1;
            p {
                padding: 5px 0;
            }
        }
    }

</style>