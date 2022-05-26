<template>
  <!-- start of wpo-site-footer-section -->
  <footer class="wpo-site-footer">
      <div class="wpo-upper-footer">
          <div class="container-fluid">
              <div class="row">
                  <div class="col col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div class="widget about-widget">
                          <div class="logo widget-title">
                              <img src="assets/images/logo.png" alt="blog">
                          </div>
                          <p>Welcome and open yourself to your truest love this year with us! With the Release
                              Process</p>
                          <ul>
                              <li>
                                  <a href="#">
                                      <i class="ti-facebook"></i>
                                  </a>
                              </li>
                              <li>
                                  <a href="#">
                                      <i class="ti-twitter-alt"></i>
                                  </a>
                              </li>
                              <li>
                                  <a href="#">
                                      <i class="ti-instagram"></i>
                                  </a>
                              </li>
                              <li>
                                  <a href="#">
                                      <i class="ti-google"></i>
                                  </a>
                              </li>
                          </ul>
                      </div>
                  </div>
                  <div class="col col-xl-3  col-lg-4 col-md-6 col-sm-12 col-12">
                      <div class="widget link-widget">
                          <div class="widget-title">
                              <h3>Information</h3>
                          </div>
                          <ul>
                              <li><a href="about.html">About Us</a></li>
                              <li><a href="portfolio.html">Portfolio</a></li>
                              <li><a href="blog.html">Latest News</a></li>
                              <li><a href="contact.html">Contact us</a></li>
                              <li><a href="service.html">Our Services</a></li>
                          </ul>
                      </div>
                  </div>
                  <div class="col col-xl-3  col-lg-4 col-md-6 col-sm-12 col-12">
                      <div class="widget wpo-service-link-widget">
                          <div class="widget-title">
                              <h3>Contact </h3>
                          </div>
                          <div class="contact-ft">
                              <p>Would you have any enquiries.Please feel free to contuct us</p>
                              <ul>
                                  <li><i class="fi flaticon-email"></i>loveme@gmail.com</li>
                                  <li><i class="fi flaticon-phone-call"></i>+888 (123) 869523</li>
                                  <li><i class="fi flaticon-maps-and-flags"></i>New York – 1075 Firs Avenue
                                  </li>
                              </ul>
                          </div>
                      </div>
                  </div>

                  <div class="col col-xl-3  col-lg-4 col-md-6 col-sm-12 col-12">
                      <div class="widget instagram">
                          <div class="widget-title">
                              <h3>Instagram</h3>
                          </div>
                          <ul class="d-flex">
                              <li><a href="portfolio-single.html"><img src="assets/images/instragram/1.jpg"
                                          alt=""></a></li>
                              <li><a href="portfolio-single.html"><img src="assets/images/instragram/2.jpg"
                                          alt=""></a></li>
                              <li><a href="portfolio-single.html"><img src="assets/images/instragram/3.jpg"
                                          alt=""></a></li>
                              <li><a href="portfolio-single.html"><img src="assets/images/instragram/4.jpg"
                                          alt=""></a></li>
                              <li><a href="portfolio-single.html"><img src="assets/images/instragram/5.jpg"
                                          alt=""></a></li>
                              <li><a href="portfolio-single.html"><img src="assets/images/instragram/6.jpg"
                                          alt=""></a></li>
                          </ul>
                      </div>
                  </div>
              </div>
          </div> <!-- end container -->
      </div>
      <div class="wpo-lower-footer">
          <div class="container">
              <div class="row">
                  <div class="col col-xs-12">
                      <p class="copyright"> &copy; 2021 Loveme Template. Design By <a
                              href="index.html">wpOceans</a>. All Rights Reserved.</p>
                  </div>
              </div>
          </div>
      </div>
  </footer>
  <!-- end of wpo-site-footer-section -->
</template>
<script>
  import { getServerFile } from '@/libs/util'
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    name: 'Footer',
    computed: {
      ...mapGetters({
        container: 'container',
        settings: 'settings',
        types: 'filterTypes'
      }),
      containerClasses () {
        return {
          'container': this.container,
          'container-fluid': !this.container
        }
      },
      year () {
        return this.$moment().format('YYYY')
      },
      appName () {
        return this.settings?.COMPANY_NAME
      },
      appImage () {
        return getServerFile('public/company/company_logo.png')
      }
    },
    methods: {
      newHash (page) {
        var hash = 0, i, chr 
        for (i = 0; i < page.length; i++) {
          chr   = page.charCodeAt(i)
          hash  = ((hash << 5) - hash) + chr
          hash |= 0 
        }
        return '#' + hash
      }
    }
  }
</script>