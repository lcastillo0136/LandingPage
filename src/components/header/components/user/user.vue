<template>
  <router-link :to="{ name: link }"><i class="pe-7s-user"></i></router-link>
</template>
<script>
  export default {
    name: 'User',
    components: {
    },
    data () {
      return {
      }
    },
    computed: {
      link () {
        return this.hasToken ? 'profile' : 'login'
      },
      hasToken () {
        return this.$store.state.user.token
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
