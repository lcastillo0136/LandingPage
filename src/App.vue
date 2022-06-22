<template>
  <div id="app">
    <loading :loading="stillLoading"></loading>
    <div id="page" :class="{'menu-open': mobileMenuOpen}">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import { initializeApp } from 'firebase/app';
  import { getDatabase } from "firebase/database";
  import "firebase/database";

  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import Loading from '@/components/loading'
  import * as conekta from '@/libs/conekta'
  import * as paypal from '@/libs/paypal'

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
        'setFirebase'
      ]),
      ...mapActions([
        'getTypes',
        'getSorts',
        'getLocation',
        'getSettings',
        'getUserInfo',
        'handleLogOut'
      ]),
    },
    async mounted () {
      await this.getSettings()
      
      if (this.settings.CONEKTA_CLIENT) conekta.initConekta(this.settings.CONEKTA_CLIENT)
      if (this.settings.PAYPAL_CLIENT) paypal.init(this.settings.PAYPAL_CLIENT, this.settings.CURRENCY)

      if (this.hasToken) {
        await this.getUserInfo().then(() => {}).catch((error) => {
          this.handleLogOut()
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
</style>
