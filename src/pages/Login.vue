<template>

    <section class="login-div">
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
                <el-button type="primary" @click="doLogin('loginForm')">登录</el-button>
                <el-button @click="$router.push('register')">立即注册</el-button>
            </el-form-item>
        </el-form>
    </section>

</template>

<script>

    import { mapGetters, mapActions } from 'vuex'
    import { userLogin } from '../api'
    import { localStorage } from '../util'
    import io from 'socket.io-client';

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
                formRules: {}
            }
        },
        computed: mapGetters([
            'isLogin'
        ]),
        created() {     // 如果已登陆，直接跳到 wechat 界面～
            console.log('login-page-00-', this.isLogin)
            if (this.isLogin) {
                this.$router.push('/wechat');

                // 登录了，要 初始化通讯录！！
            }
        },
        methods: {
            ...mapActions(['changeLoginInfo']),
            async doLogin(formName) {
            //  简单的数据校验！！
                this.$refs[formName].validate( async (valid) => {
                    if (valid) {
                        const response = await userLogin(this.formInfo)
                        const result = response.data

                        this.$message(result.message)

                        if (!result.code) {
                            console.log('doLogin-00-', this.isLogin)

                            localStorage('userinfo', JSON.stringify(result.userinfo))
                            await this.changeLoginInfo(true)

                            console.log('doLogin-11-', this.isLogin)

                            this.$router.push('/wechat')
                        }

                        /*this.$http.post('/user/login', this.formInfo).then((response) => {
                            let result = response.data
                            if (!result.code) {
                                localStorage('userinfo', JSON.stringify(result.userinfo));
                                this.changeLoginInfo(true);

                                this.$message(result.message)
                                this.$router.push('/wechat');
                            } else {
                                this.$message(result.message)
                            }
                        })*/
                    } else {
                        this.$message('error submit!!')
                        return false;
                    }
                })
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
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../style/mixin.scss";

    .login-div {
        @include absoluteCenter();
        width: 80%;
        height: 50%;
    }
</style>