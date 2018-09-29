<template>
  <div class="wechat-page">
    <header-section :head-title="headTitle" :search-type="searchType" :has-dropdown="true"/>

    <main class="wechat-container">
      <wechat-item
        v-for="item in chatrooms"
        :key="item.id" :chat-item="item"
        @into-chatroom="intoChatroom"
      />
    </main>

    <footer-section/>
  </div>
</template>

<script>
import { mapState } from 'Vuex'
import HeaderSection from '@/components/HeaderSection'
import FooterSection from '@/components/FooterSection'
import WechatItem from '@/components/WechatItem'

export default {
  name: 'Wechat',
  components: {
    HeaderSection,
    FooterSection,
    WechatItem
  },
  data() {
    return {
      headTitle: '微信',
      searchType: 'all',
      chatrooms: []
    }
  },
  computed: {
    ...mapState(['contacts'])
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
    padding-bottom: 7rem;
  }

  .wechat-container {
    overflow: auto;
    height: 100%;
  }

</style>
