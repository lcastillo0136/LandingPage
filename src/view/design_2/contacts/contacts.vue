<template>
  <main class="u-body u-contacts-page" data-lang="en">
    <header-component></header-component>
    <section class="u-clearfix u-section-1" id="carousel_7be3">
      <div class="u-clearfix u-sheet u-sheet-1">
        <div class="u-clearfix u-expanded-width u-layout-wrap u-layout-wrap-1">
          <div class="u-layout" style="">
            <div class="u-layout-row" style="">
              <div class="u-container-style u-layout-cell u-size-30 u-layout-cell-1">
                <div class="u-container-layout u-valign-middle u-container-layout-1">
                  <h3 class="u-custom-font u-font-montserrat u-text u-text-default u-text-palette-1-base u-text-1">
                    ¿Cómo puedo contactarte?
                  </h3>
                  <p class="u-text u-text-default u-text-2">
                    ¡Nos encantaría saber de ti! Ya sea que tenga una pregunta, comentario o simplemente quiera saludar, puede contactarnos usando el formulario en esta página. Nos pondremos en contacto contigo lo antes posible.
                  </p>
                  <ul class="u-text u-text-3">
                    <li>{{ currentSettings.COMPANY_ADDRESS }}, {{ currentSettings.COMPANY_CITY }},</li>
                    <li>{{ currentSettings.COMPANY_STATE }}, {{ currentSettings.COMPANY_COUNTRY }}</li>
                    <li>{{ currentSettings.COMPANY_PHONE | phone }}<br>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="u-align-center u-container-style u-layout-cell u-shape-rectangle u-size-30 u-layout-cell-2">
                <div class="u-container-layout u-valign-middle-lg u-valign-middle-md u-valign-middle-xl u-container-layout-2">
                  <div class="u-form u-radius-50 u-white u-form-1">
                    <a-form-model ref="contactForm" :rules="rules" :model="form" class="u-clearfix u-form-spacing-41 u-form-vertical u-inner-form" style="padding: 44px;">
                      <div class="u-form-group u-form-name">
                        <a-form-model-item prop="name">
                          <label for="name-61fc" class="u-label">Nombre</label>
                          <a-input class="u-grey-5 u-input u-input-rectangle" placeholder="Cual es tu nombre?" v-model="form.name"/>
                        </a-form-model-item>
                      </div>
                      <div class="u-form-group u-form-name">
                        <a-form-model-item prop="email">
                          <label for="name-61fc" class="u-label">Correo electrónico</label>
                          <a-input class="u-grey-5 u-input u-input-rectangle" placeholder="Cual es tu nombre?" v-model="form.email"/>
                        </a-form-model-item>
                      </div>
                      <div class="u-form-group u-form-message">
                        <a-form-model-item prop="message">
                          <label for="message-61fc" class="u-label">Mensaje</label>
                          <a-textarea placeholder="Escríbenos un mensaje" v-model="form.message" rows="4" cols="50" class="u-grey-5 u-input u-input-rectangle"></a-textarea>
                        </a-form-model-item>
                      </div>
                      <div class="u-align-left u-form-group u-form-submit">
                        <a-button class="u-border-none u-btn u-btn-submit u-button-style u-palette-1-base u-btn-1" :loading="loading" @click.stop.prevent="sendContactForm">
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
      </div>
    </section>
    <footerComponent></footerComponent>
  </main>
</template>
<script>
  import { mapGetters, mapMutations } from 'vuex'
  import { SendContactMessage } from '@/api/data'

  import HeaderComponent from '../single-page/home/components/header'
  import footerComponent from '../single-page/home/components/footer'

  export default {
    name: 'Contacts',
    components: {
      HeaderComponent,
      footerComponent
    },
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
      ...mapMutations([
        'setHeaderVisible',
        'setFooterVisible'
      ]),
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
    },
    mounted() {
      this.setHeaderVisible(false)
      this.setFooterVisible(false)
    }
  }
