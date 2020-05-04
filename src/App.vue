<template>
  <div id="app">
    <loading :loading="stillLoading"></loading>
    <div id="page" :class="{'menu-open': mobileMenuOpen}">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import Loading from '@/components/loading'

export default {
  name: 'App',
  components: {
    Loading
  },
  computed: {
    ...mapGetters([
      'stillLoading',
      'mobileMenuOpen'
    ])
  },
  methods: {
    ...mapMutations([
      'toggleLoading'
    ]),
    ...mapActions([
      'getTypes',
      'getSorts',
      'getLocation'
    ]),
  },
  async mounted () {
    await this.getTypes()
    await this.getSorts()
    this.getLocation().then((data) => {})

    this.toggleLoading()    
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
  margin: 0;
  padding: 0;
}
#app {
  width: 100%;
  height: 100%;
}
</style>
