<template>
    <section class="item-container" @click="goto(itemInfo.type)">
        <el-row type="flex" justify="end">
            <el-col :span="6">
                <span><img :src=itemInfo.imgUrl /></span>
            </el-col>
            <el-col :span="18">
                <span>{{itemInfo.name}}</span>
            </el-col>
            <!--<el-col :span="4" class="item-icon">
                <i class="el-icon-arrow-right el-icon&#45;&#45;right"></i>
            </el-col>-->
        </el-row>
    </section>
</template>

<script>
    export default {
        name: 'BaseItem',
        props: {
            itemInfo: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
            }
        },
        methods: {
            goto(path) {
                // 跳转之前，需要设置一下 状态吧？
                this.$router.push(path)
            }
        }
    }
</script>

<style scoped>
    .item-container {
        height: 40px;
        border: 1px solid lightgray;
        padding: 5px;
        margin: 5px;
    }
    .item-container .el-col {
        height: 40px;
        display: table;
        text-align: left;
        padding-left: 20px;
    }
    .item-container .el-col span {
        display: table-cell;
        vertical-align: middle;
    }
    img {
        padding-top: 5px;
        width: 20px;
    }
</style>
