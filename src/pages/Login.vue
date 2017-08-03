<template>

    <div class="">
        <el-form :label-position="labelPosition" label-width="80px" :model="formInfo">
            <el-form-item label="用户名">
                <el-input v-model="formInfo.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="formInfo.password"></el-input>
            </el-form-item>
            <el-form-item label="验证码">
                <el-input v-model="formInfo.validcode"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm()">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>

</template>

<script>
//    import * as io from 'socket.io-client'
    import io from 'socket.io-client';

    export default {
        name: 'Login',
        data() {
            return {
                labelPosition: 'right',
                formInfo: {
                    username: '',
                    password: '',
                    validcode: ''
                }
            }
        },
        methods: {
            submitForm() {
                // 简单的数据校验！！
//                this.$refs[formName].validate((valid) => {
//                    if (valid) {
//                        alert('submit!');
//                    } else {
//                        console.log('error submit!!');
//                        return false;
//                    }
//                });
                this.$http.post('/user/login', this.formInfo).then((response) => {
                    let result = response.body

                    console.log(result)

                    if (!result.code) {
                        let userinfo = result.userinfo

                        // 登录成功 创建与 服务端的 socket 的连接～～
                        // 但是，刷新一下就掉了？ 控制台 显示 disconnect 了～～ 就是掉了嘛～
                        console.log('io是啥？', io);

                        const socket = io.connect('localhost:8080')
                        socket.on('open', () => {
                            console.log('已连接到服务器')
                            // 如何区分客户端？ 然后 让服务端 给特定的客户端 下发信息？
                            socket.send('hello, server..')
                        })

                        // 确实没有这么多必要，比如，
                        this.$store.dispatch('setUserid', userinfo.id)
                        this.$store.dispatch('setUsername', userinfo.username)

                        this.$store.dispatch('changeIsLogin', true)

                        console.log('登录成功！');

                        this.$router.push('/wechat');
                    }
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            connectSocket() {

            }
        }
    }
</script>