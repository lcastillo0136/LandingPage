
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import i18n from '@/locale'
import config from '@/config'

Vue.config.productionTip = false
Vue.prototype.$config = config

new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})
