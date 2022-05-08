<template>
  <footer class="text-secondary py-2 px-3 d-flex justify-content-end">
    Powered with 
    <a-icon type="heart" theme="filled" :style="{ color: 'hotpink', margin: '2px 5px' }"/>
    <span> by <b><a href="https://www.zibasoft.com" target="_blank" style="color: inherit;">zibasoft</a></b></span>
  </footer>
</template>
<script>
  import { getServerFile } from '@/libs/util'
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    name: 'Footer',
    computed: {
      ...mapGetters({
        container: 'container',
        settings: 'settings',
        types: 'filterTypes'
      }),
      containerClasses () {
        return {
          'container': this.container,
          'container-fluid': !this.container
        }
      },
      year () {
        return this.$moment().format('YYYY')
      },
      appName () {
        return this.settings?.COMPANY_NAME
      },
      appImage () {
        return getServerFile('public/company/company_logo.png')
      }
    },
    methods: {
      newHash (page) {
        var hash = 0, i, chr 
        for (i = 0; i < page.length; i++) {
          chr   = page.charCodeAt(i)
          hash  = ((hash << 5) - hash) + chr
          hash |= 0 
        }
        return '#' + hash
      }
    }
  }
</script>