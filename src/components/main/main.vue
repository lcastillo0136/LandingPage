<template>
  <router-view/>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import config from '@/config'
const baseAPI = process.env.VUE_APP_API_ENDPOINT

export default {
  name: 'Main',
  components: {
  },
  data () {
    return {
      baseAPI
    }
  },
  computed: {
    ...mapGetters([
      'hasToken',
      'stillLoading',
    ]),
    headerSticky () {
      return this.$route.meta && this.$route.meta.headerSticky
    }
  },
  methods: {
    ...mapMutations([
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
  },
  beforeRouteUpdate (to, from, next) {
    this.setTitle(to)
    next()
  }
}
</script>
