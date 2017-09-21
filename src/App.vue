<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import 'normalize.css'

    export default {
        name: 'app',
        computed: {
            ...mapGetters([
                'isLogin'
            ])
        },
        created() {
            // 这个之前
            console.log('没有跳转？', this.isLogin);
            if (!this.isLogin) {
                this.$router.push('/login');
            } else {
                this.$router.push('/wechat');
            }
        }
    }
</script>

<style lang="scss">
    @import "./style/common.scss";

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
    a {
        color: #000000;
    }
    .router-fade-enter-active, .router-fade-leave-active {
        transition: opacity .3s;
    }
    .router-fade-enter, .router-fade-leave-active {
        opacity: 0;
    }
</style>
