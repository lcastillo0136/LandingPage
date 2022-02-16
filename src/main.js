import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueWow from 'vue-wow'
import Moment from 'vue-moment'

const moment = require('moment')
require('moment/locale/es')

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
Vue.use(Moment, {
    moment
})
Vue.use(VueSkeletonLoading)

Vue.config.productionTip = false
Vue.prototype.$config = config

Vue.filter('phone', function (phone) {
  return `${phone}`.replace(/[^0-9]/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
});

Vue.filter('currency', function (value, style) {
  return (typeof value !== "number") ? value : (new Intl.NumberFormat('en-US', { style: 'currency', currency: style || 'USD' })).format(value);
});

Vue.filter('mtoh', function(n) {
  var num = n;
  var hours = (num / 60);
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  return n > 0 ? ((rhours > 0 ? `${rhours} hora` + (rhours > 1 ? 's' : '') : '') + (rminutes > 0 ? (rhours > 0 ? ' y ' : '') + `${rminutes} minuto` + (rminutes > 1 ? 's' : '') : '')) : '';
})

Vue.filter('oxxo', function(o) {
  return `${o}`.replace(/^([\d]{4})([\d]{4})([\d]{4})([\d]{2})/g, '$1-$2-$3-$4')
})

new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})
