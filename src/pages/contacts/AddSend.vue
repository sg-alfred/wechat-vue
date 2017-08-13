<template>
    <div class="addsend-page">
        <header-section :head-title="headTitle" :goBack="true">
            <section slot="sendBtn" class="header-btn">
                <el-button type="success">发送</el-button>
            </section>
        </header-section>

        <section class="form-section">
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
                <label>不让他(她)看我的朋友圈</label>
                <el-switch v-model="formInfo.share" class="switch-label"
                           on-color="#13ce66" off-color="grey">
                </el-switch>
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
        computed: {
            ...mapGetters({
                isLogin: 'getIsLogin',
                uid: 'getUserid'
            })
        },
        methods: {
            addFriend() {
                // 数据校验！ 可以 把好友写入
                this.$http.post('/contact/addNewFriend', this.formInfo).then((response) => {
                    let result = response.body;
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

<style scoped>
    .addsend-page {
        position: absolute;
        background-color: #e8e8e8;
    }
    .header-btn {
        float: right;
        margin: 10px 10px 0 0;
    }
    .form-section {
        overflow: scroll;
        /*height: 100px;*/
        width: 100%;
        position: fixed;
    }
    .form-section article {
        margin: 10px 0;
        padding: 10px 0;
        background-color: white;
    }
    .form-section article p {
        text-align: left;
        color: #adadad;
        padding: 5px 10px;
        margin: 0;
    }
    .form-section article input {
        border: hidden;
        border-bottom: 1px solid green;
        padding: 5px;
        font-size: 16px;
        width: 94%;
    }
    .form-section article .switch-label {
        float: right;
        margin-right: 20px;
    }
    .form-section .share-div {
        text-align: left;
    }
    .form-section .share-div label{
        margin: 0 10px;
    }
</style>