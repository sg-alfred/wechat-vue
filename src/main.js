// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import { changeLoginInfo } from './store/actions'

import { localStorage, kindOf } from './util'

Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(localStorage, kindOf)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})

changeLoginInfo(store);
