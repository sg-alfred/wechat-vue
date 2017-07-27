<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div class="item-container">
        <div @click="goto(itemInfo.type)">
            <el-row>
                <el-col :span="4">
                    <div class="item-pto">
                        <img v-bind:src=itemInfo.imgUrl />
                    </div>
                </el-col>
                <el-col :span="16">
                    <div class="item-name">
                        <span>{{itemInfo.name}}</span>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="item-icon">
                        <i class="el-icon-arrow-right el-icon--right"></i>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
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
//                path = 'discover/' + path;
                this.$router.push(path);
            }
        }
    }
</script>

<style scoped>
    .item-container {
        height: 50px;
        border: lightgray solid 1px;
        margin: 5px;
        padding: 5px;
    }
/*    .item-name {
        text-align: center;
    }
    .item-icon i {
        height: 40px;
    }*/
    img {
        height: 48px;
    }
</style>
