<template>
  <div id="app">
    <loading :loading="stillLoading"></loading>
    <div id="page" :class="{ 'menu-open': mobileMenuOpen }">
      <router-view v-if="!stillLoading"/>
    </div>
  </div>
</template>

<script>
  import { initializeApp } from 'firebase/app';
  import { getDatabase } from "firebase/database";
  import "firebase/database";

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
        'mobileMenuOpen',
        'settings',
        'hasToken'
      ])
    },
    methods: {
      ...mapMutations([
        'toggleLoading',
        'setLoading',
        'setFirebase'
      ]),
      ...mapActions([
        'getSettings',
        'getUserInfo',
        'handleLogOut'
      ]),
    },
    async mounted () {
      await this.getSettings()
      
      if (this.hasToken) {
        await this.getUserInfo().then(() => {}).catch((error) => {
          this.handleLogOut().then(() => {
            this.$router.push({ name: 'login' })
          })
        })
      }

      if (this.settings.GOOGLE_FIREBASE) {
        let app = initializeApp({ databaseURL: this.settings.GOOGLE_FIREBASE })
        this.setFirebase(getDatabase(app))
      }

      this.toggleLoading()    
    }
  }
</script>

<style lang="scss">
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

.ps {
  .ps__rail-y .ps__rail-x {
    z-index: 1;
  }
}

span.form-control {
  padding: 0;
}
</style>