</script>
<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i|Cambay:400,400i,700,700i');
  @import url('https://fonts.googleapis.com/css?family=Advent+Pro:100,200,300,400,500,600,700|Cambay:400,400i,700,700i');

  @import "../single-page/home/nicepage.css";
  @import "../single-page/home/style.1.css";

  @font-face {
    font-family: 'Comfortaa Bold Alt1';
    src: url('../single-page/home/fonts/Comfortaa-Bold-Alt1.woff2') format('woff2'),
        url('../single-page/home/fonts/Comfortaa-Bold-Alt1.woff') format('woff'),
        url('../single-page/home/fonts/Comfortaa-Bold-Alt1.ttf') format('truetype');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
  }
body.landing {
  height: 100%;
  #page {
    height: 100%;
    > div {
      height: 100%;
      main {
        height: 100%;
      }
    }
  }
}
  .u-contacts-page {
    display: flex;
    flex-direction: column;

    > * {
      flex: 1 1 auto;
    }
    .u-section-1 {
      box-shadow: inset 1px 1px 5px 4px #ededed;
    }
    .u-header, .u-footer {
      flex: 0 0 auto;
    }

    .u-section-1 .u-sheet-1 {
      min-height: 700px;
      max-width: 1140px;
    }
    .u-section-1 .u-layout-wrap-1 {
      margin-top: 60px;
      margin-bottom: 46px;
    }
    .u-section-1 .u-layout-cell-1 {
      min-height: 580px;
    }
    .u-section-1 .u-container-layout-1 {
      padding: 30px 70px 30px 30px;
    }
    .u-section-1 .u-text-1 {
      font-weight: 700;
      font-size: 3.75rem;
      margin: 0 auto 0 0;
    }
    .u-section-1 .u-text-2 {
      margin: 20px auto 0 0;
    }
    .u-section-1 .u-text-3 {
      font-size: 1.25rem;
      font-weight: 700;
      margin: 51px 0 0;
    }
    .u-section-1 .u-layout-cell-2 {
      min-height: 580px;
    }
    .u-section-1 .u-container-layout-2 {
      padding: 30px 0;
    }
    .u-section-1 .u-form-1 {
      height: 401px;
      background-image: none;
      box-shadow: 5px 5px 20px 0 rgba(0,0,0,0.2);
      width: 436px;
      margin: 0 auto;
    }
    .u-section-1 .u-btn-1 {
      background-image: none;
      border-style: none;
    }
    @media (max-width: 1199px) {
      .u-section-1 .u-sheet-1 {
        min-height: 612px;
      }
      .u-section-1 .u-layout-wrap-1 {
        margin-bottom: 60px;
      }
      .u-section-1 .u-layout-cell-1 {
        min-height: 478px;
      }
      .u-section-1 .u-text-1 {
        font-size: 3rem;
      }
      .u-section-1 .u-layout-cell-2 {
        min-height: 478px;
      }
    }
    @media (max-width: 991px) {
      .u-section-1 .u-sheet-1 {
        min-height: 234px;
      }
      .u-section-1 .u-layout-cell-1 {
        min-height: 100px;
      }
      .u-section-1 .u-container-layout-1 {
        padding-right: 30px;
      }
      .u-section-1 .u-layout-cell-2 {
        min-height: 100px;
      }
      .u-section-1 .u-form-1 {
        width: 360px;
      }
    }
    @media (max-width: 767px) {
      .u-section-1 .u-sheet-1 {
        min-height: 334px;
      }
      .u-section-1 .u-container-layout-1 {
        padding-right: 10px;
        padding-left: 10px;
      }
      .u-section-1 .u-layout-cell-2 {
        min-height: 507px;
      }
      .u-section-1 .u-form-1 {
        height: 447px;
        width: 472px;
      }
    }
    @media (max-width: 575px) {
      .u-section-1 .u-text-1 {
        font-size: 2.25rem;
      }
      .u-section-1 .u-layout-cell-2 {
        min-height: 100px;
      }
      .u-section-1 .u-form-1 {
        width: 340px;
      }
    }
    .u-form-vertical.u-form-spacing-41 .u-form-group {
      margin-bottom: 0;
    }
    ul.u-text { list-style-type: disc; }
    .u-form {
      button.u-btn-1 {
        height: auto;
      }
    }
  }

</style>