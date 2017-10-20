<!-- 朋友圈界面 -->

<template>
    <div class="moments-page">
        <header-section :go-back="true" :head-title="headTitle">
            <section slot="specialIcon" class="head-cameraicon right" @click="shareMoment">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-zhaoxiangji"></use>
                </svg>
            </section>
        </header-section>

        <article class="moments-container">
            <section class="">
                <el-carousel trigger="click" height="150px">
                    <el-carousel-item v-for="item in 2" :key="item">
                        <h3>{{ item }}</h3>
                    </el-carousel-item>
                </el-carousel>
            </section>

            <section v-if="momentList.length">
                <!-- 如果直接 使用 moment="item" 报了 moment expected Object,String got !-->
                <one-moment v-for="item in momentList"
                            :key="item.id" :moment="item">
                </one-moment>
            </section>
        </article>
    </div>
</template>

<script>
    import HeaderSection from '../../components/HeaderSection'
    import OneMoment from '../../components/OneMoment'
    import { getMoments } from '../../api'

    export default {
        name: 'Moments',
        components: {
            HeaderSection,
            OneMoment
        },
        data() {
            return {
                headTitle: '朋友圈',
                moments: [],
                momentList: [{
                    id: 0,
                    nick: 'sgchenjz',
                    content: '这是一条状态！',
                    createtime: '2017-10-19',
                    upvotes: [
                        // 点赞，直接，fid / contactid!! 在 vuex 里面取名！
                    ],
                    comments: [{
                        id: '自动生成id',
                        uid: '评论的用户id',
                        content: '内容',
                        toid: '回复的评论id，可能空',
                        touid: '回复的用户',
                        createtime: '创建时间'
                    }]
                }, {
                    id: 1,
                    nick: 'Alfred',
                    content: '这是我的英文名字！',
                    createtime: '2017-10-19',
                }, {
                    id: 2,
                    nick: 'guojy',
                    content: 'hhh，大傻逼！',
                    createtime: '2017-10-19',
                }]
            }
        },
        async beforeMount() {
//            const response = await getMoments()
//            this.moments = response.data.data
        },
        methods: {
            shareMoment() {
                // 发表状态
                this.$confirm(`确定删除和${this.contctInfo.mobilephone}的聊天记录`, '提示', {
                    confirmButtonText: '清空',
                    cancelButtonText: '取消'
//                    type: 'warning'
                }).then(() => {

                }).catch(() => {

                })
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
        padding: 18px 20px;
        color: white;
        font-size: 1.2em;
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
