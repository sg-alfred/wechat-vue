<!-- 通讯录组件，点击到 好友简介，长按悬浮 设置 -->

<template>
    <section class="contact-item" @click="$emit('get-detail', userinfo.fid)">
        <el-row>
            <el-col :span="6">
                <span><img :src=userinfo.headimgurl /></span>
            </el-col>
            <el-col :span="18">
                <span>{{userinfo.nickname}}</span>
            </el-col>
        </el-row>
    </section>
</template>

<script>
    export default {
        name: 'ContactItem',
        props: {
            userinfo: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style scoped>
    img {
        width: 30px;
    }
    .contact-item {
        height: 40px;
        padding: 5px;
        margin: 5px;
        border-bottom: 1px solid lightgrey;
    }
    .contact-item .el-col {
        height: 40px;
        display: table;
        text-align: left;
        padding-left: 20px;
    }
    .contact-item .el-col span {
        display: table-cell;
        vertical-align: middle;
    }
</style>
