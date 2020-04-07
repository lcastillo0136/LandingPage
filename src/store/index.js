import Vue from 'vue'
import Vuex from 'vuex'
import config from '@/config'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fullLoaded: false,
    mobile: {
      open: false
    },
    page: {
      container: config.container
    }
  },
  mutations: {
    toggleLoading (state) {
      state.fullLoaded = !state.fullLoaded
    },
    toggleMenuMobile (state) {
      state.mobile.open = !state.mobile.open
    },
    toggleContainer (state) {
      state.page.container = !state.page.container
    }
  },
  getters: {
    stillLoading (state) {
      return !state.fullLoaded
    },
    mobileMenuOpen (state) {
      return state.mobile.open
    },
    container (state) {
      return state.page.container
    }
  },
  actions: {
  },
  modules: {
  }
})
