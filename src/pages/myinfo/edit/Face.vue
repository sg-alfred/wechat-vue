<template>
    <div class="face-page">
        <header-section :go-back="true" :head-title="headTitle"></header-section>
        <main>
            <div v-if="!userinfo.face">
                <el-button type="primary" @click="setFaceInfo('add')">开始录入</el-button>
            </div>
            <div v-else>
                <el-button type="primary" @click="setFaceInfo('update')">更新录入</el-button>
                <el-button type="primary" @click="deleteFaceInfo">删除人脸信息</el-button>
            </div>

            <video hidden width="320" height="240"></video>
            <img hidden id="image" width="320" height="240"/>

            <!-- 这个应该是 刚进来的时候显示？用户画像，百度魔图～～，算了，至少应该需要 切换～ -->
            <canvas width="320" height="240"></canvas>

            <article>
                <p>基于百度AI，实现刷脸登录</p>
            </article>
        </main>
    </div>
</template>

<script>
    import HeaderSection from '../../../components/HeaderSection'
    import { mapState, mapActions } from 'vuex'
    import { updateUserinfo } from '../../../api'
    import { localStorage } from '../../../util'

    export default {
        name: 'Face',
        components: {
            HeaderSection
        },
        data() {
            return {
                headTitle: '设置人脸密码'
            }
        },
        computed: {
            ...mapState(['userinfo'])
        },
        methods: {
            ...mapActions(['changeLoginInfo']),
            setFaceInfo(type) {
                const self = this

                // 那现在是用户名！根据用户名查询id，后台处理啊！然后在调用 百度AI 接口
                let video = document.querySelector('video'),
                    image = document.querySelector('#image'),
                    canvas = document.querySelector('canvas'),
                    ctx = canvas.getContext("2d");

                canvas.setAttribute('display', 'none')
                video.setAttribute('display', 'block')

                // 需要做 兼容性！
                navigator.mediaDevices.getUserMedia({
                    video: true,
                    // audio: true
                })
                    .then(function (mediaStream) {
                        video.src = window.URL.createObjectURL(mediaStream);
                        video.onloadedmetadata = function (e) {
                            // Do something with the video here.
                        };
                    })
                    .catch(function (error) {
                        console.log(error.name);
                    });

                let counter = 5;
                const iTime = setInterval(function() {
                    counter --;
                    if (counter > 0) {
                        self.$message(`请对准摄像头，倒计时${counter}秒`)
                    } else {
                        clearInterval(iTime)

                        // 弄到
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        ctx.drawImage(video, 0, 0, 320, 240);

                        // 切换成 canvas
                        video.setAttribute('display', 'none')
                        canvas.setAttribute('display', 'block')

                        image.onload = function() {

                            // 这个东西一定需要 封装一下，不可能每次修改都 加上 changeLoginInfo！！
                            updateUserinfo(self.userinfo.id, { base64Img: image.src.replace('data:image/png;base64,', ''), type }, 'face')
                                .then((response) => {

                                const result = response.data
                                self.$message(result.message)

                                if (!result.code) {
//                                    this.$router.go(-1)

                                    // 修改 localStorage 保存的值！
                                    localStorage('userinfo', JSON.stringify(response.data.data))
                                    self.changeLoginInfo(true)
                                }

                                // 关闭摄像头～
                            })
                        }
                        image.src = canvas.toDataURL('image/png');
                    }
                }, 1000)
            },
            deleteFaceInfo() {
                updateUserinfo(this.userinfo.id, { type: 'delete' }, 'face')
                    .then((response) => {

                        const result = response.data
                        this.$message(result.message)

                        if (!result.code) {
                            localStorage('userinfo', JSON.stringify(response.data.data))
                            this.changeLoginInfo(true)
                        }
                    })
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../style/mixin.scss";

    .face-page {
        @include page();
        z-index: 202;
    }
    video {
        border: 1px solid #ffffff;
    }
</style>