import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/pagers/Hello'
import Test from '@/pagers/Test'
import Help from '@/pagers/Help'

import Wechat from '@/pagers/Wechat'

import Contacts from '@/pagers/Contacts'

import Discover from '@/pagers/Discover'
import Moment from '@/pagers/Momentss'

import Myinfo from '@/pagers/Myinfo'


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
