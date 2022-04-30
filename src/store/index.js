import Vue from 'vue'
import Vuex from 'vuex'
import config from '@/config'

Vue.use(Vuex)

import app from './module/app'
import user from './module/user'

export default new Vuex.Store({
  state: {
    fullLoaded: false,
    mobile: {
      open: false
    },
    page: {
      container: config.container
    },
    header: {
      visible: true,
      sticky: false,
    },
    footer: {
      visible: true
    },
    totop: {
      visible: true
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
    },
    toggleHeader (state) {
      state.header.visible = !state.header.visible
    },
    toggleFooter (state) {
      state.footer.visible = !state.footer.visible
    },
    toggleToTop (state) {
      state.totop.visible = !state.totop.visible
    },
    toggleHeaderSticky (state) {
      state.header.sticky = !state.header.sticky
    },
    setHeaderVisible(state, visible = true) {
      state.header.visible = visible
    },
    setFooterVisible(state, visible = true) {
      state.footer.visible = visible
    },
    setToTopVisible(state, visible = true) {
      state.totop.visible = visible
    },
    setContainer(state, fluid = false) {
      state.page.container = fluid
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
    },
    headerVisibility (state) {
      return state.header.visible
    },
    footerVisibility (state) {
      return state.footer.visible
    },
    toTopVisibility (state) {
      return state.totop.visible
    },
    headerSticky (state) {
      return state.header.sticky
    }
  },
  actions: {
    
  },
  modules: {
    app,
    user
  }
})
