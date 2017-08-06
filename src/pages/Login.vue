<template>

    <div class="login-div">
        <el-form ref="loginForm" :label-position="labelPosition" label-width="80px" :model="formInfo" :rules="formRules">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="formInfo.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="formInfo.password"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="valicode">
                <el-input v-model="formInfo.validcode"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
                <el-button @click="goto('register')">立即注册</el-button>
            </el-form-item>
        </el-form>
    </div>

</template>

<script>
    import io from 'socket.io-client';
    import { mapGetters } from 'vuex'

    export default {
        name: 'Login',
        data() {
            return {
                labelPosition: 'right',
                formInfo: {
                    username: '18813145220',
                    password: '1234',
                    validcode: ''
                },
                formRules: {

                }
            }
        },
        computed: {
            ...mapGetters({
                isLogin: 'getIsLogin',
                userid: 'getUserid'
            })
        },
        created() {     // 如果已登陆，直接跳到 wechat 界面～
            if (this.isLogin) {
                this.$router.push('/wechat');
            }
        },
        methods: {
            submitForm(formName) {
//                 简单的数据校验！！
                this.$refs[formName].validate( (valid) => {
                    if (valid) {
                        // 需要加上 body-parser 模块！！不然nodejs 解析不了！！
                        this.$http.post('/user/login', this.formInfo).then((response) => {
                            let result = response.body
                            if (!result.code) {
                                let userinfo = result.userinfo

                                this.connectSocket()

                                // 确实没有这么多必要，比如，
                                this.$store.dispatch('setUserid', userinfo.id)
                                this.$store.dispatch('changeIsLogin', true)

                                this.$message(result.message)
                                this.$router.push('/wechat');
                            } else {
                                this.$message(result.message)
                            }
                        })
                    } else {
                        alert('error submit!!');
                        return false;
                    }
                });
            },
            connectSocket() {
                // 登录成功 创建与 服务端的 socket 的连接～～
                // 但是，刷新一下就掉了？ 控制台 显示 disconnect 了～～ 就是掉了嘛～
                const socket = io.connect('localhost:8080')
                socket.on('open', () => {
                    console.log('已连接到服务器')
                    // 如何区分客户端？ 然后 让服务端 给特定的客户端 下发信息？
                    socket.send('hello, server..')
                })
            },
            goto(path) {
                this.$router.push(path);
            }
        }
    }
</script>

<style>
/*    .login-div {
        width: 50%;
    }*/
</style>