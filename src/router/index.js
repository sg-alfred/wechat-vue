import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/pages/Hello'
import Test from '@/pages/Test'
import Help from '@/pages/Help'

import Wechat from '@/pages/Wechat'

import Contacts from '@/pages/Contacts'

import Discover from '@/pages/Discover'
import Moment from '@/pages/Momentss'

import Myinfo from '@/pages/Myinfo'


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
        component: Wechat
    }, {
        path: '/contacts',
        name: 'Contacts',
        component: Contacts
    }, {
        path: '/discover',
        name: 'Discover',
        component: Discover,
        // children: [{
        //     path: '/moment',
        //     name: 'Moment',
        //     component: Moment
        // }]
    }, {
        path: '/myinfo',
        name: 'Myinfo',
        component: Myinfo
    }, {
        path: '/help',
        name: 'Help',
        component: Help
    }, {
        path: '/moment',
        name: 'Moment',
        component: Moment
    }]
})
