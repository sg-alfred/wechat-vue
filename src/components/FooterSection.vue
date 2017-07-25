<template>
    <div class="footer-container">
        <el-row>
            <el-col :span="6">
                <div class="grid-content" @click="goto('/')">
                    <img v-model="isActive" src="../assets/icon-active_u10.png" />
                    <span>微信</span>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content" @click="goto('/address')">
                    <img v-model="isActive" src="../assets/icon-active_u12.png" />
                    <span>通讯录</span>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content" @click="goto('/discovery')">
                    <img v-model="isActive" src="../assets/icon-active_u14.png" />
                    <span>发现</span>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content" @click="goto('/test')">
                    <img v-model="isActive" src="../assets/icon-active_u16.png" />
                    <span v-model="isActive">我</span>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'FooterSection',
    data() {
        return {
            isActive: false
        }
    },
    methods: {
        goto(path) {
            // 跳转之前，需要设置一下 状态吧
            this.$router.push(path)
        }
    }
}
</script>

<style>
    .footer-container {

    }
</style>
