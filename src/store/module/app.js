import { localSave, localRead, getToken } from '@/libs/util'
import { saveErrorLogger, getTypes, getSorts, getDoctorsByFilter } from '@/api/data'

import i18n from '@/locale'
import config from '@/config'


export default {
  state: {
    local: localRead('local'),
    errorList: [],
    hasReadErrorPage: false,
    token: getToken(),
    filter: {
      types: [],
      sorts: []
    }
  },
  getters: {
    errorCount: state => state.errorList.length,
    filterTypes: state => state.filter.types,
    filterSorts: state => state.filter.sorts
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
    setTypes (state, types) {
      state.filter.types = types.map(t => {
        return { text: i18n.t('types.' + t), value: t }
      })
    },
    setSorts (state, sorts) {
      state.filter.sorts = sorts.map(s => {
        return { text: i18n.t('sorts.' + s), value: s }
      })
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
    getTypes ({ state, commit }) {
      return new Promise((resolve, reject) => {
        try {
          getTypes(state.token).then(res => {
            const data = res.data
            commit('setTypes', ['all'].concat(data.types))
            resolve(data)
          }).catch(err => {
            reject(err)
          })
        } catch (error) {
          reject(error)
        }
      })
    },
    getSorts ({ state, commit }) {
      return new Promise((resolve, reject) => {
        try {
          getSorts(state.token).then(res => {
            const data = res.data
            commit('setSorts', [].concat(data.sorts))
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
