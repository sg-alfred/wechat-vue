<template>
    <div class="contacts-page">
        <header-section :head-title="headTitle" :search-type="searchType" :has-dropdown="true"></header-section>

        <section class="contacts-container">

            <nav class="nav-section">
                <router-link :to="'/contacts/' + navItem.type"
                             v-for="navItem in navList" :key="navItem.id">
                    <span><img :src=navItem.imgurl /></span>
                    <span>{{navItem.name}}</span>
                </router-link>
            </nav>

            <div class="placeholder"></div>

            <section class="contacts-section">
                <contact-item
                        v-for="(item, id) in contactMap"
                        :key="id" :contactid="id" :contact="item"
                        @get-detail="getDetail"
                ></contact-item>
            </section>

        </section>

        <footer-section></footer-section>

        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>

    import { mapGetters, mapActions } from 'vuex'
    import { isEmptyObject } from '../../util'
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
                userid: 'getUserid',
                contactMap: 'getContacts'
            })
        },
        data() {
            return {
                headTitle: '微信',
                searchType: 'all',
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
        created() {
            console.log('通讯录取 vuex 数据--', JSON.stringify(this.contactMap), isEmptyObject(this.contactMap))
            if (isEmptyObject(this.contactMap)) {        // vuex 没有，则调用
                this.initContacts(this.userid)
            }
        },
        methods: {
            ...mapActions(['initContacts']),
//            async initContacts() {
//                const response = await getContacts();
//                // 保存到 vuex，如果有，直接取，否则再取
//                this.contactMap = response.data.data;
//            },
            getDetail(fid) {
                this.$router.push('/userprofile/' + fid  + '?friend=true');
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../style/mixin.scss";

    .placeholder {
        height: 20px;
        width: auto;
        background-color: #e8e8e8;
    }
    .contacts-page {
        @include page(#ffffff);
        padding-bottom: 70px;
    }
    .contacts-container {
        overflow: auto;
        height: 100%;
    }
    img {
        width: 40px;
    }
    .nav-section a {
        text-align: left;
        margin: 0 10px;
        padding: 10px;
        border-bottom: 1px solid #e8e8e8;
        display: flex;
        align-items: center;
        span {
            padding: 0 10px;
            flex: 0 1 0;
        }
        span:nth-child(2) {
            flex-grow: 1;
        }
    }
</style>
