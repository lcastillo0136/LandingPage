<template>
  <div id="app">
    <loading :loading="stillLoading"></loading>
    <div id="page">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Loading from '@/components/loading'

export default {
  name: 'App',
  components: {
    Loading
  },
  computed: {
    ...mapGetters([
      'stillLoading'
    ])
  },
  methods: {
    ...mapMutations([
      'toggleLoading'
    ])
  },
  mounted () {
    setTimeout(() => {
      this.toggleLoading()
    }, 3000);
  }
}
</script>

<style>
.size{
  width: 100%;
  height: 100%;
}
html,body{
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  width: 100%;
  height: 100%;
}
</style>
