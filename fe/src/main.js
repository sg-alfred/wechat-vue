// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'

import { Button, ButtonGroup, Input, Form, FormItem, Switch, Popover,
  Row, Col, Dropdown, DropdownMenu, DropdownItem, Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// import ElementUI from 'element-ui'
// Vue.use(ElementUI)

Vue.use(Row)
Vue.use(Col)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(Switch)
Vue.use(Input)
Vue.use(Popover)

Vue.prototype.$message = Message

Vue.config.productionTip = false

Vue.filter('formatTime', timestamp => new Date(timestamp).toLocaleString())

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
