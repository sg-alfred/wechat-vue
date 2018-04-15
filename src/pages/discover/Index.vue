<template>
  <div class="discover-page">
    <header-section :head-title="headTitle" :search-type="searchType" :has-dropdown="true"></header-section>

    <main class="discover-container">
      <section class="menu-section">
        <menu-item1 v-for="item in itemList" :key="item.id" :itemInfo="item" :parent="'discover'"></menu-item1>
      </section>
    </main>

    <footer-section></footer-section>

    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import HeaderSection from '../../components/HeaderSection'
  import FooterSection from '../../components/FooterSection'
  import MenuItem1 from '../../components/MenuItem1'

  export default {
    name: 'Discover',
    components: {
      HeaderSection,
      FooterSection,
      MenuItem1
    },
    data() {
      return {
        // 这个是可以配置的！！
        headTitle: '微信',
        searchType: 'all',
        itemList: [{
          id: 0,
          isFirst: true,
          type: 'moments',
          name: '朋友圈'
        }, {
          id: 1,
          isFirst: true,
          type: 'scancode',
          name: '扫一扫'
        }, {
          id: 2,
          type: 'shake',
          name: '摇一摇'
        }, {
          id: 3,
          isFirst: true,
          type: 'topstories',
          name: '看一看'
        }, {
          id: 4,
          isFirst: true,
          type: 'nearby',
          name: '附近的人'
        }, {
          id: 5,
          isFirst: true,
          type: 'games',
          name: '游戏'
        }, {
          id: 6,
          type: 'shopping',
          name: '购物'
        }, {
          id: 7,
          isFirst: true,
          isEnd: true,
          type: 'miniprograms',
          name: '小程序'
        }]
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../style/mixin.scss';

  .discover-page {
    @include page();
    padding-bottom: 4.5rem;
  }

  .discover-container {
    overflow: auto;
    height: 100%;
  }

  .menu-section {
    background-color: #ffffff;
  }
</style>
