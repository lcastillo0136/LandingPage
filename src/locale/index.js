import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { localRead } from '@/libs/util'
import config from '@/config'
import customZhCn from './lang/zh-CN'
import customZhTw from './lang/zh-TW'
import customEnUs from './lang/en-US'
import customEsEs from './lang/es-ES'

const { defaultLang } = config

Vue.use(VueI18n)

// vue-i18n 6.x+写法
Vue.locale = () => {}
const messages = {
  'zh-CN': Object.assign(customZhCn),
  'zh-TW': Object.assign(customZhTw),
  'en-US': Object.assign(customEnUs),
  'es-ES': Object.assign(customEsEs)
}

// 自动根据浏览器系统语言设置语言
const localLang = navigator.language
let lang = localRead('local') || (messages[localLang] && localLang) || defaultLang || 'en-US'

Vue.config.lang = lang
const i18n = new VueI18n({
  locale: lang,
  messages
})

export default i18n

// vue-i18n 5.x写法
// Vue.locale('zh-CN', Object.assign(zhCnLocale, customZhCn))
// Vue.locale('en-US', Object.assign(zhTwLocale, customZhTw))
// Vue.locale('zh-TW', Object.assign(enUsLocale, customEnUs))
