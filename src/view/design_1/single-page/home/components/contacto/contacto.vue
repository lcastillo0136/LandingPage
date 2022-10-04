<template>
  <section class="u-align-center u-clearfix u-palette-2-light-2 u-section-5" id="carousel_92d2">
    <div class="u-clearfix u-sheet u-valign-middle-md u-valign-middle-sm u-valign-middle-xs u-sheet-1">
      <div class="u-container-style u-expanded-width-md u-expanded-width-sm u-expanded-width-xs u-group u-palette-5-dark-3 u-group-1">
        <div class="u-container-layout u-container-layout-1">
          <h3 class="u-custom-font u-font-open-sans u-text u-text-1">Contáctanos</h3>
          <a :href="'tel:'+currentSettings.COMPANY_PHONE" class="u-active-none u-btn u-button-style u-hover-none u-none u-text-hover-palette-1-light-1 u-btn-1">
            <span class="u-icon u-text-palette-1-light-1">
              <b-icon-telephone></b-icon-telephone>
            </span>&nbsp;{{ currentSettings.COMPANY_PHONE | phone }}
          </a>
          <a :href="'mailto:'+ currentSettings.COMPANY_EMAIL" class="u-active-none u-btn u-button-style u-hover-none u-none u-text-hover-palette-1-light-1 u-btn-2">
            <span class="u-icon u-text-palette-1-light-1">
              <b-icon-envelope></b-icon-envelope>
            </span>&nbsp;{{ currentSettings.COMPANY_EMAIL }}
          </a>
          <p class="u-text u-text-2">
            <span class="u-icon u-text-palette-1-light-1">
              <b-icon-geo-alt></b-icon-geo-alt>
            </span>&nbsp;{{ currentSettings.COMPANY_ADDRESS }}, {{ currentSettings.COMPANY_CITY }}, {{ currentSettings.COMPANY_STATE }}, {{ currentSettings.COMPANY_COUNTRY }}
          </p>
          <div class="u-expanded-width-xs u-form u-form-1">
            <!-- action="/contact/email" method="POST"  -->
            <a-form-model ref="contactForm" :rules="rules" :model="form" class="u-clearfix u-form-spacing-13 u-form-vertical u-inner-form" style="padding: 0px;" source="custom" name="form-2">
              <div class="u-form-group u-form-name u-form-partition-factor-2">
                <a-form-model-item prop="name">
                  <a-input class="form-control" placeholder="Nombre" v-model="form.name" />
                </a-form-model-item>
              </div>
              <div class="u-form-group u-form-name u-form-partition-factor-2">
                <a-form-model-item prop="email">
                  <a-input class="form-control" placeholder="Correo electrónico" v-model="form.email" />
                </a-form-model-item>
              </div>
              <div class="u-form-group u-form-message">
                <a-form-model-item prop="message">
                  <a-textarea placeholder="Escríbenos un mensaje" v-model="form.message" rows="4" cols="50" class="u-border-no-bottom u-border-no-left u-border-no-right u-border-no-top u-grey-5 u-input u-input-rectangle"></a-textarea>
                </a-form-model-item>                
              </div>
              <div class="u-form-group u-form-submit">
                <a-button class="u-btn u-btn-submit u-button-style u-palette-1-light-1 u-btn-3" :loading="loading" @click.stop.prevent="sendContactForm">
                  Enviar
                </a-button>
              </div>
            </a-form-model>
          </div>
          <a :href="'https://api.whatsapp.com/send?phone=521'+currentSettings.COMPANY_PHONE+'&text=Hola'" class="u-align-center u-black u-border-0 u-btn u-button-style u-hover-palette-1-dark-1 u-btn-4" target="_blank"><span class="u-icon u-text-custom-color-1 u-icon-3">
            <b-icon-whatsapp variant="success"></b-icon-whatsapp>
          </span>&nbsp;<span style="font-size: 0.625rem;">ENVIANOS UN WHATSAPP para conocer más</span>
          </a>
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
          name: [{ validator: (rule, value, callback) => {
            if ((value === '' || !value)) {
              callback(new Error('Favor de no dejar este campo vacío'));
            } else {
              callback();
            }
          }, trigger: 'change' }],
          email: [{ validator: (rule, value, callback) => {
            if ((value === '' || !value)) {
              callback(new Error('Favor de no dejar este campo vacío'));
            } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
              callback(new Error('Favor de ingresar un correo valido'));
            } else {
              callback();
            }
          }, trigger: 'change' }],
          message: [{ validator: (rule, value, callback) => {
            if ((value === '' || !value)) {
              callback(new Error('Favor de no dejar este campo vacío'));
            } else {
              callback();
            }
          }, trigger: 'change' }],
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
  .u-btn-3 {
    height: auto;
  }
</style>