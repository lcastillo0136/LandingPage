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
          requiresAuth: false
        },
        component: () => import('@/view/' + config.theme + '/single-page/home')
      },
      {
        path: '/p/:uuid.html',
        name: 'card-page',
        meta: {
          hideInMenu: true,
          title: 'card.title',
          notCache: true,
          icon: 'md-list',
          headerSticky: false
        },
        component: () => import('@/view/' + config.theme + '/card-page')
      }, 
      {
        path: '/p/preview',
        name: 'card-preview-page',
        meta: {
          hideInMenu: true,
          title: 'card.title',
          notCache: true,
          icon: 'md-list',
          headerSticky: false,
          preview: true
        },
        component: () => import('@/view/' + config.theme + '/card-page')
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
          order: '213f7f2b-74c8-4f83-9534-878176c8e16c'
        },
        component: () => import('@/view/' + config.theme + '/invoice-page')
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
            path: 'orders.html',
            name: 'profile-orders',
            component: () => import('@/view/' + config.theme + '/profile/pages/profile-orders')
          },
          {
            path: 'files.html',
            name: 'profile-files',
            component: () => import('@/view/' + config.theme + '/profile/pages/profile-files')
          },
          {
            path: 'reviews.html',
            name: 'profile-reviews',
            component: () => import('@/view/' + config.theme + '/profile/pages/profile-reviews')
          },
          {
            path: 'payment.html',
            name: 'profile-payment',
            component: () => import('@/view/' + config.theme + '/profile/pages/profile-payment')
          }
        ]
      }, {
        path: "*",
        component: () => import('@/view/' + config.theme + '/404')
      }
    ]
  }
]
