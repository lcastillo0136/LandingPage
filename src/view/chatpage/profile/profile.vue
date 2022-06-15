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
          ],
          skills: [
          ],
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
        'getUserInfo'
      ])
    },
    mounted() {
      window['$']('#sidebar').theiaStickySidebar({
        additionalMarginTop: 30
      });

      if (!this.hasToken) {
        this.$router.replace({ name: 'home' })
      } else {
        this.getUserInfo().then(() => {
          if (this.getUser.id) {
            this.profile = {
              ...this.getUser,
              ...{ 
                bday: this.getUser.bday && this.$moment(this.getUser.bday, 'YYYY-MM-DD')
              }
            }
          }
        })
      }
    }
  }
</script>