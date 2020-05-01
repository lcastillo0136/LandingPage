<template>
    <div class="container margin_120_95">
      <div class="main_title">
        <h2>Find by specialization</h2>
        <p>Nec graeci sadipscing disputationi ne, mea ea nonumes percipitur. Nonumy ponderum oporteat cu mel, pro movet cetero at.</p>
      </div>
      <div class="row">
        <div class="col-lg-3 col-md-6" v-for="(spec, spec_i) in specializations" :key="spec_i">
          <router-link :to="{ name: 'list-page', params: { layout: 'list', search: spec.text }}" class="box_cat_home">
            <i class="icon-info-4"></i>
            <img :src="getImage()" width="60" height="60" alt="">
            <h3>{{ spec.text }}</h3>
            <ul class="clearfix">
              <li><strong>{{ spec.count.doctors }}</strong>Doctors</li>
              <li><strong>{{ spec.count.clinics }}</strong>Clinics</li>
            </ul>
          </router-link>
        </div>
      </div>
      <!-- /row -->
    </div>
    <!-- /container -->
</template>
<script>
  import { getSpecialitiesList } from '@/api/data.js'
  export default {
    name: 'Specialization',
    data () {
      return {
        specializations: []
      }
    },
    methods: {
      getImage() {
        return `img/icon_cat_${Math.ceil(Math.random() * (5))}.svg`
      }
    },
    mounted () {
      getSpecialitiesList({
        limit: 8
      }).then((request) => {
        this.specializations = request.data.specialities.map(s => Object({ text: s.name, count: { doctors: s.value, clinics: 0 }}))
      })
    }
  }
</script>