<template>
  <div class="box_profile aside-profile mb-2">
    <figure v-if="avatar">
      <img :src="avatar" alt="" class="img-fluid" v-if="isImage">
      <img :src="avatarFile" alt="" class="img-fluid" v-else>
    </figure>
    <template>
      <small v-if="user.especialidad">
        {{ user.especialidad }}
      </small>
    </template>
    <h1 v-if="user && user.first_name" class="mb-0">
      {{ user.first_name }}
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
    </div>
    <!-- <ul class="contacts">
      <li><h6>Direccion</h6>{{ getUser.address.street }} {{ getUser.address.suburb }}, {{ getUser.address.city}}</li>
      <li v-if="getUser.phone"><h6>Teléfono</h6><a :href="'tel:' + getUser.phone ">{{ getUser.phone | phone }}</a></li>
    </ul> -->
    <ul class="contacts">
      <li>
        <router-link :to="{ name: 'profile-details' }">
          <span>Detalles</span>
          <i class="arrow_carrot-right"></i>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'profile-orders' }">
          <span>Pagos</span>
          <i class="arrow_carrot-right"></i>
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
      <!-- <li>
        <router-link :to="{ name: 'profile-settings' }">
          <span>Configuraciones</span>
          <i class="arrow_carrot-right"></i>
        </router-link>
      </li> -->
    </ul>
    <b class="pt-4 d-block">
      Perfil activo hasta el <br>
      {{ user.active_account | moment('dddd DD, MMM YYYY hh:mm a') }}
    </b>
    <a-divider></a-divider>
    <b>
      Quedan {{ daysRemaining }} dias
    </b>
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
        downloadingQR: false
      }
    },
    watch:{
      avatar () {
        if (!this.isImage) {
          var reader  = new FileReader();
          reader.onloadend = () => {
            this.avatarFile = reader.result;
          }

          if (this.avatar) {
            reader.readAsDataURL(this.avatar);
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
      isImage() {
        try {
          if (this.user.avatar && this.user.avatar instanceof File) {
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
      this.user
    }
  }
</script>
<style lang="scss">
  .box_profile {
    &.aside-profile {
      figure {
        margin: -1px -26px 12px;
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
        border-top: none;
        li {
          margin-bottom: 4px;
          a {
            display: flex;
            align-items: center;
            color: #639bbe;
            background: var(--light);
            border-radius: 6px;
            padding: 10px;
            margin: 0;
            span {
            }
            i {
              margin-left: auto
            }
            &.router-link-active {
              color: var(--light);
              background: var(--cyan);
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
</style>