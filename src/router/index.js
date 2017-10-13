import Vue from 'vue'
import Router from 'vue-router'

// 使用 require.ensure - 代码分割

import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Help from '@/pages/Help/Index'
import NotFoundPage from '@/pages/NotFoundPage'

import Wechat from '@/pages/wechat/Index'
import Chatroom from '@/pages/wechat/Chatroom'
import ChatSetting from '@/pages/wechat/ChatSetting'

import Contacts from '@/pages/contacts/Index'
import UserProfile from '@/pages/contacts/UserProfile'
import NewFriends from '@/pages/contacts/NewFriends'
import AddFriend from '@/pages/contacts/AddFriend'
import AddSend from '@/pages/contacts/AddSend'

import Discover from '@/pages/discover/Index'
import Moments from '@/pages/discover/Moments'

import Myinfo from '@/pages/myinfo/Index'
import MyProfile from '@/pages/myinfo/MyProfile'
import MyCode from '@/pages/myinfo/edit/QRCode'
import MyAlias from '@/pages/myinfo/edit/MyAlias'
import MyWechatno from '@/pages/myinfo/edit/MyWechatno'
import More from '@/pages/myinfo/edit/More'
import Wallet from '@/pages/myinfo/Wallet'

Vue.use(Router)

const router =  new Router({
    // 先使用默认的 hash 模式～
    // mode: 'history',
    routes: [{
        path: '*',
        component: NotFoundPage
    }, {
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
        component: Wechat
    }, {
        path: '/contacts',
        component: Contacts,
        children: [{
            path: 'newFriends',
            component: NewFriends
        }]
    }, {
        path: '/chatrooms/:contactid',
        component: Chatroom,
        children: [{
            path: '/chatrooms/:contactid/chatsetting',
            component: ChatSetting
        }]
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
            path: 'profile',
            component: MyProfile,
            children: [{
                path: 'alias',
                component: MyAlias
            }, {
                path: 'wechatno',
                component: MyWechatno
            }, {
                path: 'code',
                component: MyCode
            }, {
                path: 'more',
                component: More
            }]
        }, {
            path: 'wallet',
            component: Wallet
        }]
    }, {
        path: '/userprofile/:contactid',
        component: UserProfile
    }, {
        path: '/addFriend',
        component: AddFriend
    }, {
        path: '/addsend/:fid',
        component: AddSend
    }, {
        path: '/help',
        component: Help,
        children: [{
            path: 'wallet',
            component: Wallet
        }]
    }]
})

export default router
