<template>
  <div id="app">
    <loading :loading="stillLoading"></loading>
    <div id="page" :class="{'menu-open': mobileMenuOpen}">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import config from '@/config'
  import { initializeApp } from 'firebase/app';
  import { getDatabase } from "firebase/database";
  import "firebase/database";

  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import Loading from '@/components/loading'
  import * as conekta from '@/libs/conekta'
  import * as paypal from '@/libs/paypal'

  const _theme = loadSettings().find(f => f.name === 'THEME').value

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
      addMetaTag(attrs) {
        var meta = document.createElement('meta');
        Object.keys(attrs).forEach((p) => {
          meta[p] = attrs[p]
        })
        document.getElementsByTagName('head')[0].appendChild(meta);
      },
      addRichSEO(content) {
        const script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        script.textContent = JSON.stringify(content);
        document.head.appendChild(script);
      }
    },
    head: {
      title: function() {
        if (this.settings) {
          return {
            inner: this.settings.COMPANY_NAME,
          }
        }
      },
      meta: function() {
        if (this.doc) {
          return [
            {
              name: 'description',
              content: 'Es una empresa líder en desarrollo de software que se especializa en crear soluciones de software innovadoras y de vanguardia para empresas de todos los tamaños',
            },
          ]
        }
      },
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
      await this.getSorts().catch((err) => {
        if (err.data.message) {
          this.$notification.error({
            message: `Error: ${err.config.url}`,
            description: err.data.message, 
            placement: 'bottomLeft',
            duration: 5
          });
        }
      })
      // await this.getSettings()
      const data = {}
      loadSettings().forEach(v => {
        data[v.name] = v.value
      })
      this.$store.commit('setSettings', data)

      // await this.getLocation().then((data) => {}).catch((error) => {
        
      // })
      
      conekta.initConekta(this.settings.CONEKTA_CLIENT)
      paypal.init(this.settings.PAYPAL_CLIENT, this.settings.CURRENCY)

      if (this.hasToken) {
        await this.getUserInfo().then(() => {}).catch((error) => {
          this.handleLogOut()
        })
      }

      if (this.settings.GOOGLE_FIREBASE) {
        let app = initializeApp({ databaseURL: this.settings.GOOGLE_FIREBASE })
        this.setFirebase(getDatabase(app))
      }

      this.addMetaTag({
        name: 'title',
        content: 'Zibasoft'
      })
      this.addMetaTag({
        name: 'description',
        content: 'Es una empresa líder en desarrollo de software que se especializa en crear soluciones de software innovadoras y de vanguardia para empresas de todos los tamaños'
      })
      this.addRichSEO({
        "@context": "https://schema.org",
        "@type": "Organization",
        "url": window.location.href,
        "logo": require('@/view/' + (_theme || config.theme) + '/single-page/home/images/logo-zibasoft.png')
      })

      if (this.settings.GOOGLE_TRACKID) {
        gtag('config', this.settings.GOOGLE_TRACKID);
        gtag('page', '/')
        gtag('title', 'Zibasoft')
        gtag('location', window.location.href)
        gtag('pageTitle', 'Zibasoft')
        // Vue.use(VueAnalytics, {
        //   id: this.settings.GOOGLE_TRACKID
        // })
        // this.$ga.page({
        //   page: '/',
        //   title: 'Zibasoft',
        //   location: window.location.href
        // })
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
