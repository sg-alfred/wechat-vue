<template>
    <div class="more-page">

        <header-section :go-back="true" :head-title="headTitle"></header-section>

        <div class="placeholder"></div>

        <main>
            <!-- 是一个弹出框！不是 链接！！ -->
            <div class="like-a" @click="setGender">
                <span>性别</span>
                <span>{{ userinfo.gender == 1 ? '男' : (userinfo.gender == 2 ? '女' : '未设置') }}</span>
            </div>
            <router-link :to="'/myinfo/profile/address'">
                <span>地区</span>
                <span>{{ userinfo.address }}</span>
            </router-link>
            <router-link :to="'/myinfo/profile/whatsup'">
                <span>个性签名</span>
                <span>{{ userinfo.whatsup || '未填写' }}</span>
            </router-link>
        </main>

        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import HeaderSection from '../../../components/HeaderSection'
    import { mapState } from 'vuex'

    export default {
      name: 'EditMore',
      components: {
        HeaderSection
      },
      data() {
        return {
          headTitle: '更多信息'
        }
      },
      computed: {
        ...mapState([
          'userinfo'
        ])
      },
      beforeMount() {
        this.userinfo.address = this.userinfo.country || this.userinfo.city
          ? this.userinfo.country + '' + this.userinfo.city
          : ''
      },
      methods: {
        setGender() {
          console.log('这是性别信息了～')

          // 弹出框，再说吧～
        }
      }
    }
</script>

<style lang="scss" scoped>
    @import "../../../style/mixin.scss";

    .more-page {
        @include page();
        z-index: 202;
    }
    section {
        background-color: #ffffff;
    }
    section .like-a, section a {
        height: auto;
        margin: 0 10px;
        padding: 15px;
        border-bottom: 1px solid #e8e8e8;
        display: flex;
        align-items: center;
        span {
            white-space: nowrap;
            flex: 0 1 0;
        }
        span:nth-child(2) {
            flex-grow: 1;
            text-align: right;
        }
    }
    .placeholder {
        height: 20px;
        width: auto;
    }
    .router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }
</style>