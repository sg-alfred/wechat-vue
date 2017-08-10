<!-- 通讯录组件，点击到 好友简介，长按悬浮 设置 -->

<template>
    <section class="" @click="$emit('get-detail', userinfo.chatid)">
        <el-row>
            <el-col :span="4">
                <!-- 连接到 用户详情界面 -->
                <!--<router-link :to=""></router-link>-->
                <img :src=userinfo.headimgurl />
            </el-col>
            <el-col :span="20">
                <!-- 这个我应该 向左靠！ -->
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
        },
        data() {
            return {
            }
        }
    }
</script>

<style scoped>
    img {
        width: 48px;
    }
</style>
