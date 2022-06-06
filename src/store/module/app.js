import { localSave, localRead, getToken } from '@/libs/util'
import { saveErrorLogger, getTypes, getSorts, getDoctorsByFilter, getSettings, getEvent } from '@/api/data'

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
    },
    location: {
      longitude: 0,
      latitude: 0
    },
    settings: null,
    event: null
  },
  getters: {
    errorCount: state => state.errorList.length,
    filterTypes: state => state.filter.types,
    filterSorts: state => state.filter.sorts,
    geoLocation: state => state.location,
    settings: state => state.settings,
    event: state => state.event
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
      state.filter.types = types.filter(f=>f.available_online).map(t => {
        return { text: i18n.t('types.' + (t.name || '').trim().toLowerCase().replace(/[\/\(\)\[\]]/ig, '_')), value: t.name }
      })
    },
    setSorts (state, sorts) {
      state.filter.sorts = sorts.map(s => {
        return { text: i18n.t('sorts.' + s), value: s }
      })
    },
    setLocation (state, location) {
      state.location.longitude = location.longitude
      state.location.latitude = location.latitude
    },
    setSettings (state, settings) {
      state.settings = settings
    },
    setEvent (state, event) {
      state.event = event
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
            const response = res.data
            commit('setTypes', [{ name: 'all', available_online: true }].concat(response.data))
            resolve(response)
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
            const data = res.data.data
            commit('setSorts', [].concat(data.sorts))
            resolve(data)
          }).catch(err => {
            reject(err)
          })
        } catch (error) {
          reject(error)
        }
      })
    },
    getLocation ({ state, commit }) {
      return new Promise((resolve, reject) => {
        try {
          if(!("geolocation" in navigator)) {
            reject(new Error('Geolocation is not available.'));
          }

          navigator.geolocation.getCurrentPosition(pos => {
            commit('setLocation', pos.coords)
            resolve(pos);
          }, err => {
            reject(err);
          });
        } catch (error) {
          reject(error)
        }
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
    },
    getEvent ({ state, commit }) {
      return new Promise((resolve, reject) => {
        try {
          getEvent().then(res => {
            const { data } = res.data
            
            commit('setEvent', data)
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
