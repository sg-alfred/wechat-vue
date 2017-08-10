<template>
    <div class="">
        <header-section :goBack="true" :head-title="headTitle"></header-section>

        <section>
            <!-- 每一个都是 链接，可以跳转编辑！ router-link , 动态加载！-->
            <table>
                <tr><td>头像</td><td></td></tr>
                <tr><td>昵称</td><td></td></tr>
                <tr><td>微信号</td><td></td></tr>
                <tr><td>二维码名片</td><td></td></tr>
                <tr><td>更多</td><td></td></tr>
            </table>
        </section>

        <section>
            <span>我的地址</span>
        </section>
    </div>
</template>

<script>
    import HeaderSection from '../../components/HeaderSection'

    export default {
        name: "MyProfile",
        components: {
            HeaderSection
        },
        data() {
            return {
                headTitle: '个人信息',
                myprofile: {
                    id: 0,
                    wechatno: 'sgchenjz',
                    nickname: '钻',
                    remark: 'hehe',
                    gender: '男',
                    country: '中国',
                    headimgurl: '',
                    tags: ''
                }
            }
        }
    }
</script>