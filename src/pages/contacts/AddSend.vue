<template>
    <div class="">
        <header-section :head-title="headTitle" :goBack="true">
            <section slot="sendBtn" class="header-btn">
                <el-button type="success">发送</el-button>
            </section>
        </header-section>

        <div style="height: 20px;"></div>

        <section class="form-section">
            <!--<el-form ref="addSetFrm" :label-position="labelPosition" label-width="80px" :model="formInfo" :rules="formRules">
                &lt;!&ndash; 隐藏用户id，或者，其实也不需要吧～额，要是 改了链接呢？ &ndash;&gt;
                <el-form-item label="用户id" prop="fid" style="display: none;">
                    <el-input v-model="formInfo.fid"></el-input>
                </el-form-item>
                <el-form-item label="你需要发送验证申请，等待对方通过" prop="remark">
                    <el-input v-model="formInfo.remark"></el-input>
                </el-form-item>
                <el-form-item label="为朋友设置备注" prop="alias">
                    <el-input type="text" v-model="formInfo.alias"></el-input>
                </el-form-item>
                <el-form-item label="不让他(她)看我的朋友圈" prop="share">
                    <el-switch v-model="formInfo.share"
                               on-color="#13ce66"
                               off-color="grey">
                    </el-switch>
                </el-form-item>
            </el-form>-->

            <article>
                <p>你需要发送验证申请，等待对方通过</p>
                <input v-model="formInfo.remark" />
            </article>
            <article>
                <p>为朋友设置备注</p>
                <input v-model="formInfo.alias" />
            </article>
            <article>
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
    .header-btn {
        float: right;
        margin: 10px 10px 0 0;
    }
    .form-section {

    }
    .form-section article {
        margin: 10px 0;
        padding: 10px 0;
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
</style>