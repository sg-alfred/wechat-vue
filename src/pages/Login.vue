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

    import { mapState, mapActions } from 'vuex'
    import { userLogin } from '../api'
    import { localStorage } from '../util'
    import io from 'socket.io-client'

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
        computed: {
            ...mapState([
                'isLogin'
            ])
        },
        created() {     // 如果已登陆，直接跳到 wechat 界面～
            console.log('login-page-00-', this.isLogin)
            if (this.isLogin) {
                this.$router.push('/wechat');
            }
        },
        /*beforeMount() {
            console.log('login-page-00-', this.isLogin)
            if (this.isLogin) {
                // 再进行界面跳转！
                this.$router.push('/wechat');
            }
        },*/
        methods: {
            ...mapActions(['changeLoginInfo', 'initContacts', 'initSocket', 'addMessage']),
            async doLogin(formName) {
            //  简单的数据校验！！
                this.$refs[formName].validate( async (valid) => {
                    if (!valid) {
                        this.$message('error submit!!')
                        return false;
                    }

                    const response = await userLogin(this.formInfo)
                    const result = response.data

                    this.$message(result.message)

                    if (!result.code) {
                        console.log('doLogin-00-', this.isLogin)

                        localStorage('userinfo', JSON.stringify(result.userinfo))
                        await this.changeLoginInfo(true)

                        console.log('doLogin-11-', this.isLogin)

                        // 这时候直接 获取通讯录，渲染出聊天列表
                        await this.initContacts()

                        await this.connectSocket(result.userinfo)

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
                })
            },
            // 显然，这个socket shi 没有定义的！！应该是 保存起来，以 用户id 为键值！！这样，才能够正在这里调用！
            // 但是，要保证不掉线啊！！ 刷新一下就掉了，这又什么用！

            // redis 缓存不错～ 但是，应该如何保存？ 还是要请求后端，然后再数据库？？
            async connectSocket(userinfo) {
                // 登录成功 创建与 服务端的 socket 的连接～～
                // 但是，刷新一下就掉了？ 控制台 显示 disconnect 了～～ 就是掉了嘛～

                const socket = io.connect('http://localhost:8080')

                await this.initSocket(socket)

                socket.on('connect', () => {
                    socket.send('hello, server..')

                    socket.emit('login', userinfo)
                })

                socket.on('send.msg', (msg) => {
                    console.log(msg)

                    // 处理获取到的消息！！
                    this.addMessage(msg)
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