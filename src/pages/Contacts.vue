<template>
    <div class="">
        <header-section></header-section>
        <div class="contacts-container">
            <span>这是通讯录 界面！</span>
            <contact-item
                    v-for="item in userList"
                    :key="item.id" :userinfo="item"
                    @into-chatroom="intoChatroom"
            ></contact-item>
        </div>
        <footer-section></footer-section>
    </div>
</template>

<script>

    import Vue from 'vue';

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
                userList: []
            }
        },
        mounted() {
            this.$http.get('../../static/initData/userlist.json')
                .then(response => {
                    // 这个闭包，this 应该不一样才对啊！
                    this.userList = response.body.userList;
                }, response => {
                    alert("调用失败");
                })
        },
        methods: {
            // 进入特定的聊天室
            intoChatroom(chatid) {
                this.$router.push('/chatroom');
            },
        }
    }
</script>
