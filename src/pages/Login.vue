<template>

    <div class="login-div">
        <!-- 这算是坑吧？需要 配合vuex 才能够使用！！ -->
        <el-form ref="form" :label-position="labelPosition" label-width="80px" :model="formInfo" :rules="formRules">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="formInfo.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="formInfo.password"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="valicode">
                <el-input v-model="formInfo.validcode"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm">登录</el-button>
                <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
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
                    username: 'chenjz',
                    password: 'aaa',
                    validcode: ''
                },
                formRules: {

                }
            }
        },
        methods: {
            submitForm() {
//                 简单的数据校验！！
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        // 虽然 再组织一次，恶心了点，但是先这样吧～～
                        // 至少比那个 状态推送好多了，5分钟处理不了 7-8个单子，看着真的都吐了！！
//                        let params = {
//                            'username': this.formInfo.username,
//                            'password': this.formInfo.password
//                        }

                        // 需要加上 body-parser 模块！！不然nodejs 解析不了！！
                        this.$http.post('/user/login', this.formInfo).then((response) => {

                            let result = response.body
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
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });

                // 确实里面没有 信息！！或许 是 el- 组件的原因！！
                console.log('2', this.formInfo, this.formInfo.password)


            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            connectSocket() {

            }
        }
    }
</script>

<style>
/*    .login-div {
        width: 50%;
    }*/
</style>