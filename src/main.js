
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueWow from 'vue-wow'
import Moment from 'vue-moment'
import VueSweetalert2 from 'vue-sweetalert2'

import i18n from '@/locale'
import config from '@/config'

import { Drawer, Menu, Icon, Tabs, Tooltip } from 'ant-design-vue'
import 'ant-design-vue/lib/drawer/style/index.css';
import 'ant-design-vue/lib/menu/style/index.css';
import 'ant-design-vue/lib/tabs/style/index.css';
import 'ant-design-vue/lib/tooltip/style/index.css';
import '@/assets/css/ant-design-drawer.css'
import '@/assets/css/ant-design-menu.css'
 
Vue.use(VueSweetalert2);
Vue.use(Drawer)
Vue.use(Menu)
Vue.use(Icon)
Vue.use(Tabs)
Vue.use(Tooltip)
Vue.use(VueWow)
Vue.use(Moment)

Vue.config.productionTip = false
Vue.prototype.$config = config

new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})
