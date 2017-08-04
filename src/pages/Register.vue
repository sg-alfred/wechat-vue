<template>

    <div class="register-div">
        <!-- 这算是坑吧？需要 配合vuex 才能够使用！！ -->
        <el-form ref="form" :label-position="labelPosition" label-width="80px" :model="formInfo" :rules="formRules">
            <el-form-item label="用户名" prop="nickname">
                <el-input v-model="formInfo.nickname"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="formInfo.password"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="salt">
                <el-input v-model="formInfo.salt"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm">立即注册</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>

</template>

<script>
    export default {
        name: 'Register',
        data() {
            return {
                labelPosition: 'right',
                formInfo: {},
                formRules: {}
            }
        },
        methods: {
            submitForm() {
                this.$http.post('/user/register', this.formInfo, (response) => {
                    if (!response.code) {
                        console.log(response.message)
                    } else {
                        this.$router.push('/login')
                    }
                })
            }
        }
    }
</script>