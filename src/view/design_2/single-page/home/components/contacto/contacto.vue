<template>
  <section class="u-clearfix u-palette-1-base u-section-9" id="carousel_87c6">
    <div class="u-shape u-shape-rectangle u-white u-shape-1"></div>
    <div class="u-list u-list-1">
      <div class="u-repeater u-repeater-1">
        <div class="u-align-center u-container-style u-list-item u-palette-1-light-3 u-radius-10 u-repeater-item u-shape-round u-list-item-1">
          <div class="u-container-layout u-similar-container u-valign-top u-container-layout-1"><span class="u-icon u-icon-circle u-text-palette-1-base u-icon-1"><svg class="u-svg-link" preserveAspectRatio="xMidYMin slice" viewBox="0 0 52 52" style=""><use xlink:href="#svg-077e"></use></svg><svg class="u-svg-content" viewBox="0 0 52 52" x="0px" y="0px" id="svg-077e" style="enable-background:new 0 0 52 52;"><path style="fill:currentColor;" d="M38.853,5.324L38.853,5.324c-7.098-7.098-18.607-7.098-25.706,0h0   C6.751,11.72,6.031,23.763,11.459,31L26,52l14.541-21C45.969,23.763,45.249,11.72,38.853,5.324z M26.177,24c-3.314,0-6-2.686-6-6   s2.686-6,6-6s6,2.686,6,6S29.491,24,26.177,24z"></path></svg></span>
            <h5 class="u-text u-text-default u-text-palette-1-base u-text-1">Nuestras oficinas</h5>
            <p class="u-text u-text-2">{{ currentSettings.COMPANY_ADDRESS }}, {{ currentSettings.COMPANY_CITY }}, {{ currentSettings.COMPANY_STATE }}, {{ currentSettings.COMPANY_COUNTRY }}</p>
          </div>
        </div>
        <div class="u-align-center u-container-style u-list-item u-palette-1-light-3 u-radius-10 u-repeater-item u-shape-round u-list-item-2">
          <div class="u-container-layout u-similar-container u-valign-top u-container-layout-2"><span class="u-icon u-icon-circle u-text-palette-1-base u-icon-2"><svg class="u-svg-link" preserveAspectRatio="xMidYMin slice" viewBox="0 0 513.64 513.64" style=""><use xlink:href="#svg-9786"></use></svg><svg class="u-svg-content" viewBox="0 0 513.64 513.64" x="0px" y="0px" id="svg-9786" style="enable-background:new 0 0 513.64 513.64;"><g><g><path d="M499.66,376.96l-71.68-71.68c-25.6-25.6-69.12-15.359-79.36,17.92c-7.68,23.041-33.28,35.841-56.32,30.72    c-51.2-12.8-120.32-79.36-133.12-133.12c-7.68-23.041,7.68-48.641,30.72-56.32c33.28-10.24,43.52-53.76,17.92-79.36l-71.68-71.68    c-20.48-17.92-51.2-17.92-69.12,0l-48.64,48.64c-48.64,51.2,5.12,186.88,125.44,307.2c120.32,120.32,256,176.641,307.2,125.44    l48.64-48.64C517.581,425.6,517.581,394.88,499.66,376.96z"></path>
            </g>
            </g></svg></span>
            <h5 class="u-text u-text-default u-text-palette-1-base u-text-3">NÚMERO DE TELÉFONO</h5>
            <p class="u-text u-text-4">{{ currentSettings.COMPANY_PHONE | phone }}
            </p>
          </div>
        </div>
        <div class="u-align-center u-container-style u-list-item u-palette-1-light-3 u-radius-10 u-repeater-item u-shape-round u-list-item-4">
          <div class="u-container-layout u-similar-container u-valign-top u-container-layout-4"><span class="u-icon u-icon-circle u-text-palette-1-base u-icon-4"><svg class="u-svg-link" preserveAspectRatio="xMidYMin slice" viewBox="0 0 512 512" style=""><use xlink:href="#svg-9f82"></use></svg><svg class="u-svg-content" viewBox="0 0 512 512" x="0px" y="0px" id="svg-9f82" style="enable-background:new 0 0 512 512;"><g><g><path d="M507.49,101.721L352.211,256L507.49,410.279c2.807-5.867,4.51-12.353,4.51-19.279V121    C512,114.073,510.297,107.588,507.49,101.721z"></path>
            </g>
            </g><g><g><path d="M467,76H45c-6.927,0-13.412,1.703-19.279,4.51l198.463,197.463c17.548,17.548,46.084,17.548,63.632,0L486.279,80.51    C480.412,77.703,473.927,76,467,76z"></path>
            </g>
            </g><g><g><path d="M4.51,101.721C1.703,107.588,0,114.073,0,121v270c0,6.927,1.703,13.413,4.51,19.279L159.789,256L4.51,101.721z"></path>
            </g>
            </g><g><g><path d="M331,277.211l-21.973,21.973c-29.239,29.239-76.816,29.239-106.055,0L181,277.211L25.721,431.49    C31.588,434.297,38.073,436,45,436h422c6.927,0,13.412-1.703,19.279-4.51L331,277.211z"></path>
            </g>
            </g></svg></span>
            <h5 class="u-text u-text-default u-text-palette-1-base u-text-7">Correo electrónico</h5>
            <p class="u-text u-text-8">
              <a href="mailto:hello@theme.com" class="u-active-none u-border-1 u-border-palette-1-base u-btn u-button-link u-button-style u-hover-none u-none u-text-palette-1-base u-btn-1">{{ currentSettings.COMPANY_EMAIL }}</a>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="u-clearfix u-layout-wrap u-layout-wrap-1">
      <div class="u-layout">
        <div class="u-layout-row">
          <div class="u-align-left u-container-style u-layout-cell u-left-cell u-size-30 u-layout-cell-1">
            <div class="u-container-layout u-container-layout-5">
              <h3 class="u-text u-text-default u-text-9">PONERSE EN CONTACTO</h3>
              <h6 class="u-custom-font u-text u-text-font u-text-10">
                Podemos garantizar confiabilidad, tarifas de bajo costo y, lo que es más importante, pensando en la seguridad y la comodidad.
              </h6>
              <p class="u-text u-text-11">
                Si está buscando una manera de ponerse en contacto con nosotros, ¡ha venido al lugar correcto! Siempre estamos disponibles para responder sus preguntas, brindarle más información sobre nuestros servicios o simplemente chatear.
              </p>
              <div class="u-social-icons u-spacing-20 u-social-icons-1">
                <template v-if="currentSettings.COMPANY_FACEBOOK">
                  <a class="u-social-url" target="_blank" :href="currentSettings.COMPANY_FACEBOOK">
                    <span class="u-icon u-icon-circle u-social-facebook u-social-icon u-icon-5">
                      
                      <Icon type="logo-facebook" size="43"/>
                    </span>
                  </a>
                </template>
                <template v-if="currentSettings.COMPANY_TWITTER">
                  <a class="u-social-url" target="_blank" :href="currentSettings.COMPANY_TWITTER">
                    <span class="u-icon u-icon-circle u-social-icon u-social-twitter u-icon-6">
                      <Icon type="logo-twitter" />
                    </span>
                  </a>
                </template>
                <template v-if="currentSettings.COMPANY_INSTAGRAM">
                  <a class="u-social-url" target="_blank" :href="currentSettings.COMPANY_INSTAGRAM">
                    <span class="u-icon u-icon-circle u-social-icon u-social-instagram u-icon-7">
                      <Icon type="logo-instagram" />
                    </span>
                  </a>
                </template>
                <template v-if="currentSettings.COMPANY_LINKEDIN">
                  <a class="u-social-url" target="_blank" :href="currentSettings.COMPANY_LINKEDIN">
                    <span class="u-icon u-icon-circle u-social-icon u-social-linkedin u-icon-8">
                      <Icon type="logo-linkedin" />
                    </span>
                  </a>
                </template>
                <template v-if="currentSettings.COMPANY_PINTEREST">
                  <a class="u-social-url" target="_blank" :href="currentSettings.COMPANY_PINTEREST">
                    <span class="u-icon u-icon-circle u-social-icon u-social-linkedin u-icon-8">
                      <Icon type="logo-pinterest" />
                    </span>
                  </a>
                </template>
                <template v-if="currentSettings.COMPANY_MERCADOLIBRE">
                  <a class="u-social-url" target="_blank" :href="currentSettings.COMPANY_MERCADOLIBRE">
                    <span class="u-icon u-icon-circle u-social-icon u-social-linkedin u-icon-8">
                      <img src="../../images/logo-ml.png" />
                    </span>
                  </a>
                </template>
              </div>
            </div>
          </div>
          <div class="u-container-style u-layout-cell u-right-cell u-size-30 u-layout-cell-2">
            <div class="u-container-layout u-valign-top u-container-layout-6">
              <div class="u-form u-form-1">
                <a-form-model ref="contactForm" :rules="rules" :model="form" class="u-clearfix u-form-spacing-30 u-form-vertical u-inner-form" style="padding: 10px">
                  <div class="u-form-email u-form-group u-form-partition-factor-2 u-form-group-1">
                    <a-form-model-item prop="email">
                      <label class="u-label u-text-body-alt-color u-label-1">Correo electrónico</label>
                      <a-input placeholder="Correo electrónico" v-model="form.email" class="u-border-2 u-border-no-left u-border-no-right u-border-no-top u-border-white u-input u-input-rectangle" size="large"/>
                    </a-form-model-item>
                  </div>
                  <div class="u-form-group u-form-name u-form-partition-factor-2 u-form-group-2">
                    <a-form-model-item prop="name">
                      <label class="u-label u-text-body-alt-color u-label-1">Nombre</label>
                      <a-input class="u-border-2 u-border-no-left u-border-no-right u-border-no-top u-border-white u-input u-input-rectangle" placeholder="Cual es tu nombre?" v-model="form.name" size="large"/>
                    </a-form-model-item>
                  </div>
                  <div class="u-form-group u-form-message u-form-group-3">
                    <a-form-model-item prop="message">
                      <label  class="u-label u-text-body-alt-color u-label-1">Mensaje</label>
                      <a-textarea placeholder="Escríbenos un mensaje" v-model="form.message" rows="4" cols="50" class="u-border-2 u-border-no-left u-border-no-right u-border-no-top u-border-white u-input u-input-rectangle"></a-textarea>
                    </a-form-model-item>
                  </div>
                  <div class="u-align-left u-form-group u-form-submit u-form-group-4">
                    <a-button class="u-active-palette-1-light-3 u-border-none u-btn u-btn-submit u-button-style u-hover-palette-1-light-3 u-text-palette-1-base u-white u-btn-2" :loading="loading" @click.stop.prevent="sendContactForm">
                      Enviar
                    </a-button>
                  </div>
                </a-form-model>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { SendContactMessage } from '@/api/data'

  export default {
    name: 'MisionVision',
    data() {
      return {
        form: {
          name: '',
          email: '',
          message: ''
        },
        loading: false,
        rules: {
          name: [{
            validator: (rule, value, callback) => {
              if ((value === '' || !value)) {
                callback(new Error('Favor de no dejar este campo vacío'));
              } else {
                callback();
              }
            },
            trigger: 'change'
          }],
          email: [{
            validator: (rule, value, callback) => {
              if ((value === '' || !value)) {
                callback(new Error('Favor de no dejar este campo vacío'));
              } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
                callback(new Error('Favor de ingresar un correo valido'));
              } else {
                callback();
              }
            },
            trigger: 'change'
          }],
          message: [{
            validator: (rule, value, callback) => {
              if ((value === '' || !value)) {
                callback(new Error('Favor de no dejar este campo vacío'));
              } else {
                callback();
              }
            },
            trigger: 'change'
          }],
        },
      }
    },
    computed: {
      ...mapGetters([
        'settings',
        'hasToken',
        'getUser'
      ]),
      currentSettings() {
        return this.settings || {}
      }
    },
    methods: {
      sendContactForm() {
        this.loading = true
        this.$refs.contactForm.validate().then(valid => {
          if (valid) {
            SendContactMessage({
              'email': this.form.email,
              'name': this.form.name,
              'message': this.form.message,
              'subject': 'Contacto desde pagina principal',
            }).then(response => {
              this.$notification.success({
                message: 'Mensaje enviado',
                description: 'En breve nos pondremos en contacto con usted, gracias'
              })
              this.loading = false
              this.form.email = ''
              this.form.name = ''
              this.form.message = ''
            }).catch((error) => {
              this.$notification.error({
                message: 'Algo salio mal',
                description: 'Favor de intentar mas tarde.'
              })
              this.loading = false
            })
          } else {
            this.loading = false
          }
        }).catch((error) => {
          this.loading = false
          this.$notification.error({
            message: 'Algo salio mal',
            description: 'Favor de intentar mas tarde.'
          })
        });
      }
    }
  }
</script>
<style lang="scss">

  .u-form {
    button.u-btn-2.u-white {
      height: auto;
      color: #5595e8 !important;
    }
    .u-label {
      margin-bottom: 0;
    }
    .u-input::placeholder {
      color: #fff;
    }
  }
  .u-section-9 {
    .u-list-1 {
      *::after {
        display: none;
      }
    }

    @media (min-width: 875px) {
      div.u-repeater-1 {
        grid-template-columns: repeat(3, calc(33.3333% - 15.75px));
      }
    }
    .u-social-icons-1.u-social-icons {
      width: auto;
      &::after {
        display: none;
        
      }
      > a {
        flex: none;
      }
    }
  }
</style>