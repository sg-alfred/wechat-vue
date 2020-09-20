<template>
<div class="search-page">
  <header-section :go-back="true" headTitle="">
    <section slot="searchFrm" class="search-frm">
      <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <circle cx="18" cy="18" r="7" stroke="rgb(255,255,255)" stroke-width="1" fill="none" />
        <line x1="24" y1="24" x2="30" y2="30" style="stroke:rgb(255,255,255);stroke-width:2" />
      </svg>
      <input v-model="keyword" type="text" @keyup.enter="search" />
    </section>
  </header-section>

  <main v-if="'friend' !== type" class="search-container">
    <p class="search-title">指定搜索内容</p>
    <ul>
      <li class="show">朋友圈</li>
      <li class="show">文章</li>
      <li>公众号</li>
      <li class="show">小说</li>
      <li class="show">音乐</li>
      <li>表情</li>
    </ul>
    <!--<p class="search-title">看一看</p>-->
  </main>
</div>
</template>

<script>
import {
  mapState
} from 'vuex';
import {
  searchUser
} from '@/api';
import {
  isEmptyObject,
  localStorage
} from '@/utils';
import HeaderSection from '@/components/HeaderSection';

export default {
  name: 'Search',
  components: {
    HeaderSection,
  },
  data() {
    return {
      type: 'all',
      keyword: '',
      searchResult: [],
    };
  },
  computed: {
    ...mapState(['contacts']),
  },
  created() {
    this.type = this.$route.params.type;
  },
  methods: {
    async search() {
      console.log('搜索参数：', this.keyword);
      switch (this.type) {
        case 'all':
          console.log('searchAll');
          break;
        case 'friend':
          console.log('searchFriend', '搜索-00-');

          let searchid = '';

          if (!isEmptyObject(this.contacts)) {
            // mobilephone 是 int，而非 字符串
            const foundContact = Object.values(this.contacts).find((x) => {
              return (
                x.mobilephone === this.keyword || x.wechatno === this.keyword
              );
            });

            if (foundContact) searchid = foundContact._id;
          }

          if (!searchid) {
            const response = await searchUser(this.keyword);
            const searchResult = response.data;

            console.log('搜索结果：', searchResult);

            // 缓存起来～
            if (!searchResult.code && !!searchResult.data) {
              searchid = searchResult.data._id;
              this.searchResult = searchResult.data;

              // 缓存起来了～
              localStorage(searchid, searchResult.data);
            } else {
              this.$message(searchResult.message);
            }
          }
          console.log('查询ID-searchid--', searchid);

          // 有跳转到用户的 详情界面！
          if (searchid) {
            this.$router.push('/userprofile/' + searchid);
          }
          break;
        default:
          console.log('参数有误：', this.type);
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../style/mixin.scss';

.search-page {
  @include page();
}

.search-frm {
  box-sizing: border-box;
  margin: 1rem 1rem 0.5rem 4rem;
  border-bottom: 1px solid greenyellow;
  display: flex;

  svg {
    text-align: left;
  }

  input {
    border: hidden;
    background-color: #434439;
    color: white;
    font-size: 1.5rem;
    box-sizing: border-box;
    padding: 0.5rem;
    display: inline-block;
    width: 100%;
  }
}

ul {
  list-style: none;
  padding: 0 5%;

  li {
    float: left;
    width: 33%;
    color: limegreen;
    margin: 15px 0;
  }
}

.search-container .show {
  border-right: 1px solid silver;
}

.search-title {
  padding: 2rem;
}
</style>
