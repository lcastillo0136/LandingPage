<template>
  <main class="home-page bg-hero wrapper">
    <b-navbar toggleable="md" class="px-0">
      <b-container class="d-flex align-items-center " id="v-step-0">
        <b-navbar-brand class="mt-0 d-flex mw-100 row-cols-2" :to="{ name: 'home' }">
          <img src="/img/logo.svg" style="max-height: 100px;" :to="{ name: 'profile' }"/>
          <router-link :to="{ name: 'profile-details' }" v-b-tooltip.hover.bottom title="Ver mi perfil" class="ml-auto d-block router-link-exact-active router-link-active text-right d-md-none">
            <b-avatar :src="User.avatar"></b-avatar>
          </router-link>
        </b-navbar-brand>
        <b-navbar-nav class="ml-auto">
          <div class="mx-lg-5 d-lg-flex flex-lg-row" v-if="!hasToken">
            <b-button class="rounded-lg mx-1" variant="outline-primary" @click="$bvModal.show('login-1')">Entrar</b-button>
            <b-button :to="{ name: 'register' }" class="rounded-lg text-white" variant="primary">Registrarte gratis</b-button>
          </div>
          <div class="mx-lg-2 d-flex flex-row align-items-center w-100 justify-content-between justify-content-md-end" style="gap: 20px;" v-else>
            <!-- <b-button class="rounded-lg mx-1" variant="outline-primary" :to="{ name: 'home' }" >Inicio</b-button> -->
            <b-button v-if="!active_account" :to="{ name: 'profile-payment' }" size="sm" variant="danger" v-b-tooltip.hover.bottom title="Ir a pagar">
              <b-icon icon="credit-card" class="mr-2"></b-icon>
              Pagar ahora
            </b-button>
            <b-button v-else size="sm" variant="outline-secondary" v-b-tooltip.hover.bottom title="Preview" @click="openPreview" id="previewBtn">
              <b-icon icon="eye" class="mr-1"></b-icon>
              Preview
            </b-button>
            <a @click="dispachLogout" v-b-tooltip.hover.bottom title="Cerrar sesion">
              <b-icon-box-arrow-left style="width: 20px; height: 20px;color: var(--gray-dark);"></b-icon-box-arrow-left>
            </a>
            <a-dropdown placement="bottomCenter" id="shareLinks">
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
                  <vue-qr ref="QRCode" :text="userLink" :size="75" class="qr-image" :margin="5" logoSrc="/img/icono.png"></vue-qr>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
            <router-link :to="{ name: 'profile-settings' }" v-b-tooltip.hover.bottom title="Ir a configuraciones">
              <b-icon-gear style="width: 20px; height: 20px;color: var(--gray-dark);"></b-icon-gear>
            </router-link>
            <router-link :to="{ name: 'profile-details' }" v-b-tooltip.hover.bottom title="Ver mi perfil" class="d-none d-md-inline">
              <template v-if="typeAsImage">
                <b-avatar :src="User.avatar"></b-avatar>
              </template>
              <template v-else>
                <video class="shadow-sm bg-white border border-white ant-avatar ant-avatar-circle ant-avatar-image" autoplay loop muted style="object-fit: cover;">
                  <source :src="videoAvatarSrc" id="video_here">
                    Your browser does not support HTML5 video.
                </video>
              </template>
            </router-link>
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
      <a-button type="primary" icon="close" class="close-drawer d-md-none" @click.stop.prevent="visible_preview = false">Cerrar preview</a-button>
      <CardPage ref="previewCard" :user="profile" :preview="true"></CardPage>
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
  import Cookies from 'js-cookie'

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
          password: '',
          password_confirmation: ''
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
            skills: this.getUser.skills && this.getUser.skills.map(s => Object({ ...s, active: !!s.active })),
            password: '',
            password_confirmation: ''

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
        return getServerFile2(`@${this.User.username}`)
      },
      active_account() {
        return this.User.active_account && this.$moment.utc(this.User.active_account).isValid() && this.$moment().utc().isBefore(this.$moment.utc(this.User.active_account))
      },
      typeAsImage() {
        return !(['mp4', 'avi', 'mp3', 'mov', 'mkv', 'flv', 'vob', 'avi', 'wmv'].includes(this.avatarExtension))
      },
      videoAvatarSrc () {
        return (!this.typeAsImage && this.User.avatar instanceof File && URL.createObjectURL(this.User.avatar)) || this.User.avatar
      },
      avatarExtension () {
        return this.User.avatar && this.User.avatar.slice((this.User.avatar.lastIndexOf(".") - 1 >>> 0) + 2)
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
                password: '',
                password_confirmation: ''
              }
            }
            
            if (this.profile.addresses) {
              this.profile.addresses.forEach((a) => {
                a.favorite = !!a.favorite
              })
            }
            this.$nextTick().then(() => {
              const disableTour = Cookies.get('disable_tour')

              if (!disableTour) {
                introJs().setOptions({
                  tooltipClass: 'guide-box',
                  steps: [{
                    title: 'Bienvenido',
                    intro: 'Aquí comienza la configuración de su tarjeta digital'
                  }, {
                    title: 'Vista previa',
                    intro: 'Con este botón puede ver como va la edición de su tarjeta antes de <b>Guardar</b> sus cambios',
                    element: document.querySelector('#previewBtn')
                  }, {
                    title: 'Compartir tu tarjeta',
                    intro: 'Puedes compartir tu tarjeta como URL o descargar tu código <b>QR</b>',
                    element: document.querySelector('#shareLinks')
                  }, {
                    title: 'Sube tu foto o video',
                    intro: 'Puedes subir tu foto o un video corto como perfil y una imagen como portada',
                    element: document.querySelector('#profilePicture')
                  }, {
                    title: 'Información profesional',
                    intro: 'Actualiza tu información de empresa, profesión y medios de contacto',
                    element: document.querySelector('#profileHistory')
                  }, {
                    title: 'Histórico de pagos',
                    intro: 'Listado de tus pagos realizados para tu suscripción',
                    element: document.querySelector('#profilePayments')
                  }, {
                    title: 'Onlycards Analytics',
                    intro: 'Revisa cuantas veces han visitado tu tarjeta',
                    element: document.querySelector('#profileAnalytics')
                  }, {
                    title: 'Archivos',
                    intro: 'Solo agrega tus archivos aquí y serán mostrados de manera automática en tu tarjeta',
                    element: document.querySelector('#profileFiles')
                  }, {
                    title: 'Pagar ahora',
                    intro: 'En cualquier momento puedo agregar 1 año más a tu suscripción o reactivarla desde este apartado',
                    element: document.querySelector('#goToPay')
                  }, {
                    title: 'Configuraciones',
                    intro: 'Elige tu diseño, cambia tu contraseña, agrega seguridad, etc.',
                    element: document.querySelector('#profileSettings')
                  }, {
                    title: 'Tarjeta activa hasta',
                    intro: 'Aquí te mostraremos siempre el tiempo que durara tu tarjeta activa.',
                    element: document.querySelector('#profileRemind')
                  }],
                  doneLabel: 'Listo',
                  nextLabel: 'Siguiente',
                  prevLabel: 'Anterior',
                  stepNumbersOfLabel: 'de',
                  dontShowAgainLabel: 'No mostrar de nuevo'
                }).onbeforechange(({ id }) => {
                  switch(id) {
                    case 'previewBtn':
                      // this.openPreview()
                      break; 
                    case 'shareLinks':
                      this.visible_preview = false
                      break;
                    case 'profileHistory':
                      this.$router.push({ name: 'profile-history' })
                      break;
                    case 'profilePayments':
                      this.$router.push({ name: 'profile-orders' })
                      break;
                    case 'profileAnalytics':
                      this.$router.push({ name: 'profile-analytics' })
                      break;
                    case 'profileFiles':
                      this.$router.push({ name: 'profile-files' })
                      break;
                    case 'goToPay':
                      this.$router.push({ name: 'profile-payment' })
                      break;
                    case 'profileSettings':
                      this.$router.push({ name: 'profile-settings' })
                      break;
                  }
                }).oncomplete(() => {
                  this.$router.push({ name: 'profile-details' })
                }).onexit(() => {
                  Cookies.set('disable_tour', 'disabled', { expires: 366 })
                }).start();
              } else {
                Cookies.set('disable_tour', 'disabled', { expires: 366 })
              }

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
    .close-drawer {
      position: absolute;
      top: 7px;
      z-index: 1000;
      margin-left: 7px;
      opacity: 0.8;
    }
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
  .modal-content {
    .ant-form-item-label {
      line-height: 16px;
      padding-bottom: 0;
      label {
        margin-bottom: 0;
        line-height: 16px;
        padding-bottom: 0;
      }
    }
  }
  .guide-box {
    min-width: 450px;
    max-width: 100%;
    color: #54bd95;
    .introjs-bullets ul li a {
      background: #92d5bb;
      &.active {
        background: #4ca382;
      }
    }
    .introjs-skipbutton {
      font-weight: normal;
      color: #15a886;
    }
    .introjs-tooltipbuttons {
      border-top: none;
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      .introjs-button {
        float: none;
        border: none;
        background: #61c29d;
        color: #fff;
        text-shadow: none;
        &.introjs-prevbutton {
          background: #f4f4f4;
          color: #9e9e9e;
        }
        &:focus {
          box-shadow: 0 0 0 0.2rem rgb(97 194 157 / 28%);
        }
      }
    }
  }
  .introjs-helperLayer {
    box-shadow: rgb(33 33 33 / 15%) 0px 0px 1px 2px, rgb(33 33 33 / 17%) 0px 0px 0px 5000px !important;
  }
</style>