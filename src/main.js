
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import i18n from '@/locale'
import config from '@/config'

import { Drawer, Menu, Icon } from 'ant-design-vue'
import 'ant-design-vue/lib/drawer/style/index.css';
import 'ant-design-vue/lib/menu/style/index.css';
import '@/assets/css/ant-design-drawer.css'
import '@/assets/css/ant-design-menu.css'

Vue.use(Drawer)
Vue.use(Menu)
Vue.use(Icon)

Vue.config.productionTip = false
Vue.prototype.$config = config

new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})
