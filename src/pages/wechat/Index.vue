<template>
  <div class="wechat-page">
    <header-section :head-title="headTitle" :search-type="searchType" :has-dropdown="true"></header-section>

    <main class="wechat-container">
      <wechat-item
          v-for="item in chatrooms"
          :key="item.id" :chatItem="item"
          @into-chatroom="intoChatroom"
      ></wechat-item>
    </main>

    <footer-section></footer-section>
  </div>
</template>

<script>
import { mapState } from 'Vuex'
import { getChatrooms } from '../../api'
import HeaderSection from '../../components/HeaderSection'
import FooterSection from '../../components/FooterSection'
import WechatItem from '../../components/WechatItem'

export default {
  name: 'Wechat',
  components: {
    HeaderSection,
    FooterSection,
    WechatItem
  },
  computed: {
    ...mapState(['contacts'])
  },
  data() {
    return {
      headTitle: '微信',
      searchType: 'all',
      chatrooms: []
    }
  },
  beforeMount() {
    this.chatrooms = Object.values(this.contacts).filter((ele) => ele.messages.length > 0 ||
        (!!ele.chatinfo.lastmsgid && (!ele.cleartime || ele.chatinfo.sendtime > ele.cleartime)))
    // console.log('聊天室信息--', JSON.stringify(this.chatrooms))
  },
  methods: {
    // 进入特定的聊天室
    intoChatroom(contactid) {
      this.$router.push('/chatrooms/' + contactid)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../style/mixin.scss";

  .wechat-page {
    @include page(#ffffff);
    padding-bottom: 70px;
  }

  .wechat-container {
    overflow: auto;
    height: 100%;
  }

</style>
