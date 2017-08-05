<template>
    <div class="help">
        帮助与反馈

        <el-input
                placeholder="搜索"
                icon="search"
                v-model="input2"
                :on-icon-click="handleIconClick">
        </el-input>

        <el-row>
            <el-col :span="8" v-for="item in subMenus" :key="item.id" @click="goto(item.type)">
                <span>{{item.name}}</span>
            </el-col>
        </el-row>
    </div>
    
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'Help',
    computed: {
        ...mapGetters({
            isLogin: 'getIsLogin'
        })
    },
    created() {
        if (!this.isLogin) {
            this.$router.push('/login');
        }
    },
    data() {
        return {
            subMenus: [{
                id: 0,
                type: 'all',
                name: '全部问题'
            }, {
                id: 1,
                type: 'quick',
                name: '快捷帮助'
            }, {
                id: 2,
                type: 'feedback',
                name: '意见反馈'
            }]
        }
    },
    methods: {
        goto(path) {
            this.$router.push(path);
        },
        handleIconClick(ev) {
            console.log(ev);
        }
    }
}

</script>

