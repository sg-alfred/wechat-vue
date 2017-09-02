<template>
    <div class="myprofile-page">
        <header-section :go-back="true" :head-title="headTitle"></header-section>

        <section class="detail-section">
            <!-- 每一个都是 链接，可以跳转编辑！ router-link , 动态加载！-->
            <el-row v-for="item in detailInfo" :key="item.id">
                <router-link :to="'/myinfo/profile/edit/' + item.type">
                    <el-col :span="6" class="col1">
                        {{item.name}}
                    </el-col>
                    <el-col :span="18" class="col2">
                        {{item.value}}
                    </el-col>
                </router-link>
            </el-row>
        </section>
        <router-link :to="'/myinfo/profile/edit/more'">
            <span>更多</span>
        </router-link>

        <section class="address-section">
            <span>我的地址</span>
        </section>
    </div>
</template>

<script>
    import HeaderSection from '../../components/HeaderSection'

    export default {
        name: "MyProfile",
        components: {
            HeaderSection
        },
        data() {
            return {
                headTitle: '个人信息',
                detailInfo: [{
                    id: 0,
                    type: 'headimg',
                    name: '头像',
                    value: ''
                }, {
                    id: 1,
                    type: 'alias',
                    name: '昵称',
                    value: ''
                }, {
                    id: 2,
                    type: 'wechat',
                    name: '微信号',
                    value: ''
                }, {
                    id: 3,
                    type: 'code',
                    name: '二维码名片',
                    value: ''
                }, {
                    id: 4,
                    type: 'address',
                    name: '我的地址',
                    value: ''
                }, {
                    id: 5,
                    type: 'gender',
                    name: '性别',
                    value: '男'
                }, {
                    id: 6,
                    type: 'area',
                    name: '地区',
                    value: ''
                }, {
                    id: 7,
                    type: 'whatsup',
                    name: '个性签名',
                    value: ''
                }]
            }
        },
        methods: {

        }
    }
</script>

<style lang="scss" scoped>
    @import "../../style/mixin.scss";

    .myprofile-page {
        @include page();
        z-index: 202;
    }
    .detail-section {
        background-color: white;
    }
    .detail-section .el-row {
        height: auto;
        margin: 0 10px;
        padding: 15px;
        border-bottom: 1px solid #e8e8e8;
        .col1{
            text-align: left;
            padding-left: 10px;
        }
        .col2{
            text-align: right;
        }
    }
    .address-section {
        margin-top: 20px;
        padding: 15px 35px;
        background-color: white;
        text-align: left;
    }
</style>