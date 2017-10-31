<template>

    <section class="login-div">

        <el-switch v-model="loginByFace" class="switch-label"
                   on-color="#13ce66" off-color="grey" @click="loginByFace = !loginByFace">
        </el-switch>

        <div class="placeholder"></div>

        <article v-if="!loginByFace">
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
        </article>
        <article v-else>
            <!-- 人脸登录 -->
            <!-- 就是分析图片的，应该是 视频 -> 图片(可以隐藏) -> canvas !! -->
            <label>用户名：{{ formInfo.username }}</label>

            <video width="320" height="240"></video>
            <img hidden id="image" width="320" height="240"/>
            <canvas hidden width="320" height="240"></canvas>

            <el-button type="primary" @click="doLoginByFace">人脸登录</el-button>
        </article>

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
                formRules: {},
                loginByFace: false,

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

                    const response = await userLogin(this.formInfo, 'password')
                    const result = response.data

                    this.$message(result.message)

                    if (!result.code) {
                        this.afterLoginSuccess(result.userinfo)
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
            async doLoginByFace() {

                const self = this

                // 那现在是用户名！根据用户名查询id，后台处理啊！然后在调用 百度AI 接口
                let video = document.querySelector('video'),
                    image = document.querySelector('#image'),
                    canvas = document.querySelector('canvas'),
                    ctx = canvas.getContext("2d");

                navigator.mediaDevices.getUserMedia({
                    video: true,
                    // audio: true
                })
                    .then(function (mediaStream) {
                        video.src = window.URL.createObjectURL(mediaStream);
                        video.onloadedmetadata = function (e) {
                            // Do something with the video here.
                        };
                    })
                    .catch(function (error) {
                        console.log(error.name);
                    });

                let counter = 3;
                const iTime = setInterval(function() {
                    counter --;
                    if (counter > 0) {
                        self.$message(`请对准摄像头，倒计时${counter}秒`)
                    } else {
                        clearInterval(iTime)

                        // 弄到
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        ctx.drawImage(video, 0, 0, 320, 240);

                        image.onload = function() {

                            Object.assign(self.formInfo, {base64Img: image.src.replace('data:image/png;base64,', '')})

                            // 需要类型！
                            userLogin(self.formInfo, 'face').then((response) => {

                                const result = response.data
                                self.$message(result.message)

                                if (!result.code) {
                                    self.afterLoginSuccess(result.userinfo)
                                }

                                // 关闭摄像头～

                            })

                            /*convertImgToBase64('static/image/chenjz.jpg', (base64Img) => {
                                console.log(base64Img)
                            })*/
                        }
                        image.src = canvas.toDataURL('image/png');
                    }
                }, 1000)

            },
            async afterLoginSuccess(userinfo) {
                console.log('doLogin-00-', this.isLogin)

                localStorage('userinfo', JSON.stringify(userinfo))
                await this.changeLoginInfo(true)

                console.log('doLogin-11-', this.isLogin)

                // 这时候直接 获取通讯录，渲染出聊天列表
                await this.initContacts()

                await this.connectSocket(userinfo)

                this.$router.push('/wechat')
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
                    socket.send('hello, server.. Login.vue')

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

    .placeholder {
        height: 20px;
    }
    video {
        border: 1px solid #e8e8e8;
    }

</style>