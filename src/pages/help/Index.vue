<template>
    <div class="help-page">

        <header-section :go-back="true" :head-title="headTitle"></header-section>

        <main>
            帮助与反馈

            <article class="help-container">
                <el-input
                        placeholder="搜索"
                        icon="search"
                        :on-icon-click="handleIconClick">
                </el-input>
            </article>
        </main>

        <footer>
            <div v-for="item in subMenus" :key="item.id" @click="$router.push('/help/' + item.type)">
                <i class="fa" :class="item.icon" aria-hidden="true"></i>
                <span>{{item.name}}</span>
            </div>
        </footer>
    </div>
</template>

<script>
import HeaderSection from '../../components/HeaderSection'

export default {
  name: 'Help',
  components: {
    HeaderSection
  },
  data() {
    return {
      headTitle: '帮助与反馈',
      subMenus: [{
        id: 0,
        type: 'all',
        name: '全部问题',
        icon: 'fa-list-ul'
      }, {
        id: 1,
        type: 'quick',
        name: '快捷帮助',
        icon: 'fa-map-o'
      }, {
        id: 2,
        type: 'feedback',
        name: '意见反馈',
        icon: 'fa-pencil-square-o'
      }]
    }
  },
  methods: {
    handleIconClick(ev) {
      console.log(ev)
    }
  }
}
</script>

<style lang="scss" scoped>
    @import "../../style/mixin.scss";

    .help-page {
        @include page();
    }
    footer {
        border: 2px solid ghostwhite;
        position: fixed;
        bottom: 0;
        height: 50px;
        width: 100%;
        z-index: 100;
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    footer div {
        flex-grow: 1;
    }
</style>
