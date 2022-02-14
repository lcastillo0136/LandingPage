<template>
  <main>
    ProfileFiles
  </main>
</template>
<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'ProfileFiles',
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