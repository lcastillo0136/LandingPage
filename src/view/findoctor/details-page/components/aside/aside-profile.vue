<template>
  <div class="box_profile">
    <figure>
      <img :src="doctor.img" alt="" class="img-fluid">
    </figure>
    <small>{{ doctor.speciality }}</small>
    <h1>{{ doctor.name }}</h1>
    <span class="rating">
      <i :class="{ 'icon_star':1, 'voted': r <= doctor.rating.rate }" v-for="r in rateTotal" :key="r"></i>
      <small>({{ doctor.rating.comments }})</small>
      <a-tooltip placement="top" title="Badge Level">
        <a href="" class="badge_list_1"><img src="img/badges/badge_1.svg" width="15" height="15" alt=""></a>
      </a-tooltip>
    </span>
    <ul class="statistic">
      <li>{{ doctor.rating.views }} Views</li>
      <li>{{ doctor.rating.patients }} Patients</li>
    </ul>
    <ul class="contacts">
      <li><h6>Address</h6>{{ doctor.address }}</li>
      <li><h6>Phone</h6><a :href="'tel://' + doctor.phone_number ">{{ doctor.phone_number }}</a></li>
    </ul>
    <div class="text-center"><a href="https://www.google.com/maps/dir//Assistance+–+Hôpitaux+De+Paris,+3+Avenue+Victoria,+75004+Paris,+Francia/@48.8606548,2.3348734,14z/data=!4m15!1m6!3m5!1s0x0:0xa6a9af76b1e2d899!2sAssistance+–+Hôpitaux+De+Paris!8m2!3d48.8568376!4d2.3504305!4m7!1m0!1m5!1m1!1s0x47e67031f8c20147:0xa6a9af76b1e2d899!2m2!1d2.3504327!2d48.8568361" class="btn_1 outline" target="_blank"><i class="icon_pin"></i> View on map</a></div>
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
      }
    },
  }
</script>