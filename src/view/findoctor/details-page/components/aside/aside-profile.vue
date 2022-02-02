<template>
  <div class="box_profile" v-if="doctor && doctor.name">
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
  <skeleton-loading v-else>
    <div class="box_profile loading">
      <figure>
        <square-skeleton :count="1" :boxProperties="{ height: '235px' }"></square-skeleton>
      </figure>
      <small>
        <square-skeleton :count="1" :boxProperties="{ width: '135px' }"></square-skeleton>
      </small>
      <h1>
        <square-skeleton :count="1" :boxProperties="{ width: '155px', bottom: '5px', top: '10px', height: '23px' }"></square-skeleton>
        <square-skeleton :count="1" :boxProperties="{ width: '155px', height: '23px' }"></square-skeleton>
      </h1>
      <span class="rating">
        <i :class="{ 'icon_star':1 }" v-for="r in rateTotal" :key="r"></i>
        <small>(100)</small>
        <a-tooltip placement="top" title="Badge Level">
          <a href="" class="badge_list_1"><img src="img/badges/badge_1.svg" width="15" height="15" alt="" @click.stop.prevent=""></a>
        </a-tooltip>
      </span>

      <div class="statistic">
        <square-skeleton :count="1" :boxProperties="{ width: '95px', height: '24px' }"></square-skeleton>
        <square-skeleton :count="1" :boxProperties="{ width: '95px', height: '24px', bottom: '25px' }"></square-skeleton>
      </div>

      <ul class="contacts">
        <li>
          <square-skeleton :count="1" :boxProperties="{ width: '95px', height: '16px', bottom: '4px' }"></square-skeleton>
          <square-skeleton :count="1" :boxProperties="{ width: '185px', height: '16px', bottom: '4px' }"></square-skeleton>
        </li>
        <li>
          <square-skeleton :count="1" :boxProperties="{ width: '95px', height: '16px', bottom: '4px' }"></square-skeleton>
          <square-skeleton :count="1" :boxProperties="{ width: '185px', height: '16px', bottom: '4px' }"></square-skeleton>
        </li>
      </ul>

      <div class="button-maps">
        <square-skeleton :count="1" :boxProperties="{ width: '153px', height: '37px' }"></square-skeleton>
      </div>
    </div>
  </skeleton-loading>
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
<style lang="scss">
  .loading {
    &.box_profile {
      .square {
        border-radius: 0;
      }
      > small {
        display: flex;
        flex-direction: row;
        justify-content: center;
        .square-list {
          width: auto;
        }
      }

      > h1 {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .square-list {
          width: auto;
        }
      }

      > .statistic {
        display: flex;
        gap: 4px;
        flex-direction: row;
        justify-content: center;
        .square-list {
          width: auto;
        }
      }

      .button-maps {
        display: flex;
        flex-direction: row;
        justify-content: center;
        .square-list {
          width: auto;
        }
        .square {
          border-radius: 25px;
        }
      }
    }
  }
</style>