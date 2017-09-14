<!-- 朋友圈界面 -->

<template>
    <div class="moments-page">
        <header-section :go-back="true" :head-title="headTitle">
            <section slot="specialIcon" class="head-cameraicon">
                <i class="fa fa-camera" aria-hidden="true"></i>
            </section>
        </header-section>

        <article class="moments-container">
            <section class="">
                <el-carousel trigger="click" height="150px">
                    <el-carousel-item v-for="item in 4" :key="item">
                        <h3>{{ item }}</h3>
                    </el-carousel-item>
                </el-carousel>
            </section>

            <section v-if="momentList.length">
                <!-- 如果直接 使用 moment="item" 报了 moment expected Object,String got !-->
                <one-moment v-for="item in momentList" :key="item.id" v-bind:moment="item"></one-moment>
            </section>
        </article>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import HeaderSection from '../../components/HeaderSection'
    import OneMoment from '../../components/OneMoment'

    export default {
        name: 'Moments',
        components: {
            HeaderSection,
            OneMoment
        },
        data() {
            return {
                headTitle: '朋友圈',
                momentList: [{
                    id: 0,
                    nick: 'sgchenjz',
                    content: '这是一条状态！'
                }, {
                    id: 1,
                    nick: 'Alfred',
                    content: '这是我的英文名字！'
                }, {
                    id: 2,
                    nick: 'guojy',
                    content: 'hhh，大傻逼！'
                }]
            }
        },
        computed: {
            isLogin: localStorage.getItem('isLogin')
        },
        created() {
            if (!this.isLogin) {
                this.$router.push('/login');
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../style/mixin.scss";

    .moments-page {
        @include page(#ffffff);
        z-index: 202;
    }
    .head-cameraicon {
        float: right;
        padding: 18px 20px;
        color: white;
    }
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 150px;
        margin: 0;
    }
    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }
    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>
