<template>
  <main>
    ProfilePatients
  </main>
</template>
<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'ProfilePatients',
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