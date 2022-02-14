<template>
  <main>
    ProfileAppointments
  </main>
</template>
<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'ProfileAppointments',
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