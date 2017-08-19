<template>
    <div class="contacts-page">
        <header-section :head-title="headTitle" :search-type="searchType" :has-dropdown="true"></header-section>

        <section class="nav-item">
            <el-row v-for="navItem in navList" :key="navItem.id">
                <router-link :to="'/contacts/' + navItem.type">
                    <el-col :span="6">
                        <span><img :src=navItem.imgurl /></span>
                    </el-col>
                    <el-col :span="18">
                        <span>{{navItem.name}}</span>
                    </el-col>
                </router-link>
            </el-row>
        </section>

        <div class="placeholder"></div>

        <section class="contacts-container">
            <contact-item
                    v-for="item in userList"
                    :key="item.id" :userinfo="item.fid"
                    @get-detail="getDetail"
            ></contact-item>
        </section>

        <footer-section></footer-section>

        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
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
                    type: 'newFriends',
                    name: '新的朋友',
                    imgurl: 'static/image/contacts/icon-mobile.png'
                }, {
                    id: 1,
                    type: 'groupChat',
                    name: '群聊',
                    imgurl: 'static/image/contacts/icon-group.png'
                }, {
                    id: 2,
                    type: 'tags',
                    name: '标签',
                    imgurl: 'static/image/contacts/icon-tag.png'
                }, {
                    id: 3,
                    type: 'office',
                    name: '公众号',
                    imgurl: 'static/image/contacts/icon-official.png'
                }]
            }
        },
        mounted() {
//            this.$http.get('../../static/initData/userlist.json').then(response => {
//                // 这个闭包，this 应该不一样才对啊！
//                this.userList = response.body.userList;
//            }, response => {
//                alert("调用失败");
//            })

            this.$http.get('/contact/getContacts').then(response => {
                this.userList = response.body.data;
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
        width: 40px;
    }
    .nav-item .el-row {
        margin: 0 10px;
        padding: 10px;
        border-bottom: 1px solid #e8e8e8;
    }
    .nav-item .el-col {
        display: table;
        text-align: left;
        height: 40px;
    }
    .nav-item .el-col span {
        display: table-cell;
        vertical-align: middle;
    }
</style>
