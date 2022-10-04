<template>
  <section class="u-align-center u-clearfix u-palette-1-base u-section-5" id="sec-dc96">
    <div class="u-clearfix u-sheet u-valign-middle-md u-valign-middle-sm u-valign-middle-xs u-sheet-1">
      <div class="u-align-left u-container-style u-expanded-width-md u-expanded-width-sm u-expanded-width-xs u-group u-group-1">
        <div class="u-container-layout u-valign-middle u-container-layout-1">
          <h2 class="u-text u-text-1">Nuestros productos </h2>
          <p class="u-text u-text-2">
            Nuestros productos están diseñados para aumentar la productividad, mejorar las relaciones con los clientes y agilizar las operaciones. <br>
            ¡Contáctenos hoy para obtener más información sobre nuestros productos y cómo podemos ayudar a su negocio! 
          </p>
          <a href="https://nicepage.com/c/education-website-mockup" class="u-active-palette-1-light-3 u-btn u-btn-round u-button-style u-hover-palette-1-light-3 u-radius-6 u-text-active-palette-1-base u-text-hover-palette-1-base u-text-palette-1-base u-white u-btn-2">Saber mas</a>
        </div>
      </div>
      <div class="u-expanded-width-md u-expanded-width-sm u-expanded-width-xs u-list u-list-1">
        <div class="u-repeater u-repeater-1">
          <div class="u-container-style u-list-item u-repeater-item">
            <div class="u-container-layout u-similar-container u-valign-middle-lg u-valign-middle-md u-valign-middle-sm u-valign-middle-xl u-container-layout-2">
              <img alt="" class="u-expanded-width u-image u-image-contain u-image-default u-image-1" data-image-width="300" data-image-height="90" src="../../images/logo-zibot.svg">
            </div>
          </div>
          <div class="u-container-style u-list-item u-repeater-item">
            <div class="u-container-layout u-similar-container u-valign-middle-lg u-valign-middle-md u-valign-middle-sm u-valign-middle-xl u-container-layout-3">
              <img alt="" class="u-expanded-width u-image u-image-contain u-image-default u-image-2" data-image-width="300" data-image-height="90" src="../../images/logo-zibastore.svg">
            </div>
          </div>
          <div class="u-container-style u-list-item u-repeater-item">
            <div class="u-container-layout u-similar-container u-valign-middle-lg u-valign-middle-md u-valign-middle-sm u-valign-middle-xl u-container-layout-4">
              <img alt="" class="u-expanded-width u-image u-image-contain u-image-default u-image-3" data-image-width="300" data-image-height="63" src="../../images/logo-onlycards.png">
            </div>
          </div>
          <div class="u-container-style u-list-item u-repeater-item">
            <div class="u-container-layout u-similar-container u-valign-middle-lg u-valign-middle-md u-valign-middle-sm u-valign-middle-xl u-container-layout-4">
              <img alt="" class="u-expanded-width u-image u-image-contain u-image-default u-image-3" data-image-width="300" data-image-height="63" src="../../images/logo-zibasoft.png">
            </div>
          </div>
          <div class="u-container-style u-list-item u-repeater-item">
            <div class="u-container-layout u-similar-container u-valign-middle-lg u-valign-middle-md u-valign-middle-sm u-valign-middle-xl u-container-layout-13">
              <img alt="" class="u-expanded-width u-image u-image-contain u-image-default u-image-12" data-image-width="300" data-image-height="61" src="../../images/t.svg">
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
  import { getProducts } from '@/api/data'

  export default {
    name: 'Products',
    data() {
      return {
        products: []
      }
    },
    mounted() {
      getProducts().then(r => r.data).then(response => {
        if (response) {
          this.products = response.data
        }
      })
    }
  }
</script>