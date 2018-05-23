<template>
  <section class="message-item">
    <span class="sendtime-info">
      {{ message.sendtime | formatTime }}
    </span>
    <!-- 好友信息 -->
    <div v-if="message.fromid != userid">
      <div class="message-friend">
        <span>
          <router-link :to="'/userprofile/' + contact._id">
            <img alt="好友" :src="contact.headimgurl">
          </router-link>
        </span>
        <div>
          <span class="bubble"></span>
          {{ message.content }}
        </div>
      </div>
    </div>
    <!-- 自己发送的信息 -->
    <div v-else>
      <div class="message-self">
        <div>
          <span class="bubble"></span>
          {{ message.content }}
        </div>
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
      ...mapState(['userinfo']),
      ...mapGetters({userid: 'getUserid'})
    }
  }
</script>

<style lang="scss" scoped>

  .message-item {
    padding: .4rem 0;
  }

  .sendtime-info {
    font-size: .8rem;
    background-color: #e3e3e3;
    padding: 5px;
  }

  .message-friend, .message-self {
    display: flex;
    align-items: center;
    margin: .5rem;
    text-align: left;

    div {
      margin: 0 1rem;
      border-radius: .5rem;
      position: relative;
      padding: .8rem;
      max-width: 70%;
      word-wrap: break-word;

      span {
        width: 0;  height: 0;
        font-size: 0;
        overflow: hidden;
        position: absolute;
        border-width: .8rem;
        border-style: solid dashed dashed;
      }
    }
  }

  .message-friend {
    justify-content: flex-start;

    div {
      background-color: white;
      span {
        border-color: transparent #fff transparent transparent;
        left: -1.5rem;
        bottom: .8rem
      }
    }
  }

  .message-self {
    justify-content: flex-end;

    div {
      background-color: #92e748;
      span {
        border-color: transparent transparent transparent #92e748;
        right: -1.5rem;
        bottom: .8rem
      }
    }
  }

  img {
    width: 2.5rem;
  }
</style>