<template>
  <div>
    <div class="box_profile aside-profile mb-2 pb-0">
      <!-- <ul class="contacts">
        <li><h6>Direccion</h6>{{ getUser.address.street }} {{ getUser.address.suburb }}, {{ getUser.address.city}}</li>
        <li v-if="getUser.phone"><h6>Teléfono</h6><a :href="'tel:' + getUser.phone ">{{ getUser.phone | phone }}</a></li>
      </ul> -->
      <ul class="contacts">
        <li>
          <router-link :to="{ name: 'profile-details' }">
            <span>
              <a-icon type="user"></a-icon>
              Información Personal
            </span>
            <a-icon type="caret-right"></a-icon>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'profile-history' }">
            <span>
              <a-icon type="idcard"></a-icon>
              Información Profesional
            </span>
            <a-icon type="caret-right"></a-icon>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'profile-orders' }">
            <span>
              <a-icon type="container"></a-icon>
              Pagos
            </span>
            <a-icon type="caret-right"></a-icon>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'profile-analytics' }">
            <span>
              <a-icon type="area-chart"></a-icon>
              Analytics
            </span>
            <a-icon type="caret-right"></a-icon>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'profile-files' }">
            <span>
              <a-icon type="folder"></a-icon>
              Archivos
            </span>
            <a-icon type="caret-right"></a-icon>
          </router-link>
        </li>
        <!-- <li>
          <router-link :to="{ name: 'profile-reviews' }">
            <span>Reseñas</span>
            <i class="arrow_carrot-right"></i>
          </router-link>
        </li> -->
        <li>
          <router-link :to="{ name: 'profile-payment' }">
            <span>
              <a-icon type="dollar"></a-icon>
              Pagar ahora
            </span>
            <a-icon type="caret-right"></a-icon>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'profile-settings' }">
            <span>
              <a-icon type="setting"></a-icon>
              Configuraciones
            </span>
            <a-icon type="caret-right"></a-icon>
          </router-link>
        </li>
      </ul>
      <template v-if="active_account">
        <a-divider class="mb-3 mt-0" dashed></a-divider>
        <h6 class="text-left mb-2">
          Tarjeta digital en línea hasta
          <small>{{ user.active_account | moment('dddd DD, MMM YYYY hh:mm a') }}</small>
        </h6>
        <b>
          <a-progress type="circle" :percent="daysRemainingPercent" :format="percent => `Quedan ${daysRemaining} dias`" />
        </b>
      </template>
      <template v-else>
        <a-divider class="mb-3 mt-0" dashed></a-divider>
        <h6 class="text-left mb-2">
          Tarjeta digital fuera de línea
          <small class="text-danger">Activa de nuevo tu servicio</small>
        </h6>
         
        <b-button :to="{ name: 'profile-payment' }" size="sm" variant="success" v-b-tooltip.hover.bottom title="Ir a pagar" class="mb-4 mt-2">
          <b-icon icon="credit-card" class="mr-2"></b-icon>
          Pagar ahora
        </b-button>
      </template>
      <template v-if="active_account && daysRemaining < 10">
        <br><br>
        No te quedes sin tu servicio 
        <b-button :to="{ name: 'profile-payment' }" size="sm" variant="success" v-b-tooltip.hover.bottom title="Ir a pagar" class="mb-4 mt-2">
          <b-icon icon="credit-card" class="mr-2"></b-icon>
          Renovar ahora
        </b-button>
      </template>
    </div>
    <!-- <p class="calendar">{{ daysRemaining }} <em>Dias restantes</em></p> -->
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { getServerFile2, getServerFile } from '@/libs/util'
  import domtoimage from 'dom-to-image';

  export default {
    name: 'AsideProfile',
    props: {
      user: {
        type: Object,
        default: function () {
          return { }
        }
      }
    },
    data() {
      return {
        visible: false,
        avatarFile: '',
        coverFile: '',
        downloadingQR: false
      }
    },
    watch: {
      avatar () {
        if (!this.isImage) {
          var reader = new FileReader();
          reader.onloadend = () => {
            this.avatarFile = reader.result;
          }

          if (this.avatar) {
            reader.readAsDataURL(this.avatar);
          } else {

          }
        }
      },
      cover () {
        if (!this.isCoverImage) {
          var reader = new FileReader();
          reader.onloadend = () => {
            this.coverFile = reader.result;
          }

          if (this.cover) {
            reader.readAsDataURL(this.cover);
          } else {

          }
        }
      }
    },
    computed: {
      ...mapGetters([
        'hasToken',
        'settings',
        'getUser'
      ]),
      avatar () {
        return (this.user && this.user.avatar) || '/img/blank-profile.webp'
      },
      cover () {
        return (this.user && this.user.cover) || '/img/blank-profile.webp'
      },
      isImage() {
        try {
          if (this.user.avatar && this.user.avatar instanceof File) {
            return false;
          }
        } catch(e) { }
         
       return true
      },
      isCoverImage() {
        try {
          if (this.user.cover && this.user.cover instanceof File) {
            return false;
          }
        } catch(e) { }
         
       return true
      },
      isProvider() {
        return this.user.role && this.user.role.is_provider
      },
      isClient() {
        return this.user.role && this.user.role.is_client
      },
      userLink() {
        return getServerFile2(`p/${this.user.uuid_key}.html`)
      },
      appImage () {
        return getServerFile('public/company/company_logo.png')
      },
      active_account() {
        return this.user.active_account && this.$moment.utc(this.user.active_account).isValid() && this.$moment().utc().isBefore(this.$moment.utc(this.user.active_account))
      },
      daysRemaining() {
        return (this.active_account ? this.$moment.utc(this.user.active_account).diff(this.$moment(), 'days') : 0)
      },
      daysRemainingPercent() {
        return (this.daysRemaining * 100 / 365)
      }
    },
    methods: {
      preventClick(arg1, arg2, arg3) {
        
      },
      copyLink() {
        this.$notification.success({
          message: 'Enlace copiado',
          description: 'Ya lo puedes compartir con tus contactos'
        })
      },
      downloadQR () {
        this.downloadingQR = true
        this.saveAs(this.$refs.QRCode.$el.src, 'QR.png');
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
      }
    },
    mounted() {
      // this.user
    }
  }
