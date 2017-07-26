<!-- 朋友圈的 每条状态组件 -->

<template>
    <div class="">
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
        props: {
            moment: {
                type: Object,
            }
        },
        data() {
            return {
            }
        },
    }
</script>

<style>

</style>
