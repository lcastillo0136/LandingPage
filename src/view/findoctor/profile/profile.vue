<template>
  <main>
    <div class="container margin_60">
      <div class="row">
        <aside class="col-xl-3 col-lg-4" id="sidebar">
          <AsideProfile :user="profile"></AsideProfile>
        </aside>
        
        <div class="col-xl-9 col-lg-8">
          <router-view :user="profile"></router-view>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
  import AsideProfile from './components/aside-profile'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'Profile',
    data () {
      return {
        profile: {
          title: '',
          first_name: '',
          last_name: '',
          avatar: '',
          bday: null,
          biography: '',
          cedula_profesional: '',
          close_time: '17:00',
          date_slot: '',
          email: '',
          
          email_verified: false,
          especialidad: '',
          extend_last_appointment: true,
          
          gender: 'male',
          id: -1,
          max_days: 7,
          multiple_services: true,
          next_day: 0,
          open_time: '12:00',
          phone: '',
          profesion: '',
          quote: '',
          rate: 0,
          rfc: '',
          services: [
            // {
            //   active: 1
            //   description: ""
            //   duration: "00:05"
            //   id: 2
            //   name: "General consultation"
            //   price: 35
            // }
          ],
          // short_description: null
          skills: [
            // {
            //   active: 1
            //   description: null
            //   id: 13
            //   name: "normal consultation"
            //   user_id: 3
            //   value: 0
            // }
          ],
          // active: 1
          // address: {id: 1, user_id: 3, street: "Rio Obi", city: "Guadalupe", suburb: "Dos Rios", postal_code: 67134,…}
          // addresses: [{id: 1, user_id: 3, street: "Rio Obi", city: "Guadalupe", suburb: "Dos Rios", postal_code: 67134,…}]
          // ip_address: null
          // last_login: "2022-02-11 21:15:38"
          // messages: [{id: 1, order_id: 4, user_id: 3,…}, {id: 2, order_id: 4, user_id: 3,…}]
          // no_licencia: null
        },
      }
    },
    watch: {
      getUser() {
        this.profile = {
          ...this.getUser,
          ...{ 
            bday: this.getUser.bday && this.$moment(this.getUser.bday, 'YYYY-MM-DD')
          }
        }
      },
      hasToken () {
        if (!this.hasToken) {
          this.$router.replace({ name: 'home' })
        }
      }
    },
    components: {
      AsideProfile
    },
    computed: {
      ...mapGetters([
        'hasToken',
        'settings',
        'getUser'
      ])
    },
    methods: {
      ...mapActions([
        'getAppointmentsStatus'
      ])
    },
    mounted() {
      window['$']('#sidebar').theiaStickySidebar({
        additionalMarginTop: 30
      });

      if (!this.hasToken) {
        this.$router.replace({ name: 'home' })
      }

      this.getAppointmentsStatus().then(() => {}).catch(() => {})
      
      if (this.getUser.id) {
        this.profile = {
          ...this.getUser,
          ...{ 
            bday: this.getUser.bday && this.$moment(this.getUser.bday, 'YYYY-MM-DD')
          }
        }
      }
    }
  }
</script>