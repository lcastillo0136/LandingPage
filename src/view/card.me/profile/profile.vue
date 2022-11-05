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
          <div class="mx-lg-2 d-lg-flex flex-lg-row align-items-center" style="gap: 20px;" v-else>
            <!-- <b-button class="rounded-lg mx-1" variant="outline-primary" :to="{ name: 'home' }" >Inicio</b-button> -->
            <b-button v-if="!active_account" :to="{ name: 'profile-payment' }" size="sm" variant="outline-secondary" v-b-tooltip.hover.bottom title="Ir a pagar">
              <b-icon icon="credit-card" class="mr-2"></b-icon>
              Pagar ahora
            </b-button>
            <b-button v-else size="sm" variant="outline-secondary" v-b-tooltip.hover.bottom title="Preview" @click="openPreview">
              <b-icon icon="eye" class="mr-1"></b-icon>
              Preview
            </b-button>
            <a @click="dispachLogout" v-b-tooltip.hover.bottom title="Cerrar sesion">
              <b-icon-box-arrow-left style="width: 20px; height: 20px;color: var(--gray-dark);"></b-icon-box-arrow-left>
            </a>
            <a-dropdown placement="bottomCenter" >
              <a>
                <a-icon type="share-alt" style="margin-top: -2px;display: block;font-size: 20px;color: var(--gray-dark);"></a-icon>
              </a>
              <a-menu slot="overlay">
                <a-menu-item key="copy" v-clipboard:copy="userLink" v-clipboard:success="copyLink">
                  Copiar enlace
                </a-menu-item>
                <a-menu-item key="share">
                  <navigator-share :url="userLink" :title="User.full_name" :text="User.full_name">
                    <template #clickable>
                      Compartir Enlace
                    </template>
                  </navigator-share>
                </a-menu-item>
                <a-menu-divider />
                <a-menu-item key="qr" class="text-center" @click="downloadQR" :loading="downloadingQR">
                  Descargar QR
                  <br>
                  <vue-qr ref="QRCode" :text="userLink" :size="75" class="qr-image" :margin="5"></vue-qr>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
            <router-link :to="{ name: 'profile-settings' }" v-b-tooltip.hover.bottom title="Ir a configuraciones">
              <b-icon-gear style="width: 20px; height: 20px;color: var(--gray-dark);"></b-icon-gear>
            </router-link>
            <router-link :to="{ name: 'profile-details' }" v-b-tooltip.hover.bottom title="Ver mi perfil">
              <b-avatar :src="User.avatar"></b-avatar>
            </router-link>
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
          <router-view :user="profile" @preview="openPreview"></router-view>
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
      <CardPage ref="previewCard" :user="profile"></CardPage>
    </a-drawer>
    <a-back-top />
    <a-tooltip title="Preview">
      <div class="preview-favbutton ant-back-top" @click.prevent.stop="openPreview" v-if="visiblePreviewButton">
        <div class="ant-back-top-content">
          <a-icon type="eye"></a-icon>
        </div>
      </div>
    </a-tooltip>
  </main>
</template>
<script>
  import AsideProfile from './components/aside-profile'
  import CardPage from '../card-page'
  import { getServerFile2, getServerFile } from '@/libs/util'
  import addEventListener from 'ant-design-vue/es/vc-util/Dom/addEventListener'
  import getScroll from 'ant-design-vue/es/_util/getScroll';
  import { mapGetters, mapActions } from 'vuex'
  import NavigatorShare from 'vue-navigator-share'

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
          cover: '',
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
          design: '',
          services: [
          ],
          skills: [
          ],
          targetTop: null,
          // active: 1
          // address: {id: 1, user_id: 3, street: "Rio Obi", city: "Guadalupe", suburb: "Dos Rios", postal_code: 67134,…}
          // addresses: [{id: 1, user_id: 3, street: "Rio Obi", city: "Guadalupe", suburb: "Dos Rios", postal_code: 67134,…}]
          // ip_address: null
          // last_login: "2022-02-11 21:15:38"
          // messages: [{id: 1, order_id: 4, user_id: 3,…}, {id: 2, order_id: 4, user_id: 3,…}]
          // no_licencia: null
        },
        downloadingQR: false,
        scrollEvent : null,
        visiblePreviewButton: false
      }
    },
    watch: {
      getUser() {
        this.profile = {
          ...this.getUser,
          ...{ 
            bday: this.getUser.bday && this.$moment(this.getUser.bday, 'YYYY-MM-DD'),
            skills: this.getUser.skills && this.getUser.skills.map(s => Object({ ...s, active: !!s.active }))
          }
        }
      },
      hasToken () {
        if (!this.hasToken) {
          this.$router.replace({ name: 'home' })
        }
      },
    },
    components: {
      AsideProfile,
      CardPage,
      NavigatorShare
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
      },
      userLink() {
        return getServerFile2(`p/${this.User.uuid_key}.html`)
      },
      active_account() {
        return this.User.active_account && this.$moment.utc(this.User.active_account).isValid() && this.$moment().utc().isBefore(this.$moment.utc(this.User.active_account))
      },
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
      },
      downloadQR () {
        this.downloadingQR = true
        this.saveAs(this.$refs.QRCode.$el.src, 'QR.png');
      },
      copyLink() {
        this.$notification.success({
          message: 'Enlace copiado',
          description: 'Ya lo puedes compartir con tus contactos'
        })
      },
      saveAs(uri, filename) {
        var link = document.createElement('a');

        if (typeof link.download === 'string') {
          link.href = encodeURI(uri);
          link.download = filename;

          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setTimeout(() => {
            this.downloadingQR = false
          }, 1000)
        } else {
          window.open(uri);
          this.downloadingQR = false
        }
      },
      handleScroll() {
        var visibilityHeight = 400
        var target = () => window;

        var scrollTop = getScroll(target(), true);
        
        this.visiblePreviewButton = scrollTop > visibilityHeight
      }
    },
    beforeDestroy: function beforeDestroy() {
      if (this.scrollEvent) {
        this.scrollEvent.remove();
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
                bday: this.getUser.bday && this.$moment(this.getUser.bday, 'YYYY-MM-DD'),
                skills: this.getUser.skills && this.getUser.skills.map(s => Object({ ...s, active: !!s.active })),
                design: 'design-1'
              }
            }
            
            if (this.profile.addresses) {
              this.profile.addresses.forEach((a) => {
                a.favorite = !!a.favorite
              })
            }
            this.$nextTick().then(() => {
              
              this.scrollEvent = addEventListener(window, 'scroll', this.handleScroll);
              this.handleScroll();
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

  .ant-back-top {
    right: 25px;
    bottom: 70px;
  }
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
    .preview-favbutton {
      right: 25px;
      bottom: 115px;
      .ant-back-top-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .anticon-eye {
          font-size: 25px;
          margin-top: -1px;
        }
      }
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