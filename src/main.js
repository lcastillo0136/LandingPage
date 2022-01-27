import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueWow from 'vue-wow'
import Moment from 'vue-moment'
import VueSweetalert2 from 'vue-sweetalert2'
import VueSkeletonLoading from 'vue-skeleton-loading';
import { LMap, LTileLayer, LMarker, LIconDefault, LPopup } from 'vue2-leaflet';

import i18n from '@/locale'
import config from '@/config'

import * as Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';
import 'ant-design-vue/lib/drawer/style/index.css';
import 'ant-design-vue/lib/menu/style/index.css';
import 'ant-design-vue/lib/tabs/style/index.css';
import 'ant-design-vue/lib/tooltip/style/index.css';
import '@/assets/css/ant-design-drawer.css'
import '@/assets/css/ant-design-menu.css'
import 'leaflet/dist/leaflet.css';

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);
Vue.component('l-icon-default', LIconDefault)
Vue.component('l-popup', LPopup)

Vue.use(VueSweetalert2);

Vue.use(Antd)

Vue.use(VueWow)
Vue.use(Moment)
Vue.use(VueSkeletonLoading)

Vue.config.productionTip = false
Vue.prototype.$config = config

Vue.filter('phone', function (phone) {
  return `${phone}`.replace(/[^0-9]/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
});

new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})
