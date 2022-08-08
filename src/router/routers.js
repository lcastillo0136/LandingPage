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
          headerSticky: true,
          requiresAuth: false
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
        path: '/list-page-:type.html',
        alias: '/list-page-:type-:layout.html',
        name: 'list-page-type',
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
        path: '/details-page-:id.html',
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
        path: '/invoice.html',
        name: 'invoice-page',
        meta: {
          hideInMenu: true,
          title: 'invoice-page.title',
          notCache: true,
          icon: 'md-booking',
          headerSticky: true,
          // order: 'b2b79525-198e-4c32-a917-82046520d97e'
        },
        component: () => import('@/view/' + config.theme + '/invoice-page')
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
        component: () => import('@/view/' + config.theme + '/login')
      }, 
      {
        path: '/login-2.html',
        name: 'login-2',
        meta: {
          hideInMenu: true,
          title: 'login-2.title',
          notCache: true,
          icon: 'md-user'
        },
        component: () => import('@/view/' + config.theme + '/login-2')
      }, 
      {
        path: '/register-doctor.html',
        name: 'register-doctor',
        meta: {
          hideInMenu: true,
          title: 'register-doctor.title',
          notCache: true,
          icon: 'md-doctor'
        },
        component: () => import('@/view/' + config.theme + '/register-doctor')
      }, 
      {
        path: '/register.html',
        name: 'register',
        meta: {
          hideInMenu: true,
          title: 'register.title',
          notCache: true,
          icon: 'md-user'
        },
        component: () => import('@/view/' + config.theme + '/register')
      }, 
      {
        path: '/contacts.html',
        name: 'contacts',
        meta: {
          hideInMenu: true,
          title: 'contacts.title',
          notCache: true,
          icon: 'md-contacts'
        },
        component: () => import('@/view/' + config.theme + '/contacts')
      }, 
      {
        path: '/terms-conditions.html',
        name: 'terms-conditions',
        meta: {
          hideInMenu: true,
          title: 'termsconditions.title',
          notCache: true,
          icon: 'md-contacts'
        },
        component: () => import('@/view/' + config.theme + '/contacts')
      }, 
      {
        path: '/privacy.html',
        name: 'privacy',
        meta: {
          hideInMenu: true,
          title: 'privacy.title',
          notCache: true,
          icon: 'md-contacts'
        },
        component: () => import('@/view/' + config.theme + '/contacts')
      }, 
      {
        path: '/profile',
        alias: '/profile.html',
        name: 'profile',
        meta: {
          hideInMenu: true,
          title: 'profile.title',
          notCache: true,
          icon: 'md-contacts'
        },
        component: () => import('@/view/' + config.theme + '/profile'),
        children: [
          {
            path: 'details.html',
            alias: '/',
            name: 'profile-details',
            component: () => import('@/view/' + config.theme + '/profile/pages/details')
          },
          {
            path: 'settings.html',
            name: 'profile-settings',
            component: () => import('@/view/' + config.theme + '/profile/pages/profile-settings')
          },
          {
            path: 'files.html',
            name: 'profile-files',
            component: () => import('@/view/' + config.theme + '/profile/pages/profile-files')
          },
          {
            path: 'appointments.html',
            name: 'profile-appointments',
            component: () => import('@/view/' + config.theme + '/profile/pages/profile-appointments')
          },
          {
            path: 'patients.html',
            name: 'profile-patients',
            component: () => import('@/view/' + config.theme + '/profile/pages/profile-patients')
          },
          {
            path: 'patients/:id',
            name: 'profile-patients-edit',
            component: () => import('@/view/' + config.theme + '/profile/pages/profile-patients-edit')
          },
          {
            path: 'patients/:id/consulta',
            name: 'profile-patients-ehr',
            component: () => import('@/view/' + config.theme + '/profile/pages/profile-patients-ehr')
          },
          {
            path: 'orders.html',
            name: 'profile-orders',
            component: () => import('@/view/' + config.theme + '/profile/pages/profile-orders')
          },
          {
            path: 'reviews.html',
            name: 'profile-reviews',
            component: () => import('@/view/' + config.theme + '/profile/pages/profile-reviews')
          }
        ]
      }, {
        path: "*",
        component: () => import('@/view/' + config.theme + '/404')
      }
    ]
  }
]
