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
    <div class="">
        <!--<el-row>
            <el-col :span="">

            </el-col>
        </el-row>-->
        <div class="">
            <!--用户头像-->
        </div>
        <div class="">
            <span>{{chatItem.name}}</span>
            <span>{{chatItem.lasttime}}</span>
        </div>
        <div class="">
            <span>{{chatItem.content}}</span>
            <i class="el-icon-caret-bottom el-icon--right"></i>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'WechatItem',
//        props: {
//            chatItem: {
//                type: Object,
//                required: true
//            }
//        },
        data() {
            return {
                chatItem: {
                    name: 'sha',
                    lasttime: '00:00:00',
                    content: 'hello, vue!'
                }
            }
        }
    }
</script>
