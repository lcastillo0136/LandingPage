<template>
  <div>
    <u-animate-container v-for="(doctor,doctor_i) in listData" :key="doctor_i">
      <div class="strip_list fadeIn animated">
        <a-tooltip placement="top" title="Add to wishlist">
          <a href="#" class="wish_bt" :class="{'active tada animated': doctor.fav }" @click.stop.prevent="addToWishlist(doctor)"></a>
        </a-tooltip>
        <figure>
          <router-link :to="{ name: 'details-page', params: { id: doctor.id } }"><img :src="doctor.img" alt=""></router-link>
        </figure>
        <small>{{ doctor.speciality }}</small>
        <h3><router-link :to="{ name: 'details-page', params: { id: doctor.id } }">{{ doctor.name }}</router-link></h3>
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
          <li><a :href="googleMapDir(doctor)" target="_blank">Directions</a></li>
          <li><router-link :to="{ name: 'details-page', params: { id: doctor.id } }">Book now</router-link></li>
        </ul>
      </div>
    </u-animate-container>
    <skeleton-loading v-for="sk in loadingData" :key="index">
      <div class="strip_list">
        <div class="float-right clearfix">
          <square-skeleton :count="1" :boxProperties="{width: '42px', height: '42px'}"></square-skeleton>
        </div>
        <figure>
          <circle-skeleton></circle-skeleton>
        </figure>
        <small>
          <square-skeleton :count="1" :boxProperties="{width: '100px', height: '15px'}"></square-skeleton>
        </small>
        <h3><square-skeleton :count="1" :boxProperties="{width: '201px', height: '26px', top: '4px'}"></square-skeleton></h3>
        <p><square-skeleton :count="1" :boxProperties="{width: '100%', height: '26px', top: '0px'}"></square-skeleton></p>
        <span class="rating">
          <i class="icon_star"></i>
          <i class="icon_star"></i>
          <i class="icon_star"></i>
          <i class="icon_star"></i>
          <i class="icon_star"></i>
          <small>(100)</small>
        </span>
        <a-tooltip placement="top" title="Badge Level">
          <a href="#" class="badge_list_1" @click.stop.prevent=""><img src="img/badges/badge_0.svg" width="15" height="15" alt=""></a>
        </a-tooltip>
        <ul>
          <li><a href="#" class="btn_listing">View on Map</a></li>
          <li><a href="" target="_blank">Directions</a></li>
          <li><router-link to="">Book now</router-link></li>
        </ul>
      </div>
    </skeleton-loading>
    <!-- /strip_list -->
  </div>
</template>
<script>
  export default {
    props: {
      data: {
        type: Array,
        default: function () {
          return []
        }
      },
      loading: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      rateTotal () {
        return Array(5).fill(true).map((e, i) => i + 1)
      },
      listData () {
        return (!this.loading && this.data) || []
      },
      loadingData () {
        return this.loading ? new Array(6).fill(true) : []
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