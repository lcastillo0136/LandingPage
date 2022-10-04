<template>
  <header class="u-clearfix u-header u-header" id="sec-d9ff">
    <div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
      <router-link :to="{ name: 'home' }" class="u-image u-logo u-image-1">
        {{ currentSettings.COMPANY_NAME }}
      </router-link>
    </div>
  </header>

</template>
<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'HeaderComponent',
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
  .u-header {
    z-index: 1;
    .u-logo.u-image-1 {
      width: 250px;
      height: 80px;
      overflow: hidden;
      display: block;
      margin: 0;
      font-family: "Comfortaa Bold Alt1", "Advent Pro";
      letter-spacing: normal;
      text-transform: lowercase;
      display: flex;
      font-size: 40px;
      flex-direction: row;
      align-content: center;
      justify-content: center;
      align-items: center;
      .u-logo-image-1 {
        height: auto;
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        transform: translate(-50%, -50%);
      }
    }
  }
</style>