<!-- 朋友圈界面 -->

<template>
    <div class="">
        <!-- 朋友圈界面的 头部, 貌似没有必要组件化！ 因为，只能这里使用！ -->
        <p>为什么没有显示？？</p>

        <div v-if="momentList.length">
            <!-- 如果直接 使用 moment="item" 报了 moment expected Object,String got !-->
            <one-moment v-for="item in momentList" :key="item.id" v-bind:moment="item"></one-moment>
        </div>
    </div>
</template>

<script>
    import OneMoment from '../components/OneMoment'

    export default {
        name: 'Moment',
        // 对象语法，提供校验
//        props: {
//            momentList: {
//                type: Array
//            }
//        },
        components: {
            OneMoment
        },
        data() {
            return {
                momentList: [{
                    id: 0,
                    nick: 'sgchenjz',
                    content: '这是一条状态！'
                }, {
                    id: 1,
                    nick: 'Alfred',
                    content: '这是我的英文名字！'
                }, {
                    id: 2,
                    nick: 'guojy',
                    content: 'hhh，大傻逼！'
                }]
            }
        }
    }
</script>
