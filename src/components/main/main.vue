<template>
	<div>
    <Header></Header>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Header from '@/components/header'

import "@/assets/css/bootstrap.min.css"
import "@/assets/css/style.css"
import "@/assets/css/menu.css"
import "@/assets/css/vendors.css"
import "@/assets/css/icon_fonts/css/all_icons_min.css"

export default {
  name: 'Main',
  components: {
    Header
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
