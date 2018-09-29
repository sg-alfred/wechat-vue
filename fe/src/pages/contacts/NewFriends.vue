<template>
  <div class="newfriends-page">
    <header-section :go-back="true" :head-title="headTitle">
      <section slot="addFriendText right" class="head-addFriend" @click="$router.push('/addFriend')">
        <span>添加朋友</span>
      </section>
    </header-section>

    <main>
      <section class="searchFriend-section">
        <router-link :to="'/search/friend'">
          <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" version="1.1">
            <circle cx="18" cy="18" r="7" stroke="rgb(00,80,00)" stroke-width="1" fill="none"/>
            <line x1="24" y1="24" x2="30" y2="30" style="stroke:rgb(00,80,00);stroke-width:2"/>
          </svg>
        </router-link>
      </section>

      <article class="request-article">
        <div><label>新的朋友</label></div>

        <!-- 组件化！和微信界面一致，头像也是比较大的那个！但是 点击进去 不一样啊，一个用户详情，一个是聊天室 -->
        <section v-for="(item, id) in newFriendList" :key="id" class="request-section">
          <span>
            <img src="../../assets/logo.png" alt="avatar">
          </span>
          <span>
            <span>{{ item.uid.mobilephone }}</span>
            <span>{{ item.uid.alias }}</span>
          </span>
          <span>
            <span v-if="item.status === 0">
              <el-button type="success" @click="handleFriend(item.uid, item._id)">接受</el-button>
            </span>
            <span v-else style="white-space: nowrap">已添加</span>
          </span>
        </section>
      </article>
    </main>
  </div>
</template>

<script>
import Vue from 'vue'
import {getNewFriends, handleNewFriend} from '@/api'
import HeaderSection from '@/components/HeaderSection'

export default {
  name: 'NewFriends',
  components: {
    HeaderSection
  },
  data() {
    return {
      headTitle: '添加好友',
      newFriendList: {}
    }
  },
  async beforeMount() {
    const response = await getNewFriends()
    // this.newFriendList = response.data.data;

    // TODO 处理一下数据格式，以方便 状态更改～
    response.data.data.forEach((item) => {
      Vue.set(this.newFriendList, item._id, item)
    })
    // console.log(JSON.stringify(this.newFriendList))
  },
  methods: {
    async handleFriend(finfo, id) {
      console.log('处理好友请求', finfo._id, id)

      const response = await handleNewFriend({
        fid: finfo._id,
        type: 'accept' // 同意，或者加入黑名单等等～
      })
      const handleResult = response.data

      this.$message(handleResult.message)

      if (!handleResult.code) {
        this.newFriendList[id].status = 1
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../style/mixin.scss";

  .newfriends-page {
    @include page();
    z-index: 202;
  }

  .head-addFriend {
    padding: 2rem;
    font-size: 16px;
  }

  .searchFriend-section {
    background-color: white;
    width: 100%;
    margin: 1.2rem 0;
  }

  .request-article {
    text-align: left;
  }

  .request-article > div {
    font-size: 16px;
    padding: 1rem;
  }

  .request-article .request-section {
    background-color: white;
    height: 4rem;
    border-bottom: 1px solid #e8e8e8;
    display: flex;
    align-items: center;
    span {
      margin: 0 2rem;
      flex: 0 1 0;
    }
    span:nth-child(2) {
      flex-grow: 1;
    }
    img {
      height: 2.5rem;
    }
  }
</style>