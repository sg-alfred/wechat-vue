<!-- 通讯录组件，点击到 好友简介，长按悬浮 设置 -->

<template>
    <section class="contact-item" @click="$emit('get-detail', userinfo.id)">
        <el-row>
            <el-col :span="6">
                <span><img src="../assets/logo.png" /></span>
            </el-col>
            <el-col :span="18">
                <span>{{userinfo.mobilephone}}</span>
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
        width: 40px;
    }
    .contact-item {
        height: 40px;
        padding: 10px;
        margin: 0 10px;
        border-bottom: 1px solid #e8e8e8;
    }
    .contact-item .el-col {
        height: 40px;
        display: table;
        text-align: left;
    }
    .contact-item .el-col span {
        display: table-cell;
        vertical-align: middle;
    }
</style>
