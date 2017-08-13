import Vue from 'vue'
import Router from 'vue-router'

// 使用 require.ensure - 代码分割

import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Help from '@/pages/Help'

import Wechat from '@/pages/wechat/Index'
import Chatroom from '@/pages/wechat/Chatroom'

import Contacts from '@/pages/contacts/Index'
import AddFriend from '@/pages/contacts/AddFriend'
import AddSend from '@/pages/contacts/AddSend'

import Discover from '@/pages/discover/Index'
import Moments from '@/pages/discover/Moments'

import Myinfo from '@/pages/myinfo/Index'
import MyProfile from '@/pages/myinfo/MyProfile'
import UserProfile from '@/pages/myinfo/UserProfile'

Vue.use(Router)

const router =  new Router({
    routes: [{
        path: '/login',
        component: Login
    }, {
        path: '/register',
        component: Register
    }, {
        path: '/search/:type',
        component: Search,
    }, {
        path: '/wechat',
        component: Wechat,
        meta: { keepAlive: true }
    }, {
        path: '/contacts',
        component: Contacts
    }, {
        path: '/chatroom',
        component: Chatroom
    }, {
        path: '/discover',
        component: Discover,
        children: [{
            path: 'moments',
            component: Moments
        }]
    }, {
        path: '/myinfo',
        component: Myinfo,
        children: [{
            path: 'profile/:id',
            component: MyProfile
        }]
    }, {
        path: '/myinfo/:type',
        component: Myinfo
    }, {
        // 怎么做到啊？？为什么 嵌套就不能够呢？，但是 用了 router-view 又只能～
    //     path: '/myinfo/profile/:userid',
    //     component: MyProfile
    // }, {
        path: '/userprofile/:fid',
        component: UserProfile
    }, {
        path: '/addsend/:fid',
        component: AddSend
    }, {
        path: '/help',
        component: Help
    }, {
        path: '/addFriend',
        component: AddFriend
    }]
})

export default router
