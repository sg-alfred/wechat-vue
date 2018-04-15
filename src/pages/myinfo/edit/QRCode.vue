<template>
  <div class="qrcode-page">
    <header-section :go-back="true" :head-title="headTitle">
      <section slot="userOperate" class="head-operate right" @click="showOperate">
        <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <circle cx="20" cy="12" r="2" stroke-width="1" fill="rgb(255,255,255)"/>
          <circle cx="20" cy="20" r="2" stroke-width="1" fill="rgb(255,255,255)"/>
          <circle cx="20" cy="28" r="2" stroke-width="1" fill="rgb(255,255,255)"/>
        </svg>
      </section>
    </header-section>

    <main class="code-article absolute-center">
      <!-- 可以直接用绝对居中的！ -->
      <section class="code-header">
        <span>
          <img :src="userinfo.headimgurl" alt="avatar"/>
        </span>
        <div>
          <p>{{userinfo.remark}}</p><i></i>
          <p>微信号：{{userinfo.wechatno}}</p>
          <p>昵称：{{userinfo.nickname}}</p>
          <p>手机：{{userinfo.mobilephone}}</p>
        </div>
      </section>

      <section class="code-content">
        <!--<div :style="{'background-image': qrcode}">
            &lt;!&ndash;<img :src="qrcode">&ndash;&gt;
        </div>-->

        <!-- 动态加载的，与 css 的 scoped 冲突
        https://github.com/vuejs/vue-loader/issues/749 -->
        <div v-html="qrcode"></div>

      </section>

      <section class="code-footer">
        <span>扫一扫上面的二维码图案，加我微信</span>
      </section>
    </main>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {createQrcode} from '../../../api'
  import HeaderSection from '../../../components/HeaderSection'
  import { localStorage } from '../../../util'

  export default {
    name: 'QRCode',
    components: {
      HeaderSection
    },
    data() {
      return {
        headTitle: '我的二维码',
        qrcode: ''
      }
    },
    computed: {
      ...mapState(['userinfo'])
    },
    async beforeMount() {
      // 生成的二维码图片！但是怎么展示啊？

      // 后台能不能生成 base64的照片，这样的 'Content-Type': 'image/png'，不会啊，都不知道 哪里可以取到！！
      // 直接 把 url 跟在 <img src=""> 或者 < style="background-image: url()"> 都不可以啊

      // 就算生成了 svg 字符串，怎么弄？ ——  v-html

      const uid = this.userinfo._id

      let qrcode = localStorage(`qrcode-${uid}-addFriend`)

      if (!qrcode) {
        // 二维码信息：handle - addFriend , id - uid
        const response = await createQrcode(uid, 'addFriend')
        qrcode = response.data.data.svg

        // 可以缓存下来！
        localStorage(`qrcode-${uid}-addFriend`, qrcode)
      }

      this.qrcode = qrcode
    },
    methods: {
      showOperate() {

      }
    }
  }
</script>

<style lang="scss">
  .code-content svg {
    height: 50vw;
    width: 50vw;
    max-height: 200px;
    max-width: 200px;
  }
</style>

<style lang="scss" scoped>
  @import "../../../style/mixin.scss";

  .qrcode-page {
    @include page();
    z-index: 202;
  }

  .head-operate {
    margin: 1rem 1rem 0;
  }

  .absolute-center {
    @include absolute-center;
    width: 70%;
    height: 60%;
    background-color: #ffffff;
  }

  .code-article {
    padding: 2rem;
    /*display: flex;*/
    flex-direction: column;

    section {
      flex: 0 1 0;
    }
    section:nth-child(2) {
      flex-grow: 1;
      padding: 1.2rem;
      margin: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #222222;
    }
  }

  .code-header {
    display: flex;
    text-align: left;
    align-items: center;

    span {
      margin: 0 2rem;
      flex: 0 1 0;
      img {
        height: 4rem;
      }
    }
    div {
      flex-grow: 1;
      p {
        padding: .2rem 0;
      }
    }
  }
</style>