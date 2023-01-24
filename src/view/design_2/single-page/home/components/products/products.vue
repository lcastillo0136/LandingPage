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
        </div>
      </div>
      <div class="u-expanded-width-md u-expanded-width-sm u-expanded-width-xs u-list u-list-1">
        <div class="u-repeater u-repeater-1">
          <div class="u-container-style u-list-item u-repeater-item" v-for="product of products" :key="product.id">
            <div class="u-container-layout u-similar-container u-valign-middle-lg u-valign-middle-md u-valign-middle-sm u-valign-middle-xl u-container-layout-2" @click="$router.push({ name: 'products', params: { name: product.url } })" itemscope itemtype="https://schema.org/SoftwareApplication">
              <template v-if="product.images && product.images.length > 0">
                <img alt="" class="u-expanded-width u-image u-image-contain u-image-default u-image-1" data-image-width="300" data-image-height="90" :src="product.images[0].preview">
                <meta itemprop="screenshot" :content="product.images[0].preview" />
                <meta itemprop="thumbnailUrl" :content="product.images[0].preview" />
                <meta itemprop="image" :content="product.images[0].preview" />
              </template>
              <img alt="" class="u-expanded-width u-image u-image-contain u-image-default u-image-1" data-image-width="300" data-image-height="90" src="../../images/logo-zibasoft.png" v-else>
              <meta itemprop="name" :content="product.name" />
              <meta itemprop="applicationCategory" content="BrowserApplication"/>
              <meta itemprop="operatingSystem" content="web" />
              <meta itemprop="keywords" :content="(product.tags)" />
              <meta itemprop="url" :content="origin + '/product/' + product.url" />
              <span itemprop="offers" itemscope itemtype="https://schema.org/Offer">
                <meta itemprop="price" :content="product.precio_venta" />
                <meta itemprop="priceCurrency" content="MXN" />
              </span>
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
    computed :{
      origin() {
        return window.location.origin
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