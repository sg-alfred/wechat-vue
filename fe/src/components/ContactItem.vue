<!-- 通讯录组件，点击到 好友简介，长按悬浮 设置 -->

<template>
<section class="contact-item" @click="$emit('get-detail', contactid)">
  <span>
    <img :src="contact.headimgurl" alt="avatar" />
  </span>
  <span>{{ contact.mobilephone }}</span>
</section>
</template>

<script>
export default {
  name: 'ContactItem',
  props: {
    contactid: {
      type: String,
      required: true,
    },
    contact: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
img {
  width: 2.5rem;
}

.contact-item {
  margin: 0 1rem;
  padding: 0.6rem;
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  align-items: center;
  text-align: left;

  span {
    padding: 0 1rem 0 0;
    flex: 0 1 0;
  }

  span:nth-child(2) {
    flex-grow: 1;
  }
}
</style>
