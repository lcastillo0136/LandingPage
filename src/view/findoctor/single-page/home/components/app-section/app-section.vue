<template>
  <div id="app_section">
    <div class="container">
      <div class="row justify-content-around">
        <div class="col-md-5">
          <p><img src="img/app_img.svg" alt="" class="img-fluid" width="500" height="433"></p>
        </div>
        <div class="col-md-6">
          <small>{{ $t('home_page.app_section.application') }}</small>
          <h3 class="text-nowrap">{{ $t('home_page.app_section.download_app') }}&nbsp;<strong>{{ $t('home_page.app_section.app_name', { name: appName }) }}</strong>&nbsp;{{ $t('home_page.app_section.download_now') }}</h3>
          <p class="lead">{{ $t('home_page.app_section.app_description') }}</p>
          <u-animate-container>
            <u-animate
              name="fadeIn"
              delay="0s"
              duration="1s"
              :iteration="1"
              :offset="100"
              animateClass="animated"
              :begin="false" 
              @end="changeAnimationEnd"
               :class="animationEnded"
            >
              <div class="app_buttons">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 43.1 85.9" style="enable-background:new 0 0 43.1 85.9;" xml:space="preserve">
                  <path stroke-linecap="round" stroke-linejoin="round" class="st0 draw-arrow" d="M11.3,2.5c-5.8,5-8.7,12.7-9,20.3s2,15.1,5.3,22c6.7,14,18,25.8,31.7,33.1" />
                  <path stroke-linecap="round" stroke-linejoin="round" class="draw-arrow tail-1" d="M40.6,78.1C39,71.3,37.2,64.6,35.2,58" />
                  <path stroke-linecap="round" stroke-linejoin="round" class="draw-arrow tail-2" d="M39.8,78.5c-7.2,1.7-14.3,3.3-21.5,4.9" />
                </svg>
                <a href="itms-apps://itunes.apple.com/app/apple-store/id375380948?mt=8" class="fadeIn" style="margin-right: 4px;"><img src="img/apple_app.png" alt="" width="150" height="50" data-retina="true"></a>
                <a href="market://details?id=package_name" class="fadeIn"><img src="img/google_play_app.png" alt="" width="150" height="50" data-retina="true"></a>
              </div>
            </u-animate>
          </u-animate-container>
        </div>
      </div>
      <!-- /row -->
    </div>
    <!-- /container -->
  </div>
  <!-- /app_section -->
</template>
<script>
  import config from '@/config' 
  export default {
    name: 'AppSection',
    data () {
      return {
        animationMobileEnded: false
      }
    },
    computed: {
      animationEnded () {
        return {
          'fadeIn animated': this.animationMobileEnded
        }
      },
      appName () {
        return config.title
      }
    },
    methods: {
      changeAnimationEnd () {
        this.animationMobileEnded = true;
      }
    }
  }
</script>