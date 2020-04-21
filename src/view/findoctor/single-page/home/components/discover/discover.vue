<template>
  <div class="container margin_120_95">
    <div class="main_title">
      <h2>Discover the <strong>online</strong> appointment!</h2>
      <p>Usu habeo equidem sanctus no. Suas summo id sed, erat erant oporteat cu pri. In eum omnes molestie. Sed ad debet scaevola, ne mel.</p>
    </div>
    <div class="row add_bottom_30">
      <div class="col-lg-4">
        <div class="box_feat" id="icon_1">
          <span></span>
          <h3>Find a Doctor</h3>
          <p>Usu habeo equidem sanctus no. Suas summo id sed, erat erant oporteat cu pri. In eum omnes molestie.</p>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="box_feat" id="icon_2">
          <span></span>
          <h3>View profile</h3>
          <p>Usu habeo equidem sanctus no. Suas summo id sed, erat erant oporteat cu pri. In eum omnes molestie.</p>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="box_feat" id="icon_3">
          <h3>Book a visit</h3>
          <p>Usu habeo equidem sanctus no. Suas summo id sed, erat erant oporteat cu pri. In eum omnes molestie.</p>
        </div>
      </div>
    </div>
    <!-- /row -->
    <p class="text-center">
      <router-link :to="{ name: 'list-page', params: { type: 'all' }}" class="btn_1 medium" :class="classOnload">Find Doctor</router-link>
    </p>
  </div>
  <!-- /container -->
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'Discover',
    data () {
      return {

      }
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