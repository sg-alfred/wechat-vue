import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  // 先使用默认的 hash 模式～
  // mode: 'history',
  routes: [
    {
      path: '*',
      component: () => import('@/pages/NotFoundPage'),
    },
    {
      path: '/login',
      component: () => import('@/pages/Login'),
      meta: {
        title: '登录',
      },
    },
    {
      path: '/register',
      component: () => import('@/pages/Register'),
      meta: {
        title: '注册',
      },
    },
    {
      path: '/search/:type',
      component: () => import('@/pages/Search'),
      meta: {
        title: '搜索',
      },
    },
    {
      path: '/wechat',
      component: () => import('@/pages/wechat/Index'),
      meta: {
        title: '微信',
      },
    },
    {
      path: '/contacts',
      component: () => import('@/pages/contacts/Index'),
      meta: {
        title: '通讯录',
      },
      children: [
        {
          path: 'newFriends',
          component: () => import('@/pages/contacts/NewFriends'),
          meta: {
            title: '新的朋友',
          },
        },
      ],
    },
    {
      path: '/chatrooms/:contactid',
      component: () => import('@/pages/wechat/Chatroom'),
      meta: {
        title: '聊天室',
      },
      children: [
        {
          path: '/chatrooms/:contactid/chatsetting',
          component: () => import('@/pages/wechat/ChatSetting'),
          meta: {
            title: '聊天设置',
          },
        },
      ],
    },
    {
      path: '/discover',
      component: () => import('@/pages/discover/Index'),
      meta: {
        title: '发现',
      },
      children: [
        {
          path: 'moments',
          component: () => import('@/pages/discover/Moments'),
          meta: {
            title: '朋友圈',
          },
        },
      ],
    },
    {
      path: '/myinfo',
      component: () => import('@/pages/myinfo/Index'),
      meta: {
        title: '我的',
      },
      children: [
        {
          path: 'profile',
          component: () => import('@/pages/myinfo/MyProfile'),
          children: [
            {
              path: 'headimg',
              component: () => import('@/pages/myinfo/edit/Avatar'),
            },
            {
              path: 'face',
              component: () => import('@/pages/myinfo/edit/Face'),
            },
            {
              path: 'alias',
              component: () => import('@/pages/myinfo/edit/MyAlias'),
            },
            {
              path: 'wechatno',
              component: () => import('@/pages/myinfo/edit/MyWechatno'),
            },
            {
              path: 'code',
              component: () => import('@/pages/myinfo/edit/QRCode'),
            },
            {
              path: 'more',
              component: () => import('@/pages/myinfo/edit/More'),
            },
          ],
        },
        {
          path: 'wallet',
          component: () => import('@/pages/myinfo/Wallet'),
        },
      ],
    },
    {
      path: '/userprofile/:contactid',
      component: () => import('@/pages/contacts/UserProfile'),
      meta: {
        title: '好友详情',
      },
    },
    {
      path: '/addFriend',
      component: () => import('@/pages/contacts/AddFriend'),
      meta: {
        title: '添加好友',
      },
    },
    {
      path: '/addsend/:fid',
      component: () => import('@/pages/contacts/AddFriend'),
      meta: {
        title: '添加好友',
      },
    },
    {
      path: '/help',
      component: () => import('@/pages/help/Index'),
      meta: {
        title: '帮助',
      },
      children: [
        {
          path: 'wallet',
          component: () => import('@/pages/myinfo/Wallet'),
          meta: {
            title: '钱包',
          },
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    // 如果设置标题，拦截后设置标题
    document.title = to.meta.title;
  }
  next();
});

export default router;
