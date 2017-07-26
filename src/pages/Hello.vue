<template>
  
<div class="hello">
    <header-section></header-section>

    <div class="block">
        <span class="demonstration">Click 指示器触发</span>
        <el-carousel trigger="click" height="150px">
            <el-carousel-item v-for="item in 4" :key="item">
                <h3>{{ item }}</h3>
            </el-carousel-item>
        </el-carousel>
    </div>

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

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
   background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
   background-color: #d3dce6;
}
</style>
