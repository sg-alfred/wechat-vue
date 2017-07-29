<!-- 不是这样的！！每个都一样，为什么 用 v-for -->

<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div class="footer-container">
        <el-row>
            <el-col :span="6" v-for="item in subMenus" :key="item.id">
                <!-- 如何直接 作为函数的 参数？ '/item.type' ，不要引号～没必要引号！这样是不行的！ -->
                <div class="grid-content" @click="goto(item.type)">
                    <!-- 更加简洁的写法？ -->
                    <div v-if="isActive" >
                        <img v-bind:src=item.active />
                    </div>
                    <div v-else>
                        <img v-bind:src=item.disactive />
                    </div>
                    <p>{{item.name}}</p>
                </div>
            </el-col>
        </el-row>

        <!--<el-row>
            <el-col :span="6">
                <div class="grid-content" @click="goto('/wechat')">
                    <div v-if="isActive" >
                        <img src="../../static/image/icon-active_u10.png" />
                    </div>
                    <div v-else>
                        <img src="../../static/image/icon-disactive_u10.png" />
                    </div>
                    <p>微信</p>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content" @click="goto('/contacts')">
                    <div v-if="isActive" >
                        <img src="../../static/image/icon-active_u12.png" />
                    </div>
                    <div v-else>
                        <img src="../../static/image/icon-disactive_u12.png" />
                    </div>
                    <p>通讯录</p>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content" @click="goto('/discover')">
                    <div v-if="isActive" >
                        <img src="../../static/image/icon-active_u14.png" />
                    </div>
                    <div v-else>
                        <img src="../../static/image/icon-disactive_u14.png" />
                    </div>
                    <p>发现</p>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content" @click="goto('/myinfo')">
                    <div v-if="isActive" >
                        <img src="../../static/image/icon-active_u16.png" />
                    </div>
                    <div v-else>
                        <img src="../../static/image/icon-disactive_u16.png" />
                    </div>
                    <p>我</p>
                </div>
            </el-col>
        </el-row>-->
    </div>
</template>

<script>
export default {
    name: 'FooterSection',
    data() {
        return {
            isActive: false,     // 就用一个，可以 正常进行切换吗？
            subMenus: [{
                id: 0,
                type: 'wechat',
                name: '微信',
                active: 'static/image/menus/icon-active_u10.png',
                disactive: 'static/image/menus/icon-disactive_u10.png' ,
            },{
                id: 1,
                type: 'contacts',
                name: '通讯录',
                active: 'static/image/menus/icon-active_u12.png',
                disactive: 'static/image/menus/icon-disactive_u12.png' ,
            },{
                id: 0,
                type: 'discover',
                name: '发现',
                active: 'static/image/menus/icon-active_u14.png',
                disactive: 'static/image/menus/icon-disactive_u14.png' ,
            },{
                id: 0,
                type: 'myinfo',
                name: '我',
                active: 'static/image/menus/icon-active_u16.png',
                disactive: 'static/image/menus/icon-disactive_u16.png' ,
            }]
        }
    },
    methods: {
        goto(path) {
            // 跳转之前，需要设置一下 状态吧？
            console.log();

            this.$router.push(path)
        }
    }
}
</script>

<style scoped>
    .footer-container {
        border: ghostwhite solid 2px;
        background-color: white;
        /*position: fixed;*/
        bottom: 0;
        height: 75px;
        /*width: 480px;*/
        z-index: 1000;
    }
    .grid-content img {
        /*width: 40px;*/
        height: 30px;
        padding-top: 5px;
    }
    .grid-content p {
        margin: 0;
        color: black;
        padding-bottom: 0;
    }
</style>
