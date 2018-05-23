<template>
  <div class="chatSetting-page">
    <header-section :go-back="true" :head-title="headTitle"/>

    <main class="setting-container">
      <section class="headimg-section">

        <!-- 必须循环! -->
        <router-link :to="'/userprofile/' + contctInfo._id">
          <img :src="contctInfo.headimgurl" alt="avatar">
        </router-link>

        <svg class="icon fa-2rem" aria-hidden="true">
          <use xlink:href="#icon-tianjiatupian"/>
        </svg>
      </section>

      <section class="" @click="$router.push('/search/history')">
        <p>查找聊天记录</p>
      </section>

      <section class="chatRole-section">
        <div>
          <span>置顶聊天</span>
          <el-switch v-model="stickyTop" class="switch-label right"
                     on-color="#13ce66" off-color="grey"/>
        </div>
        <div>
          <span>消息免打扰</span>
          <el-switch v-model="muteNoti" class="switch-label right"
                     on-color="#13ce66" off-color="grey"/>
        </div>
        <!-- 如果是 群的话，就要多一个选项～ -->
        <!--<div>
            <span>保存到通讯录</span>
            <el-switch v-model="muteNoti" class="switch-label right"
                       on-color="#13ce66" off-color="grey">
            </el-switch>
        </div>-->
      </section>

      <section>
        <p>设置当前聊天背景</p>
      </section>

      <section @click="confirmClearHistory">
        <p>清空聊天记录</p>
      </section>

      <section class="">
        <p>投诉</p>
      </section>
    </main>
  </div>
</template>

<script>
import {clearChatHistory} from '@/api'
import {mapActions} from 'vuex'
import HeaderSection from '@/components/HeaderSection'

export default {
  name: 'ChatSetting',
  components: {
    HeaderSection
  },
  data() {
    return {
      headTitle: '聊天信息',
      stickyTop: false,
      muteNoti: false,
      contctInfo: {}
    }
  },
  mounted() {
    // 对于群聊天来说？这个肯定不能获取到这么详细的东西！
    this.contctInfo = this.$parent.contactInfo

    // 这个 $parent，获取的是 父实例，界面从哪里来 就是谁！

    // 不需要：this.$parent.$data / this/$parent._data ，可以直接访问到
    // console.log('获取到上层数据？', this.$parent, this.$parent.headTitle, JSON.stringify(this.contctInfo))
  },
  methods: {
    ...mapActions(['syncMessages', 'updateContact']),
    async confirmClearHistory() {
      this.$confirm(`确定删除和${this.contctInfo.mobilephone}的聊天记录`, '提示', {
        confirmButtonText: '清空',
        cancelButtonText: '取消'
        // type: 'warning'
      }).then(() => {
        // console.log('删除聊天历史！-00-')
        // 删除聊天！ 能不能在这里面 用 await ?
        const cleartime = new Date()

        clearChatHistory(this.contctInfo.fid, {cleartime})
          .then((response) => {
            // console.log('删除聊天历史！-11-', response.data)

            // 同时 清除 vuex 里的 messages !!
            // 不仅仅这么简单啊！！还要 修改 cleartime，因此，应该调用的是 updateContacts
            if (!response.data.code) {
              const updateParams = {
                _id: this.contctInfo._id, // contactid
                cleartime,
                messages: []
              }
              this.updateContact(updateParams)
            }
            this.$message({
              type: 'success',
              message: response.data.message
            })
          })
      }).catch(() => {

      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../style/mixin.scss";

  .chatSetting-page {
    @include page();
    z-index: 202;
  }

  .setting-container {
    overflow: auto;
    height: 100%;
    padding-bottom: 2rem
  }

  section {
    margin-top: 1.2rem;
    background-color: white;
    padding: 15px 1rem;
    text-align: left;
    p {
      padding: 5px;
    }
  }

  .headimg-section {
    display: flex;
    align-items: center;
  }

  .chatRole-section {
    div {
      height: 2.4rem;
      padding: 0 5px;
    }
    div:nth-child(1) {
      padding-bottom: 1rem;
      border-bottom: 1px solid #e8e8e8;
    }
    div:nth-child(2) {
      padding-top: 1rem;
    }
  }

  .el-message-box__header {
    display: none;
  }

  .fa-2rem {
    font-size: 4rem;
    margin: .8rem;
  }

  img {
    width: 4rem;
    margin: .8rem;
  }
</style>