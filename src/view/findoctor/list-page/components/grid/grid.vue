<template>
  <div class="row">
    <div class="col-md-6" v-for="(doctor,doctor_i) in data" :key="doctor_i">
      <u-animate-container>
        <div class="box_list fadeIn animated" >
          <a-tooltip placement="top" title="Add to wishlist">
            <a href="#" class="wish_bt" :class="{'active tada animated': doctor.fav }" @click.stop.prevent="addToWishlist(doctor)"></a>
          </a-tooltip>
          <figure>
            <router-link :to="{ name: 'details-page', params: { id: doctor.id } }">
              <img :src="doctor.img" alt="" class="img-fluid">
              <div class="preview"><span>Read more</span></div>
            </router-link>
          </figure>
          <div class="wrapper">
            <small>{{ doctor.especialidad }}</small>
            <h3>{{ doctor.name }}</h3>
            <p v-if="doctor.description" v-html="doctor.description.substring(0, 150)"></p>
            <span class="rating">
              <i :class="{ 'icon_star':1, 'voted': r <= doctor.rating.rate }" v-for="r in rateTotal" :key="r"></i>
              <small>({{ doctor.rating.comments }})</small>
            </span>
            <a-tooltip placement="top" title="Badge Level">
              <a href="" class="badge_list_1"><img src="img/badges/badge_1.svg" width="15" height="15" alt=""></a>
            </a-tooltip>
          </div>
          <ul>
            <li><a href="#" @click.stop.prevent="$emit('onViewMapClick', doctor)" class="btn_listing">Ver en mapa</a></li>
            <li><a :href="googleMapDir(doctor)" target="_blank">Direcciones</a></li>
            <li><router-link :to="{ name: 'details-page', params: { id: doctor.id } }">Agendar ahora</router-link></li>
          </ul>
        </div>
      </u-animate-container>
      <!-- /strip_list -->
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Grid',
    props: {
      data: {
        type: Array,
        default: function () {
          return []
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
      },
      googleMapDir(doctor) {
        return `https://www.google.com/maps/dir//${doctor.map.address}/@${doctor.map.latitude},${doctor.map.longitude},14z/`.replace(/\s/ig, '+')
      }
    }
  }
</script>