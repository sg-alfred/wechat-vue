<!-- 聊天组件
    数据库设计好难啊！！都不知道这个要怎么设置字段名称～

    id, uid, fid, addtime, agreetime, deletetime，status 等
    想要 如果 A加B为好友，则创建一条， 若 B同意则 在创建一条；状态改变的时候，同时变化 status.
    同样的逻辑处理 群聊天……

    但又想用 来直接创建 聊天室，但是，采取 AB的 还是 BA的？
    说 可能和群聊天的 id 重复倒也好办，直接用 0，1 区分是那种聊天模式～

    可是，真的难，不懂 数据库设计啊～～

            ———— 2017年7月28日 00:00:00
 -->

<template>
    <section class="wechat-item" @click="$emit('into-chatroom', chatItem._id)">

        <span>
            <!-- 连接到 用户详情界面 -->
            <!--<router-link :to=""></router-link>-->
            <img :src=chatItem.headimgurl alt="avatar" />
        </span>
        <div>
            <p class="padding-5">
                <!-- 依次取 自己设置的备注名，好友的别名，手机号码 -->
                <span>{{ chatItem.nickname || chatItem.alias || chatItem.mobilephone }}</span>
                <span class="right">{{ chatItem.chatinfo.sendtime | formatTime }}</span>
            </p>
            <p class="padding-5">
                <span>{{ chatItem.chatinfo.content }}</span>
            </p>
        </div>

    </section>
</template>

<script>
export default {
  name: 'WechatItem',
  props: {
    chatItem: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
    img {
        width: 48px;
    }
    .wechat-item {
        padding: 10px;
        margin: 0 10px;
        border-bottom: 1px solid #e8e8e8;
        text-align: left;
        display: flex;
        align-items: center;
        div {
            flex-grow: 1;
        }
    }
    .wechat-item > span {
        margin: 0 10px 0 0;
    }
    .padding-5 {
        padding: 5px;
    }
</style>
