import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueWow from 'vue-wow'
import Moment from 'vue-moment'

const moment = require('moment')
require('moment/locale/es')

import VueSweetalert2 from 'vue-sweetalert2'
import VueSkeletonLoading from 'vue-skeleton-loading'
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import vSelect from 'vue-select'
import DisableAutocomplete from 'vue-disable-autocomplete';
import VueVideoPlayer from 'vue-video-player'
import VueNativeNotification from './plugins/VueNativeNotification'
import AudioPlayer from '@liripeng/vue-audio-player'
import AudioVisual from 'vue-audio-visual'

import iView from 'iview';
import i18n from '@/locale'
import config from '@/config'
import * as Fingerprint2 from 'fingerprintjs2'
Vue.prototype.$fingerprint = Fingerprint2;

import * as Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';
import 'ant-design-vue/lib/drawer/style/index.css';
import 'ant-design-vue/lib/menu/style/index.css';
import 'ant-design-vue/lib/tabs/style/index.css';
import 'ant-design-vue/lib/tooltip/style/index.css';
import '@/assets/css/ant-design-drawer.css'
import '@/assets/css/ant-design-menu.css'
import 'vue-select/dist/vue-select.css';
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
import 'iview/dist/styles/iview.css';
import 'video.js/dist/video-js.css'

import "@/assets/css/bootstrap.min.css"
import "@/assets/css/style.css"

Vue.component('v-select', vSelect)

Vue.use(VueSweetalert2);
Vue.use(PerfectScrollbar)

Vue.use(Antd)

Vue.use(VueWow)
Vue.use(Moment, {
  moment
})
Vue.use(VueSkeletonLoading)
Vue.use(DisableAutocomplete)
Vue.use(iView);
Vue.use(VueVideoPlayer)
Vue.use(AudioPlayer)
Vue.use(AudioVisual)

Vue.use(VueNativeNotification, {
  requestOnNotify: true
})

Vue.config.productionTip = false
Vue.prototype.$config = config

Vue.filter('phone', function (phone) {
  let _result = `${phone}`.replace(/[^0-9]/g, '')

  switch (_result.length) {
    case 10:
      _result = `${phone}`.replace(/[^0-9]/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
      break
    case 11:
    case 12:
    case 13:
      _result = `${phone}`.replace(/[^0-9]/g, '').replace(/(\d{1,3})(\d{3})(\d{3})(\d{4})/, '+$1 ($2) $3-$4');
      break;
  }

  return _result
});

Vue.filter('waPhone', function(phone) {
  return `${phone || ''}`.substring(Math.max(`${phone || ''}`.length - 10, 0));
});

Vue.filter('parseURLs', function(value, isHTML = false, options = {}) {
  let linkExp = /((s?ftp|https?):\/\/|(www\.)|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"\u201d\u2019]/i;
  let mailExp = /^mailto:/i;

  if (typeof value !== 'string') { return value; }
  if (value === null || value === '') { return value; }

  let rawText = value;
  const html = [];
  const URLS = [];
  let match;
  let i;
  let url;
  // eslint-disable-next-line no-cond-assign
  while ((match = rawText.match(linkExp))) {
    [url] = match;
    if (!match[2] && !match[4]) {
      url = (match[3] ? 'http://' : 'mailto:') + url;
    }
    i = match.index;
    if (rawText.substr(0, i)) {
      html.push(rawText.substr(0, i));
    }
    html.push('<a ');
    if (options) {
      Object.keys(options).forEach((key) => {
        html.push(`${key}="${options[key]}" `);
      });
    }
    html.push('href="');
    URLS.push(url.replace(/"/g, '&quot;'));
    html.push(url.replace(/"/g, '&quot;'));
    html.push('">');

    if (match[0].replace(mailExp, '')) {
      html.push(match[0].replace(mailExp, ''));
    }
    html.push('</a>');
    rawText = rawText.substring(i + match[0].length);
  }
  if (rawText) {
    html.push(rawText);
  }
  return isHTML ? html.join('') : URLS;
})

Vue.filter('parseMarkup', function(value) {
  const linkExp = /\*([A-Za-zÀ-ÿ0-9._%+\-\s\(\)\_\~\<\>\=\"]*)\*/i;
  const linkExp2 = /\_([A-Za-zÀ-ÿ0-9._%+\-\s\(\)\*\~\<\>\=\"]*)\_/i;
  const linkExp3 = /\~([A-Za-zÀ-ÿ0-9._%+\-\s\(\)\_\*\<\>\=\"]*)\~/i;

  if (typeof value !== 'string') { return value; }
  if (value === null || value === '') { return value; }
  let rawText = value;
  let html = [];
  let match;
  let i;

  // eslint-disable-next-line no-cond-assign
  while ((match = rawText.match(linkExp)) && match[1]) {
    i = match.index;
    if (rawText.substr(0, i)) {
      html.push(rawText.substr(0, i));
    }
    html.push('<b>');
    html.push(match[1]);
    html.push('</b>');
    rawText = rawText.substring(i + match[0].length);
  }
  if (rawText) {
    html.push(rawText);
  }
  rawText = html.join('');
  html = [];
  while ((match = rawText.match(linkExp2)) && match[1]) {
    i = match.index;
    if (rawText.substr(0, i)) {
      html.push(rawText.substr(0, i));
    }
    html.push('<span class="text-italic">');
    html.push(match[1]);
    html.push('</span>');
    rawText = rawText.substring(i + match[0].length);
  }
  if (rawText) {
    html.push(rawText);
  }
  rawText = html.join('');
  html = [];
  while ((match = rawText.match(linkExp3)) && match[1]) {
    i = match.index;
    if (rawText.substr(0, i)) {
      html.push(rawText.substr(0, i));
    }
    html.push('<span class="text-strike">');
    html.push(match[1]);
    html.push('</span>');
    rawText = rawText.substring(i + match[0].length);
  }
  if (rawText) {
    html.push(rawText);
  }
  return html.join('');
})

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

Vue.filter('ServerToDate', function(d, format) {
  return moment(d.length < 14 ? `0${d}` : d, 'DDMMYYYY HH:mm').format(format)
})

new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})
