import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import { setToken, getToken, removeToken, localSave, localRead } from '@/libs/util'

Vue.use(Router)
const router = new Router({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (!getToken() && (to.name !== 'login' && to.name != 'login-2')) {
      next({ name: 'login', params: { page: to.name, info: { ...to.params } }  })
    } else {
      next()
    }
  } else {
    next()
  }
})

router.afterEach(() => {
  window.scrollTo(0, 0)
})

export default router
