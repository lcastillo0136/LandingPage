<template>
  <main>
    settings
  </main>
</template>
<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'ProfileSettings',
    watch: {
    },
    components: {
    },
    computed: {
      ...mapGetters([
        'hasToken',
        'settings',
        'getUser'
      ])
    },
    mounted() {
    }
  }
</script>