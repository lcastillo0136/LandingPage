import Main from '@/components/main'
import config from '@/config'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/index.html',
        alias: '/',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: 'home.title',
          notCache: true,
          icon: 'md-home',
          headerSticky: true
        },
        component: () => import('@/view/' + config.theme + '/single-page/home')
      },
      {
        path: '/home-2.html',
        name: 'home-2',
        meta: {
          hideInMenu: true,
          title: 'home.title',
          notCache: true,
          icon: 'md-home',
          headerSticky: true
        },
        component: () => import('@/view/' + config.theme + '/single-page/home-2')
      },
      {
        path: '/home-3.html',
        name: 'home-3',
        meta: {
          hideInMenu: true,
          title: 'home.title',
          notCache: true,
          icon: 'md-home',
          headerSticky: true
        },
        component: () => import('@/view/' + config.theme + '/single-page/home-3')
      },
      {
        path: '/home-4.html',
        name: 'home-4',
        meta: {
          hideInMenu: true,
          title: 'home.title',
          notCache: true,
          icon: 'md-home',
          headerSticky: true
        },
        component: () => import('@/view/' + config.theme + '/single-page/home-4')
      }, 
      {
        path: '/list-page.html',
        name: 'list-page',
        meta: {
          hideInMenu: true,
          title: 'list-page.title',
          notCache: true,
          icon: 'md-list',
          headerSticky: false
        },
        component: () => import('@/view/' + config.theme + '/list-page')
      },
      {
        path: '/details-page.html',
        name: 'details-page',
        meta: {
          hideInMenu: true,
          title: 'details-page.title',
          notCache: true,
          icon: 'md-details',
          headerSticky: true
        },
        component: () => import('@/view/' + config.theme + '/details-page')
      }, 
      {
        path: '/booking-page.html',
        name: 'booking-page',
        meta: {
          hideInMenu: true,
          title: 'booking-page.title',
          notCache: true,
          icon: 'md-booking',
          headerSticky: true
        },
        component: () => import('@/view/' + config.theme + '/booking-page')
      }, 
      {
        path: '/review.html',
        name: 'review-page',
        meta: {
          hideInMenu: true,
          title: 'review-page.title',
          notCache: true,
          icon: 'md-review',
          headerSticky: true
        },
        component: () => import('@/view/' + config.theme + '/review-page')
      }, 
      {
        path: '/login.html',
        name: 'login',
        meta: {
          hideInMenu: true,
          title: 'login.title',
          notCache: true,
          icon: 'md-user'
        },
        component: () => import('@/view/' + config.theme + '/login/login.vue')
      }, {
        path: "*", 
        component: () => import('@/view/' + config.theme + '/404')
      }
    ]
  }
]
