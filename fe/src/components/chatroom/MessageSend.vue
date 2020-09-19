<template>
  <section
    ref="sendSection"
    :class="{ 'show-panel': isShowEmoji || isShowShortcuts }"
    class="send-section"
  >
    <section class="message-section">
      <div @click="speak">
        <svg class="icon fa-12x" aria-hidden="true">
          <use xlink:href="#icon-yuyin" />
        </svg>
      </div>
      <div>
        <input v-model="content" @keyup.enter="doSendMessage" />
      </div>
      <div @click="showEmoji">
        <svg class="icon fa-12x" aria-hidden="true">
          <use xlink:href="#icon-biaoqing" />
        </svg>
      </div>
      <div>
        <el-button v-if="!content" icon="plus" @click="showShortcuts" />
        <el-button v-else type="success" @click="doSendMessage">发送</el-button>
      </div>
    </section>

    <!-- 表情包 -->
    <section v-if="isShowEmoji" class="tool-panel">
      <transition name="panel-show">
        <img src="/assets/image/send-emoji.png" />
      </transition>
    </section>

    <!-- 快捷 发送选项 -->
    <section v-if="isShowShortcuts" class="tool-panel">
      <transition name="panel-show">
        <img src="/assets/image/send-shortcut.png" />
      </transition>
    </section>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import { sendMessage } from '@/api';

export default {
  name: 'Message',
  props: {
    chatid: {
      // 聊天室id
      type: String,
      required: true,
    },
  },
  data() {
    return {
      content: '', // 文字信息
      isShowEmoji: false,
      isShowShortcuts: false,
    };
  },
  methods: {
    ...mapActions(['addMessage']),
    async doSendMessage() {
      if (this.content.trim()) {
        console.log('发送的消息-11-', this.chatid, this.content);

        // 需要和 服务端通讯一下，获取 messageId
        const response = await sendMessage(this.chatid, {
          content: this.content,
          sendtime: Date.now(),
        });

        // 成功之后，往 vuex 里面放啊！
        await this.addMessage(response.data.data);

        this.content = '';
      }
    },
    speak() {},
    // 必须得通知到 父组件，这样，才能让 聊天记录container 缩小一下～
    // 或许只要修改 本身的 height 就好～ 试试。。
    showEmoji() {
      this.isShowShortcuts = false;
      this.isShowEmoji = !this.isShowEmoji;

      // let section = this.$el.querySelector('.send-section')
      // let sendSection = this.$refs.sendSection

      // offsetHeight 是组件的高度，但是 getter-only .. 那还能怎么改？
      // sendSection.offsetHeight = 300

      this.$emit('show', this.isShowEmoji || this.isShowShortcuts);
    },
    showShortcuts() {
      this.isShowEmoji = false;
      this.isShowShortcuts = !this.isShowShortcuts;

      this.$emit('show', this.isShowEmoji || this.isShowShortcuts);
    },
  },
};
</script>

<style lang="scss" scoped>
.send-section {
  background-color: white;
  position: absolute;
  bottom: 0;
  height: 3.6rem;
  font-size: 2rem;
  width: 100%;
  z-index: 101;
}
.message-section {
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: ghostwhite solid 0.1rem;
  box-sizing: border-box;
  padding: 0.4rem 0;
  div {
    margin: 0 0.8rem;
    flex: 0 1 0;
  }
  div:nth-child(2) {
    flex-grow: 1;
    input {
      border: hidden;
      border-bottom: 1px solid green;
      width: 100%;
      font-size: 1.2rem;
      padding: 0.4rem;
    }
  }
}
.tool-panel {
  position: absolute;
  bottom: 0;
  height: 20rem;
  img {
    height: 20rem;
    width: 100%;
  }
}
.panel-show-enter,
.panel-show-leave-active {
  transform: translate3d(0, 273px, 0);
}
.panel-show-enter-active,
.panel-show-leave-active {
  transition: all 0.5s ease-in-out;
}
.fa-12x {
  font-size: 1.2rem;
}
</style>
