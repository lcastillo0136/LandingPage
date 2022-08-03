<template>
  <div class="box_profile aside-profile">
    <figure v-if="avatar">
      <img :src="avatar" alt="" class="img-fluid" v-if="isImage">
      <img :src="avatarFile" alt="" class="img-fluid" v-else>
      <a-dropdown :trigger="['contextmenu']">
        <div>
          <vue-qr ref="QRCode" :text="userLink" :size="75" class="qr-image" :margin="5" v-clipboard:copy="userLink" v-clipboard:success="copyLink"></vue-qr>
        </div>
        <a-menu slot="overlay">
          <a-menu-item key="copy" v-clipboard:copy="userLink" v-clipboard:success="copyLink">
            Copiar enlace
          </a-menu-item>
          <a-menu-item key="share">
            Compartir Enlace
          </a-menu-item>
          <a-menu-item key="qr" @click="downloadQR" :loading="downloadingQR">
            Descargar QR
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </figure>
    <template v-if="user && user.role && user.role.is_provider">
      <small v-if="user.especialidad">
        {{ user.especialidad }}
      </small>
    </template>
    <h1 v-if="user && user.first_name">{{ user.first_name }}</h1>
    <!-- <ul class="contacts">
      <li><h6>Dirección</h6>{{ getUser.address.street }} {{ getUser.address.suburb }}, {{ getUser.address.city}}</li>
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
        <router-link :to="{ name: 'profile-appointments' }">
          <span>Citas</span>
          <i class="arrow_carrot-right"></i>
        </router-link>
      </li>
      <li v-if="isProvider">
        <router-link :to="{ name: 'profile-patients' }">
          <span>Pacientes</span>
          <i class="arrow_carrot-right"></i>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'profile-orders' }">
          <span>Órdenes</span>
          <i class="arrow_carrot-right"></i>
        </router-link>
      </li>
      <!-- <li>
        <router-link :to="{ name: 'profile-files' }">
          <span>Archivos</span>
          <i class="arrow_carrot-right"></i>
        </router-link>
      </li> -->
      <li v-if="isProvider">
        <router-link :to="{ name: 'profile-reviews' }">
          <span>Reseñas</span>
          <i class="arrow_carrot-right"></i>
        </router-link>
      </li>
      <li v-if="isProvider">
        <router-link :to="{ name: 'profile-settings' }">
          <span>Configuraciones</span>
          <i class="arrow_carrot-right"></i>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { getServerFile2, getServerFile } from '@/libs/util'

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
      }
    },
    methods: {
      preventClick(arg1, arg2, arg3) {
        
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
        overflow: visible;
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
        .qr-image {
          position: absolute;
          bottom: 0;
          right: 0;
          cursor: pointer;
          transition: all 250ms linear;
          &:hover {
            box-shadow: 0px 0px 6px 2px #00000036;
          }
        }
      }

      @media (max-width: 991px) {
        figure {
          margin: 25px auto;
        }
      }
      .contacts {
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
    }
  }
</style>