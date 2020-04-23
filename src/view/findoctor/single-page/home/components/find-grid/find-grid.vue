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
              <router-link :to="{ name: 'details-page' }"><img :src="doctor.image" class="img-fluid" alt=""></router-link>
              <div class="preview">
                <router-link :to="{ name: 'details-page' }"><span>Read more</span></router-link>
              </div>
            </figure>
            <div class="wrapper">
              <small>{{ doctor.specialization }}</small>
              <h3>{{ doctor.name }}</h3>
              <p>Id placerat tacimates definitionem sea, prima quidam vim no. Duo nobis persecuti cuodo....</p>
              <span class="rating">
                <i :class="{ 'icon_star':1, 'voted': r <= doctor.rating.value }" v-for="r in rateTotal" :key="r"></i>
                <small>({{ doctor.rating.votes }})</small>
              </span>
              <a-tooltip placement="top" title="Badge Level">
                <a href="" class="badge_list_1"><img src="img/badges/badge_1.svg" width="15" height="15" alt=""></a>
              </a-tooltip>
            </div>
            <ul>
              <li><i class="icon-eye-7"></i> {{ doctor.views }} Views</li>
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
  export default {
    name: 'FindForm',
    data () {
      return {
        doctors: [{
          image: 'img/doctor_listing_1.jpg',
          specialization: 'Psicologist',
          name: 'Dr. Watamaniuk',
          description: 'Id placerat tacimates definitionem sea, prima quidam vim no. Duo nobis persecuti cuodo....',
          rating: {
            value: 4,
            votes: 145
          },
          views: 854,
          fav: false
        }, {
          image: 'img/doctor_listing_2.jpg',
          specialization: 'Psicologist',
          name: 'Dr. Mantooth',
          description: 'Id placerat tacimates definitionem sea, prima quidam vim no. Duo nobis persecuti cuodo....',
          rating: {
            value: 4,
            votes: 145
          },
          views: 854,
          fav: false
        }, {
          image: 'img/doctor_listing_3.jpg',
          specialization: 'Psicologist',
          name: 'Dr. Pullman',
          description: 'Id placerat tacimates definitionem sea, prima quidam vim no. Duo nobis persecuti cuodo....',
          rating: {
            value: 4,
            votes: 145
          },
          views: 854,
          fav: false
        }, {
          image: 'img/doctor_listing_4.jpg',
          specialization: 'Psicologist',
          name: 'Dr. Toothaker',
          description: 'Id placerat tacimates definitionem sea, prima quidam vim no. Duo nobis persecuti cuodo....',
          rating: {
            value: 4,
            votes: 145
          },
          views: 854,
          fav: false
        }, {
          image: 'img/doctor_listing_5.jpg',
          specialization: 'Psicologist',
          name: 'Dr. Brilliant',
          description: 'Id placerat tacimates definitionem sea, prima quidam vim no. Duo nobis persecuti cuodo....',
          rating: {
            value: 4,
            votes: 145
          },
          views: 854,
          fav: false
        }, {
          image: 'img/doctor_listing_6.jpg',
          specialization: 'Psicologist',
          name: 'Dr. Crownover',
          description: 'Id placerat tacimates definitionem sea, prima quidam vim no. Duo nobis persecuti cuodo....',
          rating: {
            value: 4,
            votes: 145
          },
          views: 854,
          fav: false
        }]
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
      addToWishlist (doctor) {
        doctor.fav = !doctor.fav
      }
    }
  }
</script>