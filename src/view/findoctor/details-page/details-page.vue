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
              <h3><i class="icon_circle-slelected"></i>Elije tu consulta</h3>
            </div>

            <ServiceChoosen :multiple="doctor.multiple_available" :services="doctor.services" @onSelectService="onSelectService"></ServiceChoosen>
            
            <div class="main_title_4 fadeIn animated" v-if="hasServices">
              <h3><i class="icon_circle-slelected"></i>Elije tu horario</h3>
            </div>
            
            <BookingCalendar 
              class="add_bottom_45 fadeIn animated" 
              :multiple="false"
              :startDate="startDate"
              :disabledDays="disabledDays"
              :disabledDates="disabledDates"
              :availableDates="bookingDates"
              :availableTimes="availableTimes"
              :loading="loadingBook"
              @onSelectDate="onSelectDate($event)" 
              @onSelectTime="onSelectTime($event)"
              @onSelectMonth="onSelectMonth($event)"
              v-if="hasServices">
            </BookingCalendar>
            
            <hr v-if="hasServices && hasDate && hasTime">
            <div class="text-center" v-if="hasServices && hasDate && hasTime">
              <a href="#" class="btn_1 medium" @click.stop.prevent="proceedBooking">Agendar ya</a>
            </div>
          </div>
          <!-- /box_general -->
          
          <div class="tabs_styled_2">
            <a-tabs>
              <a-tab-pane tab="Informacion General" key="1">
                <template v-if="!loading">
                  <p class="lead add_bottom_30" v-if="doctor.short_description" v-html="doctor.short_description"></p>
                  <div class="indent_title_in" v-if="skills.length > 0 || doctor.description">
                    <i class="pe-7s-user"></i>
                    <h3>Biografia</h3>
                    <p v-if="doctor.quote">{{ doctor.quote }}.</p>
                  </div>
                  <div class="wrapper_indent" v-if="skills.length > 0 || doctor.description">
                    <p v-html="doctor.description"></p>
                    <h6 v-if="skills.length > 0">Especializaciones</h6>
                    <div class="row">
                      <div class="col-lg-6" v-for="(skills_grp, skills_grp_i) in skills" :key="skills_grp_i">
                        <ul class="bullets">
                          <li v-for="(skill, skill_i) in skills_grp" :key="skill_i">{{ skill.name }}</li>
                        </ul>
                      </div>
                    </div>
                    <!-- /row-->
                  </div>
                  <!-- /wrapper indent -->
                  <!-- 
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
                  </div> -->
                  <!--  End wrapper indent -->
                  
                  <hr v-if="skills.length > 0 || doctor.description">

                  <div class="indent_title_in">
                    <i class="pe-7s-cash"></i>
                    <h3>Precios &amp; Servicios</h3>
                    <p>Servicios disponibles y precios.</p>
                  </div>
                  <div class="wrapper_indent">
                    <p></p>
                    <div class="table-responsive">
                      <table class="table  table-striped">
                        <thead>
                          <tr>
                            <th>Servicio</th>
                            <th>Precio</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(service, service_i) in serviciosActivos" :key="service_i">
                            <td>{{ service.name }}</td>
                            <td>{{ service.price | currency }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <!--  End wrapper_indent -->
                </template>
                <skeleton-loading v-else class="biography">
                  <p class="lead add_bottom_30">
                    <square-skeleton :count="3" :boxProperties="{ height: '23px', bottom: '3px' }"></square-skeleton>
                  </p>
                  <div class="indent_title_in">
                    <i class="pe-7s-user"></i>
                    <h3>Biografia</h3>
                    <p><square-skeleton :count="1" :boxProperties="{ height: '16px' }"></square-skeleton></p>

                  </div>
                  <div class="wrapper_indent">
                    <p><square-skeleton :count="3" :boxProperties="{ height: '23px', bottom: '3px' }"></square-skeleton></p>
                    <h6>Especializaciones</h6>
                    <div class="row">
                      <div class="col-lg-6" v-for="(skills_grp, skills_grp_i) in 5" :key="skills_grp_i">
                        <ul class="bullets">
                          <li v-for="(skill, skill_i) in 1" :key="skill_i">
                            <square-skeleton :count="1" :boxProperties="{ height: '23px', bottom: '3px' }"></square-skeleton>
                          </li>
                        </ul>
                      </div>
                      <!-- <div class="col-lg-6">
                        <ul class="bullets">
                          <li>Abdominal Radiology</li>
                          <li>Addiction Psychiatry</li>
                          <li>Adolescent Medicine</li>
                          <li>Cardiothoracic Radiology </li>
                        </ul>
                      </div> -->
                    </div>
                    <!-- /row-->
                  </div>

                  <hr>


                  <div class="indent_title_in">
                    <i class="pe-7s-cash"></i>
                    <h3>Precios &amp; Servicios</h3>
                    <p>Servicios disponibles y precios.</p>
                  </div>
                  <div class="wrapper_indent">
                    <p></p>
                    <div class="table-responsive">
                      <table class="table">
                        <thead>
                          <tr>
                            <th>Servicio</th>
                            <th>Precio</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(service, service_i) in 5" :key="service_i">
                            <td>
                              <square-skeleton :count="1" :boxProperties="{ width: '240px', height: '23px', bottom: '3px' }"></square-skeleton>
                            </td>
                            <td>
                              <square-skeleton :count="1" :boxProperties="{ width: '40px', height: '23px', bottom: '3px' }"></square-skeleton>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </skeleton-loading>
              </a-tab-pane>
              <a-tab-pane tab="Reseñas" key="2">
                <div class="reviews-container">
                  <div class="row">
                    <div class="col-lg-3">
                      <div id="review_summary">
                        <strong>{{ commentsRating }}</strong>
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
                  
                  <hr v-if="avgRating > 0">
                  <div class="review-box clearfix" v-for="(review,review_i) in reviews" :key="review_i">
                    <figure class="rev-thumb"><img :src="review.img" alt="">
                    </figure>
                    <div class="rev-content">
                      <div class="rating">
                        <i class="icon_star" :class="{'voted': review.rating >= star}" v-for="(star, star_i) in totalRatings"></i>
                      </div>
                      <div class="rev-info">
                        {{ review.name }} – {{ review.date | moment('MMMM DD, YYYY') }}
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
  import { mapGetters, mapMutations, mapActions } from 'vuex'

  import { getDoctorInfo, getDoctorBooking } from '@/api/data'
  import _ from 'lodash';

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
        breadcrumb: () => [
          { route: { name: 'home' }, text: 'Inicio' }, 
          { route: { name: 'list-page' }, text: 'Listado' }, 
          { text: this.doctor.name }
        ],
        doctor: {
          especialidad: '',
          name: '',
          description: '',
          address: '',
          phone_number: '',
          rating: {
            rate: 0,
            comments: [],
            views: 0,
            patients: 0
          },
          img: '',
          isVisible: false,
          services: [],
          map: {
            latitude: 0,
            longitude: 0,
            address: ``
          },
          skills: []
        },
        startDate: new Date(),
        disabledDays: [0],
        availableDates: [],
        availableTimes: [],
        disabledDates: [ ],
        booking: {
          date: '',
          time: '',
          service: []
        },
        viewDate: '',
        loading: false,
        loadingBook: false
      }
    },
    computed: {
      ...mapGetters([
        'hasToken'
      ]),
      totalRatings () {
        return new Array(5).fill(true).map((e, i) => i + 1)
      },
      totalRatingsReverse () {
        return new Array(5).fill(true).map((e, i) => i + 1).sort((a, b) => b - a)
      },
      avgRating () {
        if (this.reviews.length == 0) return 0
        return this.reviews.map(m => m.rating).reduce((a,b) => a + b, 0) / this.reviews.length
      },
      commentsRating() {
        return this.avgRating.toFixed(1)
      },
      hasServices () {
        return (this.booking.service||[]).length > 0
      },
      hasDate () {
        return (this.booking.date||'').trim() != ""
      },
      hasTime () {
        return typeof this.booking.time == 'string' ? (this.booking.time||"").trim() != "" : (this.booking.time||[]).length > 0
      },
      bookingDates () {
        return this.availableDates.filter(f => f.times.filter(t => t.available).filter(t => this.$moment(`${f.date} ${t.time}`, 'YYYY-MM-DD hh:mm a').isAfter()).length > 0).map( d => d.date)
      },
      reviews() {
        return this.doctor.rating.comments.map(c => Object({
          rating: c.rate,
          img: c.patient.img,
          name: c.patient.name,
          date: c.date,
          comment: c.comment
        }))
      },
      servicesIDS () {
        return this.booking.service.map(s => s.id)
      },
      serviciosActivos() {
        return (this.doctor.services || []).filter( f => f.active)
      },
      skills() {
        return _.chunk(this.doctor.skills, 2)
      }
    },
    methods: {
      onSelectDate (value) {
        this.booking.date = value
        this.getDoctorBooking(this.$route.params.id, this.booking.date).then(() => {
          this.availableTimes = this.availableDates.find(d => d.date === value).times
        })
      },
      onSelectTime (value) {
        this.booking.time = value
      },
      onSelectService (value) {
        this.booking.service = value
        if (this.booking.date) {
          this.onSelectDate(this.booking.date)
        } else {
          this.getDoctorBooking(this.$route.params.id, this.booking.date || this.viewDate || this.$moment().format('YYYY-MM-DD'))
        }
      },
      onSelectMonth (value) {
        this.viewDate = value.start
        this.getDoctorBooking(this.$route.params.id, value.start)
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
      },
      getDoctorInfo (id) {
        return getDoctorInfo({id}).then((response) => response.data)
          .then((response) => {
            const doctor = response.data
            if (doctor) {
              this.doctor.especialidad = doctor.especialidad
              this.doctor.name = `${doctor.title} ${doctor.first_name}`
              this.doctor.description = doctor.biography
              this.doctor.address = `${doctor.address.street} ${doctor.address.suburb}, ${doctor.address.city}`
              this.doctor.phone_number = doctor.phone
              this.doctor.rating.rate = doctor.rate
              this.doctor.rating.comments = doctor.comments || []
              this.doctor.rating.views = doctor.viewed
              this.doctor.rating.patients = (doctor.clients||[]).length
              this.doctor.img = doctor.avatar
              this.doctor.isVisible = false
              this.doctor.services = (doctor.treatments||[]).map(t => Object({...t.treatment, selected: false}))
              this.doctor.quote = doctor.quote
              this.doctor.map.latitude = doctor.address.latitude
              this.doctor.map.longitude = doctor.address.longitude
              this.doctor.map.address = `${doctor.address.street} ${doctor.address.suburb}, ${doctor.address.city}`
              this.doctor.services = doctor.services
              this.doctor.skills = doctor.skills
              this.doctor.multiple_available = !!doctor.multiple_services 
              this.doctor.id = doctor.id;
              
              return this.doctor
            } else {
              this.$router.back()
            }
          })
      },
      getDoctorBooking(id, start) {
        this.loadingBook = !!this.booking.date
        return getDoctorBooking({
          id , 
          start,
          services: this.servicesIDS,
          tz: Intl.DateTimeFormat().resolvedOptions().timeZone
        }).then((response) => response.data)
          .then((response) => {
            this.availableDates = response.data.dates
            this.loadingBook = false
            return response
          })
      }
    },
    mounted() {
      window['$']('#sidebar').theiaStickySidebar({
        additionalMarginTop: 95
      });

      if (this.$route.params.id) {
        this.loading = true;
        this.getDoctorInfo(this.$route.params.id).then((d) => {
          document.title = `Informacion ${d.name}`;
          this.loading = false;
          // this.getDoctorBooking(this.$route.params.id, this.startDate)
        })
      } else {
        this.$router.back()
      }
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
  #review_summary strong, #review_summary small {
    display: block;
  }

  .biography .square {
    border-radius: 0;
  }
</style>