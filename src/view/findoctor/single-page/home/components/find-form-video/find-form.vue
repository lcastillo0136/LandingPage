<template>
  <div class="header-video" :style="videoStyles">
    <div id="hero_video">
      <div class="content">
        <h3 :class="classOnload">Find a Doctor!</h3>
        <p :class="classOnload">
          Ridiculus sociosqu cursus neque cursus curae ante scelerisque vehicula.
        </p>
        <form method="post" action="http://www.ansonika.com/findoctor/list.html" :class="classOnload">
          <div id="custom-search-input">
            <div class="input-group">
              <input type="text" class=" search-query" placeholder="Ex. Name, Specialization ....">
              <input type="submit" class="btn_search" value="Search">
            </div>
            <ul>
              <li>
                <input type="radio" id="all" name="radio_search" value="all" checked>
                <label for="all">All</label>
              </li>
              <li>
                <input type="radio" id="doctor" name="radio_search" value="doctor">
                <label for="doctor">Doctor</label>
              </li>
              <li>
                <input type="radio" id="clinic" name="radio_search" value="clinic">
                <label for="clinic">Clinic</label>
              </li>
            </ul>
          </div>
        </form>
      </div>
    </div>
    <img src="img/video_fix.png" alt="" class="header-video--media" data-video-src="video/intro" data-teaser-source="video/intro" data-provider="" data-video-width="1920" data-video-height="750" style="display: none;">
    <video autoplay="true" loop="loop" muted="" id="teaser-video" class="teaser-video"><source src="video/intro.mp4" type="video/mp4"><source src="video/intro.ogv" type="video/ogg"></video>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'FindForm',
    data () {
      return {
        aspectRatio: 0,
        windowWidth: 0, 
        windowHeight: 0
      }
    },
    computed: {
      classOnload () {
        return {
          'fadeInUp animated': !this.stillLoading
        }
      },
      videoStyles () {
        if (!this.stillLoading) {
          if (this.winHeight < (this.windowWidth * this.aspectRatio)) {
            return {
              width: this.windowWidth + 'px',
              height: this.windowHeight + 'px'
            }
          } else {
            return {
              width: this.windowWidth + 'px',
              height: (this.windowWidth * this.aspectRatio) + 'px'
            } 
          }
        } else {
          return {}
        }
      },
      ...mapGetters([
        'stillLoading'
      ])
    },
    mounted () {
      this.aspectRatio = 750 / 1920
      this.windowWidth = window.document.body.offsetWidth
      this.windowHeight = window.innerHeight

      window.addEventListener('resize', () => {
        this.windowWidth = window.document.body.offsetWidth
        this.windowHeight = window.innerHeight
      })
    }
  }
</script>