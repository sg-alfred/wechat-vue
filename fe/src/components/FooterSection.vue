<!-- 不是这样的！！每个都一样，为什么 用 v-for -->

<template>
  <footer class="footer-container">
    <!-- 不知道如何解决 xlink:href="" 加入变量 的问题～ -->
    <section :class="{'active-color': isActive.wechat}" @click="goto('wechat')">
      <svg class="icon fa-20x" aria-hidden="true">
        <!--<use xlink:href="isActive.wechat ? '#icon-message-active' : '#icon-message'"></use>-->
        <use v-if="isActive.wechat" xlink:href="#icon-message-active"/>
        <use v-else xlink:href="#icon-message"/>
      </svg>
      <p>微信</p>
    </section>
    <section :class="{'active-color': isActive.contacts}" @click="goto('contacts')">
      <svg class="icon fa-20x" aria-hidden="true">
        <!--<use xlink:href="isActive.contacts ? '#icon-contacts-active' : '#icon-contacts'"></use>-->
        <use v-if="isActive.contacts" xlink:href="#icon-contacts-active"/>
        <use v-else xlink:href="#icon-contacts"/>
      </svg>
      <p>通讯录</p>
    </section>
    <section :class="{'active-color': isActive.discover}" @click="goto('discover')">
      <svg class="icon fa-20x" aria-hidden="true">
        <!--<use xlink:href="isActive.discover ? '#icon-discover-active' : '#icon-discover'"></use>-->
        <use v-if="isActive.discover" xlink:href="#icon-discover-active"/>
        <use v-else xlink:href="#icon-discover"/>
      </svg>
      <p>发现</p>
    </section>
    <section :class="{'active-color': isActive.myinfo}" @click="goto('myinfo')">
      <svg class="icon fa-20x" aria-hidden="true">
        <!--<use xlink:href="isActive.myinfo ? '#icon-myinfo-active' : '#icon-myinfo'"></use>-->
        <use v-if="isActive.myinfo" xlink:href="#icon-myinfo-active"/>
        <use v-else xlink:href="#icon-myinfo"/>
      </svg>
      <p>我</p>
    </section>

    <!--<el-row>
        <el-col :span="6" v-for="item in subMenus" :key="item.id">
            &lt;!&ndash; 如何直接 作为函数的 参数？ '/item.type' ，不要引号～没必要引号！这样是不行的！ &ndash;&gt;
            <section class="grid-content" @click="goto(item.type)">
                &lt;!&ndash; 使用png 图片 &ndash;&gt;
                &lt;!&ndash; <div v-if="active" >
                    &lt;!&ndash;<img v-bind:src=item.active />&ndash;&gt;
                </div>
                <div v-else>
                    &lt;!&ndash;<img v-bind:src=item.disactive />&ndash;&gt;
                </div>&ndash;&gt;

                &lt;!&ndash; 使用 阿里矢量图 - font-class引用 &ndash;&gt;
                &lt;!&ndash; <div class="icon-div">
                    <i class="iconfont fa-12x" :class="[active ? item.active : item.disactive, {'active-color': active}]"></i>
                </div>&ndash;&gt;

                &lt;!&ndash; 使用 阿里矢量图 - symbol引用 &ndash;&gt;
                <svg class="icon" aria-hidden="true">
                    <use v-if="active" xlink:href="'#'+item.active"></use>
                    <use v-else xlink:href="'#'+item.disactive"></use>
                </svg>
                <p>{{item.name}}</p>
            </section>
        </el-col>
    </el-row>-->
  </footer>
</template>

<script>
export default {
  name: 'FooterSection',
  data() {
    return {
      isActive: {
        wechat: false,
        contacts: false,
        discover: false,
        myinfo: false
      },
      subMenus: [{
        id: 0,
        type: 'wechat',
        name: '微信',
        active: 'icon-wechat-active',
        disactive: 'icon-wechat'
      }, {
        id: 1,
        type: 'contacts',
        name: '通讯录',
        active: 'icon-contact-active',
        disactive: 'icon-contact'
      }, {
        id: 2,
        type: 'discover',
        name: '发现',
        active: 'icon-discover-active',
        disactive: 'icon-discover'
      }, {
        id: 3,
        type: 'myinfo',
        name: '我',
        active: 'icon-myinfo-active',
        disactive: 'icon-myinfo'
      }]
    }
  },
  beforeMount() {
    const current = this.$route.path
    for (const index in this.isActive) {
      if (this.isActive.hasOwnProperty(index)) {
        this.isActive[index] = current.indexOf(index) !== -1
      }
    }
  },
  methods: {
    goto(path) {
      this.$router.push('/' + path)
    }
  }
}
</script>

<style lang="scss" scoped>
  .footer-container {
    border: 2px solid ghostwhite;
    position: absolute;
    bottom: 0;
    height: 4.5rem;
    width: 100%;
    z-index: 100;
    background-color: white;
    font-size: .8rem;
    display: flex;
    align-items: center;

    section {
      flex-grow: 1;
      p {
        margin-top: 5px;
      }
    }
  }

  img {
    height: 3rem;
    padding: .5rem 0;
  }

  .fa-20x {
    font-size: 2rem;
  }

  .active-color {
    color: #60B521;
  }
</style>
