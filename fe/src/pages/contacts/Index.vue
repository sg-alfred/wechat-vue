<template>
<div class="contacts-page">
  <header-section :head-title="headTitle" :search-type="searchType" :has-dropdown="true" />

  <main class="contacts-container">
    <nav class="nav-section">
      <router-link v-for="navItem in navList" :to="'/contacts/' + navItem.type" :key="navItem.id">
        <span><img :src="navItem.imgurl" /></span>
        <span>{{ navItem.name }}</span>
      </router-link>
    </nav>

    <div class="placeholder" />

    <section class="contacts-section">
      <contact-item v-for="(item, id) in contacts" :key="id" :contactid="id" :contact="item" @get-detail="getDetail" />
    </section>
  </main>

  <footer-section />

  <transition name="router-slid" mode="out-in">
    <router-view />
  </transition>
</div>
</template>

<script>
import {
  mapState
} from 'vuex';
import HeaderSection from '@/components/HeaderSection';
import FooterSection from '@/components/FooterSection';
import ContactItem from '@/components/ContactItem';

export default {
  name: 'Contacts',
  components: {
    HeaderSection,
    FooterSection,
    ContactItem,
  },
  data() {
    return {
      headTitle: '微信',
      searchType: 'all',
      navList: [{
          id: 0,
          type: 'newFriends',
          name: '新的朋友',
          imgurl: require('@/assets/image/contacts/icon-mobile.png'),
        },
        {
          id: 1,
          type: 'groupChat',
          name: '群聊',
          imgurl: require('@/assets/image/contacts/icon-group.png'),
        },
        {
          id: 2,
          type: 'tags',
          name: '标签',
          imgurl: require('@/assets/image/contacts/icon-tag.png'),
        },
        {
          id: 3,
          type: 'office',
          name: '公众号',
          imgurl: require('@/assets/image/contacts/icon-official.png'),
        },
      ],
    };
  },
  computed: {
    ...mapState(['contacts']),
  },
  methods: {
    getDetail(contactid) {
      this.$router.push('/userprofile/' + contactid);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../style/mixin.scss';

.placeholder {
  height: 1.2rem;
  width: auto;
  background-color: #e8e8e8;
}

.contacts-page {
  @include page(#ffffff);
  padding-bottom: 7rem;
}

.contacts-container {
  overflow: auto;
  height: 100%;
}

img {
  width: 2.5rem;
}

.nav-section a {
  text-align: left;
  margin: 0 1rem;
  padding: 0.6rem;
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  align-items: center;

  span {
    padding: 0 1rem 0 0;
    flex: 0 1 0;
  }

  span:nth-child(2) {
    flex-grow: 1;
  }
}
</style>
