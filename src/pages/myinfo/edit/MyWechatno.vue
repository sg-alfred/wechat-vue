<template>
    <div class="mywechatno-setting">
        <header-section :go-back="true" :head-title="headTitle">
            <section slot="headerBtn" class="header-btn right">
                <el-button type="success" @click="setWechatno">保存</el-button>
            </section>
        </header-section>
        <main class="form-section">
            <article>
                <input v-model="wechatno" />
                <p>微信号是账号唯一凭证，只能设置一次</p>
                <p>微信账号仅支持6-20个字母、数字、下划线或减号，以字母开头</p>
            </article>
        </main>
    </div>
</template>

<script>
    import HeaderSection from '../../../components/HeaderSection'
    import { updateUserinfo } from '../../../api'
    import { mapState, mapActions } from 'vuex'

    export default {
        name: 'MyWechatno',
        components: {
            HeaderSection
        },
        data() {
            return {
                headTitle: '设置微信号',
                wechatno: ''
            }
        },
        computed: {
            ...mapState(['userinfo'])
        },
        beforeMount() {
            this.wechatno = this.userinfo.wechatno || ''
        },
        methods: {
            ...mapActions(['changeLoginInfo']),
            async setWechatno() {
                const wechatno = this.wechatno.trim()

                if ( wechatno !== '') {
                    const response = await updateUserinfo(this.userinfo.id, { wechatno })

                    // 修改 localStorage 保存的值！
                    localStorage('userinfo', JSON.stringify(response.data.data))
                    this.changeLoginInfo(true)

                    this.$router.go(-1)

                } else {
                    this.$alert('没有设置微信号，请重新填写', '提示', {
                        confirmButtonText: '确定'
                    });
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../../style/mixin.scss';

    .mywechatno-setting {
        @include page();
        z-index: 333;
    }
    .header-btn {
        margin: 10px 10px 0 0;
    }
    .form-section {
        overflow: scroll;
        width: 100%;
        position: fixed;
        article {
            margin: 20px 0;
            padding: 10px;
            background-color: white;
            input {
                border: hidden;
                border-bottom: 1px solid green;
                padding: 5px;
                font-size: 18px;
                width: 96%;
            }
            p {
                text-align: left;
                color: #adadad;
                padding: 10px;
            }
        }
    }
    .el-message-box__headerbtn {
        display: none;
    }
</style>