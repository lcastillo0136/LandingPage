<template>
  <div id="logo_home">
    <h1>
      <router-link :style="'background-image: url('+ appImage +');'" :to="{ name: 'home' }" :title="appName">{{ appName }}</router-link>
    </h1>
  </div>
</template>
<script>
import config from '@/config' 
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
export default {
  name: 'Logo',
  components: {
  },
  data () {
    return {
    }
  },
  computed: {
    appName () {
      return config.title
    },
    appImage () {
      return baseUrl.replace('/api/', '/storage/') + 'company/company_logo.png'
    }
  },
  methods: {
  },
  watch: {
  },
  mounted () {
  }
}
</script>
