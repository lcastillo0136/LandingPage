<template>
  <section class="u-align-center u-clearfix u-palette-1-light-3 u-valign-middle u-section-4" id="carousel_2df3">
    <h2 class="u-text u-text-default u-text-1">Nuestros servicios</h2>
    <p class="u-text u-text-default-lg u-text-default-xl u-text-2">
      Contamos con un equipo de desarrolladores altamente capacitados y experimentados que se dedican a brindar a nuestros clientes los mejores resultados posibles. Contáctenos hoy para aprender más sobre nuestros servicios.
    </p>
    <div class="u-expanded-width u-palette-3-base u-shape u-shape-rectangle u-shape-1"></div>
    <div class="u-list u-list-1">
      <div class="u-repeater u-repeater-1">
        <div class="u-align-center u-container-style u-list-item u-radius-10 u-repeater-item u-shape-round u-white u-list-item-1" v-for="service of services" :key="service.id">
          <div class="u-container-layout u-similar-container u-valign-bottom u-container-layout-1">
            <template v-if="service.images && service.images.length > 0">
              
            <img alt="" class="u-expanded-width u-image u-image-contain u-image-default u-image-1" data-image-width="700" data-image-height="500" :src="service.images[0].preview">
            </template>
            <img alt="" class="u-expanded-width u-image u-image-contain u-image-default u-image-1" data-image-width="700" data-image-height="500" src="../../images/11.png" v-else>
            <h4 class="u-text u-text-default u-text-palette-1-base u-text-3">
              {{ service.name }}
            </h4>
            <p class="u-text" v-html="service.short_description"></p>
            <router-link :to="{ name: 'services', params: { name: service.url } }" class="u-active-palette-1-light-2 u-btn u-btn-round u-button-style u-hover-palette-1-light-2 u-palette-3-base u-radius-6 u-text-active-palette-1-base u-text-body-alt-color u-text-hover-palette-1-base u-btn-1">Saber mas</router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
  import { getServices } from '@/api/data'

  export default {
    name: 'Services',
    data() {
      return {
        services: []
      }
    },
    methods: {
      sanitizeTitle: function(text) {
        var slug = "";
        // Change to lower case
        var titleLower = text.toLowerCase();
        // Letter "e"
        slug = titleLower.replace(/e|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ/gi, 'e');
        // Letter "a"
        slug = slug.replace(/a|á|à|ã|ả|ạ|ă|ắ|ằ|ẵ|ẳ|ặ|â|ấ|ầ|ẫ|ẩ|ậ/gi, 'a');
        // Letter "o"
        slug = slug.replace(/o|ó|ò|õ|ỏ|ọ|ô|ố|ồ|ỗ|ổ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/gi, 'o');
        // Letter "u"
        slug = slug.replace(/u|ú|ù|ũ|ủ|ụ|ư|ứ|ừ|ữ|ử|ự/gi, 'u');
        // Letter "d"
        slug = slug.replace(/đ/gi, 'd');
        // Trim the last whitespace
        slug = slug.replace(/\s*$/g, '');
        // Change whitespace to "-"
        slug = slug.replace(/\s+/g, '-');
        
        return slug;
      }
    },
    mounted() {
      getServices().then(r => r.data).then(response => {
        if (response) {
          this.services = response.data.map(s => Object({
            ...s
          }))
        }
      })
    }
  }
</script>
<style lang="scss">
  .u-text {
    p:not(.u-text-variant) {
      margin: 0;
      > *:after {
        display: none;
      }
    }
  }
</style>