</script>
<style lang="scss">
  .box_profile {
    &.aside-profile {
      
      font-family: 'Poppins', 'Montserrat',  sans-serif;
      figure {
        margin: -1px -26px -46px;
        position: relative;
        button {
          border-radius: 50%;
          background: var(--orange);
          color: var(--light);
          position: absolute;
          z-index: 1;
          bottom: 5px;
          right: 5px;
          width: 40px;
          height: 40px;
          border: 0;
          display: flex;
          flex-direction: row;
          align-content: center;
          justify-content: center;
          align-items: center;
          box-shadow: 0px 0px 8px -3px #424242;
          outline: none;
        }
        &.profile-header {
          position: relative;
          min-height: 150px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: center;
          .img-fluid {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
          .profile-avatar-container {
            margin: -1px auto 12px auto;
          }
        }
      }

      @media (max-width: 991px) {
        figure {
          margin: 25px auto;
        }
        .link-cardme {
          .ant-tag {

          }
        }
        ul.contacts {
          border-bottom: none;
          margin-bottom: 0;
          margin-top: 0;
          padding-bottom: 0;
        }
      }
      .contacts {
        border: none;
        margin-bottom: 0px;
        li {
          margin-bottom: 4px;
          a {
            display: flex;
            align-items: center;
            color: #525661;
            background: #0000;
            margin: 0;
            font-weight: bold;
            text-decoration: none;
            span {
              border-radius: 6px;
              padding: 7px 14px;
            }
            i {
              margin-left: auto;
              visibility: hidden;
              display: inline-block;
              vertical-align: 1px;
            }
            &.router-link-active {
              span {
                color: #141823;
                background: #f3f4f8;
              }
              i {
                color: var(--primary);
                visibility: visible;
              }
            }
          }
        }
      }

      .link-cardme {
        .ant-tag {
          cursor: pointer;
        }
      }
      .button-group {
        display: flex;
        margin: 0 -25px;
        flex-direction: row;
        .ant-btn {
          border-radius: 0;
          flex: 1 1 auto;
          min-height: 42px;
          line-height: 42px;
          font-size: 13px;
          & + .ant-btn {

          }
        }
      }
      .download-message {
        color: #484848;
        font-size: 17px;
        font-weight: bold;
        background: #ffffffcf;
        white-space: nowrap;
        cursor: pointer;
      }
      div.ant-progress-circle,
      div.ant-progress-line {
        margin-right: 8px;
        margin-bottom: 8px;
        .ant-progress-text {
          width: 90%;
        }
      }
    }
  }
      /* First we style the container element.  */
      .calendar{
        margin: 1rem auto;
        padding-top:5px;
        width: 100px;
        background:#ededef;
        background: -webkit-gradient(linear, left top, left bottom, from(#ededef), to(#ccc)); 
        background: -moz-linear-gradient(top,  #ededef,  #ccc); 
        font-weight:bold;
        font-size: 25px;
        line-height: 55px;
        text-align:center;
        color:#000;
        text-shadow:#fff 0 1px 0; 
        border-radius:3px;  
        position:relative;
        box-shadow:0 2px 2px #888;
        }

      /* Em element is also styled, it contains the month’s name. */
      .calendar em{
        display: block;
        font-style: normal;
        font-weight: bold;
        font-stretch: normal;
        font-size: 11px;
        line-height: 30px;
        color: #fff;
        text-shadow:#00365a 0 -1px 0; 
        background:#04599a;
        background:-webkit-gradient(linear, left top, left bottom, from(#04599a), to(#00365a)); 
        background:-moz-linear-gradient(top,  #04599a,  #00365a); 
        border-bottom-right-radius:3px;
        border-bottom-left-radius:3px;  
        border-top:1px solid #00365a;
        padding-left: 2px;
        padding-right: 2px;
      }

      /* Now I am styling the pseudo elements. Container’s pseudo elements (:before and :after) are used to create thos circles, "holes in te paper". */
      .calendar:before, .calendar:after{
        content:'';
        float:left;
        position:absolute;
        top:5px;  
        width:8px;
        height:8px;
        background:#111;
        z-index:1;
        border-radius:10px;
        box-shadow:0 1px 1px #fff;
        }
      .calendar:before{left:11px;}  
      .calendar:after{right:11px;}

      /*…and em’s pseudo elements are used to create the rings: */
      .calendar em:before, .calendar em:after{
        content:'';
        float:left;
        position:absolute;
        top:-5px; 
        width:4px;
        height:14px;
        background:#dadada;
        background:-webkit-gradient(linear, left top, left bottom, from(#f1f1f1), to(#aaa)); 
        background:-moz-linear-gradient(top,  #f1f1f1,  #aaa); 
        z-index:2;
        border-radius:2px;
        }
      .calendar em:before{left:13px;} 
      .calendar em:after{right:13px;} 
</style>