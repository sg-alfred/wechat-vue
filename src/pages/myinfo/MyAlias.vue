<!-- 更改昵称，让好友更容易记住你 -->

<template>
    <div class="myaias-setting">
        <header-section :go-back="true" :head-title="headTitle">
            <section slot="setAliasBtn" class="header-btn">
                <el-button type="success" @click="setAlias">保存</el-button>
            </section>
        </header-section>
        <section class="form-section">
            <article>
                <input v-model="formInfo.alias" />
                <p>好名字可以让你的朋友更容易记住你。</p>
            </article>
        </section>
    </div>
</template>

<script>
    import HeaderSection from '../../components/HeaderSection'
    import { updateAlias } from '../../api'

    export default {
        name: 'MyAlias',
        components: {
            HeaderSection
        },
        data() {
            return {
                headTitle: '更改名字',
                formInfo: {}
            }
        },
        methods: {
            async setAlias() {
                await updateAlias(this.formInfo)
                this.$router.go(-1)
            }
        }
    }
</script>


<style lang="scss" scoped>
    @import '../../style/mixin.scss';

    .myaias-setting {
        @include page();
        z-index: 333;
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
</style>
