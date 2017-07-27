<template>
    <div class="">
        <header-section></header-section>
        <div class="contacts-container">
            <span>这是通讯录 界面！</span>
            <contact-item v-for="item in userList" :key="item.id" :userinfo="item"></contact-item>
        </div>
        <footer-section></footer-section>
    </div>
</template>

<script>
    import HeaderSection from '../components/HeaderSection'
    import FooterSection from '../components/FooterSection'
    import ContactItem from '../components/ContactItem'

    export default {
        name: 'Contacts',
        components: {
            HeaderSection,
            FooterSection,
            ContactItem
        },
        data() {
            return {
                // 其实，信息并不需要这么详细！！
                userList: [{
                    id: 0,
                    wechatno: 'sgchenjz',
                    nickname: '钻',
                    gender: '男',
                    country: '中国',
                    provice: '北京',
                    city: '海淀',
                    headimgurl: '',
                }, {
                    id: 2,
                    wechatno: 'guojy',
                    nickname: '雨',
                    gender: '男',
                    country: '中国',
                    headimgurl: '',
                }]
            }
        }
    }
</script>
