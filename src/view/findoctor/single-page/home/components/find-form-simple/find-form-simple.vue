<template>
  <div class="hero_home version_3">
    <div class="content">
      <h3 :class="classOnload">Find a Doctor!</h3>
      <p :class="classOnload">
        Ridiculus sociosqu cursus neque cursus curae ante scelerisque vehicula. Mea maiorum menandri vituperata ea, quodsi conceptam in vis.
      </p>
      <router-link :to="{ name: 'list-page', params: { type: 'doctors' }}"class="btn_1 medium" :class="classOnload">View all Doctors</router-link>
    </div>
  </div>
  <!-- /Hero -->
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'FindFormSimple',
    data () {
      return {}
    },
    computed: {
      classOnload () {
        return {
          'fadeInUp animated': !this.stillLoading
        }
      },
      ...mapGetters([
        'stillLoading'
      ])
    }
  }
</script>