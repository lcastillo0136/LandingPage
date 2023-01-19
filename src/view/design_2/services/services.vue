<template>
  <main class="u-body u-service-page u-xl-mode" data-lang="en">
    <header-component></header-component>
    <section class="u-clearfix u-section-2" id="sec-ca41" v-if="service">
      <div class="u-clearfix u-sheet u-sheet-1">
        <div class="u-clearfix u-expanded-width u-layout-wrap u-layout-wrap-1">
          <div class="u-gutter-0 u-layout">
            <div class="u-layout-col">
              <div class="u-size-30">
                <div class="u-layout-row">
                  <div class="u-container-style u-layout-cell u-layout-cell-1">
                    <div class="u-container-layout u-valign-middle u-container-layout-1">
                      <h5 class="u-custom-font u-font-montserrat u-text u-text-1">
                        {{ service.name }} 
                      </h5>
                      <small class="u-short-descrpition" v-html="service.short_description"></small>
                    </div>
                  </div>
                  <div class="u-align-center u-container-style u-layout-cell u-size-60 u-layout-cell-2" v-if="service.images && service.images.length > 0">
                    <div class="u-container-layout u-valign-middle u-container-layout-2">
                      <a-carousel arrows :autoplay="true">
                        <div slot="prevArrow" slot-scope="props" class="custom-slick-arrow" style="left: 10px;zIndex: 1">
                          <a-icon type="left" />
                        </div>
                        <div slot="nextArrow" slot-scope="props" class="custom-slick-arrow" style="right: 10px">
                          <a-icon type="right" />
                        </div>
                        <img class="u-image u-image-contain u-image-default u-image-1" data-image-width="858" data-image-height="915" :src="_img.preview" v-for="_img of service.images" :key="_img.id" />
                      </a-carousel>
                    </div>
                  </div>
                </div>
              </div>
              <div class="u-size-30">
                <div class="u-layout-row">
                  <div class="u-align-left u-container-style u-layout-cell u-size-30-lg u-size-30-xl u-size-35-md u-size-35-sm u-size-35-xs u-layout-cell-3" v-if="service.requirements && service.requirements.length > 0">
                    <div class="u-container-layout u-container-layout-3">
                      <ul class="u-align-left u-custom-list u-file-icon u-text u-text-3">
                        <li style="padding-left: 10px;" v-for="requirement of service.requirements" :key="requirement.id">
                          <div class="u-list-icon u-text-palette-3-base">
                            <img src="//images01.nicepage.com/c461c07a441a5d220e8feb1a/b63d4b2dba9b57fa93834835/1828743.png" alt="">
                          </div> {{ requirement.name }}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="u-container-style u-layout-cell u-shape-rectangle u-size-60 u-layout-cell-4">
                    <div class="u-container-layout u-valign-middle u-container-layout-4">
                      <p class="u-text u-text-grey-40 u-text-4 u-descrpition" v-html="service.description"></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <footerComponent></footerComponent>
  </main>
</template>
<script>
  import { mapGetters, mapMutations } from 'vuex'
  import { getServiceItem } from '@/api/data'

  import HeaderComponent from '../single-page/home/components/header'
  import footerComponent from '../single-page/home/components/footer'

  export default {
    name: 'Services',
    components: {
      HeaderComponent,
      footerComponent
    },
    data() {
      return {
        service: {}
      }
    },
    computed: {
      ...mapGetters([
        'settings',
        'hasToken',
        'getUser'
      ]),
      currentSettings() {
        return this.settings || {}
      }
    },
    methods: {
      ...mapMutations([
        'setHeaderVisible',
        'setFooterVisible'
      ]),
    },
    mounted() {
      this.setHeaderVisible(false)
      this.setFooterVisible(false)

      getServiceItem(this.$route.params.name).then(r => r.data).then(response => {
        if (response) {
          this.service = response.data
          document.title = `${this.currentSettings.COMPANY_NAME}-${this.service.name}`

          // this.$ga.page({
          //   page: window.location.pathname,
          //   title: `${this.currentSettings.COMPANY_NAME}-${this.service.name}`,
          //   location: window.location.href
          // })

          gtag('page', window.location.pathname)
          gtag('title', `${this.currentSettings.COMPANY_NAME}-${this.service.name}`)
          gtag('location', window.location.href)
          gtag('pageTitle', `${this.currentSettings.COMPANY_NAME}-${this.service.name}`)

          // this.$ga.ecommerce.addItem({
          //   id: this.service.id,
          //   name: `${this.currentSettings.COMPANY_NAME}-${this.service.name}`,
          //   sku: this.service.sku,
          //   category: this.service.category && this.service.category.name,
          //   price: this.service.precio_venta,
          //   quantity: '1'
          // })
        }
      }).catch((error) => {
        this.$notification.error({
          message: 'Servicio no encontrado',
          description: 'Favor de intentar mas tarde.'
        })
        this.$router.back()
      })
    }
  }
