<template>
  <main v-if="event">
    <!-- start of hero -->
    <section class="wpo-hero-slider wpo-hero-slider-s2">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="slide in event.banners">
            <div class="slide-inner slide-bg-image" :data-background="slide.image">
              <!-- <div class="gradient-overlay"></div> -->
              <div class="container-fluid">
                <div class="slide-content">
                  <div data-swiper-parallax="300" class="slide-title">
                    <h2>{{ event.bride.first_name }} & {{ event.groom.first_name }}</h2>
                  </div>
                  <div data-swiper-parallax="400" class="slide-text">
                    <p>Nos casamos {{ event.event_date | moment('MMM DD,YYYY') }}</p>
                  </div>
                  <div class="border-1"></div>
                  <div class="border-2"></div>
                  <div class="border-3"></div>
                  <div class="border-4"></div>
                  <div class="s-img-1"><img src="assets/images/slider/shape3.png" alt=""></div>
                  <div class="s-img-2"><img src="assets/images/slider/shape4.png" alt=""></div>
                </div>
              </div>
            </div> <!-- end slide-inner -->
          </div> <!-- end swiper-slide -->
        </div>
        <!-- end swiper-wrapper -->

        <!-- swipper controls -->
        <div class="swiper-pagination"></div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
      </div>
    </section>
    <!-- end of wpo-hero-slide-section-->
    <!-- start wpo-wedding-date -->
    <section class="wpo-wedding-date section-padding">
      <h2 class="hidden">some</h2>
      <div class="container">
        <div class="row">
          <div class="col col-xs-12">
            <div class="clock-grids">
              <div id="clock"></div>
            </div>
          </div>
        </div>
      </div> <!-- end container -->
    </section>
    <!-- end wpo-wedding-date -->
    <!-- start couple-section -->
    <section class="couple-section section-padding" id="couple">
        <div class="container">
            <div class="row align-items-center">
                <div class="col col-xs-12">
                    <div class="couple-area clearfix">
                        <div class="text-grid bride">
                          <div class="couple-img">
                            <img :src="event.bride.avatar" alt="">
                          </div>
                          <h3>{{ event.bride.full_name }}</h3>
                          <p>{{ event.bride.biography }}</p>
                          <div class="social">
                            <ul>
                              <li v-if="event.bride_facebook"><a :href="event.bride_facebook" target="_blank"><i class="ti-facebook"></i></a></li>
                              <li v-if="event.bride_twitter"><a :href="event.bride_twitter" target="_blank"><i class="ti-twitter-alt"></i></a></li>
                              <li v-if="event.bride_instagram"><a :href="event.bride_instagram" target="_blank"><i class="ti-instagram"></i></a></li>
                              <li v-if="event.bride_whatsapp"><a :href="event.bride_whatsapp" target="_blank"><i class="fa fa-whatsapp"></i></a></li>
                            </ul>
                          </div>
                        </div>
                        <div class="middle-couple-pic">
                          <img :src="event.couple_image" alt="">
                          <div class="frame-img"><img src="assets/images/couple/shape.png" alt=""></div>
                        </div>
                        <div class="text-grid groom">
                          <div class="couple-img">
                            <img :src="event.groom.avatar" alt="">
                          </div>
                          <h3>{{ event.groom.full_name }}</h3>
                          <p>{{ event.groom.biography }}</p>
                          <div class="social">
                            <ul>
                              <li v-if="event.groom_facebook"><a :href="event.groom_facebook" target="_blank"><i class="ti-facebook"></i></a></li>
                              <li v-if="event.groom_twitter"><a :href="event.groom_twitter" target="_blank"><i class="ti-twitter-alt"></i></a></li>
                              <li v-if="event.groom_instagram"><a :href="event.groom_instagram" target="_blank"><i class="ti-instagram"></i></a></li>
                              <li v-if="event.groom_whatsapp"><a :href="event.groom_whatsapp" target="_blank"><i class="fa fa-whatsapp"></i></a></li>
                            </ul>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> <!-- end container -->
    </section>
    <!-- end couple-section -->

    <!-- start story-section -->
    <section class="story-section section-padding" id="story">
      <div class="container">
        <div class="row">
          <div class="wpo-section-title-s2">
            <div class="section-title-simg">
              <img src="assets/images/section-title2.png" alt="">
            </div>
            <h2>Nuestra historia de amor</h2>
            <div class="section-title-img">
              <div class="round-ball"></div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col col-xs-12">
            <div class="story-timeline">
              <div class="round-shape"></div>
              <div class="row" v-for="(history, history_i) in event.history" :key="history_i">
                <template v-if="(history_i % 2) == 0">
                  <div class="col col-lg-6 col-12" :class="{ 'text-holder right-heart': history_i > 0 }">
                    <span class="heart" v-if="history_i > 0 ">
                      <i class="md-icon">{{ history.icon }}</i>
                    </span>
                    <div class="story-text right-align-text">
                      <h3>{{ history.title }}</h3>
                      <span class="date">{{ history.date_time | moment('MMM DD,YYYY') }}</span>
                      <p v-if="history.description">{{ history.description }}</p>
                    </div>
                  </div>
                  <div class="col col-lg-6 col-12">
                    <div class="img-holder">
                      <div class="img-holder-container">
                        <img :src="history.image" alt class="img img-responsive" />
                      </div>
                      <div class="story-shape-img">
                        <img src="assets/images/story/shape.png" alt="">
                      </div>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div class="col col-lg-6 col-12">
                    <div class="img-holder right-align-text left-site">
                      <div class="img-holder-container">
                        <img :src="history.image" alt class="img img-responsive">
                      </div>
                      <div class="story-shape-img">
                        <img src="assets/images/story/shape.png" alt="">
                      </div>
                    </div>
                  </div>
                  <div class="col col-lg-6 col-12 text-holder">
                    <span class="heart">
                      <i class="md-icon">{{ history.icon }}</i>
                    </span>
                    <div class="story-text">
                      <h3>{{ history.title }}</h3>
                      <span class="date">{{ history.date_time | moment('MMM DD,YYYY') }}</span>
                      <p v-if="history.description">{{ history.description }}</p>
                    </div>
                  </div>
                </template>
              </div>
              <div class="row">
                <div class="col offset-lg-6 col-lg-6 col-12 text-holder">
                  <span class="heart">
                    <i class="fi flaticon-wedding-rings"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div> <!-- end row -->
      </div> <!-- end container -->
    </section>
    <!-- end story-section -->

    <!-- start wpo-portfolio-section -->
    <section class="wpo-portfolio-section-s2 section-padding" id="gallery">
      <div class="container-fluid">
        <div class="row">
          <div class="wpo-section-title-s2">
            <div class="section-title-simg">
              <img src="assets/images/section-title2.png" alt="">
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
                <!-- <div class="grid" v-for="picture in event.album">
                  <div class="img-holder">
                    <a :href="picture.image" class="fancybox" data-fancybox-group="gall-1">
                      <img v-lazy="picture.image" alt class="img img-responsive" >
                      <div class="hover-content">
                        <i class="ti-plus"></i>
                      </div>
                    </a>
                  </div>
                </div> -->
                <masonry-wall :items="galleryItems" :padding="16">
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

    <!-- start of wpo-contact-section -->
    <section class="wpo-contact-section section-padding" id="RSVP">
        <div class="container">
            <div class="wpo-contact-section-wrapper">
                <div class="wpo-contact-form-area">
                    <div class="wpo-section-title-s2">
                        <div class="section-title-simg">
                            <img src="assets/images/section-title2.png" alt="">
                        </div>
                        <h2>WILL YOU ATTEND?</h2>
                        <div class="section-title-img">
                            <div class="round-ball"></div>
                        </div>
                    </div>
                    <form method="post" class="contact-validation-active" id="contact-form-main">
                        <div>
                            <input type="text" class="form-control" name="name" id="name" placeholder="Name">
                        </div>
                        <div>
                            <input type="email" class="form-control" name="email" id="email"
                                placeholder="Email">
                        </div>
                        <div>
                            <input type="text" class="form-control" name="adress" id="adress"
                                placeholder="Adress">
                        </div>
                        <div>
                            <select name="service" class="form-control">
                                <option disabled="disabled" selected>Services</option>
                                <option>Photography</option>
                                <option>The Rehearsal Dinner</option>
                                <option>The Afterparty</option>
                                <option>Videographers</option>
                                <option>Perfect Cake</option>
                                <option>All Of The Above</option>
                            </select>
                        </div>
                        <div>
                            <select name="guest" class="form-control">
                                <option disabled="disabled" selected>Number Of Guests</option>
                                <option>01</option>
                                <option>02</option>
                                <option>03</option>
                                <option>04</option>
                                <option>05</option>
                            </select>
                        </div>
                        <div>
                            <select name="meal" class="form-control last">
                                <option disabled="disabled" selected>Meal Preferences</option>
                                <option>Chicken Soup</option>
                                <option>Motton Kabab</option>
                                <option>Chicken BBQ</option>
                                <option>Mix Salad</option>
                                <option>Beef Ribs </option>
                            </select>
                        </div>
                        <div class="submit-area">
                            <button type="submit" class="theme-btn-s3">Send An Inquiry</button>
                            <div id="c-loader">
                                <i class="ti-reload"></i>
                            </div>
                        </div>
                        <div class="clearfix error-handling-messages">
                            <div id="success">Thank you</div>
                            <div id="error"> Error occurred while sending email. Please try again later.
                            </div>
                        </div>
                    </form>
                    <div class="border-style"></div>
                </div>
                <div class="vector-1">
                    <img src="assets/images/contact/1.png" alt="">
                </div>
                <div class="vector-2">
                    <img src="assets/images/contact/2.png" alt="">
                </div>
            </div>
        </div>
    </section>
    <!-- end of wpo-contact-section -->


    <!-- start wpo-cta-section -->

    <div class="wpo-cta-section-s3">
        <div class="conatiner-fluid">
            <div class="wpo-cta-item">
                <h2>Adventure Begins</h2>
                <p>Nov 22,2021, Wedding Unity Center, road 525 USA</p>
                <a class="theme-btn-s2" href="contact.html">View Details</a>
            </div>
        </div>
    </div>

    <!-- end wpo-cta-section -->

    <!-- start wpo-event-section -->
    <section class="wpo-event-section section-padding" id="event">
        <div class="container">
            <div class="row">
                <div class="wpo-section-title-s2">
                    <div class="section-title-simg">
                        <img src="assets/images/section-title2.png" alt="">
                    </div>
                    <h2>TIME AND PLACE</h2>
                    <div class="section-title-img">
                        <div class="round-ball"></div>
                    </div>
                </div>
            </div>
            <div class="wpo-event-wrap">
                <div class="row">
                    <div class="col col-lg-4 col-md-6 col-12">
                        <div class="wpo-event-item">
                            <div class="wpo-event-text">
                                <h2>The Reception</h2>
                                <ul>
                                    <li>Monday, 25 Sep, 2021
                                        1:00 PM – 4:30 PM</li>
                                    <li>Estern Comunity Centure, 525 Road 123, USA</li>
                                    <li>Phone : +12345678910</li>

                                    <li> <a class="popup-gmaps" href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25211.21212385712!2d144.95275648773628!3d-37.82748510398018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce7e0!2zTWVsYm91cm5lIFZJQyAzMDA0LCDgpoXgprjgp43gpp_gp43gprDgp4fgprLgpr_gpq_gprzgpr4!5e0!3m2!1sbn!2sbd!4v1503742051881">See Location</a></li>
                                </ul>
                            </div>
                            <div class="event-shape-1">
                                <img src="assets/images/event-shape-1.png" alt="">
                            </div>
                            <div class="event-shape-2">
                                <img src="assets/images/event-shape-2.png" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="col col-lg-4 col-md-6 col-12">
                        <div class="wpo-event-item">
                            <div class="wpo-event-text">
                                <h2>THE CEREMONY</h2>
                                <ul>
                                    <li>Monday, 25 Sep, 2021
                                        1:00 PM – 4:30 PM</li>
                                    <li>Estern Comunity Centure, 525 Road 123, USA</li>
                                    <li>Phone : +12345678910</li>

                                    <li> <a class="popup-gmaps" href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25211.21212385712!2d144.95275648773628!3d-37.82748510398018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce7e0!2zTWVsYm91cm5lIFZJQyAzMDA0LCDgpoXgprjgp43gpp_gp43gprDgp4fgprLgpr_gpq_gprzgpr4!5e0!3m2!1sbn!2sbd!4v1503742051881">See Location</a></li>
                                </ul>
                            </div>
                            <div class="event-shape-1">
                                <img src="assets/images/event-shape-1.png" alt="">
                            </div>
                            <div class="event-shape-2">
                                <img src="assets/images/event-shape-2.png" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="col col-lg-4 col-md-6 col-12">
                        <div class="wpo-event-item">
                            <div class="wpo-event-text">
                                <h2>Wedding Party</h2>
                                <ul>
                                    <li>Monday, 25 Sep, 2021
                                        1:00 PM – 4:30 PM</li>
                                    <li>Estern Comunity Centure, 525 Road 123, USA</li>
                                    <li>Phone : +12345678910</li>

                                    <li> <a class="popup-gmaps" href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25211.21212385712!2d144.95275648773628!3d-37.82748510398018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce7e0!2zTWVsYm91cm5lIFZJQyAzMDA0LCDgpoXgprjgp43gpp_gp43gprDgp4fgprLgpr_gpq_gprzgpr4!5e0!3m2!1sbn!2sbd!4v1503742051881">See Location</a></li>
                                </ul>
                            </div>
                            <div class="event-shape-1">
                                <img src="assets/images/event-shape-1.png" alt="">
                            </div>
                            <div class="event-shape-2">
                                <img src="assets/images/event-shape-2.png" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div> <!-- end container -->
    </section>
    <!-- end wpo-event-section -->
    <!-- start wpo-partners-section -->
    <section class="wpo-partners-section-s3">
        <h2 class="hidden">Partners</h2>
        <div class="container">
            <div class="row">
                <div class="col col-xs-12">
                    <div class="partner-grids partners-slider owl-carousel">
                        <div class="grid">
                            <img src="assets/images/partners/1.png" alt>
                        </div>
                        <div class="grid">
                            <img src="assets/images/partners/2.png" alt>
                        </div>
                        <div class="grid">
                            <img src="assets/images/partners/3.png" alt>
                        </div>
                        <div class="grid">
                            <img src="assets/images/partners/4.png" alt>
                        </div>
                        <div class="grid">
                            <img src="assets/images/partners/5.png" alt>
                        </div>
                    </div>
                </div>
            </div>
        </div> <!-- end container -->
    </section>
    <!-- end wpo-partners-section-->

    <!-- start wpo-blog-section -->
    <section class="wpo-blog-section-s3 section-padding" id="blog">
        <div class="container">
            <div class="row">
                <div class="wpo-section-title-s2">
                    <div class="section-title-simg">
                        <img src="assets/images/section-title2.png" alt="">
                    </div>
                    <h2>From Our Blog</h2>
                    <div class="section-title-img">
                        <div class="round-ball"></div>
                    </div>
                </div>
            </div>
            <div class="wpo-blog-items">
                <div class="row">
                    <div class="col col-lg-4 col-md-6 col-12">
                        <div class="wpo-blog-item">
                            <div class="wpo-blog-img">
                                <img src="assets/images/blog/img-1.jpg" alt="">
                            </div>
                            <div class="wpo-blog-content">
                                <ul>
                                    <li>By <a href="blog-single.html">Loura Sweety</a></li>
                                    <li>25 Sep 2021</li>
                                </ul>
                                <h2><a href="blog.html">Best wedding gift you may
                                        like & choose.</a>
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div class="col col-lg-4 col-md-6 col-12">
                        <div class="wpo-blog-item">
                            <div class="wpo-blog-img">
                                <img src="assets/images/blog/img-2.jpg" alt="">
                            </div>
                            <div class="wpo-blog-content">
                                <ul>
                                    <li>By <a href="blog-single.html">David Luis</a></li>
                                    <li>23 Sep 2021</li>
                                </ul>
                                <h2><a href="blog.html">Photography is the important part of wedding.</a>
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div class="col col-lg-4 col-md-6 col-12">
                        <div class="wpo-blog-item">
                            <div class="wpo-blog-img">
                                <img src="assets/images/blog/img-3.jpg" alt="">
                            </div>
                            <div class="wpo-blog-content">
                                <ul>
                                    <li>By <a href="blog-single.html">Aliana de</a></li>
                                    <li>21 Sep 2021</li>
                                </ul>
                                <h2><a href="blog.html">Top 10 wedding fresh flower decoration idea.</a>
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div> <!-- end container -->
    </section>
    <!-- end wpo-blog-section -->
  </main>
  <!-- /main content -->
