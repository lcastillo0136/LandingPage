import Main from '@/components/main'
import config from '@/config'

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
          requiresAuth: true
        },
        component: () => import('@/view/' + config.theme + '/single-page/home')
      },
      {
        path: '/:phone(\\d+)',
        name: 'home-w-phone',
        meta: {
          hideInMenu: true,
          title: 'home.title',
          notCache: true,
          icon: 'md-home',
          headerSticky: true,
          requiresAuth: true
        },
        component: () => import('@/view/' + config.theme + '/single-page/home')
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
          }
        ]
      }, {
        path: "*",
        redirect: { name: 'home' },
        component: () => import('@/view/' + config.theme + '/single-page/home')
      }
    ]
  }
]
