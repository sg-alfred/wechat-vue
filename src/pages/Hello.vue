<template>
  
<div class="hello">
    <header-section></header-section>

    <h1>{{ msg }}</h1>
    <a href="#test">进入测试界面</a>
    <h2>{{ author }}</h2>

    <el-button @click="visible = true">按钮</el-button>
    <el-dialog v-model="visible" title="Hello world">
        <p>欢迎使用 Element</p>
    </el-dialog>

    <el-switch
        v-model="value1"
        on-color="#13ce66"
        off-color="#ff4949">
    </el-switch>

    <div>
        <a @click="doLogin()">登录一下</a>
    </div>

    <footer-section></footer-section>
</div>

</template>

<script>

import HeaderSection from '../components/HeaderSection'
import FooterSection from '../components/FooterSection'

export default {
    name: 'Hello',
    components: {
        HeaderSection,
        FooterSection
    },
    data () {
        return {
            visible: false,
            value1: true,
            msg: 'Welcome to My Wechat App',
            author: "sgchenjz"
        }
    },
    methods: {
        doLogin() {
            this.$http.get('/test/123').then(response => {
                console.log(response);
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
