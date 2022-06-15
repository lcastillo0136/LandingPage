import { localSave, localRead, getToken } from '@/libs/util'
import { saveErrorLogger, getSettings } from '@/api/data'

import i18n from '@/locale'
import config from '@/config'


export default {
  state: {
    local: localRead('local'),
    errorList: [],
    hasReadErrorPage: false,
    token: getToken(),
    settings: null
  },
  getters: {
    errorCount: state => state.errorList.length,
    settings: state => state.settings
  },
  mutations: {
    setLocal (state, lang) {
      localSave('local', lang)
      state.local = lang
    },
    addError (state, error) {
      state.errorList.push(error)
    },
    setHasReadErrorLoggerStatus (state, status = true) {
      state.hasReadErrorPage = status
    },
    setSettings (state, settings) {
      state.settings = settings
    }
  },
  actions: {
    addErrorLog ({ commit, rootState }, info) {
      if (!window.location.href.includes('error_logger_page')) commit('setHasReadErrorLoggerStatus', false)
      const { user: { token, userId, userName } } = rootState
      let data = {
        ...info,
        time: Date.parse(new Date()),
        token,
        userId,
        userName
      }
      saveErrorLogger(info).then(() => {
        commit('addError', data)
      })
    },
    getSettings ({ state, commit }) {
      return new Promise((resolve, reject) => {
        try {
          getSettings().then(res => {
            const data = {}
            res.data.data.forEach(v => {
              data[v.name] = v.value
            })
            commit('setSettings', data)
            resolve(data)
          }).catch(err => {
            reject(err)
          })
        } catch (error) {
          reject(error)
        }
      })
    }
  }
}
