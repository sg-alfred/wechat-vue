import Vue from 'vue'
import Router from 'vue-router'

// 使用 require.ensure - 代码分割

import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Help from '@/pages/Help/Index'

import Wechat from '@/pages/wechat/Index'
import Chatroom from '@/pages/wechat/Chatroom'
import ChatSetting from '@/pages/wechat/ChatSetting'

import Contacts from '@/pages/contacts/Index'
import NewFriends from '@/pages/contacts/NewFriends'
import AddFriend from '@/pages/contacts/AddFriend'
import AddSend from '@/pages/contacts/AddSend'

import Discover from '@/pages/discover/Index'
import Moments from '@/pages/discover/Moments'

import Myinfo from '@/pages/myinfo/Index'
import MyCode from '@/pages/myinfo/QRCode'
import MyProfile from '@/pages/myinfo/MyProfile'
import MyAlias from '@/pages/myinfo/MyAlias'
import UserProfile from '@/pages/myinfo/UserProfile'
import Wallet from '@/pages/myinfo/Wallet'

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
        component: Wechat
    }, {
        path: '/contacts',
        component: Contacts,
        children: [{
            path: 'newFriends',
            component: NewFriends
        }]
    }, {
        path: '/chatroom/:chatid',
        component: Chatroom,
        children: [{
            path: '/chatroom/chatsetting/:fid',
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
            path: 'profile/:id',
            component: MyProfile
        }, {
            path: 'mycode',
            component: MyCode
        }, {
            path: 'wallet',
            component: Wallet
        }, {
            path: 'profile/edit/alias',
            component: MyAlias
        }]
    }, {
        path: '/userprofile/:fid',
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
