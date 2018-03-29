<template>
  <section class="login-section">

    <el-switch v-model="loginByFace" class="switch-label"
               on-color="#13ce66" off-color="grey" @click="loginByFace = !loginByFace">
    </el-switch>

    <div class="placeholder"></div>

    <article v-if="!loginByFace">
      <el-form ref="loginForm" :label-position="labelPosition" label-width="80px" :model="formInfo"
               :rules="formRules">
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
      <div>
        <video width="320" height="240"></video>
        <img hidden id="image" width="320" height="240"/>
        <canvas hidden width="320" height="240"></canvas>
      </div>
      <el-button type="primary" @click="doLoginByFace">人脸登录</el-button>
    </article>

  </section>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import {userLogin} from '../api'
import {localStorage, initSocketio } from '../util'

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
      loginByFace: false
    }
  },
  computed: {
    ...mapState(['isLogin'])
  },
  created() { // 如果已登陆，直接跳到 wechat 界面～
    console.log('login-created-登录？-', this.isLogin)
    this.isLogin && this.$router.push('/wechat')
  },
  methods: {
    ...mapActions(['changeLoginInfo', 'initContacts']),
    async doLogin(formName) {
      //  简单的数据校验！！
      this.$refs[formName].validate(async(valid) => {
        if (!valid) {
          this.$message('error submit!!')
          return false
        }

        const response = await userLogin(this.formInfo, 'password')
        const result = response.data

        this.$message(result.message)

        !result.code && this.afterLoginSuccess(result.userinfo)
      })
    },
    async doLoginByFace() {
      const self = this

      let videoTrack // 视频源，最后关闭摄像头使用

      // 那现在是用户名！根据用户名查询id，后台处理啊！然后在调用 百度AI 接口
      const video = document.querySelector('video'),
        image = document.querySelector('#image'),
        canvas = document.querySelector('canvas'),
        ctx = canvas.getContext('2d')

      /* if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
       // 做兼容！！
       } */

      // let getUserMedia = navigator.mediaDevices.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia

      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true
      })
        .then(function (stream) {
          // 1、MediaStream.stop() 已不赞成使用。请改用 MediaStreamTrack.stop()
          // 这个应该是 stream.stop  报的错误！其实 是对的！
          // mediaStreamTrack = typeof stream.stop === 'function' ? stream : stream.getTracks()[1];

          // 2、获取全部的
          // let tracks = stream.getTracks();

          // 3、指定获取 视频源
          videoTrack = stream.getVideoTracks()[0]

          // 1、URL.createObjectURL(MediaStream) 已不推荐使用，并且很快将被移除。
          // video.src = window.URL.createObjectURL(stream)

          // 2、使用 该方式！
          video.srcObject = stream

          video.play() // 加上之后 firefox 才能出画面！

          /* video.onloadedmetadata = function (e) {
           // 这个可以搞点事情～
           }; */
        })
        .catch(function (error) {
          console.log('开启摄像头出错：' + error.name)
        })

      let counter = 3
      const iTime = setInterval(function () {
        counter--
        if (counter > 0) {
          self.$message(`请对准摄像头，倒计时${counter}秒`)
        } else {
          clearInterval(iTime)

          ctx.clearRect(0, 0, canvas.width, canvas.height)
          ctx.drawImage(video, 0, 0, 320, 240)

          image.onload = function () {
            Object.assign(self.formInfo, {base64Img: image.src.replace('data:image/png;base64,', '')})

            // 人脸登录
            userLogin(self.formInfo, 'face').then((response) => {
              // 关闭摄像头
              videoTrack && videoTrack.stop()

              const result = response.data
              self.$message(result.message)

              !result.code && self.afterLoginSuccess(result.userinfo)
            })
          }
          image.src = canvas.toDataURL('image/png')
        }
      }, 1000)
    },
    async afterLoginSuccess(userinfo) {
      console.log('afterLoginSuccess-00-', this.isLogin)

      localStorage('userinfo', JSON.stringify(userinfo))
      await this.changeLoginInfo(true)

      console.log('afterLoginSuccess-11-', this.isLogin)

      // 这时候直接 获取通讯录，渲染出聊天列表
      await this.initContacts()

      // 建立socket 连接
      await initSocketio(userinfo, 'login')

      console.log('初始化成功：login => wechat')
      this.$router.push('/wechat')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../style/mixin.scss";

  .login-section {
    @include absolute-center;
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