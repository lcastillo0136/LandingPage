<template>
  <main class="home-page bg-hero wrapper privacy" style="display: flex;flex-direction: column;justify-content: space-between;">
    <b-navbar toggleable="md">
      <b-container class="d-flex align-items-center">
        <b-navbar-brand class="mt-0" :to="{ name: 'home' }">
          <img src="/img/logo.svg" style="max-height: 100px;" class="mw-100"/>
        </b-navbar-brand>
       
        <b-navbar-nav class="ml-auto d-none d-md-block">
          <div class="mx-lg-5 d-lg-flex flex-lg-row" v-if="!hasToken">
            <b-button class="rounded-lg mx-1" variant="outline-primary" @click="$bvModal.show('login-1')">Entrar</b-button>
            <b-button :to="{ name: 'register' }" class="rounded-lg text-white" variant="primary">Registrarte</b-button>
          </div>
          <div class="mx-lg-2 d-lg-flex flex-lg-row" v-else>
            <b-nav-item :to="{ name: 'profile-details' }">Hola, <b>@{{ User.username }}</b></b-nav-item>
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
            <b-button class="rounded-lg text-white" variant="primary" @click="dispachLogout">Salir</b-button>
          </div>
        </b-navbar-nav>
      </b-container>
    </b-navbar>
    <Login></Login>
    <RegisterForm></RegisterForm>
    <div class="container bg-white p-4 radius-1 jumbotron">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-11">
            <div class="wrapper">
              <div class="row no-gutters justify-content-between">
                <div class="col-lg-6 d-flex align-items-stretch">
                  <div class="info-wrap w-100 p-md-5 p-3">
                    <h3 class="mb-4">Contactanos</h3>
                    <div class="dbox w-100 d-flex align-items-start" v-if="appSettings.COMPANY_ADDRESS">
                      <div class="icon d-flex align-items-center justify-content-center">
                        <span class="fa fa-map-marker"></span>
                      </div>
                      <div class="text pl-4">
                        <p>
                          <span>Dirección:</span> {{ appSettings.COMPANY_ADDRESS }}
                        </p>
                      </div>
                    </div>
                    <div class="dbox w-100 d-flex align-items-start" v-if="appSettings.COMPANY_PHONE">
                      <div class="icon d-flex align-items-center justify-content-center">
                        <a-icon type="phone"></a-icon>
                      </div>
                      <div class="text pl-4">
                        <p>
                          <span>Teléfono:</span> <a :href="`tel:${this.appSettings.COMPANY_PHONE}`">{{ appSettings.COMPANY_PHONE | phone }}</a>
                        </p>
                      </div>
                    </div>
                    <div class="dbox w-100 d-flex align-items-start" v-if="appSettings.COMPANY_EMAIL">
                      <div class="icon d-flex align-items-center justify-content-center">
                        <a-icon type="mail"></a-icon>
                      </div>
                      <div class="text pl-4">
                        <p>
                          <span>Correo electrónico:</span> <a href="mailto:info@yoursite.com">{{ appSettings.COMPANY_EMAIL }}</a>
                        </p>
                      </div>
                    </div>
                    <div class="dbox w-100 d-flex align-items-start">
                      <div class="icon d-flex align-items-center justify-content-center">
                        <a-icon type="link"></a-icon>
                      </div>
                      <div class="text pl-4">
                        <p><span>Sitio web</span> <a target="_blank" href="https://www.zibasoft.com/">Zibasoft</a></p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-5">
                  <div class="contact-wrap w-100 p-md-5 p-4">
                    <h3 class="mb-4">Ponerse en contacto</h3>
                    <a-form-model ref="contactForm" :model="contactForm" :rules="contactFormRules" id="contactForm" name="contactForm" novalidate="novalidate">
                      <a-form-model-item has-feedback label="Nombre" prop="name">
                        <a-input v-model="contactForm.name" type="text" autocomplete="off" />
                      </a-form-model-item>
                      <a-form-model-item has-feedback label="Correo electrónico" prop="email">
                        <a-input v-model="contactForm.email" type="email" autocomplete="off" />
                      </a-form-model-item>
                      <a-form-model-item has-feedback label="Razón" prop="subject">
                        <a-input v-model="contactForm.subject" type="text" autocomplete="off" />
                      </a-form-model-item>
                      <a-form-model-item has-feedback label="Mensaje" prop="message">
                        <a-textarea v-model="contactForm.message" type="text" autocomplete="off" cols="30" rows="5"/>
                      </a-form-model-item>
                      <a-button type="primary" :loading="sending" @click.stop.prevent="sendMessage">
                        Enviar Mensaje
                      </a-button>
                    </a-form-model>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section class="py-5 bg-dark text-white">
      <b-container>
        <b-row>
          <b-col cols="12" lg="6" md="6" sm="6">
            <h6>@ 2022 powered with <b-icon-heart></b-icon-heart> by <a target="_blank" href="https://www.zibasoft.com/">Zibasoft</a></h6>
          </b-col>
          <b-col cols="12" lg="6" md="6" sm="6">
            <div class="clearfix">
              <h6 class="float-lg-right float-md-right">
                <router-link :to="{ name: 'privacy' } ">Política de privacidad</router-link>
              </h6>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>
    <a-back-top id="toTop">
      <b-icon-chevron-up></b-icon-chevron-up>
    </a-back-top>
  </main>
