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
            <img alt="" class="u-expanded-width u-image u-image-contain u-image-default u-image-1" data-image-width="700" data-image-height="500" src="../../images/11.png">
            <h4 class="u-text u-text-default u-text-palette-1-base u-text-3">
              {{ service.name }}
            </h4>
            <p class="u-text u-text-4">
              {{ service.description }}
            </p>
            <router-link :to="{ name: 'services', params: { name: service.slug } }" class="u-active-palette-1-light-2 u-btn u-btn-round u-button-style u-hover-palette-1-light-2 u-palette-3-base u-radius-6 u-text-active-palette-1-base u-text-body-alt-color u-text-hover-palette-1-base u-btn-1">Saber mas</router-link>
          </div>
        </div>
        <!-- <div class="u-align-center u-container-style u-list-item u-radius-10 u-repeater-item u-shape-round u-white u-list-item-1">
          <div class="u-container-layout u-similar-container u-valign-bottom u-container-layout-1">
            <img alt="" class="u-expanded-width u-image u-image-contain u-image-default u-image-1" data-image-width="700" data-image-height="500" src="../../images/11.png">
            <h4 class="u-text u-text-default u-text-palette-1-base u-text-3">
              Desarrollo de sistemas
            </h4>
            <p class="u-text u-text-4">
              Nuestro equipo de desarrolladores experimentados puede crear software que satisfaga sus necesidades comerciales específicas.
            </p>
            <a href="https://nicepage.com/website-builder" class="u-active-palette-1-light-2 u-btn u-btn-round u-button-style u-hover-palette-1-light-2 u-palette-3-base u-radius-6 u-text-active-palette-1-base u-text-body-alt-color u-text-hover-palette-1-base u-btn-1">Saber mas</a>
          </div>
        </div>
        <div class="u-align-center u-container-style u-list-item u-radius-10 u-repeater-item u-shape-round u-white u-list-item-2">
          <div class="u-container-layout u-similar-container u-valign-bottom u-container-layout-2">
            <img alt="" class="u-expanded-width u-image u-image-contain u-image-default u-image-2" data-image-width="700" data-image-height="500" src="../../images/2.png">
            <h4 class="u-text u-text-default u-text-palette-1-base u-text-5">Creacion de páginas web</h4>
            <p class="u-text u-text-6">Nos especializamos en crear sitios web hermosos y receptivos que están optimizados para los motores de búsqueda y convierten a los visitantes en clientes.</p>
            <a href="https://nicepage.cc" class="u-active-palette-1-light-2 u-btn u-btn-round u-button-style u-hover-palette-1-light-2 u-palette-3-base u-radius-6 u-text-active-palette-1-base u-text-body-alt-color u-text-hover-palette-1-base u-btn-2">Saber mas</a>
          </div>
        </div>
        <div class="u-align-center u-container-style u-list-item u-radius-10 u-repeater-item u-shape-round u-white u-list-item-3">
          <div class="u-container-layout u-similar-container u-valign-bottom u-container-layout-3">
            <img alt="" class="u-expanded-width u-image u-image-contain u-image-default u-image-3" data-image-width="700" data-image-height="500" src="../../images/6c7decbc-d9d3-4316-5906-19d76e6c84f3.png">
            <h4 class="u-text u-text-default u-text-palette-1-base u-text-7">Aplicaciones móviles</h4>
            <p class="u-text u-text-8">Tenemos una amplia gama de aplicaciones para elegir, y nuestro equipo de expertos puede ayudarlo a seleccionar la perfecta para sus necesidades.</p>
            <a href="https://nicepage.com/html5-template" class="u-active-palette-1-light-2 u-btn u-btn-round u-button-style u-hover-palette-1-light-2 u-palette-3-base u-radius-6 u-text-active-palette-1-base u-text-body-alt-color u-text-hover-palette-1-base u-btn-3">Saber mas</a>
          </div>
        </div> -->
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
            ...s,
            slug: this.sanitizeTitle(s.name) + '-' + s.id
          }))
        }
      })
    }
  }
</script>