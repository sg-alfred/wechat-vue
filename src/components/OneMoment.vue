<!-- 朋友圈的 每条状态组件 -->

<template>
    <div class="moment-container">
        <el-row>
            <p>单条状态详情～</p>
            <el-col :span="4">
                <img src="../assets/logo.png" />
            </el-col>
            <el-col :span="20">
                <span><a>{{moment.nick}}</a></span>
                <p>{{moment.content}}</p>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "OneMoment",
        // 对象语法，提供校验
        props: {
            moment: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
            }
        },
    }
</script>

<style scoped>
    .moment-container {
        border: 1px solid #e8e8e8;
        margin: 5px;
    }
    img {
        width: 48px;
    }
</style>
