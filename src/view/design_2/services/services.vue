<template>
  <section class="u-clearfix u-section-2" id="sec-ca41">
    <div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
      <div class="u-clearfix u-expanded-width u-layout-wrap u-layout-wrap-1">
        <div class="u-gutter-0 u-layout">
          <div class="u-layout-col">
            <div class="u-size-30">
              <div class="u-layout-row">
                <div class="u-container-style u-layout-cell u-size-30 u-layout-cell-1">
                  <div class="u-container-layout u-valign-middle u-container-layout-1">
                    <h5 class="u-custom-font u-font-montserrat u-text u-text-1"> We design digital products, services, and eCommerce experiences for brands like Google, Airbnb, Patagonia. </h5>
                    <p class="u-text u-text-body-color u-text-default u-text-2">Image from <a href="https://www.freepik.com" class="u-border-1 u-border-active-grey-50 u-border-hover-grey-50 u-border-no-left u-border-no-right u-border-no-top u-border-palette-3-base u-bottom-left-radius-0 u-bottom-right-radius-0 u-btn u-button-link u-button-style u-none u-radius-0 u-text-body-color u-top-left-radius-0 u-top-right-radius-0 u-btn-1" target="_blank">Freepik</a>
                    </p>
                  </div>
                </div>
                <div class="u-align-center u-container-style u-layout-cell u-size-30 u-layout-cell-2">
                  <div class="u-container-layout u-valign-middle u-container-layout-2">
                    <img class="u-image u-image-contain u-image-default u-image-1" data-image-width="858" data-image-height="915" src="//images01.nicepage.com/c461c07a441a5d220e8feb1a/03d476f2ea1c5faba7f69d00/vbb-min.png">
                  </div>
                </div>
              </div>
            </div>
            <div class="u-size-30">
              <div class="u-layout-row">
                <div class="u-align-left u-container-style u-layout-cell u-size-30-lg u-size-30-xl u-size-35-md u-size-35-sm u-size-35-xs u-layout-cell-3">
                  <div class="u-container-layout u-container-layout-3">
                    <ul class="u-align-left u-custom-list u-file-icon u-text u-text-3">
                      <li style="padding-left: 10px;">
                        <div class="u-list-icon u-text-palette-3-base">
                          <img src="//images01.nicepage.com/c461c07a441a5d220e8feb1a/b63d4b2dba9b57fa93834835/1828743.png" alt="">
                        </div> Lorem ipsum dolor sit amet, consectetur 
                      </li>
                      <li style="padding-left: 10px;">
                        <div class="u-list-icon u-text-palette-3-base">
                          <img src="//images01.nicepage.com/c461c07a441a5d220e8feb1a/b63d4b2dba9b57fa93834835/1828743.png" alt="">
                        </div> Elit, sed do eiusmod tempor incididunt 
                      </li>
                      <li style="padding-left: 10px;">
                        <div class="u-list-icon u-text-palette-3-base">
                          <img src="//images01.nicepage.com/c461c07a441a5d220e8feb1a/b63d4b2dba9b57fa93834835/1828743.png" alt="">
                        </div> Ut enim ad minim veniam, quis nostrud 
                      </li>
                      <li style="padding-left: 10px;">
                        <div class="u-list-icon u-text-palette-3-base">
                          <img src="//images01.nicepage.com/c461c07a441a5d220e8feb1a/b63d4b2dba9b57fa93834835/1828743.png" alt="">
                        </div> Nisi ut aliquip ex ea commodo consequat 
                      </li>
                      <li style="padding-left: 10px;">
                        <div class="u-list-icon u-text-palette-3-base">
                          <img src="//images01.nicepage.com/c461c07a441a5d220e8feb1a/b63d4b2dba9b57fa93834835/1828743.png" alt="">
                        </div> Reprehenderit in voluptate velit esse&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; 
                      </li>
                      <li style="padding-left: 10px;">
                        <div class="u-list-icon u-text-palette-3-base">
                          <img src="//images01.nicepage.com/c461c07a441a5d220e8feb1a/b63d4b2dba9b57fa93834835/1828743.png" alt="">
                        </div> Excepteur sint occaecat cupidatat non 
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="u-container-style u-layout-cell u-shape-rectangle u-size-25-md u-size-25-sm u-size-25-xs u-size-30-lg u-size-30-xl u-layout-cell-4">
                  <div class="u-container-layout u-valign-middle u-container-layout-4">
                    <p class="u-text u-text-grey-40 u-text-4"> Article evident arrived express highest men did boy. Mistress sensible entirely am so. Quick can manor smart money hopes worth too. Comfort produce husband boy her had hearing.<br>
                      <br>
                      <span style="font-weight: 700;" class="u-text-black">Oh feel if up to till like.&nbsp;He an thing rapid these after going drawn or. Timed she his law the spoil round defer. In surprise concerns informed betrayed he learning is ye.</span>
                    </p>
                    <div class="u-gradient u-shape u-shape-circle u-shape-1" data-animation-name="customAnimationIn" data-animation-duration="1500" data-animation-delay="250"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
  import { getServiceItem } from '@/api/data'

  export default {
    name: 'Services',
    data() {
      return {
        service: {}
      }
    },
    mounted() {
      getServiceItem(this.$route.params.name).then(r => r.data).then(response => {
        if (response) {
          this.service = response.data
        }
      })
    }
  }
</script>
<style lang="scss">
  
</style>