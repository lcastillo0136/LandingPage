<template>
  <div class="box_profile">
    <figure v-if="doctor.img">
      <img :src="doctor.img" alt="" class="img-fluid">
    </figure>
    <small v-if="doctor.especialidad">{{ doctor.especialidad }}</small>
    <h1 v-if="doctor.name">{{ doctor.name }}</h1>
    <span class="rating">
      <i :class="{ 'icon_star':1, 'voted': r <= doctor.rating.rate }" v-for="r in rateTotal" :key="r"></i>
      <small>({{ commentsTotal }})</small>
      <a-tooltip placement="top" title="Badge Level">
        <a href="" class="badge_list_1"><img src="img/badges/badge_1.svg" width="15" height="15" alt="" @click.stop.prevent=""></a>
      </a-tooltip>
    </span>
    <ul class="statistic">
      <li>{{ doctor.rating.views }} Vistas</li>
      <li>{{ doctor.rating.patients }} Pacientes</li>
    </ul>
    <ul class="contacts">
      <li><h6>Direccion</h6>{{ doctor.address }}</li>
      <li v-if="doctor.phone_number"><h6>Telefono</h6><a :href="'tel:' + doctor.phone_number ">{{ doctor.phone_number | phone }}</a></li>
    </ul>
    <div class="text-center">
      <a :href="googleMapDir" class="btn_1 outline" target="_blank"><i class="icon_pin"></i> Ver en mapa</a>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'AsideProfile',
    props: {
      doctor: Object
    },
    computed: {
      rateTotal () {
        return Array(5).fill(true).map((e, i) => i + 1)
      },
      commentsTotal() {
        return this.doctor.rating ? (this.doctor.rating.comments||[]).length : 0
      },
      googleMapDir() {
        return `https://www.google.com/maps/search/?api=1&query=${this.doctor.map.latitude},${this.doctor.map.longitude}`
      },
    },
  }
</script>