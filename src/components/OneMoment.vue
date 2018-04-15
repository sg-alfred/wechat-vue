<!-- 朋友圈的 每条状态组件 -->

<template>
  <section class="moment-item">
    <div>
      <img src="../assets/logo.png" alt="avatar"/>
    </div>
    <div>
      <span>
        <a>{{ moment.nick }}</a>
      </span>
      <p>{{ moment.content }}</p>
      <div>
        <span>{{ moment.createtime }}</span>

        <el-popover
            ref="popover2"
            placement="left"
            width="100"
            trigger="click"
            content="点赞或评论。">
          <el-button-group>
            <el-button icon="star-on" @click="makeUpvote">赞</el-button>
            <el-button icon="edit" @click="makeCommet">评论</el-button>
          </el-button-group>
        </el-popover>

        <el-button class="right" v-popover:popover2>
          <svg class="icon fa-18x" aria-hidden="true">
            <use xlink:href="#icon-comment"></use>
          </svg>
        </el-button>
      </div>

    </div>

  </section>
</template>

<script>
  export default {
    name: 'OneMoment',
    // 对象语法，提供校验
    props: {
      moment: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        showOperation: false
      }
    },
    methods: {
      makeUpvote () {
        console.log('点赞！')
      },
      makeCommet() {
        console.log('评论吧～')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .moment-item {
    margin: 0 .8rem;
    padding: .8rem;
    display: flex;
    text-align: left;
    border-bottom: 1px solid #e8e8e8;

    p {
      margin: .8rem 0;
    }

    div:nth-child(1) {
      margin: 0 1.2rem 0 0;
      flex: 0 1 0;
    }

    div:nth-child(2) {
      flex-grow: 1;
      > div > .el-button {
        border: none;
        padding: .1rem;
        position: relative;
        top: -.4rem;
        box-sizing: content-box;
      }
    }
  }

  img {
    width: 48px;
  }

  .fa-18x {
    font-size: 1.8rem;
  }

  /* 悬浮，无法在？ */
  .el-popover {
    background-color: #434439;
    padding: 0;
    .el-button-group {
      .el-button {
        background-color: #434439;
        color: #fff;
      }
    }
  }
</style>
