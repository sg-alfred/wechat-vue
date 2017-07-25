import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/pagers/Hello'
import Test from '@/pagers/Test'
import Help from '@/pagers/Help'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'Hello',
        component: Hello
    }, {
        path: '/test',
        name: 'Test',
        component: Test
    }, {
        path: '/wechat',
        name: 'Wechat',
        component: Help
    }, {
        path: '/address',
        name: 'Address',
        component: Help
    }, {
        path: '/discovery',
        name: 'Discovery',
        component: Help
    }, {
        path: '/myinfo',
        name: 'Myinfo',
        component: Help
    }, {
        path: '/help',
        name: 'Help',
        component: Help
    }]
})
