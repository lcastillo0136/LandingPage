<template>
  <footer class="u-align-center u-clearfix u-footer u-grey-80 u-footer" id="sec-72df">
    <div class="u-clearfix u-sheet u-sheet-1">
      <p class="u-small-text u-text u-text-variant u-text-1">{{ currentSettings.COMPANY_NAME }} todos los derechos reservados al {{ today | moment('YYYY') }}.<br>
      </p>
    </div>
  </footer>
</template>
<script>
  import { mapGetters } from 'vuex'

  export default {
    data() {
      return {
        today: this.$moment()
      }
    },
    name: 'footerComponent',
    computed: {
      ...mapGetters([
        'settings',
        'hasToken',
        'getUser'
      ]),
      currentSettings() {
        return this.settings || {}
      }
    },
  }
</script>