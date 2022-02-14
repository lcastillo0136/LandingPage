<template>
  <main>
    ProfileOrders
  </main>
</template>
<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'ProfileOrders',
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