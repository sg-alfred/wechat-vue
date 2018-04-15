<template>
  <section class="">
        <span class="sendtime-info">
            {{ message.sendtime | formatTime }}
        </span>
    <div v-if="message.fromid != userid">
      <div class="message-friend">
        <span>
          <router-link :to="'/userprofile/' + contact._id">
            <img alt="好友" :src="contact.headimgurl">
          </router-link>
        </span>
        <span>{{ message.content }}</span>
      </div>
    </div>
    <div v-else>
      <div class="message-self">
        <span>{{ message.content }}</span>
        <span>
          <router-link :to="'/userprofile/' + userid">
            <img alt="自己" :src="userinfo.headimgurl">
          </router-link>
        </span>
      </div>
    </div>
  </section>
</template>

<script>
  import {mapState, mapGetters} from 'vuex'

  export default {
    name: 'MessageItem',
    props: {
      contact: {
        type: Object
      },
      message: {
        type: Object
      }
    },
    computed: {
      // 展开运算符
      ...mapState(['userinfo']),
      ...mapGetters({userid: 'getUserid'})
    },
    methods: {
      //
    }
  }
</script>

<style lang="scss" scoped>
  .sendtime-info {
    font-size: 0.8rem;
    background-color: #e3e3e3;
    padding: 5px;
  }

  .message-friend, .message-self {
    display: flex;
    align-items: center;

    span {
      text-align: left;
      margin: 0 10px;
      border-radius: 8px;
    }
  }

  .message-friend {
    justify-content: flex-start;

    span:nth-child(2) {
      background-color: white;
      margin: 10px 50px 10px 10px;
      padding: 10px;
      max-width: 80%;
    }
  }

  .message-self {
    justify-content: flex-end;

    span:nth-child(1) {
      background-color: #92e748;
      margin: 10px 10px 10px 50px;
      padding: 10px;
      max-width: 80%;
    }
  }

  img {
    width: 30px;
  }
</style>