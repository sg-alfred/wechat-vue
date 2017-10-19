<template>
    <div class="headimg-setting">
        <header-section :go-back="true" :head-title="headTitle">
            <section slot="headerBtn" class="header-btn right">
                <el-button type="success" @click="setHeadimg">使用</el-button>
            </section>
        </header-section>
        <section>
            <!--<el-upload
                    class="avatar-uploader"
                    :action="'/users/' + userinfo.id + '/headimg'"
                    :show-file-list="false"
                    :on-success="uploadImg"
                    :before-upload="beforeImgUpload">
                <img v-if="userinfo.headimg" :src="userinfo.headimg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>-->

            <form enctype="multipart/form-data" method="post"
                :action="'/users/' + userinfo.id + '/headimg'"
            >
                <input class="avatar" type="file" name="imgUploader" multiple />
                <input type="submit" name="submit" value="Upload" @click=""/>
            </form>

            <img v-if="userinfo.headimgurl" :src="userinfo.headimgurl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </section>
    </div>
</template>

<script>
    import HeaderSection from '../../../components/HeaderSection'
    import { uploadAvatar } from '../../../api'
    import { mapState, mapActions } from 'vuex'
    import { localStorage } from '../../../util'

    export default {
        name: 'Headimg',
        components: {
            HeaderSection
        },
        data() {
            return {
                headTitle: '更改头像',
                file: null
            }
        },
        computed: {
            ...mapState([
                'userinfo'
            ])
        },
        mounted() {
            window.addEventListener('message', (event) => {
                console.log('触发了 message ！')
                const response = event.data
                if ('success' === response.result) {
                    this.handleUploadSuccess(response, this.file)
                } else if ('failed' === response.result) {
                    this.handleUploadError(response, this.file)
                }
            })
        },
        methods: {
            ...mapActions(['changeLoginInfo']),
            async uploadImg(file) {
                /*if (res.status == 1) {
                    // 修改 localStorage 保存的值！
//                    localStorage('userinfo', JSON.stringify(response.data.data))
//                    this.changeLoginInfo(true)
                } else {
                    this.$message.error('上传图片失败！');
                }*/

//                await uploadAvatar(this.userinfo.id, { file })

            },
            handleUploadSuccess() {

            },
            handleUploadError() {

            },
            handleChange(ev) {
                const file = ev.target.value;

                console.log('hahah--', file)

                if (file) {
                    this.uploadImg(file);
                }
            },
            beforeImgUpload(file) {
                const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png');
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isRightType) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isRightType && isLt2M;
            },
            setHeadimg() {

            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../../style/mixin.scss';

    .headimg-setting {
        @include page();
        z-index: 333;
    }
    .header-btn {
        margin: 10px 10px 0 0;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        margin-top: 10px;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }
    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }
</style>