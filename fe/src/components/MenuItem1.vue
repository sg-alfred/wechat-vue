<!-- 菜单基本样式之一，一个图标，跟着一行！， -->
<template>
<section class="item-section">
  <!-- 头部占位、分割 -->
  <div :class="{ placeholder: itemInfo.isFirst }" />

  <!-- 真正的功能菜单 -->
  <router-link :to="'/' + parent + '/' + itemInfo.type">
    <!-- 加载 sprite 图片 -->
    <div :class="['gopng_' + itemInfo.type + '_outer', 'gopng_' + itemInfo.type]" class="gopng_icon">
      <!-- 加载一张张图片，占用请求 -->
      <!--<img :src="itemInfo.imgUrl" />-->

      <!-- 换成 阿里矢量图的？ -->
      <!--<svg class="icon fa-12x" aria-hidden="true">
            <use xlink:href="'#' + itemInfo.imgUrl"></use>
        </svg>-->
    </div>

    <span>{{ itemInfo.name }}</span>
  </router-link>

  <!-- 底部占位、分割 -->
  <div :class="{ placeholder: itemInfo.isEnd }" />
</section>
</template>

<script>
export default {
  name: 'MenuItem1',
  props: {
    parent: {
      type: String,
      required: true,
    },
    itemInfo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    goto(path) {
      // 跳转之前，需要设置一下 状态吧？
      this.$router.push(path);
    },
  },
};
</script>

<style lang="scss" scoped>
.placeholder {
  height: 1.2rem;
  background-color: #e8e8e8;
  z-index: 50;
}

.gopng_icon {
  height: 42px;
  width: 42px;
  background-size: cover;
  transform: scale(0.5);
}

.item-section a {
  margin: 0 1rem;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #e8e8e8;
  text-align: left;

  span {
    margin: 0 0 0 1rem;
    /*flex: 0 1 0;*/
    flex-grow: 1;
  }
}
</style>
