<template>
	<div>
    <Header :sticky="headerSticky" v-if="headerVisibility"></Header>
      <router-view/>
    <Footer v-if="footerVisibility"></Footer>
    <ToTop v-if="toTopVisibility"></ToTop>
    <cookie-law theme="dark-lime" v-if="cookieEnabled && !stillLoading"></cookie-law>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import CookieLaw from 'vue-cookie-law'
import config from '@/config'

import Header from '@/components/header'
import Footer from '@/components/footer'
import ToTop from '@/components/totop'

import "@/assets/css/bootstrap.min.css"
import "@/assets/css/style.css"
import "@/assets/css/menu.css"
import "@/assets/css/vendors.css"
import "@/assets/css/icon_fonts/css/all_icons_min.css"
import "@/assets/css/date_picker.css"
import "@/assets/css/custom.css"

export default {
  name: 'Main',
  components: {
    Header,
    Footer,
    ToTop,
    CookieLaw
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'hasToken',
      'stillLoading',
      'headerVisibility',
      'footerVisibility',
      'toTopVisibility'
    ]),
    cookieEnabled () {
      return config.cookieExpires === 1
    },
    headerSticky () {
      return this.$route.meta && this.$route.meta.headerSticky
    }
  },
  methods: {
    ...mapMutations([
      'toggleHeader',
      'toggleFooter',
      'setContainer',
      'setFooterVisible',
      'setToTopVisible'
    ]),
    setTitle (route) {
      if (route.meta && route.meta.title) {
        document.title = this.$t(route.meta.title.replace(/[-]/g, '_'))
      } else {
        document.title = config.title
      }
    }
  },
  watch: {
    hasToken () {
      if (!this.hasToken && this.$route.meta.requiresAuth) {
        this.$router.replace({ name: 'login', params: { page: this.$route.name, info: { ...this.$route.params } }  })
      }
    }
  },
  mounted () {
    this.setTitle(this.$route)
    this.setContainer(false)
    this.setFooterVisible(false)
    this.setToTopVisible(false)
  },
  beforeRouteUpdate (to, from, next) {
    this.setTitle(to)
    next()
  }
}
</script>
<style lang="scss">
  .container-fluid {
    width: 95%;
    padding-top: 10px;
    max-width: 1500px;
  }
</style>