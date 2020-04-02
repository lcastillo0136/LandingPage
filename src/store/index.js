import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fullLoaded: false
  },
  mutations: {
    toggleLoading (state) {
      state.fullLoaded = !state.fullLoaded
    }
  },
  getters: {
    stillLoading (state) {
      return !state.fullLoaded
    }
  },
  actions: {
  },
  modules: {
  }
})
