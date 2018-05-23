<template>
  <div class="myinfo-page">
    <header-section :head-title="headTitle" :search-type="searchType" :has-dropdown="true"></header-section>

    <main class="myinfo-container">
      <section class="base-info">
        <router-link :to="'/myinfo/profile'">
          <span>
            <img :src="userinfo.headimgurl" alt="avatar"/>
          </span>
          <div>
            <p>{{ userinfo.alias }}</p>
            <i></i>
            <p v-if="userinfo.wechatno">
              微信号：{{ userinfo.wechatno }}
            </p>
          </div>
          <span id="code-div" @click="showCode($event)">
            <svg class="icon fa-18x" aria-hidden="true">
              <use xlink:href="#icon-qrcode"></use>
            </svg>
          </span>
        </router-link>
      </section>

      <section class="menu-section">
        <menu-item1 v-for="item in itemList" :key="item.id" :itemInfo="item"
                    :parent="'myinfo'">
        </menu-item1>
      </section>
    </main>

    <footer-section></footer-section>

    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import HeaderSection from '@/components/HeaderSection'
  import FooterSection from '@/components/FooterSection'
  import MenuItem1 from '@/components/MenuItem1'

  export default {
    name: 'MyInfo',
    components: {
      HeaderSection,
      FooterSection,
      MenuItem1
    },
    computed: {
      ...mapState(['userinfo'])
    },
    data() {
      return {
        headTitle: '微信',
        searchType: 'all',
        itemList: [{
          id: 0,
          isFirst: true,
          type: 'wallet',
          name: '钱包'
        }, {
          id: 1,
          isFirst: true,
          type: 'favorite',
          name: '收藏'
        }, {
          id: 2,
          type: 'album',
          name: '相册'
        }, {
          id: 3,
          type: 'cards',
          name: '卡包'
        }, {
          id: 4,
          type: 'sticker',
          name: '表情'
        }, {
          id: 5,
          isFirst: true,
          isEnd: true,
          type: 'setting',
          name: '设置'
        }]
      }
    },
    methods: {
      showCode(event) {
        // event.cancelBubble = true;
        event.preventDefault() // 阻止默认事件
        event.stopPropagation() // 阻止冒泡

        // 跳转到二维码界面
        this.$router.push('/myinfo/profile/code')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/mixin.scss";

  .myinfo-page {
    @include page();
    padding-bottom: 4.5rem;
  }

  .myinfo-container {
    overflow: auto;
    height: 100%;
  }

  .base-info {
    background-color: white;
    padding: 1.2rem;
    text-align: left;
    width: 100%;
    a {
      display: flex;
      align-items: center;
      span {
        margin: 0 2rem 0 0;
        flex: 0 1 0;
        img {
          height: 4rem;
        }
      }
      div {
        flex-grow: 1;
        p {
          padding: 5px 0;
        }
      }
    }
  }

  .menu-section {
    background-color: #ffffff;
    clear: both;
  }

  .fa-18x {
    font-size: 1.8rem;
    color: #000000;
  }

  .router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
  }

  .router-slid-enter, .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
  }
</style>
