<template>
  <main class="home-page bg-hero wrapper faq" style="display: flex;flex-direction: column;justify-content: space-between;">
    <b-navbar toggleable="md">
      <b-container class="d-flex align-items-center">
        <b-navbar-brand class="mt-0" :to="{ name: 'home' }">
          <img src="/img/logo.svg" style="max-height: 100px;" class="mw-100"/>
        </b-navbar-brand>
       
        <b-navbar-nav class="ml-auto d-none d-md-block">
          <div class="mx-lg-5 d-lg-flex flex-lg-row" v-if="!hasToken">
            <b-button class="rounded-lg mx-1" variant="outline-primary" @click="$bvModal.show('login-1')">Entrar</b-button>
            <b-button :to="{ name: 'register' }" class="rounded-lg text-white" variant="primary">Registrarte gratis</b-button>
          </div>
          <div class="mx-lg-2 d-lg-flex flex-lg-row" v-else>
            <b-nav-item :to="{ name: 'profile-details' }">Hola, <b>@{{ User.username }}</b></b-nav-item>
            <b-button class="rounded-lg text-white" variant="primary" @click="dispachLogout">Salir</b-button>
          </div>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto d-block d-md-none w-100">
          <div class="mx-lg-5 d-lg-flex flex-lg-row" v-if="!hasToken">
            <b-button class="d-block w-100 my-1" variant="outline-primary" @click="$bvModal.show('login-1')">Entrar</b-button>
            <b-button :to="{ name: 'register' }" class="text-white w-100 my-1" variant="primary">Registrarte gratis</b-button>
          </div>
          <div class="mx-lg-2 d-lg-flex flex-lg-row" v-else>
            <b-nav-item :to="{ name: 'profile-details' }">Hola, <b>@{{ User.username }}</b></b-nav-item>
            <b-button class="rounded-lg text-white" variant="primary" @click="dispachLogout">Salir</b-button>
          </div>
        </b-navbar-nav>
      </b-container>
    </b-navbar>
    <Login></Login>
    <div class="flex-fill py-4 pb-5">
      <div class="container d-flex flex-column justify-content-between mb-5">
        <div class="search-header shadow-sm">
          <h2>Resuelve tus dudas</h2>
          <a-input placeholder="Preguntas frecuentes" v-model="search_concept">
            <svg class="absolute w-5 h-5 transform -translate-y-1/2 top-1/2 left-5" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" slot="prefix">
              <path d="M12.7 11.2298C13.6 10.0373 14.1 8.64596 14.1 7.0559C14.1 3.18012 11 0 7.1 0C3.2 0 0 3.18012 0 7.0559C0 10.9317 3.2 14.1118 7.1 14.1118C8.7 14.1118 10.2 13.6149 11.3 12.7205L14.3 15.7019C14.5 15.9006 14.8 16 15 16C15.2 16 15.5 15.9006 15.7 15.7019C16.1 15.3043 16.1 14.7081 15.7 14.3106L12.7 11.2298ZM7.1 12.0248C4.3 12.0248 2 9.83851 2 7.0559C2 4.27329 4.3 1.98758 7.1 1.98758C9.9 1.98758 12.2 4.27329 12.2 7.0559C12.2 9.83851 9.9 12.0248 7.1 12.0248Z" fill="#666"></path>
            </svg>

          </a-input>
        </div>
        <div class="faq-list" v-for="(faq_item, faq_item_i) in searchFAQ" :key="faq_item_i">
          <h5>{{ faq_item.title }}</h5>
          <a-collapse :bordered="false">
            <template #expandIcon="props">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="transform transition" :class="{ 'rotate-0': !props.isActive, 'rotate-90': props.isActive }">
                <path d="M5.5 2.5L10.5 8L5.5 13.5" stroke="#202124" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </template>
            <a-collapse-panel :key="faq_item_q.id" v-for="faq_item_q in faq_item.questions">
              <template #header>
                <span v-html="faq_item_q.header"></span>
              </template>
              <div v-html="faq_item_q.content"></div>
            </a-collapse-panel>
          </a-collapse>
        </div>
      </div>
    </div>
    <section class="py-5 bg-dark text-white">
      <b-container>
        <b-row>
          <b-col cols="12" lg="6" md="6" sm="6">
            <h6>@ 2022 powered with <b-icon-heart-fill style="color: hotpink; margin: 0px 5px;"></b-icon-heart-fill> by <a target="_blank" href="https://www.zibasoft.com/">Zibasoft</a></h6>
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
  import { getServerFile, cleanString } from '@/libs/util'
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  import RegisterForm from '../single-page/home/components/register'
  import Login from '../single-page/home/components/login'

  import * as _ from 'lodash'

  export default {
    name: 'FAQ',
    data() {
      return {
        faq: {
          prices: {
            title: 'Precios',
            questions: [{
              id: 1,
              header: '¿Por qué el costo de la suscripción del primer mes es gratis?',
              content: '<p>Con el primer mes gratis te damos la oportunidad de probar todas las herramientas maravillosas con las que podrás crear, editar y compartir tu tarjeta digital</p><p>Registrate rápidamente <a href="/register.html">aquí</a></p>'
            }, {
              id: 2,
              header: '¿Cuál es el costo total por la suscripción?',
              content: '<p>El costo total es de <b>$10.00 <small>USD</small></b> por una suscripción de 1 año.</p><p>No olvides que tu suscripción incluye el primer mes completamente gratis</p>'
            }, {
              id: 3,
              header: '¿Cuál es el proceso para concretar mi pago de la suscripción?',
              content: '<p>Dentro de tu perfil encontrarás diferentes medios para poder realizar tu pago con botones y accesos con el texto <i>Pagar aquí</i></p>'
            }, {
              id: 4,
              header: '¿Cuáles son los métodos de pago que tienen disponibles?',
              content: '<p>En el apartado para realizar pagos tendrás disponible los diferentes métodos de pago que son:<ul><li>Tarjeta de credito / debito</li><li>Oxxo Pay</li><li>Paypal</li></ul></p>'
            }]
          },
          general: {
            title: 'General',
            questions: [{
              id: 1,
              header: '¿Qué es <b>OnlyCards</b>?',
              content: '<p><b>OnlyCards</b> es la nueva forma compartir su información de contacto, tus redes sociales y tus servicios de manera fácil, rápida y de manera digital.</p><p>Con <b>OnlyCards</b> podrás compartir tu tarjeta digital por medio del enlace único que te generamos o escaneando tu código QR.</p><p>¡Forma parte de nuestra familia y comienza a hacer crecer tu red profesional y tu negocio!</p>'
            }, {
              id: 2,
              header: '¿Qué servicios están disponibles con mi membresía de <b>OnlyCards</b>?',
              content: '<p>Al adquirir el servicio de <b>OnlyCards</b> tendrás disponible los siguientes beneficios:<ul><li>Elegir tu propio diseño</li><li>Facilidad de actualización de foto de perfil y portada</li><li>Compartir las ligas de tus redes sociales</li><li>Tu propio QR que apunta directamente a tu tarjeta</li></ul></p>'
            }, {
              id: 3,
              header: '¿Qué se requiere para tener mi tarjeta digital?',
              content: '<p>¡Es muy sencillo!</p><p>Puedes <a href="/register.html">registrarte</a> fácilmente con tu nombre y tu correo electrónico.</p><p>Con solo esos datos podrás disfrutar de nuestras tarjetas digitales de <b>OnlyCards</b>.</p>'
            }, {
              id: 4,
              header: '¿Puedo ver un ejemplo de una tarjeta digital?',
              content: '<p>¡Claro!</p><p>En este enlace podrás ver la tarjeta digital de <a href="https://api.onlycards.me/p/67c41a4e-8340-4a2a-b8bf-49aa399ca842.html" target="_blank">Zibasoft</a><br>O escaneando este código QR: <br> <img src="/img/zibasoft-qr.png" alt="Zibasoft" border="0" /></p>'
            }, {
              id: 5,
              header: '¿Cuentan con tarjeta física y cuál sería su costo?',
              content: '<p ><del>¡Claro!</del></p><p>Por el momento no contamos con el servicio de tarjetas física para compartir <i>con un toque</i> su tarjeta en dispositivos con tecnología <b>NFC</b>.</p><p>¡Seguimos avanzando para poder ofrecerte todos los servicios que te ayudaran a conseguir más clientes!</p>'
            }]
          },
          security: {
            title: 'Seguridad y Privacidad',
            questions: [{
              id: 1,
              header: '¿Cómo sé que mi información está segura?',
              content: '<p><b>OnlyCards</b> es desarrollado por <b>Zibasoft</b> y como empresa desarrolladora de software aseguramos que todos los datos que dese compartir con nosotros serán almacenados y encriptados para evitar su mal uso.</p>'
            }, {
              id: 2,
              header: '¿Qué uso le dan a mi información?',
              content: '<p>Nosotros solo pedimos la información que tu deseas mostrar en tu tarjeta digital, toda la información almacenada en nuestros servidores está completamente encriptada y no se comparte ni compartirá por ningún medio externo a tu tarjeta digital.</p>'
            }, {
              id: 3,
              header: '¿Cómo puedo borrar mi información de sus servidores?',
              content: '<p>Lamentamos que nuestro servicio no fuera lo que tu buscabas.</p><p>Envianos un mensaje a nuestro número de WhatsApp <a href="https://wa.me/+5218181175165?text=Borrar mis datos" target="_blank">(818) 117-5165</a> en donde uno de nuestros agentes te atenderá y te guiara por el proceso para dar de baja tu información.</p><p>Al realizar este proceso ten en cuenta que tu tarjeta digital quedara desactivada definitivamente y tus clientes ya no podrán acceder por ninguno de nuestros medios.</p>'
            }]
          },
          profile: {
            title: 'Mi tarjeta digital',
            questions: [{
              id: 1,
              header: '¿Cómo puedo cambiar mi foto de perfil?',
              content: '<p>Fácilmente desde el apartado de Información Personal cuentas con el botón de <i>Foto de perfil</i> puedes seleccionar tu foto de perfil personal, el logotipo de tu empresa, la marca de tu producto, etc.</p>'
            }, {
              id: 2,
              header: '¿Cómo puedo cambiar el diseño de mi tarjeta?',
              content: '<p>Dentro del perfil de tu tarjeta digital cuentas con el apartado de <i>Configuraciones</i> y la sección de <i>diseño</i>.</p><p>Contamos con diferentes diseños para que elijas el que más se ajuste a tu personalidad.</p>'
            }, {
              id: 3,
              header: '¿Puedo bloquear mi información para que solo lo vean personas con autorización?',
              content: '<p>Desde el apartado de <i>Configuración</i> puedes definir tu código de seguridad que limita que personas puedan ver tu información.</p>'
            }, {
              id: 4,
              header: '¿Por qué no se ve mi foto de portada en mi tarjeta digital?',
              content: '<p>Si ya cargaste tu imagen de <i>foto de portada</i> revisa que el diseño que tienes asignado en tu tarjeta sea uno con foto de portada visible.</p>'
            }, {
              id: 5,
              header: '¿Cuántas redes sociales o enlaces puedo ingresar?',
              content: '<p>Actualmente no contamos con un límite de registro de redes sociales o enlaces, así que coparte todos tus medios de contacto!.</p>'
            }, {
              id: 6,
              header: 'Realicé mi pago anual pero mi tarjeta no aparece activa.',
              content: '<p>Lamentamos el inconveniente.</p><p>Envianos un mensaje a nuestro número de WhatsApp <a href="https://wa.me/+5218181175165?text=Mi cuenta no se activo y ya pague" target="_blank">(818) 117-5165</a> en donde uno de nuestros agentes te atenderá y resolverá al instante.</p>'
            }, {
              id: 7,
              header: '¿Puedo crear una tarjeta digital para mi negocio o producto?',
              content: '<p>Claro que puedes crear tarjeta digital para negocio, servicio, producto, perfil laboral, etc.</p><p>Cuentas con las herramientas para cambiar la imagen de perfil o logo y agregar un archivo PDF con el menú, detalles o tu hoja de vida.</p>'
            }]
          }
          // troubleshooting: {
          //   title: 'Problemas',
          //   questions: [{
          //     id: 1,
          //     header: 'Why is the charge different than the cost of the subscription?',
          //     content: 'Content'
          //   }]
          // }
        },
        sending: false,
        search_concept: ''
      }
    },
    components: {
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
      },
      searchFAQ() {
        return (this.search_concept||'').trim() !== '' && this.search_concept.length >= 3 ? _.filter(_.mapValues(this.faq, (f) => {
          let _q = _.filter(f.questions, (q) => {
            return cleanString(q.content).indexOf(cleanString(this.search_concept)) > -1
          });

          let _t = cleanString(f.title).indexOf(cleanString(this.search_concept)) > -1;
          if (_q.length > 0 || _t) return { title: f.title, questions: _q };
          return false;
        })) : this.faq;
      },

    },
    methods: {
      ...mapActions([
        'handleLogOut',
        'handleLogin'
      ]),
      dispachLogout() {
        this.handleLogOut()
      },
      cleanString() {

      }
    },
}
</script>
<style lang="scss">
  .home-page.faq {
    &.box_list .wrapper {
      margin-top: 0 !important;
      padding-top: 30px !important;
    }
    .search-header {
      background: #fff;
      border-radius: 20px;
      text-align: center;
      padding-left: 132px;
      padding-right: 132px;
      padding-top: 80px;
      padding-bottom: 80px;
      > h2 {
        margin-bottom: 30px;
        color: #1f2024;
      }
      .ant-input-affix-wrapper {
        font-size: 19px;
        .ant-input-prefix {
          left: 20px;
          svg {
            width: 20px;
            height: 20px;
          }
        }
        .ant-input-suffix {
          right: 20px;
          svg {
            width: 20px;
            height: 20px;
          }
        }
        .ant-input {
          height: 68px;
          border: none;
          padding-top: 1.25rem;
          padding-bottom: 1.25rem;
          font-size: 1.25rem;
          line-height: 1.4;
          color: #1f2024;
          padding-left: 3.5rem;
          padding-right: 0.75rem;
          background-color: #1f202412;
          border-radius: 1rem;

          
          &::placeholder {
            color: #6b7280;
          }
        }
      }
    }
    .faq-list {
      margin-top: 3.5rem;
      h5 {
        font-size: 1.875rem;
        line-height: 110%;
        letter-spacing: -.01em;
        font-weight: 700;
        color: #1f2024;
        margin-bottom: 0;
      }
      .ant-collapse {
        margin-top: 1rem;
        background: #0000;
        border: 0;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        > .ant-collapse-item {
          border-bottom: none;
          border-radius: 9999px;
          display: inline-block;
          > .ant-collapse-header {
            color: #1f2024;
            font-size: 1.15rem;
            line-height: 1.4;
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
            padding-left: 2.4rem;
            padding-right: 1rem;
            > .ant-collapse-arrow {
              font-size: 16px;
            }
          }
          > .ant-collapse-content {
            max-width: 36rem;
            padding: 1.5rem;
            border-width: 1px;
            border-radius: 1rem;
            margin-top: 0.5rem;
            border: 1px solid #e5e7eb;
            > .ant-collapse-content-box {
              padding: 0px;
              font-size: 1.15rem;
              line-height: 1.4;

              img {
                max-width: 150px;
                text-align: center;
                display: block;
                margin: 10px auto;
              }
            }
          }
          &:nth-child(1n+2) {
            margin-top: 16px;
          }
          &:hover {
            .ant-collapse-header {
              background: #e9e9e9;
              border-radius: 9999px;
            }
          }
        }
      }
    }
  }

  .home-page.faq {
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

    .anticon {
      vertical-align: 0;
    }

    .whatsapp-button {
      background: var(--green) !important;
      color: var(--white) !important;
      border-color: var(--green);
    }
  }
</style>