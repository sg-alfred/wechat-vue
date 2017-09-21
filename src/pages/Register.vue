<template>
    <section class="register-div">
        <!-- 这算是坑吧？需要 配合vuex 才能够使用！！ -->
        <el-form ref="registerForm" :label-position="labelPosition" label-width="80px" :model="formInfo" :rules="formRules">
            <el-form-item label="手机号" prop="mobilephone">
                <el-input v-model="formInfo.mobilephone"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="formInfo.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkpwd">
                <el-input type="password" v-model="formInfo.checkpwd"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="valicode">
                <el-input v-model="formInfo.valicode"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="doRegister('registerForm')">立即注册</el-button>
                <el-button @click="$router.push('login')">返回登录</el-button>
                <!--<el-button @click="resetForm('registerForm')">重置</el-button>-->
            </el-form-item>
        </el-form>
    </section>

</template>

<script>
    import { mapGetters } from 'vuex'
    import { userRegister } from '../api'

    export default {
        name: 'Register',
        data() {
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.formInfo.checkpwd !== '') {
                        this.$refs.registerForm.validateField('checkpwd');
                    }
                    callback();
                }
            };
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.formInfo.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                labelPosition: 'right',
                formInfo: {
                    mobilephone: '',
                    password: '',
                    checkpwd: '',
                    valicode: ''
                },
                formRules: {
                    mobilephone: [
                        {required: true, message: '手机号不能为空', trigger: 'blur'},
                        {pattern: /^\d{11}$/, message: '手机号必须为11为数字！', trigger: 'change,blur'}
                    ],
                    password: [
                        {required: true, validator: validatePass, trigger: 'change,blur'}
                    ],
                    checkpwd: [
                        {required: true, validator: validatePass2, trigger: 'change,blur' }
                    ],
                    valicode: [
                        {required: true, message: '请输入验证码', trigger: 'change,blur'}
                    ]
                }
            }
        },
        methods: {
            doRegister(formName) {
                this.$refs[formName].validate( async (valid) => {
                    if (valid) {
                        const response = await userRegister(this.formInfo)
                        const result = response.data

                        if (!result.code) {
                            this.$message(result.message)
                            this.$router.push('/login')
                        } else {
                            this.$message(result.message)
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../style/mixin.scss";

    .register-div {
        @include absoluteCenter();
        width: 80%;
        height: 50%;
    }
</style>