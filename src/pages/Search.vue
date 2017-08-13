<template>
    <div class="">
        <header-section :goBack="true">
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
        created() {
            this.type = this.$route.params.type;
        },
        methods: {
            search() {
                console.log(this.keyword)
                switch (this.type) {
                    case 'all':
                        console.log('searchAll');
                        break;
                    case 'friend':
                        console.log('searchFriend')
                        this.$http.post('/user/searchUser', {username: this.keyword}).then((response) => {
                            let result = response.body;
                            if (!result.code) {
                                if (!result.fuserinfo) {
                                    this.$message('用户不存在')
                                } else {
                                    this.searchResult = result.fuserinfo;
                                    // 有跳转到用户的 详情界面！
                                    this.$router.push('/userprofile/' + result.fuserinfo.id)
                                }
                            } else {
                                this.$message(result.message)
                            }
                        })
                        break;
                    default:
                        console.log('参数有误：', this.type)
                        break;
                }
            }
        }
    }
</script>

<style scoped>
    * {
        margin: 0;
        padding: 0;
    }
    .search-frm {
        float: left;
        padding: 10px 5px 0 5px;
        margin-left: 20px;
        height: 40px;
        border-bottom: 1px solid greenyellow;
        width: 80%;
        text-align: left;
    }
    .search-frm svg {
        text-align: left;
    }
    .search-frm input {
        border: hidden;
        background-color: #434439;
        color: white;
        float: right;
        font-size: 18px;
        height: 38px;
        width: 85%;
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
