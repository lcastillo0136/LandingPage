<template>
  <div>
    <div class="box_profile aside-profile mb-2 pb-0">
      <!-- <figure class="profile-header">
        <img :src="cover" alt="" class="img-fluid"  v-if="isCoverImage"/>
        <img :src="coverFile" alt="" class="img-fluid" v-else/>
      </figure>
      <div v-if="avatar" class="profile-avatar-container">
        <a-avatar :size="90" :src="avatar" v-if="isImage" class="shadow-sm bg-white"/>
        <a-avatar :size="90" :src="avatarFile"  v-else class="shadow-sm bg-white"/>
      </div>
      <template>
        <small v-if="user.especialidad" class="d-inline-block">
          {{ user.especialidad }}
        </small>
      </template>
      <h1 v-if="user && user.first_name" class="mb-0">
        
      </h1>
      <div class="link-cardme">
        <template v-if="active_account">
          <a-tag color="green">
            Perfil activo 
          </a-tag>
        </template>
        <template v-else>
          <a-tag color="red">
            Perfil desactivado
          </a-tag>
          <small>
            <router-link :to="{ name: 'profile-payment' }">Ir a pagar</router-link>
          </small>
        </template>
      </div>
      <div class="position-relative p-3">
        <vue-qr :text="userLink" :size="200" :margin="10" ref="QRCode"></vue-qr>
        <a-button class="download-message" @click="downloadQR" :loading="downloadingQR">
          <a-icon type="download"></a-icon>
          Descargar QR
        </a-button>
      </div>
      <div class="button-group d-flex">
        <a-button type="dashed" @click="$emit('preview')">Preview</a-button>
        <a-button type="dashed" v-clipboard:copy="userLink" @click="copyLink">Copiar link</a-button>
      </div> -->
      <!-- <ul class="contacts">
        <li><h6>Direccion</h6>{{ getUser.address.street }} {{ getUser.address.suburb }}, {{ getUser.address.city}}</li>
        <li v-if="getUser.phone"><h6>Teléfono</h6><a :href="'tel:' + getUser.phone ">{{ getUser.phone | phone }}</a></li>
      </ul> -->
      <ul class="contacts">
        <li>
          <router-link :to="{ name: 'profile-details' }">
            <span>Información Personal</span>
            <a-icon type="caret-right"></a-icon>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'profile-orders' }">
            <span>Pagos</span>
            <a-icon type="caret-right"></a-icon>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'profile-analytics' }">
            <span>Analytics</span>
            <a-icon type="caret-right"></a-icon>
          </router-link>
        </li>
        <!-- <li>
          <router-link :to="{ name: 'profile-files' }">
            <span>Archivos</span>
            <i class="arrow_carrot-right"></i>
          </router-link>
        </li> -->
        <!-- <li>
          <router-link :to="{ name: 'profile-reviews' }">
            <span>Reseñas</span>
            <i class="arrow_carrot-right"></i>
          </router-link>
        </li> -->
        <li>
          <router-link :to="{ name: 'profile-payment' }">
            <span>Pay now</span>
            <a-icon type="caret-right"></a-icon>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'profile-settings' }">
            <span>Configuraciones</span>
            <a-icon type="caret-right"></a-icon>
          </router-link>
        </li>
      </ul>
      <!-- <b class="pt-4 d-block">
        Perfil activo hasta el <br>
        {{ user.active_account | moment('dddd DD, MMM YYYY hh:mm a') }}
      </b>
      <a-divider></a-divider>
      <b>
        Quedan {{ daysRemaining }} dias
      </b> -->
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
              padding: 7px 20px;
            }
            i {
              margin-left: auto;
              display: none;
            }
            &.router-link-active {
              span {
                color: #141823;
                background: #f3f4f8;
              }
              i {
                color: var(--primary);
                display: inline-block;
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