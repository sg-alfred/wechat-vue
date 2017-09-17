<template>
    <div class="addsend-page">
        <header-section :go-back="true" :head-title="headTitle">
            <section slot="sendBtn" class="header-btn">
                <el-button type="success" @click="addFriend">发送</el-button>
            </section>
        </header-section>

        <section class="form-section">
            <input v-model="formInfo.fid" hidden>
            <article>
                <p>你需要发送验证申请，等待对方通过</p>
                <input v-model="formInfo.remark" />
            </article>
            <article>
                <p>为朋友设置备注</p>
                <input v-model="formInfo.alias" />
            </article>
            <article class="share-div">
                <p>设置朋友圈权限</p>
                <el-switch v-model="formInfo.share" class="switch-label"
                           on-color="#13ce66" off-color="grey">
                </el-switch>
                <p class="share-text">不让他(她)看我的朋友圈</p>
            </article>
        </section>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import HeaderSection from '../../components/HeaderSection'

    export default {
        name: 'AddSend',
        data() {
            return {
                labelPosition: 'left',
                headTitle: '验证申请',
                addSet: {},
                formInfo: {
                    share: false
                },
                formRules: {}
            }
        },
        components: {
            HeaderSection
        },
        created() {
            this.formInfo.fid = this.$route.params.fid;
        },
        computed: {
            ...mapGetters({
                isLogin: 'isLogin',
                uid: 'getUserid'
            })
        },
        methods: {
            addFriend() {
                // 数据校验！ 可以 把好友写入
                this.$http.post('/contact/addNewFriend', this.formInfo).then((response) => {
                    let result = response.data;
//                    if (!result.code) {
//
//                    } else {
                    this.$message(result.message)
//                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../style/mixin.scss';

    .addsend-page {
        @include page();
        z-index: 202;
    }
    .header-btn {
        float: right;
        margin: 10px 10px 0 0;
    }
    .form-section {
        overflow: scroll;
        width: 100%;
        position: fixed;
    }
    .form-section article {
        margin: 20px 0;
        padding: 10px;
        background-color: white;
    }
    .form-section article p {
        text-align: left;
        color: #adadad;
        padding: 10px;
    }
    .form-section article input {
        border: hidden;
        border-bottom: 1px solid green;
        padding: 5px;
        font-size: 18px;
        width: 96%;
    }
    .form-section .share-div .share-text {
        color: #000000;
    }
    .form-section .share-div .switch-label {
        float: right;
        margin: 6px 20px;
    }
</style>