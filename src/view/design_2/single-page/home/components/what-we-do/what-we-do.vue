<template>
    <section class="u-align-center u-clearfix u-palette-1-base u-section-7" id="sec-d5cf">
      <div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
        <h2 class="u-text u-text-default u-text-1">Lo que hacemos</h2>
        <p class="u-text u-text-default u-text-2">Ofrecemos una amplia gama de productos y servicios de software a empresas de todos los tamaños.</p>
        <img class="u-image u-image-contain u-image-default u-image-1" src="//images01.nicepage.com/c461c07a441a5d220e8feb1a/71a8b66119c650fbbf7baf03/-min.png" alt="" data-image-width="1245" data-image-height="707">
        <div class="u-expanded-width u-list u-list-1">
          <div class="u-repeater u-repeater-1">
            <div class="u-align-left u-border-12 u-border-palette-3-light-2 u-container-style u-custom-item u-list-item u-radius-24 u-repeater-item u-shape-round u-video-cover u-white u-list-item-1" v-for="product of products" :key="product.id">
              <div class="u-container-layout u-similar-container u-container-layout-1">
                <h4 class="u-text u-text-default u-text-palette-3-base u-text-3"> {{ product.name }}</h4>
                <p class="u-text u-text-4" v-html="product.short_description"></p>
                <router-link :to="{ name: 'products', params: { name: product.url } }" class="u-active-none u-border-2 u-border-active-palette-3-base u-border-hover-palette-3-base u-border-palette-3-base u-btn u-btn-rectangle u-button-style u-hover-none u-none u-text-active-palette-3-base u-text-body-color u-text-hover-palette-3-base u-btn-1">Saber mas</router-link>
              </div>
            </div>
            <!-- <div class="u-align-left u-border-12 u-border-palette-3-base u-container-style u-custom-item u-list-item u-radius-24 u-repeater-item u-shape-round u-white u-list-item-2">
              <div class="u-container-layout u-similar-container u-container-layout-2">
                <h4 class="u-text u-text-default u-text-palette-3-base u-text-5"> Tiendas en linea</h4>
                <p class="u-text u-text-6">Con amplia gama de herramientas te ayudamos a colocar tu tienda en linea.</p>
                <a href="https://nicepage.com/k/clothing-store-website-templates" class="u-active-none u-border-2 u-border-active-palette-3-base u-border-hover-palette-3-base u-border-palette-3-base u-btn u-btn-rectangle u-button-style u-hover-none u-none u-text-active-palette-3-base u-text-body-color u-text-hover-palette-3-base u-btn-2">saber mas</a>
              </div>
            </div>
            <div class="u-align-left u-border-12 u-border-palette-3-light-2 u-container-style u-custom-item u-list-item u-radius-23 u-repeater-item u-shape-round u-video-cover u-white u-list-item-3">
              <div class="u-container-layout u-similar-container u-container-layout-3">
                <h4 class="u-text u-text-default u-text-palette-3-base u-text-7"> ZibaSoft Delivery</h4>
                <p class="u-text u-text-8">Sistema desarrollado para la administracion de restaruantes y repartidores</p>
                <a href="https://nicepage.com/k/clothing-store-website-templates" class="u-active-none u-border-2 u-border-active-palette-3-base u-border-hover-palette-3-base u-border-palette-3-base u-btn u-btn-rectangle u-button-style u-hover-none u-none u-text-active-palette-3-base u-text-body-color u-text-hover-palette-3-base u-btn-3">saber mas</a>
              </div>
            </div>
            <div class="u-align-left u-border-12 u-border-palette-3-base u-container-style u-custom-item u-list-item u-radius-24 u-repeater-item u-shape-round u-video-cover u-white u-list-item-4">
              <div class="u-container-layout u-similar-container u-container-layout-4">
                <h4 class="u-text u-text-default u-text-palette-3-base u-text-9">Desarollo de páginas</h4>
                <p class="u-text u-text-10">Desarrollo y diseño de sitios web a la medida</p>
                <a href="https://nicepage.com/k/clothing-store-website-templates" class="u-active-none u-border-2 u-border-active-palette-3-base u-border-hover-palette-3-base u-border-palette-3-base u-btn u-btn-rectangle u-button-style u-hover-none u-none u-text-active-palette-3-base u-text-body-color u-text-hover-palette-3-base u-btn-4">saber mas</a>
              </div>
            </div> -->
          </div>
        </div>
        </p>
      </div>
    </section>
</template>
<script>
  import { getProducts } from '@/api/data'
  export default {
    name: 'WhatWeDo',
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
<style lang="scss">
  .u-section-7 {
    padding: 0 16px;
  }
</style>