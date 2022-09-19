<template>
  <main class="home-page bg-hero wrapper">
    <b-navbar toggleable="md" class="px-0">
      <b-container class="d-flex align-items-center ">
        <b-navbar-brand class="mt-0" :to="{ name: 'home' }">
          <img src="/img/logo.svg" style="max-height: 100px;max-width: 100%;" :to="{ name: 'profile' }"/>
        </b-navbar-brand>
        <b-navbar-nav class="ml-auto d-none d-md-block">
          <div class="mx-lg-5 d-lg-flex flex-lg-row" v-if="!hasToken">
            <b-button class="rounded-lg mx-1" variant="outline-primary" @click="$bvModal.show('login-1')">Entrar</b-button>
            <b-button :to="{ name: 'register' }" class="rounded-lg text-white" variant="primary">Registrarte</b-button>
          </div>
          <div class="mx-lg-2 d-lg-flex flex-lg-row" v-else>
            <b-nav-item :to="{ name: 'profile-details' }">Hola, <b>@{{ User.username }}</b></b-nav-item>
            <b-button class="rounded-lg mx-1" variant="outline-primary" :to="{ name: 'home' }" >Inicio</b-button>
            <b-button class="rounded-lg text-white" variant="primary" @click="dispachLogout">Salir</b-button>
          </div>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto d-block d-md-none w-100">
          <div class="mx-lg-5 d-lg-flex flex-lg-row" v-if="!hasToken">
            <b-button class="d-block w-100 my-1" variant="outline-primary" @click="$bvModal.show('login-1')">Entrar</b-button>
            <b-button :to="{ name: 'register' }" class="text-white w-100 my-1" variant="primary">Registrarte</b-button>
          </div>
          <div class="mx-lg-2 d-lg-flex flex-lg-row" v-else>
            <b-nav-item :to="{ name: 'profile-details' }">Hola, <b>@{{ User.username }}</b></b-nav-item>
            <b-button :to="{ name: 'home' }" class="d-block w-100 my-1" variant="outline-primary">Inicio</b-button>
            <b-button class="text-white w-100 my-1" variant="primary" @click="dispachLogout">Salir</b-button>
          </div>
        </b-navbar-nav>
      </b-container>
    </b-navbar>
    <div class="container ">
      <div class="row">
        <aside class="col-xl-3 col-lg-4" id="sidebar">
          <AsideProfile :user="profile" @preview="openPreview"></AsideProfile>
        </aside>
        
        <div class="col-xl-9 col-lg-8">
          <router-view :user="profile"></router-view>
        </div>
      </div>
    </div>
    <a-drawer
      placement="right"
      :width="320"
      :closable="false"
      :visible="visible_preview"
      wrapClassName="preview-card"
      @close="visible_preview = false"
    >
      <CardPage ref="previewCard"></CardPage>
    </a-drawer>
  </main>
</template>
<script>
  import AsideProfile from './components/aside-profile'
  import CardPage from '../card-page'
  import { getServerFile } from '@/libs/util'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'Profile',
    data () {
      return {
        visible_preview: false,
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
      AsideProfile,
      CardPage
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
      },
      openPreview() {
        this.visible_preview = true
        this.$refs.previewCard.loadInfo()
      }
    },
    mounted() {
      if (!this.hasToken) {
        this.$router.replace({ name: 'home' })
      } else {
        this.getUserInfo().then(() => {
          if (this.getUser.id) {
            this.$route.meta.preview = true
            this.profile = {
              ...this.getUser,
              ...{ 
                bday: this.getUser.bday && this.$moment(this.getUser.bday, 'YYYY-MM-DD')
              }
            }
            
            if (this.profile.addresses) {
              this.profile.addresses.forEach((a) => {
                a.favorite = !!a.favorite
              })
            }
            this.$nextTick().then(() => {
              setTimeout(() => {
                if ((window['$']('#sidebar .aside-profile').get(0).offsetHeight + 30) < window.innerHeight) {
                  window['$']('#sidebar').theiaStickySidebar({
                    additionalMarginTop: 30
                  });
                }
              }, 1000)
            });
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
    @media only screen and (max-width: 450px) {
      .navbar { 
        padding: 0.5rem 1rem !important;
        .navbar-brand {
          max-width: 50%;
        }
      }
    }
    &.bg-hero {
      padding-top: 0px !important;
      padding-bottom: 30px;
      margin-top: 0 !important;
      min-height: 100%;
    }
  }

  .preview-card {
    .ant-drawer-body {
      .card-container {
        padding-top: 0px;
        .card {
          border: 0px;
          border-radius: 0;
          margin-bottom: 0 !important;
          .card-img {
            border-radius: 0;
          }
        }
      }
    }
  }
</style>