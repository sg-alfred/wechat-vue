<template>
    <div class="">
        <header-section :head-title="headTitle" :search-type="searchType" :has-dropdown="true"></header-section>

        <div style="height: 10px"></div>

        <section class="contacts-container">
            <contact-item
                    v-for="item in userList"
                    :key="item.id" :userinfo="item"
                    @get-detail="getDetail"
            ></contact-item>
        </section>

        <footer-section></footer-section>
    </div>
</template>

<script>

    import { mapGetters } from 'vuex'
    import HeaderSection from '../../components/HeaderSection'
    import FooterSection from '../../components/FooterSection'
    import ContactItem from '../../components/ContactItem'

    export default {
        name: 'Contacts',
        components: {
            HeaderSection,
            FooterSection,
            ContactItem
        },
        computed: {
            ...mapGetters({
                isLogin: 'getIsLogin'
            })
        },
        created() {
            if (!this.isLogin) {
                this.$router.push('/login');
            }
        },
        data() {
            return {
                headTitle: '微信',
                searchType: 'all',
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
            getDetail(fid) {
                console.log(fid)
                this.$router.push('/userprofile/' + fid);
            }
        }
    }
</script>
