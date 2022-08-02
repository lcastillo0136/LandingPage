<template>
    <div class="bg_color_1" v-if="doctors.length > 1">
      <div class="container margin_120_95">
        <div class="main_title">
          <h2>Doctores con más vistas</h2>
          <p>Revisa nuestros médicos con más vistas</p>
        </div>
        <carousel id="reccomended" :nav="false" :center="true" :items="2" :loop="true" :margin="10" :responsive="{0: {items: 1},600: {items: 2},1000: {items: 4}}">
          <div class="item" v-for="(doctor, doctor_i) in doctors" :key="doctor_i">
            <router-link :to="{ name: 'details-page', params: { id: doctor.id }}">
              <div class="views"><i class="icon-eye-7"></i>{{ doctor.viewed }}</div>
              <div class="title">
                <h4>{{ doctor.title }} {{ doctor.first_name }} {{ doctor.last_name }}<em>{{ doctor.especialidad }}</em></h4>
              </div><img :src="doctor.avatar" alt="">
            </router-link>
          </div>
        </carousel>
        <!-- /carousel -->
      </div>
      <!-- /container -->
    </div>
    <!-- /white_bg -->
</template>
<script>
  import carousel from 'vue-owl-carousel'
  import config from '@/config'
  import { getDoctorsByFilter } from '@/api/data'

  export default {
    name: 'Carousel',
    components: {
      carousel
    },
    data () {
      return {
        doctors: []
      }
    },
    methods: {
    },
    mounted() {
      getDoctorsByFilter({
        filter: {},
        sort: 'most_viewed',
        limit: '7'
      }).then((data) => { 
        this.doctors = data.data.data.doctors
      })
    }
  }
</script>