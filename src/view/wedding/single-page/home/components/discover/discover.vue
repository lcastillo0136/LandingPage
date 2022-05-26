<template>
  <div class="container margin_120_95">
    <div class="main_title">
      <h2>¡Descublre la agenda <strong>en linea</strong>!</h2>
      <p>Evita las frustrantes llamadas y tiempos de espera probando nuestro servicio en linea ágil.</p>
    </div>
    <div class="row add_bottom_30">
      <div class="col-lg-4">
        <div class="box_feat" id="icon_1">
          <span></span>
          <h3>Busca a tu medico</h3>
          <p>Con filtros como buscar el medico mas cercano a su ubiacion, mejor valoracion, mas vistas... o mas joven!</p>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="box_feat" id="icon_2">
          <span></span>
          <h3>Visita el prefil</h3>
          <p>Puedes ver que servicios ofrece, sus precios y horarios que mas se ajusten al tuyo.</p>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="box_feat" id="icon_3">
          <h3>Agenda tu visita</h3>
          <p>Evita las molestas filas y llamadas en espera con nuestro agil proceso de agenda.</p>
        </div>
      </div>
    </div>
    <!-- /row -->
    <p class="text-center">
      <router-link :to="{ name: 'list-page', params: { type: 'all' }}" class="btn_1 medium" :class="classOnload">Encuentra un medico</router-link>
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