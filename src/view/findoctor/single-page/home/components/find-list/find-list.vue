<template>  
  <div class="container margin_120_95">
    <div class="main_title">
      <h2>Find your doctor or clinic</h2>
      <p>Nec graeci sadipscing disputationi ne, mea ea nonumes percipitur. Nonumy ponderum oporteat cu mel, pro movet cetero at.</p>
    </div>
    <div class="row justify-content-center">
      <div class="col-xl-4 col-lg-5 col-md-6">
        <div class="list_home">
          <div class="list_title">
            <i class="icon_pin_alt"></i>
            <h3>Search by City or Zone</h3>
          </div>
          <ul>
            <li v-for="(zone, zone_i) in lists.zones" :key="zone_i"><router-link :to="{ name: 'list-page', params: { layout: 'map', search: zone.name }}"><strong>{{ zone.total }}</strong>{{ zone.name }}</router-link></li>
            <li><router-link :to="{ name: 'list-page', params: { layout: 'map' }}">More...</router-link></li>
          </ul>
        </div>
      </div>
      <div class="col-xl-4 col-lg-5 col-md-6">
        <div class="list_home">
          <div class="list_title">
            <i class="icon_archive_alt"></i>
            <h3>Search by type</h3>
          </div>
          <ul>
            <li v-for="(type, type_i) in lists.types" :key="type_i"><router-link :to="{ name: 'list-page', params: { layout: 'list', search: type.name }}"><strong>{{ type.total }}</strong>{{ type.name }}</router-link></li>
            <li><router-link :to="{ name: 'list-page', params: { layout: 'list' }}">More....</router-link></li>
          </ul>
        </div>
      </div>
    </div>
    <!-- /row -->
  </div>
  <!-- /container -->
</template>
<script>
  import { getSpecialitiesList, getCitiesList } from '@/api/data.js'
  export default {
    name: 'FindList',
    data () {
      return {
        lists: {
          zones: [],
          types: []
        }
      }
    },
    mounted () {
      getSpecialitiesList().then((request) => {
        this.lists.types = request.data.data.specialities.map(s => Object({ name: s.name, total: s.value }))
      })
      getCitiesList({
        limit: 9
      }).then((request) => {
        this.lists.zones = request.data.data.cities.map(c => Object({ name: c.name, total: c.value }))
      })
    }
  }
</script>