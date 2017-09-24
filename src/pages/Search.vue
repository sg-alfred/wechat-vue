<template>
    <div class="search-page">
        <header-section :go-back="true">
            <section slot="searchFrm" class="search-frm">
                <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <circle cx="18" cy="18" r="7" stroke="rgb(255,255,255)" stroke-width="1" fill="none"/>
                    <line x1="24" y1="24" x2="30" y2="30" style="stroke:rgb(255,255,255);stroke-width:2"/>
                </svg>
                <input v-model="keyword" type="text" @keyup.enter="search"/>
            </section>
        </header-section>

        <section class="search-container" v-if="'all' === type">
            <p class="search-title">指定搜索内容</p>
            <ul>
                <li class="show">朋友圈</li>
                <li class="show">文章</li>
                <li>公众号</li>
                <li class="show">小说</li>
                <li class="show">音乐</li>
                <li>表情</li>
            </ul>
            <p class="search-title clearfix">看一看</p>
        </section>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { searchUser } from '../api'
    import { isEmptyObject } from '../util'
    import HeaderSection from '../components/HeaderSection'

    export default {
        name: 'Search',
        components: {
            HeaderSection
        },
        data() {
            return {
                type: 'all',
                keyword: '',
                searchResult: []
            }
        },
        computed: {
            ...mapGetters({
                userid: 'getUserid',
                contactMap: 'getContacts'
            })
        },
        created() {
            this.type = this.$route.params.type;
        },
        methods: {
            async search() {
                console.log(this.keyword)
                switch (this.type) {
                    case 'all':
                        console.log('searchAll');
                        break;
                    case 'friend':
                        console.log('searchFriend', '搜索-00-', this.contactMap)

                        let searchid = '',
                            isFriend = false;

                        if (!isEmptyObject(this.contactMap)) {
                            for (let ele of this.contactMap) {
                                if (ele.mobilephone === this.keyword || ele.wechatno === this.keyword) {
                                    searchid = ele.id
                                    isFriend = true
                                    break ;
                                }
                            }
                        }

                        if (!searchid) {
                            const response = await searchUser(this.keyword)
                            const searchResult = response.data;

                            // 缓存起来～

                            if (!searchResult.code && !!searchResult.data) {
                                this.searchResult = searchResult.data;
                            } else {
                                this.$message(searchResult.message)
                            }
                        }

                        // 有跳转到用户的 详情界面！
                        if (searchid) {
                            this.$router.push('/userprofile/' + searchid + '?friend=' + isFriend)
                        }
                        break;
                    default:
                        console.log('参数有误：', this.type)
                        break;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../style/mixin.scss";

    .search-page {
        @include page();
    }
    .search-frm {
        display: flex;
        padding: 5px 5px 0;
        margin: 0 20px;
        border-bottom: 1px solid greenyellow;
        float: left;
        width: 80vw;
    }
    .search-frm svg {
        text-align: left;
    }
    .search-frm input {
        flex-grow: 1;
        border: hidden;
        background-color: #434439;
        color: white;
        font-size: 20px;
        margin-top: 5px;
        padding: 5px;
    }
    ul {
        list-style: none;
        padding: 0 5%;
    }
    li {
        float: left;
        width: 33%;
        color: limegreen;
        margin: 15px 0;
    }
    .search-container .show {
        border-right: 1px solid silver;
    }
    .search-title {
        padding: 20px;
    }
    .clearfix {
        clear: both;
    }
</style>
