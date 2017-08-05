<!-- 通讯录组件，点击到 好友简介，长按悬浮 设置 -->

<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div class="" @click="$emit('into-chatroom', userinfo.chatid)">
        <el-row>
            <el-col :span="4">
                <!-- 连接到 用户详情界面 -->
                <!--<router-link :to=""></router-link>-->
                <img v-bind:src=userinfo.headimgurl />
            </el-col>
            <el-col :span="20">
                <!-- 这个我应该 向左靠！ -->
                <span>{{userinfo.nickname}}</span>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    // 这个是界面跳转！不应该是 组件引入！！！，难道又要 goto？
//    import Userprofile from ''

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
