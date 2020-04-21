<template>
    <div class="bg_color_1">
      <div class="container margin_120_95">
        <div class="main_title">
          <h2>Most Viewed doctors</h2>
          <p>Usu habeo equidem sanctus no. Suas summo id sed, erat erant oporteat cu pri.</p>
        </div>
        <carousel id="reccomended" :nav="false" :center="true" :items="2" :loop="true" :margin="10" :responsive="{0: {items: 1},600: {items: 2},1000: {items: 4}}">
          <div class="item">
            <router-link to="details-page.html">
              <div class="views"><i class="icon-eye-7"></i>140</div>
              <div class="title">
                <h4>Dr. Julia Holmes<em>Pediatrician - Cardiologist</em></h4>
              </div><img src="img/doctor_1_carousel.jpg" alt="">
            </router-link>
          </div>
          <div class="item">
            <router-link to="details-page.html">
              <div class="views"><i class="icon-eye-7"></i>120</div>
              <div class="title">
                <h4>Dr. Julia Holmes<em>Pediatrician</em></h4>
              </div><img src="img/doctor_2_carousel.jpg" alt="">
            </router-link>
          </div>
          <div class="item">
            <router-link to="details-page.html">
              <div class="views"><i class="icon-eye-7"></i>115</div>
              <div class="title">
                <h4>Dr. Julia Holmes<em>Pediatrician</em></h4>
              </div><img src="img/doctor_3_carousel.jpg" alt="">
            </router-link>
          </div>
          <div class="item">
            <router-link to="details-page.html">
              <div class="views"><i class="icon-eye-7"></i>98</div>
              <div class="title">
                <h4>Dr. Julia Holmes<em>Pediatrician</em></h4>
              </div><img src="img/doctor_4_carousel.jpg" alt="">
            </router-link>
          </div>
          <div class="item">
            <router-link to="details-page.html">
              <div class="views"><i class="icon-eye-7"></i>98</div>
              <div class="title">
                <h4>Dr. Julia Holmes<em>Pediatrician</em></h4>
              </div><img src="img/doctor_5_carousel.jpg" alt="">
            </router-link>
          </div>
        </carousel>
        <!-- /carousel -->
      </div>
      <!-- /container -->
    </div>
    <!-- /white_bg -->
</template>
<script>
  import carousel from 'vue-owl-carousel'

  export default {
    name: 'Carousel',
    components: {
      carousel
    }
  }
</script>