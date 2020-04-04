<template>
  <div id="logo_home">
    <h1><router-link to="/" :title="appName">{{ appName }}</router-link></h1>
  </div>
</template>
<script>
import config from '@/config' 
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
