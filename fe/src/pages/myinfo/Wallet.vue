<template>
  <div class="wallet-page">
    <header-section :go-back="true" :head-title="headTitle">
      <section slot="userOperate" class="head-operate right" @click="showOperate">
        <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <circle cx="20" cy="12" r="2" stroke-width="1" fill="rgb(255,255,255)"/>
          <circle cx="20" cy="20" r="2" stroke-width="1" fill="rgb(255,255,255)"/>
          <circle cx="20" cy="28" r="2" stroke-width="1" fill="rgb(255,255,255)"/>
        </svg>
      </section>
    </header-section>

    <main class="wallet-container">
      这是 钱包界面！

      <section class="base-section"/>
      <section class="hot-section"/>
      <section class="promotion-section"/>
      <section class="third-section"/>
    </main>

  </div>
</template>

<script>
import HeaderSection from '@/components/HeaderSection'
export default {
  name: 'Wallet',
  components: {
    HeaderSection
  },
  data() {
    return {
      headTitle: '钱包'
    }
  },
  methods: {
    showOperate() {

    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../style/mixin.scss";

  .wallet-page {
  @include page();
    z-index: 202;
  }

  .head-operate {
    margin: 1rem 1rem 0;
  }

  .hot-section, .promotion-section, .third-section {
    display: flex;
  }
</style>