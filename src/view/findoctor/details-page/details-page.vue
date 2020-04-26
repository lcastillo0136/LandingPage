<template>
  <main>
    <BreadCrumb :routes="breadcrumb"></BreadCrumb>

    <div class="container margin_60">
      <div class="row">
        <aside class="col-xl-3 col-lg-4" id="sidebar">
          <AsideProfile :doctor="doctor"></AsideProfile>
        </aside>
        <!-- /asdide -->
        
        <div class="col-xl-9 col-lg-8">
          
          <div class="box_general_2 add_bottom_45">
            <div class="main_title_4">
              <h3><i class="icon_circle-slelected"></i>Select your date and time</h3>
            </div>
            
            <BookingCalendar class="add_bottom_45" @onSelectDate="onSelectDate($event)" @onSelectTime="onSelectTime($event)"></BookingCalendar>
            
            <div class="main_title_4">
              <h3><i class="icon_circle-slelected"></i>Select visit - treatment</h3>
            </div>

            <ServiceChoosen @onSelectService="onSelectService($event)"></ServiceChoosen>
            
            <hr>
            <div class="text-center">
              <a href="#" class="btn_1 medium" @click.stop.prevent="proceedBooking">Book Now</a>
            </div>
          </div>
          <!-- /box_general -->
          
          <div class="tabs_styled_2">
            <a-tabs>
              <a-tab-pane tab="General Info" key="1">
                <p class="lead add_bottom_30">Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
                <div class="indent_title_in">
                  <i class="pe-7s-user"></i>
                  <h3>Professional statement</h3>
                  <p>Mussum ipsum cacilds, vidis litro abertis.</p>
                </div>
                <div class="wrapper_indent">
                  <p>Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Nullam mollis. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapi.</p>
                  <h6>Specializations</h6>
                  <div class="row">
                    <div class="col-lg-6">
                      <ul class="bullets">
                        <li>Abdominal Radiology</li>
                        <li>Addiction Psychiatry</li>
                        <li>Adolescent Medicine</li>
                        <li>Cardiothoracic Radiology </li>
                      </ul>
                    </div>
                    <div class="col-lg-6">
                      <ul class="bullets">
                        <li>Abdominal Radiology</li>
                        <li>Addiction Psychiatry</li>
                        <li>Adolescent Medicine</li>
                        <li>Cardiothoracic Radiology </li>
                      </ul>
                    </div>
                  </div>
                  <!-- /row-->
                </div>
                <!-- /wrapper indent -->
                
                <hr>
                
                <div class="indent_title_in">
                  <i class="pe-7s-news-paper"></i>
                  <h3>Education</h3>
                  <p>Mussum ipsum cacilds, vidis litro abertis.</p>
                </div>
                <div class="wrapper_indent">
                  <p>Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Nullam mollis. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapi.</p>
                  <h6>Curriculum</h6>
                  <ul class="list_edu">
                    <li><strong>New York Medical College</strong> - Doctor of Medicine</li>
                    <li><strong>Montefiore Medical Center</strong> - Residency in Internal Medicine</li>
                    <li><strong>New York Medical College</strong> - Master Internal Medicine</li>
                  </ul>
                </div>
                <!--  End wrapper indent -->
                
                <hr>

                <div class="indent_title_in">
                  <i class="pe-7s-cash"></i>
                  <h3>Prices &amp; Payments</h3>
                  <p>Mussum ipsum cacilds, vidis litro abertis.</p>
                </div>
                <div class="wrapper_indent">
                  <p>Zril causae ancillae sit ea. Dicam veritus mediocritatem sea ex, nec id agam eius. Te pri facete latine salutandi, scripta mediocrem et sed, cum ne mundi vulputate. Ne his sint graeco detraxit, posse exerci volutpat has in.</p>
                  <div class="table-responsive">
                    <table class="table  table-striped">
                      <thead>
                        <tr>
                          <th>Service - Visit</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>New patient visit</td>
                          <td>$34</td>
                        </tr>
                        <tr>
                          <td>General consultation</td>
                          <td>$60</td>
                        </tr>
                        <tr>
                          <td>Back Pain</td>
                          <td>$40</td>
                        </tr>
                        <tr>
                          <td>Diabetes Consultation</td>
                          <td>$55</td>
                        </tr>
                        <tr>
                          <td>Eating disorder</td>
                          <td>$60</td>
                        </tr>
                        <tr>
                          <td>Foot Pain</td>
                          <td>$35</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <!--  End wrapper_indent -->
              </a-tab-pane>
              <a-tab-pane tab="Reviews" key="2">
                <div class="reviews-container">
                  <div class="row">
                    <div class="col-lg-3">
                      <div id="review_summary">
                        <strong>{{ avgRating }}</strong>
                        <div class="rating">
                          <i class="icon_star" :class="{'voted': avgRating >= star}" v-for="(star, star_i) in totalRatings" :key="star_i"></i>
                        </div>
                        <small>Based on {{ reviews.length }} reviews</small>
                      </div>
                    </div>
                    <div class="col-lg-9">
                      <div class="row" v-for="(ratings, ratings_i) in totalRatingsReverse" :key="ratings_i">
                        <div class="col-lg-10 col-9">
                          <div class="progress">
                            <div class="progress-bar" role="progressbar" :style="{ width: percentStart(ratings) + '%'}" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                        <div class="col-lg-2 col-3"><small><strong>{{ ratings }} stars</strong></small></div>
                      </div>
                      <!-- /row -->
                    </div>
                  </div>
                  <!-- /row -->
                  
                  <hr>
                  <div class="review-box clearfix" v-for="(review,review_i) in reviews" :key="review_i">
                    <figure class="rev-thumb"><img :src="review.img" alt="">
                    </figure>
                    <div class="rev-content">
                      <div class="rating">
                        <i class="icon_star" :class="{'voted': review.rating >= star}" v-for="(star, star_i) in totalRatings"></i>
                      </div>
                      <div class="rev-info">
                        {{ review.name }} – {{ review.date }}:
                      </div>
                      <div class="rev-text">
                        <p>
                          {{ review.comment }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <!-- End review-box -->
                </div>
                <!-- End review-container -->
              </a-tab-pane>
            </a-tabs>

          </div>
          <!-- /tabs_styled -->
        </div>
        <!-- /col -->
      </div>
      <!-- /row -->
    </div>
    <!-- /container -->
  </main>
</template>
<script>
  import BreadCrumb from '@/components/breadcrumb'
  import AsideProfile from './components/aside'
  import BookingCalendar from './components/booking-calendar'
  import ServiceChoosen from './components/service-choosen'

  export default {
    name: 'DetailsPage',
    components: {
      BreadCrumb,
      AsideProfile,
      BookingCalendar,
      ServiceChoosen
    },
    data () {
      return {
        breadcrumb: [
          { route: { name: 'home' }, text: 'Home' }, 
          { route: { name:'category' }, text: 'Category' }, 
          { text: 'Page active' }
        ],
        doctor: {
          speciality: 'PRIMARY CARE - INTERNIST',
          name: 'DR. Julia Jhones',
          description: 'Id placerat tacimates definitionem sea, prima quidam vim no. Duo nobis persecuti cuodo....',
          address: '859 60th, Brooklyn, NY, 11220',
          phone_number: '+00043 4323342',
          rating: {
            rate: 3,
            comments: 145,
            views: 854,
            patients: 124
          },
          img: 'img/doctor_listing_1.jpg',
          isVisible: false,
        },
        reviews: [{
          rating: 4,
          img: 'img/avatar1.jpg',
          name: 'Admin',
          date: '03/04/2016',
          comment: 'Sed eget turpis a pede tempor malesuada. Vivamus quis mi at leo pulvinar hendrerit. Cum sociis natoque penatibus et magnis dis'
        }, {
          rating: 5,
          img: 'img/avatar2.jpg',
          name: 'Ahsan',
          date: '01/04/2016',
          comment: 'Sed eget turpis a pede tempor malesuada. Vivamus quis mi at leo pulvinar hendrerit. Cum sociis natoque penatibus et magnis dis'
        }, {
          rating: 3,
          img: 'img/avatar3.jpg',
          name: 'Sara',
          date: '31/03/2016',
          comment: 'Sed eget turpis a pede tempor malesuada. Vivamus quis mi at leo pulvinar hendrerit. Cum sociis natoque penatibus et magnis dis'
        },  {
          rating: 5,
          img: 'img/avatar3.jpg',
          name: 'Sara',
          date: '31/03/2016',
          comment: 'Sed eget turpis a pede tempor malesuada. Vivamus quis mi at leo pulvinar hendrerit. Cum sociis natoque penatibus et magnis dis'
        }, {
          rating: 5,
          img: 'img/avatar3.jpg',
          name: 'Sara',
          date: '25/03/2016',
          comment: 'Sed eget turpis a pede tempor malesuada. Vivamus quis mi at leo pulvinar hendrerit. Cum sociis natoque penatibus et magnis dis'
        },],
        booking: {
          date: '',
          time: '',
          service: ''
        }
      }
    },
    computed: {
      totalRatings () {
        return new Array(5).fill(true).map((e, i) => i + 1)
      },
      totalRatingsReverse () {
        return new Array(5).fill(true).map((e, i) => i + 1).sort((a, b) => b - a)
      },
      avgRating () {
        return this.reviews.map(m => m.rating).reduce((a,b) => a + b, 0) / this.reviews.length
      }
    },
    methods: {
      onSelectDate (value) {
        this.booking.date = value
      },
      onSelectTime (value) {
        this.booking.time = value
      },
      onSelectService (value) {
        this.booking.service = value
      },
      proceedBooking () {
        if (this.booking.date && this.booking.time) {
          this.$router.push({
            name: 'booking-page', 
            params: {
              booking: this.booking,
              dr: this.doctor
            }
          })
        } else {
          this.$swal('Missing Information','','error') 
        }
      },
      countStars (query) {
        return this.reviews.filter(f => f.rating === query).length
      },
      percentStart (star) {
        return (this.countStars(star) * 100) / this.reviews.length
      }
    },
    mounted() {
      window['$']('#sidebar').theiaStickySidebar({
        additionalMarginTop: 95
      });
    },
    beforeDestroy () {
    }
  }
</script>
<style>
  .ant-tabs-bar{
    border-bottom: 1px solid #e1e8ed;
    margin:0;
  }
  .ant-tabs-nav .ant-tabs-tab {
    border: 1px solid transparent;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    font-size: 16px;
    font-size: 1rem;
    padding: .75rem 1.5rem;
    margin-right: 5px;
    color: #e74e84;
  }
  .ant-tabs-nav .ant-tabs-tab:hover {
    color: #333
  }
  .ant-tabs-nav .ant-tabs-tab-active {
    color: #333;
    background-color: #fff;
    border-color: #e1e8ed;
    border-bottom: 1px solid transparent;
  }
  .ant-tabs .ant-tabs-top-content > .ant-tabs-tabpane, .ant-tabs .ant-tabs-bottom-content > .ant-tabs-tabpane {
    width: 100%;
    background-color: #fff;
    padding: 30px 30px 20px;
    border: 1px solid #e1e8ed;
    border-top: none;
  }
  .ant-tabs-ink-bar {
    visibility: hidden;
  }
</style>