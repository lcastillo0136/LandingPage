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
        'toggleLoading'
      ]),
      ...mapActions([
        'getTypes',
        'getSorts',
        'getLocation',
        'getSettings',
        'getUserInfo'
      ]),
    },
    async mounted () {
      await this.getTypes().catch((err) => {
        if (err.data.message) {
          this.$notification.error({
            message: `Error: ${err.config.url}`,
            description: err.data.message, 
            placement: 'bottomLeft',
            duration: 5
          });
        }
      })
      await this.getSorts()
      await this.getSettings()

      await this.getLocation().then((data) => {})
      
      conekta.initConekta(this.settings.CONEKTA_CLIENT)
      paypal.init(this.settings.PAYPAL_CLIENT, this.settings.CURRENCY)

      if (this.hasToken) {
        await this.getUserInfo().then(() => {})
      }

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
