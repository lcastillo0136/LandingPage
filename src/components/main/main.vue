<template>
	<div>
    <Header :sticky="headerSticky" v-if="headerVisibility"></Header>
      <router-view/>
    <Footer v-if="footerVisibility"></Footer>
    <ToTop></ToTop>
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
      'stillLoading',
      'headerVisibility',
      'footerVisibility'
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
      'toggleFooter'
    ])
  },
  watch: {
  },
  mounted () {
  }
}
</script>
