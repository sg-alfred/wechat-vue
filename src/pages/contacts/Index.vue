<template>
    <div class="contacts-page">
        <header-section :head-title="headTitle" :search-type="searchType" :has-dropdown="true"></header-section>

        <section class="nav-item">
            <el-row v-for="navItem in navList" :key="navItem.id">
                <el-col :span="6">
                    <span><img :src=navItem.imgurl /></span>
                </el-col>
                <el-col :span="18">
                    <span>{{navItem.name}}</span>
                </el-col>
            </el-row>
        </section>

        <div class="placeholder"></div>

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
                userList: [],
                navList: [{
                    id: 0,
                    imgurl: '',
                    name: '新的朋友'
                }, {
                    id: 1,
                    imgurl: '',
                    name: '群聊'
                }, {
                    id: 2,
                    imgurl: '',
                    name: '标签'
                }, {
                    id: 3,
                    imgurl: '',
                    name: '公众号'
                }]
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

<style scoped>
    .placeholder {
        height: 20px;
        width: auto;
        background-color: #e8e8e8;
    }
    img {
        width: 30px;
    }
    .nav-item {
        height: auto;
    }
    .nav-item .el-col {
        height: 40px;
        padding: 5px;
        margin-top: 5px;
        display: table;
        text-align: left;
        border-bottom: 1px solid #e8e8e8;
    }
    .nav-item .el-col span {
        display: table-cell;
        vertical-align: middle;
    }
</style>
