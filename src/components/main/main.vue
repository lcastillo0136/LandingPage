<template>
	<div>
    <Header :sticky="true"></Header>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <Footer></Footer>
    <ToTop></ToTop>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
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
    ToTop
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'stillLoading'
    ])
  },
  methods: {
  },
  watch: {
  },
  mounted () {
  }
}
</script>
