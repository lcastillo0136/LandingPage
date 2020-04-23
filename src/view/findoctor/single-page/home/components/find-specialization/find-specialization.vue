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
            <img :src="spec.icon" width="60" height="60" alt="">
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
  export default {
    name: 'Specialization',
    data () {
      return {
        specializations: [{
          text: 'Primary Care',
          count: {
            doctors: 124,
            clinics: 60
          },
          icon: 'img/icon_cat_1.svg'
        }, {
          text: 'Cardiology',
          count: {
            doctors: 124,
            clinics: 60
          },
          icon: 'img/icon_cat_2.svg'
        }, {
          text: 'MRI Resonance',
          count: {
            doctors: 124,
            clinics: 60
          },
          icon: 'img/icon_cat_3.svg'
        }, {
          text: 'Blood test',
          count: {
            doctors: 124,
            clinics: 60
          },
          icon: 'img/icon_cat_4.svg'
        }, {
          text: 'Laboratory',
          count: {
            doctors: 124,
            clinics: 60
          },
          icon: 'img/icon_cat_7.svg'
        }, {
          text: 'Dentistry',
          count: {
            doctors: 124,
            clinics: 60
          },
          icon: 'img/icon_cat_5.svg'
        }, {
          text: 'X - Ray',
          count: {
            doctors: 124,
            clinics: 60
          },
          icon: 'img/icon_cat_6.svg'
        }, {
          text: 'Piscologist',
          count: {
            doctors: 124,
            clinics: 60
          },
          icon: 'img/icon_cat_8.svg'
        }]
      }
    }
  }
</script>