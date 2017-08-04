import Vue from 'vue'
import Router from 'vue-router'

// 使用 require.ensure - 代码分割

import Hello from '@/pages/Hello'
import Test from '@/pages/Test'
import Help from '@/pages/Help'
import Login from '@/pages/Login'
import Register from '@/pages/Register'

import Wechat from '@/pages/Wechat'

import Contacts from '@/pages/Contacts'
import Chatroom from '@/pages/Chatroom'

import Discover from '@/pages/Discover'
import Moment from '@/pages/Moments'

import Myinfo from '@/pages/Myinfo'

Vue.use(Router)

const router =  new Router({
    routes: [{
        path: '/',
        name: 'hello',
        component: Hello
    }, {
        path: '/test',
        name: 'test',
        component: Test
    }, {
        path: '/login',
        name: 'login',
        component: Login
    }, {
        path: '/register',
        name: 'register',
        component: Register
    }, {
        path: '/wechat',
        name: 'wechat',
        component: Wechat
    }, {
        path: '/contacts',
        name: 'contacts',
        component: Contacts
    }, {
        path: '/chatroom',
        name: 'chatroom',
        component: Chatroom
    }, {
        path: '/discover',
        name: 'discover',
        component: Discover,
        // children: [{
        //     path: 'moments',
        //     name: 'moment',
        //     component: Moment
        // }]
    }, {
        path: '/myinfo',
        name: 'myinfo',
        component: Myinfo
    }, {
        path: '/help',
        name: 'help',
        component: Help
    }, {
        path: '/moments',
        name: 'moment',
        component: Moment
    }]
})

export default router
