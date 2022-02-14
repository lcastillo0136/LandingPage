<template>
  <div id="logo_home">
    <h1>
      <router-link :style="'background-image: url('+ appImage +');'" :to="{ name: 'home' }" :title="appName">{{ appName }}</router-link>
    </h1>
  </div>
</template>
<script>
  import { getServerFile } from '@/libs/util'
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    name: 'Logo',
    components: {
    },
    data () {
      return {
      }
    },
    computed: {
      ...mapGetters([
        'settings'
      ]),
      appName () {
        return this.settings?.COMPANY_NAME
      },
      appImage () {
        return getServerFile('public/company/company_logo.png')
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
