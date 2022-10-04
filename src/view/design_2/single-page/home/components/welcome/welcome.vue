<template>
  <section class="u-clearfix u-palette-1-base u-section-2" id="carousel_b93f">
    <div class="u-clearfix u-sheet u-valign-middle-xl u-sheet-1">
      <div class="u-expanded-width-xs u-shape u-shape-svg u-text-palette-3-base u-shape-1">
        <svg class="u-svg-link" preserveAspectRatio="none" viewBox="0 0 160 140" style="">
          <use xlink:href="#svg-1b2f"></use>
        </svg>
        <svg class="u-svg-content" viewBox="0 0 160 140" x="0px" y="0px" id="svg-1b2f">
          <g>
            <g>
              <path d="M138.9,102.2c-9.5,10.1-24.4,20.2-41.2,27.4C63.2,144.5,21,147.1,3.1,112.4c-9.9-19.1,6.5-28.8,11.8-45.7 c5.3-16.9-11.4-32.3-5.1-49.9c1.8-4.9,4.9-9,8.9-11.9C24,1,30.8-0.8,37.8,0.3C43.6,1.2,49,3.5,54.3,5.7c8.8,3.7,17.4,7.1,26.3,9.8 c15.7,4.7,31.3,3.7,47.1,7.2c8.5,1.9,16.7,5.6,22.6,11.8C170.3,55.7,155.8,84.1,138.9,102.2z"></path>
            </g>
          </g>
        </svg>
      </div>
      <img src="../../images/14-min.png" class="u-align-left u-image u-image-contain u-image-1" data-image-width="2941" data-image-height="1576">
      <div class="u-align-left u-container-style u-expanded-width-xs u-group u-palette-1-light-3 u-radius-10 u-shape-round u-group-1">
        <div class="u-container-layout u-valign-middle-lg u-valign-middle-md u-valign-middle-sm u-valign-middle-xl u-container-layout-1">
          <h1 class="u-custom-font u-text u-text-palette-1-light-1 u-text-1">{{ currentSettings.COMPANY_NAME }}</h1>
          <p class="u-text u-text-2">
            Es una empresa líder en desarrollo de software que se especializa en crear soluciones de software innovadoras y de vanguardia para empresas de todos los tamaños.
          </p>
          <router-link :to="{ name: 'contacts' }" class="u-active-palette-1-light-1 u-border-none u-btn u-btn-round u-button-style u-hover-palette-1-light-1 u-palette-1-base u-radius-6 u-text-active-white u-text-body-alt-color u-text-hover-white u-btn-2">
            Contáctanos
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Welcome',
    computed: {
      ...mapGetters([
        'settings',
        'hasToken',
        'getUser'
      ]),
      currentSettings() {
        return this.settings || {}
      },
      baseAPI() {
        return process.env.VUE_APP_API_ENDPOINT
      },
      baseURL() {
        return this.baseAPI.replace('/api/', '')
      }
    }
  }
</script>
<style lang="scss">
  .u-section-2 {
    padding: 0 16px;
    h1.u-text-1 {
      font-family: 'Comfortaa Bold Alt1', "Advent Pro";
      letter-spacing: normal;
      text-transform: lowercase;
      text-align: center;
    }
  }
</style>