</template>

<script>
  import FindForm from './components/find-form'
  import Discover from './components/discover'
  import Carousel from './components/carousel'
  import FindList from './components/find-list'
  import AppSection from './components/app-section'

  import { mapGetters, mapMutations, mapActions } from 'vuex'

  import * as _ from 'lodash'

  export default {
    data() {
      return {
        gallery: []
      }
    },
    props: {
    },
    watch: {
      'stillLoading'(val) {
        if (val === false) {
          this.ready()
        }
      }
    },
    components: { 
      FindForm,
      Discover,
      Carousel,
      FindList,
      AppSection
    },
    computed: {
      ...mapGetters([
        'stillLoading',
        'settings',
        'event'
      ]),
      galleryItems() {
        return _.first(_.chunk(_.values(this.event.album), 10))
      }
    },
    methods: {
      ready() {
        this.gallery = [];

        // this.event && _.each(this.event.album, ((g, g1) => {
        //   setTimeout(() => {
        //     this.gallery.push({ ...g });
        //   }, g1 * 60 * 2 * 4)
        // }))

        this.$nextTick().then(() => {
          setTimeout(() => {
            jQuery(".fancybox").fancybox({
              openEffect  : "elastic",
              closeEffect : "elastic",
              wrapCSS     : "project-fancybox-title-style"
            });
          }, 2000)
        })

        var interleaveOffset = 0.5;
      
        var swiperOptions = {
            loop: true,
            speed: 1000,
            parallax: true,
            autoplay: {
                delay: 6500,
                disableOnInteraction: false,
            },
            watchSlidesProgress: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },

            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },

            on: {
                progress: function() {
                    var swiper = this;
                    for (var i = 0; i < swiper.slides.length; i++) {
                        var slideProgress = swiper.slides[i].progress;
                        var innerOffset = swiper.width * interleaveOffset;
                        var innerTranslate = slideProgress * innerOffset;
                        swiper.slides[i].querySelector(".slide-inner").style.transform =
                        "translate3d(" + innerTranslate + "px, 0, 0)";
                    }      
                },

                touchStart: function() {
                  var swiper = this;
                  for (var i = 0; i < swiper.slides.length; i++) {
                    swiper.slides[i].style.transition = "";
                  }
                },

                setTransition: function(speed) {
                    var swiper = this;
                    for (var i = 0; i < swiper.slides.length; i++) {
                        swiper.slides[i].style.transition = speed + "ms";
                        swiper.slides[i].querySelector(".slide-inner").style.transition =
                        speed + "ms";
                    }
                }
            }
        };

        var swiper = new Swiper(".swiper-container", swiperOptions);

        // DATA BACKGROUND IMAGE
        var sliderBgSetting = $(".slide-bg-image");
        sliderBgSetting.each(function(indx) {
          if ($(this).attr("data-background")) {
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
          }
        });

        if (jQuery("#clock").length) {
          jQuery('#clock').countdown(this.$moment(this.event.event_date).toDate(), function(event) {
            var $this = jQuery(this).html(event.strftime(''
            + '<div class="box"><div><div class="time">%m</div> <span>Meses</span> </div></div>'
            + '<div class="box"><div><div class="time">%D</div> <span>Dias</span> </div></div>'
            + '<div class="box"><div><div class="time">%H</div> <span>Horas</span> </div></div>'
            + '<div class="box"><div><div class="time">%M</div> <span>Minutos</span> </div></div>'
            + '<div class="box"><div><div class="time">%S</div> <span>Segundos</span> </div></div>'));
          });
        }

        loadjQueryPlugins(jQuery)
      }
    },
    mounted() {
      this.ready()
    }
  }
</script>
<style lang="scss">
  .slide-text {
    text-transform: capitalize;
  }
</style>