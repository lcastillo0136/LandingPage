<template>
  <div>
    <u-animate-container v-for="(doctor,doctor_i) in data" :key="doctor_i">
      <div class="strip_list fadeIn animated">
        <a-tooltip placement="top" title="Add to wishlist">
          <a href="#" class="wish_bt" :class="{'active tada animated': doctor.fav }" @click.stop.prevent="addToWishlist(doctor)"></a>
        </a-tooltip>
        <figure>
          <router-link :to="{ name: 'details-page' }"><img :src="doctor.img" alt=""></router-link>
        </figure>
        <small>{{ doctor.speciality }}</small>
        <h3>{{ doctor.name }}</h3>
        <p>{{ doctor.description }}.</p>
        <span class="rating">
          <i :class="{ 'icon_star':1, 'voted': r <= doctor.rating.rate }" v-for="r in rateTotal" :key="r"></i>
          <small>({{ doctor.rating.comments }})</small>
        </span>
        <a-tooltip placement="top" title="Badge Level">
          <a href="#" class="badge_list_1" @click.stop.prevent=""><img src="img/badges/badge_1.svg" width="15" height="15" alt=""></a>
        </a-tooltip>
        <ul>
          <li><a href="#" @click.stop.prevent="$emit('onViewMapClick', doctor)" class="btn_listing">View on Map</a></li>
          <li><a href="https://www.google.com/maps/dir//Assistance+–+Hôpitaux+De+Paris,+3+Avenue+Victoria,+75004+Paris,+Francia/@48.8606548,2.3348734,14z/data=!4m15!1m6!3m5!1s0x0:0xa6a9af76b1e2d899!2sAssistance+–+Hôpitaux+De+Paris!8m2!3d48.8568376!4d2.3504305!4m7!1m0!1m5!1m1!1s0x47e67031f8c20147:0xa6a9af76b1e2d899!2m2!1d2.3504327!2d48.8568361" target="_blank">Directions</a></li>
          <li><a href="detail-page.html">Book now</a></li>
        </ul>
      </div>
    </u-animate-container>
    <!-- /strip_list -->
  </div>
</template>
<script>
  export default {
    props: {
      data: {
        type: Array,
        default: function () {
          return [{
            speciality: 'Pediatrician',
            name: 'Dr. Cornfield',
            description: 'Id placerat tacimates definitionem sea, prima quidam vim no. Duo nobis persecuti cuodo....',
            rating: {
              rate: 3,
              comments: 145
            },
            img: 'img/doctor_listing_1.jpg',
            isVisible: false,
          }, {
            speciality: 'Psicologist',
            name: 'Dr. Shoemaker',
            description: 'Id placerat tacimates definitionem sea, prima quidam vim no. Duo nobis persecuti cuodo....',
            rating: {
              rate: 4,
              comments: 165
            },
            img: 'img/doctor_listing_2.jpg',
            isVisible: false,
          }, {
            speciality: 'Pediatrician',
            name: 'Dr. Lachinet',
            description: 'Id placerat tacimates definitionem sea, prima quidam vim no. Duo nobis persecuti cuodo....',
            rating: {
              rate: 2,
              comments: 45
            },
            img: 'img/doctor_listing_3.jpg',
            isVisible: false,
          }]
        }
      }
    },
    computed: {
      rateTotal () {
        return Array(5).fill(true).map((e, i) => i + 1)
      }
    },
    methods: {
      changeAnimationEnd (doctor) {
        doctor.isVisible = true
      },
      animationEnded (doctor) {
        return {
          'fadeIn animated': doctor.isVisible,
          'wow': !doctor.isVisible
        }
      },
      addToWishlist (doctor) {
        doctor.fav = !doctor.fav
      }
    }
  }
</script>