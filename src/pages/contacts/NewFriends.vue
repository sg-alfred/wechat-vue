<template>
    <div class="newfriends-page">
        <header-section :go-back="true" :head-title="headTitle">
            <section class="head-addFriend" slot="addFriend" @click="$router.push('/addFriend')">
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
            <label>新的朋友</label>
            <section class="request-section">
                <el-row v-for="item in friendList" :key="item.id">
                    <el-col :span="4">
                        <span><img src="../../assets/logo.png" alt="头像"/></span>
                    </el-col>
                    <el-col :span="16">
                        <span>{{item.uid.mobilephone}}</span>
                    </el-col>
                    <el-col :span="4">
                        <span v-if="item.status == 0">
                            <el-button type="success" @click="acceptFriend(item.uid, item.id)">接受</el-button>
                        </span>
                        <span v-else>已添加</span>
                    </el-col>
                </el-row>
            </section>

        </article>
    </div>
</template>

<script>
    import HeaderSection from '../../components/HeaderSection'

    export default {
        name: 'NewFriends',
        components: {
            HeaderSection
        },
        data() {
            return {
                headTitle: '添加好友',
                friendList: []
            }
        },
        mounted() {
            this.$http.get('/contact/getFriends').then((response) => {
                this.friendList = response.body.data;
            })
        },
        methods: {
            acceptFriend(fid, id) {
                this.$http.post('/contact/acceptFriend', {fid: fid}).then((response) => {
                    let responseData = response.body;
                    this.$message(responseData.message)
                    if (!responseData.code) {
                        this.friendList[id].status = 1;
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .newfriends-page {
        background-color: #e8e8e8;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
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
    .request-article label {
        font-size: 16px;
        padding: 10px;
    }
    .request-article .request-section {
        background-color: white;
        margin-top: 5px;
    }
    .request-section .el-row {
         padding: 10px;
     }
    .request-section .el-row .el-col {
        display: table;
        height: 40px;
    }
    .request-section .el-row .el-col span {
        display: table-cell;
        vertical-align: middle;
    }
    .request-section .el-row .el-col span img {
        height: 40px;
    }
</style>