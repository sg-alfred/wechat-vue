<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import 'normalize.css'
  import {initSocketio} from '@/utils'

  export default {
    name: 'app',
    computed: {
      ...mapState(['isLogin', 'userinfo'])
    },
    async created() {
      console.log('app-created-校验是否登录前-', this.isLogin)

      await this.changeLoginInfo()

      // 这是否设置
      console.log('app-created-是否登录-', this.isLogin)

      if (!this.isLogin) {
        console.log('未登录跳转：app => login')
        this.$router.push('/login')
      } else {
        // 这时候直接 获取通讯录，渲染出聊天列表
        await this.initContacts()

        // 建立socket 连接
        await initSocketio(this.userinfo, 'app')

        console.log('登录且初始化成功：app => wechat')
        this.$router.push('/wechat')
      }
    },
    methods: {
      ...mapActions(['changeLoginInfo', 'initContacts']),
    }
  }
</script>

<style lang="scss">
  @import "./style/common.scss";

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  @media screen and (min-width: 450px){
    #app {
      left: 0; right: 0; top: 0; bottom: 0;
      position: absolute;
      margin: auto;
      box-shadow: 1rem 1rem .5rem #888888;
      max-width: 450px;
      height: 90%;
      box-sizing: border-box;
    }
  }

  a {
    color: #000000;
  }

  .router-fade-enter-active, .router-fade-leave-active {
    transition: opacity .3s;
  }

  .router-fade-enter, .router-fade-leave-active {
    opacity: 0;
  }
</style>