</template>
<script>
  import { getServerFile } from '@/libs/util'
  import { registerCustomer, postOrder, getProduct } from '@/api/data'
  import { Messages } from '@/api/messages'
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  import { BIconPlayFill, BIconArrowRight, BIconGithub, BIconGlobe } from 'bootstrap-vue'
  import RegisterForm from '../single-page/home/components/register'
  import Login from '../single-page/home/components/login'

  export default {
    name: 'Privacy',
    data() {
      return {
        contactForm: {
          name: '',
          message: '',
          subject: '',
          email: ''
        },
        sending: false,
        contactFormRules: {
          name: [
            { required: true, message: 'Favor de llenar con su nombre', trigger: 'blur' },
          ],
          message: [
            { required: true, message: 'No se pueden enviar mensajes vacios', trigger: 'blur' },
          ],
          subject: [
            { required: true, message: 'Cual es el motivo del mensaje', trigger: 'blur' },
          ],
          email: [
            { required: true, message: 'Favor de llenar con su correo para estar en contacto', trigger: 'blur' },
            { 
              validator(rule, value, callback) {
                var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                if (value.match(validRegex)) {
                  callback()
                } else {
                  callback(new Error('Correo electrónico erroneo'))
                }
              },
              trigger: 'change'
            }
          ],
        }
      }
    },
    components: {
      BIconPlayFill,
      BIconArrowRight,
      BIconGithub,
      BIconGlobe,
      RegisterForm,
      Login
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
      appName() {
        return this.settings?.COMPANY_NAME
      },
      appImage() {
        return getServerFile('public/company/company_logo.png')
      },
      appSettings () {
        return this.settings || {}
      },
      site() {
        return `${location.protocol}//${location.host}`
      }
    },
    methods: {
      ...mapActions([
        'handleLogOut',
        'handleLogin'
      ]),
      dispachLogout() {
        this.handleLogOut()
      },
      sendMessage() {
        this.$refs.contactForm.validate(valid => {
          if (valid) {
            this.sending = true
            Messages.comment(this.contactForm).then(() => {
              this.sending = false
              let _name = this.contactForm.name
              this.$notification.success({
                message: 'Mensaje enviado',
                description: (h) => {
                  return h(
                    'span',
                    [
                      h(
                        'b',
                        _name
                      ),` muchas gracias por tus valiosos comentarios nos pondremos en contacto lo más pronto posible. Gracias.`
                    ])
                },
                duration: 5000
              })
              this.contactForm.name = ''
              this.contactForm.subject = ''
              this.contactForm.message = ''
              this.contactForm.email = ''
            }).catch(() => {
              this.sending = false
            })
          } else {

          }
        });
      }
    },
}
</script>
<style lang="scss">
  .home-page.privacy {
    &.box_list .wrapper {
      margin-top: 0 !important;
      padding-top: 30px !important;
    }
  }

  .home-page.privacy {
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
      padding-bottom: 0px;
      margin-top: 0 !important;
      min-height: 100%;
    }

    .grey-text {
      color: #666;
    }

    .cyan-text {
      color: #30a2ae;
    }

    .regular {
      font-weight: 500 !important;
    }

    .contact-wrap {
      .ant-form-item-label {
        line-height: inherit;
        > label {
          margin-bottom: 0rem;
        }
      }
    }
  }
</style>