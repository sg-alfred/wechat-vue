<template>
    <div class="newfriends-page">
        <header-section :go-back="true" :head-title="headTitle">
            <section class="head-addFriend" slot="addFriendText" @click="$router.push('/addFriend')">
                <span>添加朋友</span>
            </section>
        </header-section>

        <section class="searchFriend-section">
            <router-link :to="'/search/friend'" >
                <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <circle cx="18" cy="18" r="7" stroke="rgb(00,80,00)" stroke-width="1" fill="none"/>
                    <line x1="24" y1="24" x2="30" y2="30" style="stroke:rgb(00,80,00);stroke-width:2"/>
                </svg>
            </router-link>
        </section>

        <article class="request-article">
            <div><label>新的朋友</label></div>

            <!-- 组件化！和微信界面一致，头像也是比较大的那个！但是 点击进去 不一样啊，一个用户详情，一个是聊天室 -->
            <section class="request-section" v-for="item in NewFriendList" :key="item.id">
                <span><img src="../../assets/logo.png" alt="头像" /></span>
                <span>
                    <span>{{item.uid.mobilephone}}</span>
                    <span>{{item.uid.mobilephone}}</span>
                </span>
                <span>
                    <span v-if="item.status == 0">
                        <el-button type="success" @click="handleFriend(item.uid, item.id)">接受</el-button>
                    </span>
                    <span v-else style="white-space: nowrap">已添加</span>
                </span>
            </section>
        </article>
    </div>
</template>

<script>
    import { getNewFriends, handleNewFriend } from '../../api'
    import HeaderSection from '../../components/HeaderSection'

    export default {
        name: 'NewFriends',
        components: {
            HeaderSection
        },
        data() {
            return {
                headTitle: '添加好友',
                NewFriendList: []
            }
        },
        beforeMount() {
            this.initNewFriends()
        },
        methods: {
            async initNewFriends() {
                const response = await getNewFriends();
                this.NewFriendList = response.data.data;
            },
            async handleFriend(fid, id) {
                const response = await handleNewFriend(fid)
                let handleResult = response.data;
                this.$message(handleResult.message)

                if (!handleResult.code) {
                    this.friendList[id].status = 1;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../style/mixin.scss";

    .newfriends-page {
        @include page();
        z-index: 202;
    }
    .head-addFriend {
        float: right;
        padding: 20px;
        font-size: 16px;
    }
    .searchFriend-section {
        background-color: white;
        width: 100%;
        margin: 20px 0;
    }

    .request-article {
        text-align: left;
    }
    .request-article > div {
        font-size: 16px;
        padding: 10px;
    }
    .request-article .request-section {
        background-color: white;
        height: 60px;
        border-bottom: 1px solid #e8e8e8;
        display: flex;
        align-items: center;
        span {
            margin: 0 20px;
            flex: 0 1 0;
        }
        span:nth-child(2) {
            flex-grow: 1;
        }
        img {
            height: 40px;
        }
    }
</style>