</script>
<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i|Cambay:400,400i,700,700i');
  @import url('https://fonts.googleapis.com/css?family=Advent+Pro:100,200,300,400,500,600,700|Cambay:400,400i,700,700i');

  @import "../single-page/home/nicepage.css";
  @import "../single-page/home/style.1.css";

  @font-face {
    font-family: 'Comfortaa Bold Alt1';
    src: url('../single-page/home/fonts/Comfortaa-Bold-Alt1.woff2') format('woff2'),
        url('../single-page/home/fonts/Comfortaa-Bold-Alt1.woff') format('woff'),
        url('../single-page/home/fonts/Comfortaa-Bold-Alt1.ttf') format('truetype');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
  }

  body.landing {
    height: 100%;
    #page {
      height: 100%;
      > div {
        height: 100%;
        main {
          height: 100%;
        }
      }
    }
  }

  .u-service-page {
    display: flex;
    flex-direction: column;
    .u-short-descrpition p {
      margin: 0;
    }
    .u-section-2 {
      box-shadow: inset 10px 3px 5px 4px #ededed;
    }
    .u-header, .u-footer {
      flex: 0 0 auto;
    }
    .u-section-2 {
      flex: 1 1 auto;
    }
    .u-section-2 .u-sheet-1 {
      
    }
    .u-section-2 .u-layout-wrap-1 {
      margin-bottom: 58px;
    }
    .u-section-2 .u-layout-cell-1 {
      
    }
    .u-section-2 .u-container-layout-1 {
      padding: 30px;
    }
    .u-section-2 .u-text-1 {
      line-height: 1.8;
      font-weight: 800;
      font-size: 1.875rem;
      margin: 0;
    }
    .u-section-2 .u-text-2 {
      font-size: 1rem;
      letter-spacing: 0px;
      font-style: italic;
      text-align: left;
      margin: 27px auto 0 0;
    }
    .u-section-2 .u-btn-1 {
      border-style: none none solid;
      font-style: italic;
      padding: 0;
    }
    .u-section-2 .u-layout-cell-2 {
      
    }
    .u-section-2 .u-container-layout-2 {
      padding: 30px;
    }
    .u-section-2 .u-image-1 {
      width: 431px;
      height: 431px;
      margin: 0 auto;
      object-position: 50%;
    }
    .u-section-2 .u-layout-cell-3 {
      
    }
    .u-section-2 .u-container-layout-3 {
      padding: 20px 30px;
    }
    .u-section-2 .u-text-3 {
      line-height: 2.5;
      font-size: 1.125rem;
      margin: 0;
    }
    .u-section-2 .u-layout-cell-4 {
      
    }
    .u-section-2 .u-container-layout-4 {
      padding: 21px 30px;
    }
    .u-section-2 .u-text-4 {
      font-size: 1rem;
      margin: 0;
    }
    .u-section-2 .u-shape-1 {
      width: 115px;
      height: 115px;
      background-image: linear-gradient(#d3b1f4, #5ce0ed);
      --animation-custom_in-translate_x: -300px;
      --animation-custom_in-translate_y: 0px;
      margin: 40px 0 0 auto;
    }
    @media (max-width: 1199px) {
      .u-section-2 .u-sheet-1 {
        
      }
      .u-section-2 .u-layout-cell-1 {
        
      }
      .u-section-2 .u-layout-cell-2 {
        
      }
      .u-section-2 .u-image-1 {
        width: 410px;
        height: 410px;
        background-position: 50% 50%;
      }
      .u-section-2 .u-layout-cell-3 {
        
      }
      .u-section-2 .u-layout-cell-4 {
        
      }
      .u-section-2 .u-shape-1 {
        --animation-custom_in-opacity: 0;
        --animation-custom_in-rotate: 0deg;
        --animation-custom_in-scale: 1;
      }
    }
    @media (max-width: 991px) {
      .u-section-2 .u-sheet-1 {
        
      }
      .u-section-2 .u-layout-cell-1 {
        
      }
      .u-section-2 .u-text-1 {
        font-size: 1.5rem;
      }
      .u-section-2 .u-layout-cell-2 {
        
      }
      .u-section-2 .u-image-1 {
        width: 300px;
        height: 300px;
      }
      .u-section-2 .u-layout-cell-3 {
        
      }
      .u-section-2 .u-text-3 {
        font-size: 1rem;
      }
      .u-section-2 .u-layout-cell-4 {
        
      }
    }
    @media (max-width: 767px) {
      .u-section-2 .u-sheet-1 {
        
      }
      .u-section-2 .u-container-layout-1 {
        padding-left: 10px;
        padding-right: 10px;
      }
      .u-section-2 .u-layout-cell-2 {
       
      }
      .u-section-2 .u-container-layout-2 {
        padding-left: 10px;
        padding-right: 10px;
      }
      .u-section-2 .u-image-1 {
        width: 404px;
        height: 404px;
      }
      .u-section-2 .u-container-layout-3 {
        padding-left: 10px;
        padding-right: 10px;
      }
      .u-section-2 .u-container-layout-4 {
        padding-left: 10px;
        padding-right: 10px;
      }
    }
    @media (max-width: 575px) {
      .u-section-2 .u-sheet-1 {
        
      }
      .u-section-2 .u-layout-cell-2 {
        
      }
      .u-section-2 .u-image-1 {
        width: 320px;
        height: 320px;
      }
    }

    /* For demo */
    .ant-carousel >>> .slick-slide {
      overflow: hidden;
    }
    .ant-carousel .slick-slide {
      background: #fafafa;
      border-radius: 10px;
    }

    .ant-carousel >>> .slick-slide h3 {
      
    }
    .custom-slick-arrow {
      width: 30px;
      height: 30px;
      font-size: 30px;
      color: #999;
      &:hover {
        color: #8db9f8;
      }
    }
    .custom-slick-arrow:before {
      display: none;
    }
    .custom-slick-arrow:hover {
      
    }
    .u-descrpition {
      > p, ol {
        margin: 0;
      }
      li {
        list-style: circle;
      }
      h1, h2, h3, h4, h5, h6 {
        margin-bottom: 0;
      }
    }
  }
</style>