<template>
  <main class="home-page bg-hero wrapper">
    <b-navbar toggleable="md" class="px-0">
      <b-container class="d-flex align-items-center ">
        <b-navbar-brand class="mt-0">
          <img :src="appImage" style="max-height: 100px;" :to="{ name: 'profile' }"/>
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item :to="{ name: 'home' }" class="mr-3">Inicio</b-nav-item>
            <div class="mx-lg-5 d-lg-flex flex-lg-row" v-if="!hasToken">
              <b-nav-item @click="$bvModal.show('login-1')">Entrar</b-nav-item>
              <b-button :to="{ name: 'register' }" class="rounded-lg text-white" variant="primary">Registrarte</b-button>
            </div>
            <div class="mx-lg-2 d-lg-flex flex-lg-row" v-else>
              <b-nav-item :to="{ name: 'profile-details' }">Hola, <b>@{{ User.username }}</b></b-nav-item>
              <b-button class="rounded-lg text-white" variant="primary" @click="dispachLogout">Salir</b-button>
            </div>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
    <div class="container ">
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
  import { getServerFile } from '@/libs/util'
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
      ]),
      User() {
        return this.getUser || {}
      },
      appName () {
        return this.settings?.COMPANY_NAME
      },
      appImage () {
        return getServerFile('public/company/company_logo.png')
      }
    },
    methods: {
      ...mapActions([
        'handleLogOut',
        'getAppointmentsStatus',
        'getUserInfo'
      ]),
      dispachLogout () {
        this.handleLogOut()
      }
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
      
      this.getAppointmentsStatus().then(() => {}).catch(() => {})
      
    }
  }
</script>
<style lang="scss">
  .home-page {
    &.box_list .wrapper {
      margin-top: 0 !important;
      padding-top: 30px !important;
    }
  }
  .home-page {
    .navbar {
      min-height: 100px;
    }
    &.bg-hero {
      padding-top: 151px !important;
      padding-bottom: 30px;
    }
  }
</style>