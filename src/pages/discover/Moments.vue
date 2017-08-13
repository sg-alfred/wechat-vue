<!-- 朋友圈界面 -->

<template>
    <div class="moments-page">
        <header-section :goBack="true" :head-title="headTitle"></header-section>

        <div class="block">
            <el-carousel trigger="click" height="150px">
                <el-carousel-item v-for="item in 4" :key="item">
                    <h3>{{ item }}</h3>
                </el-carousel-item>
            </el-carousel>
        </div>

        <div v-if="momentList.length">
            <!-- 如果直接 使用 moment="item" 报了 moment expected Object,String got !-->
            <one-moment v-for="item in momentList" :key="item.id" v-bind:moment="item"></one-moment>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import HeaderSection from '../../components/HeaderSection'
    import OneMoment from '../../components/OneMoment'

    export default {
        name: 'Moment',
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
            ...mapGetters({
                isLogin: 'getIsLogin'
            })
        },
        created() {
            if (!this.isLogin) {
                this.$router.push('/login');
            }
        }
    }
</script>

<style scoped>
    .moments-page {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: white;
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
