import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fullLoaded: false,
    mobile: {
      open: false
    }
  },
  mutations: {
    toggleLoading (state) {
      state.fullLoaded = !state.fullLoaded
    },
    toggleMenuMobile (state) {
      state.mobile.open = !state.mobile.open
    }
  },
  getters: {
    stillLoading (state) {
      return !state.fullLoaded
    },
    mobileMenuOpen (state) {
      return state.mobile.open
    }
  },
  actions: {
  },
  modules: {
  }
})
