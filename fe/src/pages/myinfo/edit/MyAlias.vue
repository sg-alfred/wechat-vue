<!-- 更改昵称，让好友更容易记住你 -->

<template>
  <div class="myaias-setting">
    <header-section :go-back="true" :head-title="headTitle">
      <section slot="headerBtn" class="header-btn right">
        <el-button type="success" @click="setAlias">保存</el-button>
      </section>
    </header-section>
    <main class="form-section">
      <article>
        <input v-model="alias" >
        <p>好名字可以让你的朋友更容易记住你。</p>
      </article>
    </main>
  </div>
</template>

<script>
import HeaderSection from '@/components/HeaderSection'
import { updateUserinfo } from '@/api'
import { mapState, mapActions } from 'vuex'
import { localStorage } from '@/utils'

export default {
  name: 'MyAlias',
  components: {
    HeaderSection
  },
  data() {
    return {
      headTitle: '更改名字',
      alias: ''
    }
  },
  computed: {
    ...mapState([
      'userinfo'
    ])
  },
  beforeMount() {
    this.alias = this.userinfo.alias
  },
  methods: {
    ...mapActions(['changeLoginInfo']),
    async setAlias() {
      const alias = this.alias.trim()
      if (alias !== '') {
        const response = await updateUserinfo(this.userinfo.id, { alias })

        // 修改 localStorage 保存的值！
        localStorage('userinfo', JSON.stringify(response.data.data))
        this.changeLoginInfo(true)

        this.$router.go(-1)
      } else {
        this.$alert('没有输入昵称，请重新填写', '提示', {
          confirmButtonText: '确定'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    @import '../../../style/mixin.scss';

    .myaias-setting {
        @include page();
        z-index: 333;
    }
    .header-btn {
        margin: 1rem 1rem 0 0;
    }
    .form-section {
        overflow: auto;
        width: 100%;
        position: absolute;
        article {
            margin: 2rem 0;
            padding: 1rem;
            background-color: white;
            input {
                border: hidden;
                border-bottom: 1px solid green;
                padding: 5px;
                font-size: 18px;
                width: 96%;
            }
            p {
                text-align: left;
                color: #adadad;
                padding: 1rem;
            }
        }
    }
    .el-message-box__headerbtn {
        display: none;
    }
</style>
