<template>
    <section class="send-section" ref="sendSection"
             :class="{'show-panel': isShowEmoji || isShowShortcuts}">
        <section class="message-section">
            <div @click="speak">
                <svg class="icon fa-12x" aria-hidden="true">
                    <use xlink:href="#icon-yuyin"></use>
                </svg>
            </div>
            <div>
                <input v-model="content" @keyup.enter="doSendMessage">
            </div>
            <div @click="showEmoji">
                <svg class="icon fa-12x" aria-hidden="true">
                    <use xlink:href="#icon-biaoqing"></use>
                </svg>
            </div>
            <div>
                <el-button v-if="!this.content" icon="plus" @click="showShortcuts"></el-button>
                <el-button v-else type="success" @click="doSendMessage">发送</el-button>
            </div>
        </section>

        <!-- 表情包 -->
        <section class="tool-panel" v-if="isShowEmoji">
            <transition name="panel-show">
                <img src="/static/image/send-emoji.png">
            </transition>
        </section>

        <!-- 快捷 发送选项 -->
        <section class="tool-panel" v-if="isShowShortcuts">
            <transition name="panel-show">
                <img src="/static/image/send-shortcut.png">
            </transition>
        </section>

    </section>
</template>

<script>
import { mapActions } from 'vuex'
import { sendMessage } from '../../api'

export default {
  name: 'Message',
  data() {
    return {
      content: '', // 文字信息
      isShowEmoji: false,
      isShowShortcuts: false
    }
  },
  props: {
    chatid: { // 聊天室id
      type: String,
      required: true
    }
  },
  methods: {
    ...mapActions(['addMessage']),
    async doSendMessage() {
      if (this.content.trim()) {
        console.log('发送的消息-11-', this.chatid, this.content)

        // 需要和 服务端通讯一下，获取 messageId
        const response = await sendMessage(this.chatid, {
          content: this.content,
          sendtime: Date.now()
        })

        // 成功之后，往 vuex 里面放啊！
        await this.addMessage(response.data.data)

        this.content = ''
      }
    },
    speak() {

    },
    // 必须得通知到 父组件，这样，才能让 聊天记录container 缩小一下～
    // 或许只要修改 本身的 height 就好～ 试试。。
    showEmoji() {
      this.isShowShortcuts = false
      this.isShowEmoji = !this.isShowEmoji

      // let section = this.$el.querySelector('.send-section')
      // let sendSection = this.$refs.sendSection

      // offsetHeight 是组件的高度，但是 getter-only .. 那还能怎么改？
      // sendSection.offsetHeight = 300

      this.$emit('show', this.isShowEmoji || this.isShowShortcuts)
    },
    showShortcuts() {
      this.isShowEmoji = false
      this.isShowShortcuts = !this.isShowShortcuts

      this.$emit('show', this.isShowEmoji || this.isShowShortcuts)
    }
  }
}
</script>

<style lang="scss" scoped>
    .send-section {
        border: ghostwhite solid 2px;
        background-color: white;
        position: fixed;
        bottom: 0;
        /* height 需要动态修改！因为需要反映到 父组件 */
        height: 50px;
        font-size: 20px;
        width: 100%;
        z-index: 101;
        padding-top: 8px;
    }
    .show-panel {
        height: 300px;
    }
    .message-section {
        display: flex;
        justify-content: center;
        align-items: center;
        div {
            margin: 0 10px;
            flex: 0 1 0;
        }
        div:nth-child(2) {
            flex-grow: 1;
            input {
                border: hidden;
                border-bottom: 1px solid green;
                width: 100%;
            }
        }
    }
    .tool-panel {
        height: 250px;
        img {
            height: 250px;
            width: 100%;
        }
    }
    .panel-show-enter, .panel-show-leave-active {
        transform: translate3d(0, 273px, 0)
    }
    .panel-show-enter-active, .panel-show-leave-active {
        transition: all .5s ease-in-out
    }
    .fa-12x {
        font-size: 1.2rem;
    }
</style>