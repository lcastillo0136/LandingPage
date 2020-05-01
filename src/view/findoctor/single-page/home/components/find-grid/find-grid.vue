<template>
  <div class="bg_color_1">
    <div class="container margin_120_95">
      <div class="main_title">
        <h2>Most Viewed doctors</h2>
        <p>Usu habeo equidem sanctus no. Suas summo id sed, erat erant oporteat cu pri.</p>
      </div>
      <div class="row">
        <div class="col-lg-4 col-md-6" v-for="(doctor, doctor_i) in doctors" :key="doctor_i">
          <div class="box_list home">
            <a-tooltip placement="top" title="Add to wishlist">
              <a href="#" class="wish_bt" :class="{'active tada animated': doctor.fav }" @click.stop.prevent="addToWishlist(doctor)"></a>
            </a-tooltip>
            <figure>
              <router-link :to="{ name: 'details-page' }"><img :src="getImage()" class="img-fluid" alt=""></router-link>
              <div class="preview">
                <router-link :to="{ name: 'details-page' }"><span>Read more</span></router-link>
              </div>
            </figure>
            <div class="wrapper">
              <small>{{ doctor.specialization }}</small>
              <h3>{{ doctor.name }}</h3>
              <p>Id placerat tacimates definitionem sea, prima quidam vim no. Duo nobis persecuti cuodo....</p>
              <span class="rating">
                <i :class="{ 'icon_star':1, 'voted': r <= doctor.rate }" v-for="r in rateTotal" :key="r"></i>
                <small>({{ doctor.comments }})</small>
              </span>
              <a-tooltip placement="top" title="Badge Level">
                <a href="" class="badge_list_1"><img src="img/badges/badge_1.svg" width="15" height="15" alt=""></a>
              </a-tooltip>
            </div>
            <ul>
              <li><i class="icon-eye-7"></i> {{ doctor.viewed }} Views</li>
              <li><router-link :to="{ name: 'details-page' }">Book now</router-link></li>
            </ul>
          </div>
        </div>

      </div>
      <!-- /row -->
      <p class="text-center add_top_30">
        <router-link :to="{ name: 'list-page', params: { layout: 'list', type: 'doctors' }}" class="btn_1 medium">View all Doctors</router-link></p>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { getDoctorsByFilter } from '@/api/data'

  export default {
    name: 'FindForm',
    data () {
      return {
        doctors: []
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
      ]),
      rateTotal () {
        return Array(5).fill(true).map((e, i) => i + 1)
      }
    },
    methods: {
      getImage() {
        return `img/doctor_listing_${Math.ceil(Math.random() * (5))}.jpg`
      },
      addToWishlist (doctor) {
        doctor.fav = !doctor.fav
      }
    },
    mounted() {
      getDoctorsByFilter({
        filter: {},
        sort: 'most_viewed',
        limit: '6'
      }).then((data) => { 
        this.doctors = data.data.doctors
      })
    }
  }
</script>