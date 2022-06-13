<template>
  <main v-if="event">
    <!-- start wpo-page-title -->
    <section class="wpo-page-title" :style="{ 'background-image': firstBanner }">
      <div class="container">
        <div class="row">
          <div class="col col-xs-12">
            <div class="wpo-breadcumb-wrap">
              <h2>Galeria</h2>
              <ol class="wpo-breadcumb-wrap">
                <li><router-link to="/">Inicio</router-link></li>
                <li>Galeria</li>
              </ol>
            </div>
          </div>
        </div> <!-- end row -->
      </div> <!-- end container -->
    </section>
    <!-- end page-title -->
    <!-- start wpo-portfolio-section -->
    <section class="wpo-portfolio-section-s3 tb-padding section-padding">
      <div class="container">
        <div class="row">
          <div class="wpo-section-title-s2">
            <div class="section-title-simg">
              <img src="/assets/images/section-title2.png" alt="">
            </div>
            <h2>Momentos increibles</h2>
            <div class="section-title-img">
              <div class="round-ball"></div>
            </div>
          </div>
        </div>
        <div class="sortable-gallery">
          <div class="row">
            <div class="col-lg-12">
              <div class="portfolio-grids gallery-container clearfix">
                <masonry-wall :items="album" :padding="16">
                  <template #default="{ item, index }">
                    <div class="grid">
                      <div class="img-holder">
                        <a :href="item.image" class="fancybox" data-fancybox-group="gall-1">
                          <img v-lazy="item.image" alt class="img img-responsive" >
                          <div class="hover-content">
                            <i class="ti-plus"></i>
                          </div>
                        </a>
                      </div>
                    </div>
                  </template>
                </masonry-wall>
              </div>
            </div>
          </div>
        </div>
      </div> <!-- end container -->
    </section>
    <!-- end wpo-portfolio-section -->
  </main>
</template>
<script>
  import { mapGetters } from 'vuex'

  import * as _ from 'lodash'

  export default {
    name: 'Gallery',
    computed: {
      ...mapGetters([
        'settings',
        'event'
      ]),
      firstBanner() {
        return `url('${_.first(_.values(this.event.banners)).image}')`
      },
      album() {
        return _.values(this.event.album)
      }
    },
  }
</script>
<style lang="scss">
  .wpo-page-title {
    background-position: top center;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .portfolio-grids {
    &::after {
      display: none;
    }
  }
  .wpo-portfolio-section-s3 .portfolio-grids .grid {
    
  }
  .masonry-wall, 
  .masonry-wall .masonry-column, 
  .masonry-wall .masonry-column .masonry-item, 
  .masonry-wall .masonry-column .masonry-item .grid,
  .masonry-wall .masonry-column .masonry-item .grid .img-holder,
  .router-link-active {
    &::after {
      display: none;
    }
  }
  .wpo-page-title .wpo-breadcumb-wrap ol li:after {
    content: "/" !important;
    position: relative;
    left: 7px;
  }
</style>