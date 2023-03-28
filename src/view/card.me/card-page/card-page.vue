<template>
  <main class="card-container" v-if="ready" :class="{ 'homeView': homeView, 'blocked-card': blockedCard, 'create-card': createCardView }">
    <template v-if="card && !blockedCard && active_account">
      <b-card tag="article" class="mb-md-4 shadow" no-body :class="[card.design || '']">
        <div v-if="card.avatar" class="avatar-container">
          <template v-if="typeAsImage">
            <b-card-img :src="card.avatar" alt="Image" top v-if="isImage"></b-card-img>
            <b-card-img :src="avatarFile" alt="Image" top v-else></b-card-img>
          </template>
          <template v-else>
            <video class="shadow-sm bg-white border border-white ant-avatar ant-avatar-circle ant-avatar-image" autoplay loop muted>
              <source :src="videoAvatarSrc" id="video_here">
                Your browser does not support HTML5 video.
            </video>
          </template>
        </div>
        <div class="profile-job-n-name">
          <h4>
            {{ card.full_name }}
          </h4>
          <small>
            <span>{{ card.profesion }}</span> 
            <template v-if="card.company_name">
              en <span class="font-weight-bold">{{ card.company_name }}</span>
            </template>
          </small>
        </div>
        <template v-if="card.cover">
          <div class="image-cover">
            <b-card-img :src="card.cover" alt="Image" v-if="isCoverImage"></b-card-img>
            <b-card-img :src="coverFile" alt="Image" v-else></b-card-img>
          </div>
        </template>
        <b-card-body>
          <div v-if="card.phone" class="send-whatsapp">
            <a :href="`https://wa.me/+${card.phone}`" target="_blank">
              <b-icon-whatsapp></b-icon-whatsapp>
            </a>
          </div>
          <div class="share-card" v-if="!card.hide_share">
            <a-dropdown>
              <a>
                <a-icon type="share-alt" />
              </a>
              <a-menu slot="overlay">
                <a-menu-item key="copy" v-clipboard:copy="userLink" v-clipboard:success="!isPreview && copyLink">
                  Copiar enlace
                </a-menu-item>
                <a-menu-item key="share" v-if="!isPreview">
                  <navigator-share :url="userLink" :title="card.full_name" :text="card.full_name" :on-error="shareError" :on-success="shareSuccess">
                    <template #clickable>
                      Compartir Enlace
                    </template>
                  </navigator-share>
                </a-menu-item>
                <a-menu-divider  v-if="!isPreview"/>
                <a-menu-item key="qr" class="text-center" @click="showQR" :loading="downloadingQR" v-if="!isPreview">
                  Ver QR
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </div>
          <b-card-title class="mb-1 profile-name">
            {{ card.title || '' }} {{ card.first_name }}<br>{{ card.last_name }}
          </b-card-title>
          <b-card-sub-title class="profile-job">
            {{ card.profesion }} <div v-if="card.company_name" class="company-name">{{ card.company_name }}</div>
          </b-card-sub-title>
          <b-card-text class="mt-3" v-html="card.biography">
          </b-card-text>

          <a-carousel arrows class="mb-3" v-if="cardImages && cardImages.length > 0">
            <div slot="prevArrow" slot-scope="props" class="custom-slick-arrow" style="left: 10px;zIndex: 1">
              <a-icon type="left-circle" />
            </div>
            <div slot="nextArrow" slot-scope="props" class="custom-slick-arrow" style="right: 10px">
              <a-icon type="right-circle" />
            </div>
            <div v-for="(file_image) in cardImages">
              <img :src="file_image.url" border="0" :alt="file_image.name" />
              <img :src="file_image.url" border="0" :alt="file_image.name" class="background-clone" />
            </div>
          </a-carousel>
          
          <div class="social-list">
            <div :class="['caracteristica', 'icon-' + (social.network_icon || 'globe')]" v-for="(social) in socialsWithIcon">
              <a :href="social.network_url" target="_blank">
                <div class="rounded-circle bg-success icon">
                  <i :class="['bi', 'bi-' + (social.network_icon || 'globe')]"></i>
                </div>
              </a>
            </div>
          </div>


          <div>
            <div class="caracteristica" v-if="card.bday && isValidBday && !card.hide_bday">
              <div class="rounded-circle bg-success icon">
                <b-icon-calendar2-fill></b-icon-calendar2-fill>
              </div>
              <span>
                <span>
                  <span class="flex-row">
                    {{ card.bday | moment('DD/MM/YYYY') }} 
                    <small class="font-italic ml-2 align-self-center">{{ card.bday | moment('from', 'now', true) }}</small>
                  </span>
                </span>
                <small>Cumpleaños</small>
              </span>
            </div>
            <div class="caracteristica" v-if="card.personal_url">
              <div class="rounded-circle bg-success icon">
                <b-icon-link></b-icon-link>
              </div>
              <span>
                <a :href="card.personal_url" target="_blank">{{ card.personal_url }}</a>
              </span>
            </div>
            <div class="caracteristica" v-if="card.phone && !card.hide_personal_phone">
              <div class="rounded-circle bg-success icon">
                <b-icon-telephone-fill></b-icon-telephone-fill>
              </div>
              <span>
                <a :href="`tel:+${card.phone}`" target="_blank">
                  {{ card.phone | phone }}
                </a>
                <small>Móvil</small>
              </span>
            </div>
            <div class="caracteristica" v-if="card.tel_oficina && !card.hide_office_phone">
              <div class="rounded-circle bg-success icon">
                <b-icon-telephone-fill></b-icon-telephone-fill>
              </div>
              <span>
                <a :href="`tel:+${card.tel_oficina}`" target="_blank">
                  {{ card.tel_oficina | phone }}
                </a>
                <small>Trabajo</small>
              </span>
            </div>
            <div class="caracteristica" v-if="card.email && !card.hide_email">
              <div class="rounded-circle bg-success icon">
                <b-icon-envelope-fill></b-icon-envelope-fill>
              </div>
              <span>
                <a :href="`mailto:${card.email}`">{{ card.email }}</a>
              </span>
            </div>
            <div class="caracteristica" v-for="(direccion) in card.addresses">
              <div class="rounded-circle bg-success icon">
                <b-icon-house-fill></b-icon-house-fill>
              </div>
              <span>
                {{ direccion.alias || '' }}
                <small v-if="direccion.latitude && direccion.longitude">
                  <a :href="'https://www.google.com/maps/search/?api=1&query='+direccion.latitude+','+direccion.longitude" target="_blank">
                    {{ direccion.street }} {{ direccion.exterior_number }}, {{ direccion.suburb }} {{ direccion.township }}, {{ direccion.state }} {{ direccion.country }}
                  </a>
                </small>
                <small v-else>
                  {{ direccion.street }} {{ direccion.exterior_number }}, {{ direccion.suburb }} {{ direccion.township }}, {{ direccion.state }} {{ direccion.country }}
                </small>
              </span>
            </div>
            <div :class="['caracteristica', 'icon-' + (network.network_icon || 'globe')]" v-for="(network) in socialsWithoutIcon">
              <div class="rounded-circle bg-success icon">
                <i :class="['bi', 'bi-' + (network.network_icon || 'globe')]"></i>
              </div>
              <span>
                <a :href="network.network_url" target="_blank">{{ network.network_url }}</a>
              </span>
            </div>
          </div>

          <div v-if="cardPDF" class="mb-3 card-pdf">
            <iframe :src="cardPDF.url" border="0"></iframe>
          </div>
          <div v-if="cardVideo" class="mb-3 card-video">
            <video-player  class="video-player-box"
                 ref="videoPlayer"
                 :options="playerOptions"
                 :playsinline="true">
            </video-player>
          </div>
          
          <div class="skills">
            <div class="skill " v-for="(skill) in card.skills">
              <b-badge pill variant="light">#{{ skill.name }}</b-badge>
            </div>
          </div>
          
          <div class="quote">{{ card.quote }}</div>

          <b-button variant="primary" @click.stop.prevent="saveContact" class="w-100" v-if="!isPreview && card.can_save_vcf">Guardar contacto</b-button>
        </b-card-body>
      </b-card>
      <footer class="powered-footer" v-if="!isPreview && !homeView">
        <router-link :to="{ name: 'home' }">Onlycards</router-link> powered with <b-icon-heart></b-icon-heart> by <a target="_blank" href="https://www.zibasoft.com/">Zibasoft</a>
      </footer>
      <b-modal id="modal-user-qr" size="sm" hide-footer centered headerClass="px-2 pt-2 pb-0 border-bottom-0 text-center" bodyClass="px-0">
        <template #modal-title>Escanear este código</template>
        <div class="d-block text-center" @click="visibleQRMenu=true">
          <a-dropdown v-model="visibleQRMenu">
            <vue-qr ref="QRCode" :text="userLink" :size="255" class="qr-image" :margin="0" :logoMargin="1" logoSrc="/img/icono.png"></vue-qr>
            <a-menu slot="overlay">
              <a-menu-item key="copy" v-clipboard:copy="userLink" v-clipboard:success="copyLink">
                Copiar enlace
              </a-menu-item>
              <a-menu-item key="share">
                <navigator-share :url="userLink" :title="card.full_name" :text="card.full_name" :on-error="shareError" :on-success="shareSuccess">
                  <template #clickable>
                    Compartir Enlace
                  </template>
                </navigator-share>
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item key="qr" class="text-center" @click="downloadQR" :loading="downloadingQR">
                Descargar QR
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </b-modal>
    </template>
    <template v-else-if="blockedCard && active_account">
      <div class="blocked-container">
        <b-card class="border-0 shadow p-4">
          <div class="d-flex align-items-center flex-column">
            <div class="lock-icon mb-3" :class="{ 'open': security_valid, 'error': security_error }">
              <b-icon-key-fill rotate="90"></b-icon-key-fill>
            </div>
            <h2 class="font-weight-normal">
              Codigo de seguridad
            </h2>
            <span>Ingrese el código de 4 dígitos</span>
          </div>
          <security-code @done="scReady" :valid="security_valid"></security-code>
          <div class="" style="height: 50px" class="mt-5">
            <a-button type="primary" size="large" :disabled="!security_valid" class="w-100 h-100 h5" @click="openCard" >
              Ver tarjeta
            </a-button>
          </div>
        </b-card>
      </div>
    </template>
    <template v-else>
      <div class="d-flex flex-column" style="max-width: 500px;">
        <h2>Servicio suspendido</h2>
        <img src="/img/blocked-card.png" class="blocked-card mt-3"/>
        <h5 class="mt-5">
          Para reactivar el servicio, acceda a su perfil y en el apartado de <i>Pagar ahora</i> realiza su pago y el servicio se activa automáticamente
        </h5>
      </div>
    </template>
    <u-animate-container v-if="!createCardView">
      <u-animate name="fadeInDown" delay="2s" duration="1s" :iteration="1" :offset="0" animateClass="animated" class="homeView-whatsapp shadow" :begin="false" >
        Abrir whatsapp y ver QR
      </u-animate>
      <u-animate name="fadeInDown" delay="3s" duration="1s" :iteration="1" :offset="0" animateClass="animated" :begin="false" class="homeView-socialnetworks shadow">
        Comparte tus redes sociales
      </u-animate>
      <u-animate name="fadeInDown" delay="4s" duration="1s" :iteration="1" :offset="0" animateClass="animated" :begin="false"  class="homeView-links shadow">
        Formas de contacto
      </u-animate>
      <!-- <u-animate name="fadeInDown" delay="5s" duration="1s" :iteration="1" :offset="0" animateClass="animated" :begin="false"  class="homeView-card shadow">
        Esta es tu tarjeta digital
      </u-animate> -->
    </u-animate-container>
  </main>
</template>

<script>
  import Vue from 'vue'
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import { getCard, getUserInfo } from '@/api/user'
  import { getServerFile2, getServerFile } from '@/libs/util'
  import VCard from 'vcard-creator'
  import VueAnalytics from 'vue-analytics'
  import NavigatorShare from 'vue-navigator-share'
  import SecurityCode from './components/security-code'
  import Cookies from 'js-cookie'

  import * as _ from 'lodash'

  export default {
    name: 'CardPage',
    props: {
      user: {
        type: Object,
        default: function () {
          return { }
        }
      },
      homeView: {
        type: Boolean,
        default: false
      },
      preview: {
        type: Boolean,
        default: false
      },
      createCardView: {
        type: Boolean,
        default: false
      }
    },
    components: {
      NavigatorShare,
      SecurityCode
    },
    data() {
      return {
        ready: false,
        avatarFile: '',
        coverFile: '',
        userData: null,
        downloadingQR: false,
        visibleQRMenu: false,
        security_valid: false,
        security_error: false
      }
    },
    watch :{
      getUser() {

      },
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
    filters: {
      facebook(val) {
        return /(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/g.test(val) ? val : `https://www.facebook.com/${(val||'').replace('https://', '')}`
      },
      twitter(val) {
        return /http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/.test(val) ? val : `https://twitter.com/${(val||'').replace('https://','')}`
      },
      youtube(val) {
        return /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/.test(val) ? val : `https://youtu.be/${(val||'').replace('https://', '')}`
      }
    },
    computed: {
      ...mapGetters([
        'hasToken',
        'settings',
        'getUser'
      ]),
      isValidBday() {
        return this.$moment(this.card.bday).isValid()
      },
      User() {
        return this.getUser || {}
      },
      card() {
        return this.user && this.user.id ? this.user : this.userData
      },
      isMobile() {
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          return true
        } else {
          return false
        }
      },
      isPreview() {
        return this.$route.meta.preview || this.preview === true
      },
      avatar () {
        return (this.card && this.card.avatar) || '/img/blank-profile.webp'
      },
      cover () {
        return (this.card && this.card.cover) || '/img/blank-profile.webp'
      },
      isImage() {
        try {
          if (this.card.avatar && this.card.avatar instanceof File) {

            var reader = new FileReader();
            reader.onloadend = () => {
              this.avatarFile = reader.result;
            }

            if (this.avatar) {
              reader.readAsDataURL(this.avatar);
            } else {

            }
            return false;
          }
        } catch(e) { 

        }
         
       return true
      },
      typeAsImage() {
        return !this.isImage ? this.card.avatar.type.indexOf('image/') > -1 : !(['mp4', 'avi', 'mp3', 'mov', 'mkv', 'flv', 'vob', 'avi', 'wmv'].includes(this.avatarExtension))
      },
      videoAvatarSrc () {
        return (!this.isImage && !this.typeAsImage && URL.createObjectURL(this.card.avatar)) || this.card.avatar
      },
      isCoverImage() {
        try {
          if (this.card.cover && this.card.cover instanceof File) {

            var reader = new FileReader();
            reader.onloadend = () => {
              this.coverFile = reader.result;
            }

            if (this.cover) {
              reader.readAsDataURL(this.cover);
            } else {

            }
            return false;
          }
        } catch(e) { }
         
       return true
      },
      socialsWithIcon() {
        return _.filter(this.card.social_networks, (n) => n.network_icon != 'globe')
      },
      socialsWithoutIcon() {
        return _.filter(this.card.social_networks, { network_icon: 'globe' })
      },
      userLink() {
        return getServerFile2(`p/${this.card.uuid_key}.html`)
      },
      avatarExtension () {
        return this.card.avatar.slice((this.card.avatar.lastIndexOf(".") - 1 >>> 0) + 2)
      },
      cardImages() {
        return this.card && _.filter((this.card.files || []), (f) => {
          const extension = f.extension || (f.path && f.path.slice((f.path.lastIndexOf(".") - 2 >>> 0) + 3)) || f.name.slice((f.name.lastIndexOf(".") - 2 >>> 0) + 3)

          return f.type.indexOf('image/') != -1 || ['jpg','jpng','png','gif','bmp'].includes(extension)
        })
      },
      cardPDF() {
        return this.card && _.find((this.card.files || []), (f) => {
          const extension = f.extension || (f.path && f.path.slice((f.path.lastIndexOf(".") - 2 >>> 0) + 3)) || f.name.slice((f.name.lastIndexOf(".") - 2 >>> 0) + 3)

          return f.type.indexOf('application/pdf') != -1 || ['pdf'].includes(extension)
        })
      },
      cardVideo() {
        return this.card && _.find((this.card.files || []), (f) => {
          const extension = f.extension || (f.path && f.path.slice((f.path.lastIndexOf(".") - 2 >>> 0) + 3)) || f.name.slice((f.name.lastIndexOf(".") - 2 >>> 0) + 3)

          return (f.type.indexOf('video/') != -1 || ['mp4', 'avi', 'mp3', 'mov', 'mkv', 'flv', 'vob', 'avi', 'wmv'].includes(extension))
        })
      },
      playerOptions() {
        return {
          muted: true,
          language: 'en',
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          sources: [{
            type: "video/mp4",
            src: this.cardVideo && this.cardVideo.url
          }],
          poster: "/static/images/author.jpg",
        }
      },
      blockedCard() {
        let _cookie = !!Cookies.get('sc-open')

        return this.card.enable_security_code && this.homeView === false && this.preview === false && _cookie !== true
      },
      active_account() {
        return (this.card.active_account && this.$moment.utc(this.card.active_account).isValid() && this.$moment().utc().isBefore(this.$moment.utc(this.card.active_account))) || this.preview === true
      },
    },
    methods: {
      saveContact() {
        const myVCard = new VCard()

        myVCard.addName(this.card.last_name||'', this.card.first_name, '', this.card.title||'', '')
          
        if (this.card.company_name)
          myVCard.addCompany(this.card.company_name)
        
        if (this.card.profesion)
          myVCard.addJobtitle(this.card.profesion)
        
        if (this.card.especialidad)
          myVCard.addRole(this.card.especialidad)
        
        if (this.card.email)
          myVCard.addEmail(this.card.email)

        if (this.card.phone)
          myVCard.addPhoneNumber(this.card.phone, 'PREF;HOME')
        
        if (this.card.tel_oficina)
          myVCard.addPhoneNumber(this.card.tel_oficina, 'WORK')
      
        _.each(this.card.addresses, (a) => {
          myVCard.addAddress(a.alias, '', a.street, a.township, a.state, a.postal_code, a.country)
        })
        
        if (this.card.personal_url)
          myVCard.addURL(this.card.personal_url)

        if (this.card.avatar) {
          myVCard.addPhotoURL(this.card.avatar)
        }

        if (this.card.social_facebook) {
          myVCard.addURL(this.card.social_facebook)
        }
        if (this.card.social_twitter) {
          myVCard.addURL(this.card.social_twitter)
        }
        if (this.card.social_instagram) {
          myVCard.addURL(this.card.social_instagram)
        }
        if (this.card.social_linkedin) {
          myVCard.addURL(this.card.social_linkedin)
        }
        if (this.card.social_youtube) {
          myVCard.addURL(this.card.social_youtube)
        }
        if (this.card.social_tiktok) {
          myVCard.addURL(this.card.social_tiktok)
        }
        if (this.card.social_paypal) {
          myVCard.addURL(this.card.social_paypal)
        }

        // console.log(myVCard.toString())

        var a = document.createElement('a')
        a.download = this.card.full_name + ".vcf"
        a.textContent = this.card.full_name

        if (Blob) {
          var blob = new Blob([ myVCard.buildVCard() ], { "type": "text/vcard" })
          a.href = URL.createObjectURL(blob)
        } else {
          a.href = "data:text/vcard;base64," + btoa(myVCard.buildVCard())
        }

        a.click()
      },
      handleScroll (event) {
        if ((window.innerHeight + window.scrollY) < document.body.scrollHeight) {
          document.querySelector('.card-body').style.marginTop = `${event.currentTarget.scrollY * -1}px`
        }
      },
      toDataURL(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
          var reader = new FileReader();
          reader.onloadend = function() {
            callback(reader.result);
          }
          reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
      },
      validateUrl (url) {
        if (url) {
          let _finalUrl = url;
          if (!/^(https?:\/\/)/.test(_finalUrl)) {
            _finalUrl = 'https://'+_finalUrl
          }
          return _finalUrl
        } else {
          return false;
        }
      },
      loadInfo() {
        getUserInfo(this.hasToken).then(({ data }) => data).then((result) => {
          this.card = { ... result.data }

          document.title = this.card.full_name
          this.toDataURL(this.card.avatar, (dataUrl) => {
            this.card.base_image = dataUrl
          })
        }).catch((err) => {
          setTimeout(() => {
            // this.$router.replace({ name: 'home' })
          }, 10000)
        }).then(() => {
          this.ready = true
        })
      },
      copyLink() {
        this.visibleQRMenu = false
        this.$notification.success({
          message: 'Enlace copiado',
          description: 'Ya lo puedes compartir con tus contactos'
        })
      },
      downloadQR () {
        this.visibleQRMenu = false
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
      },
      showQR () {
        this.visibleQRMenu = false
        this.$bvModal.show('modal-user-qr')
      },
      shareError () {
        this.visibleQRMenu = false
        this.$notification.error({
          message: 'Unable to share on this device',
          description: 'Your device cant share, please try again on another device'
        })
      },
      shareSuccess() {
        this.visibleQRMenu = false
        this.$notification.error({
          message: 'Unable to share on this device',
          description: 'Your device cant share, please try again on another device'
        })
      },
      scReady(code) {
        this.security_valid = this.security_error = false
        if (this.card.security_code == code) {
          this.security_valid = true
        } else {
          this.security_error = true
        }
      },
      openCard() {
        Cookies.set('sc-open', true, {
          expires: new Date(new Date().getTime() + 15 * 60 * 1000)
        })
        this.card.enable_security_code = false
      }
    },
    created () {
      //window.addEventListener('scroll', this.handleScroll);
    },
    destroyed () {
      //window.removeEventListener('scroll', this.handleScroll);
    },
    mounted() {
      if (this.user && this.user.id) {
        this.ready = true
      } else if (this.$route.params && this.$route.params.uuid) {
        this.$fingerprint.get((components) => {
          let _fingerprint = this.$fingerprint.x64hash128(components.map((pair) => { return pair.value }).join(), 31)
          getCard({ 
            fingerprint: _fingerprint,
            uuid: this.$route.params.uuid
          }).then(({ data }) => data).then((result) => {
            this.userData = { ... result.data }

            document.title = this.userData.full_name
            this.toDataURL(this.userData.avatar, (dataUrl) => {
              this.userData.base_image = dataUrl
            })

            if (this.userData.google_trackid) {
              // a Promise
              Vue.use(VueAnalytics, {
                id: this.userData.google_trackid
              })
              this.$ga.page('/')
            }
          }).catch((err) => {
            setTimeout(() => {
              this.$router.replace({ name: 'home' })
            }, 10000)
          }).then(() => {
            this.ready = true
          })
        });
      } else if (this.$route.params && this.$route.meta.preview && this.hasToken) {
        this.loadInfo()
      } else {
        this.$router.replace({ name: 'home' })
      }
    }
  }
</script>
<style lang="scss">
  main.card-container {
    --w-e-textarea-bg-color: #fff;
    --w-e-textarea-color: #333;
    --w-e-textarea-border-color: #ccc;
    --w-e-textarea-slight-border-color: #e8e8e8;
    --w-e-textarea-slight-color: #d4d4d4;
    --w-e-textarea-slight-bg-color: #f5f2f0;
    --w-e-textarea-selected-border-color: #B4D5FF;
    --w-e-textarea-handler-bg-color: #4290f7;
    --w-e-toolbar-color: #595959;
    --w-e-toolbar-bg-color: #fff;
    --w-e-toolbar-active-color: #333;
    --w-e-toolbar-active-bg-color: #f1f1f1;
    --w-e-toolbar-disabled-color: #999;
    --w-e-toolbar-border-color: #e8e8e8;
    --w-e-modal-button-bg-color: #fafafa;
    --w-e-modal-button-border-color: #d9d9d9;
    
    display: flex;
    flex: 1 1 auto;
    justify-content: center;
    padding-top: 20px;
    background-color: #fafafa;
    z-index: 1;
    min-height: 100%;

    .card {
      width: 20rem;
      max-width: 100%;
      border-radius: 20px;
      .card-body {
        background-color: #fff;
        position: relative;
        .send-whatsapp {
          position: absolute;
          right: 10px;
          top: -50px;
          color: #fff;
          z-index: 1;
          a {
            color: #fff;
            border-radius: 50%;
            width: 45px;
            height: 45px;
            background-color: #28a745d1;
            display: flex;
            align-content: center;
            justify-content: center;
            align-items: center;
            font-size: 25px;
          }
        }
        .share-card {
          position: absolute;
          right: 10px;
          top: -50px;
          color: #fff;
          z-index: 1;
          a {
            color: #fff;
            border-radius: 50%;
            width: 45px;
            height: 45px;
            background-color: #28a745d1;
            display: flex;
            align-content: center;
            justify-content: center;
            align-items: center;
            font-size: 25px;
            i {
              border: solid 2px;
              border-radius: 50%;
              padding: 6px;
              font-size: 21px;
            }
          }
        }
        .send-whatsapp + .share-card {
          top: -101px;
        }
      }
      .caracteristica {
        display: flex;
        flex-direction: row;
        align-content: center;
        align-items: center;
        gap: 10px;
        padding: 10px 20px;
        border: dashed 1px #ededed;
        border-left: none;
        border-right: none;
        margin-left: -20px;
        margin-right: -20px;
        &+.caracteristica {
          border-top: none;
        }

        &:last-of-type {
          margin-bottom: 10px;
        }
        .icon {
          width: 35px;
          height: 35px;
          color: #fff;
          text-align: center;
          line-height: 35px;
          flex: 0 0 auto;
        }

        &.icon-twitter { 
          font-size: 19px;
          color: #00aced; 
          color: rgb(0, 172, 237); 
          .bg-success {
            background-color: #fff !important;
            border: solid 1px #28a745;
          }
        }
        &.icon-facebook { 
          font-size: 19px;
          color: #3b5998; 
          color: rgb(59, 89, 152); 
          .bg-success {
            background-color: #fff !important;
            border: solid 1px #28a745;
          }
        }
        &.icon-googleplus { 
          font-size: 19px;
          color: #dd4b39; 
          color: rgb(221, 75, 57); 
          .bg-success {
            background-color: #fff !important;
            border: solid 1px #28a745;
          }
        }
        &.icon-rss { 
          font-size: 19px;
          color: #f26522; 
          color: rgb(242, 101, 34); 
          .bg-success {
            background-color: #fff !important;
            border: solid 1px #28a745;
          }
        }
        &.icon-pinterest { 
          font-size: 19px;
          color: #cb2027; 
          color: rgb(203, 32, 39); 
          .bg-success {
            background-color: #fff !important;
            border: solid 1px #28a745;
          }
        }
        &.icon-linkedin { 
          font-size: 19px;
          color: #007bb6; 
          color: rgb(0, 123, 182); 
          .bg-success {
            background-color: #fff !important;
            border: solid 1px #28a745;
          }
        }
        &.icon-youtube { 
          font-size: 19px;
          color: #bb0000; 
          color: rgb(187, 0, 0); 
          .bg-success {
            background-color: #fff !important;
            border: solid 1px #28a745;
          }
        }
        &.icon-vimeo { 
          font-size: 19px;
          color: #1ab7ea; 
          color: rgb(26, 183, 234); 
          .bg-success {
            background-color: #fff !important;
            border: solid 1px #28a745;
          }
        }
        &.icon-tumblr { 
          font-size: 19px;
          color: #32506d; 
          color: rgb(50, 80, 109); 
          .bg-success {
            background-color: #fff !important;
            border: solid 1px #28a745;
          }
          .bi-tumblr::after {
            content: 't';
            font-style: normal;
            font-weight: bold;
          }
        }
        &.icon-instagram { 
          font-size: 19px;
          color: #bc2a8d; 
          color: rgb(188, 42, 141); 
          .bg-success {
            background-color: #fff !important;
            border: solid 1px #28a745;
          }
        }
        &.icon-flickr { 
          font-size: 19px;
          color: #ff0084; 
          color: rgb(255, 0, 132); 
          .bg-success {
            background-color: #fff !important;
            border: solid 1px #28a745;
          }
        }
        &.icon-dribbble { 
          font-size: 19px;
          color: #ea4c89; 
          color: rgb(234, 76, 137);
          .bg-success {
            background-color: #fff !important;
            border: solid 1px #28a745;
          } 
        }
        &.icon-quora { 
          font-size: 19px;
          color: #a82400; 
          color: rgb(168, 36, 0); 
          .bg-success {
            background-color: #fff !important;
            border: solid 1px #28a745;
          }
        }
        &.icon-foursquare { 
          font-size: 19px;
          color: #0072b1; 
          color: rgb(0, 114, 177);
          .bg-success {
            background-color: #fff !important;
            border: solid 1px #28a745;
          }
        }
        &.icon-forrst { 
          font-size: 19px;
          color: #5B9A68; 
          color: rgb(91, 154, 104); 
          .bg-success {
            background-color: #fff !important;
            border: solid 1px #28a745;
          }
        }
        &.icon-vk { 
          font-size: 19px;
          color: #45668e; 
          color: rgb(69, 102, 142); 
          .bg-success {
            background-color: #fff !important;
            border: solid 1px #28a745;
          }
        }
        &.icon-wordpress { 
          font-size: 19px;
          color: #21759b; 
          color: rgb(33, 117, 155); 
          .bg-success {
            background-color: #fff !important;
            border: solid 1px #28a745;
          }
        }
        &.icon-stumbleupon { 
          font-size: 19px;
          color: #EB4823; 
          color: rgb(235, 72, 35); 
          .bg-success {
            background-color: #fff !important;
            border: solid 1px #28a745;
          }
        }
        &.icon-yahoo { 
          font-size: 19px;
          color: #7B0099; 
          color: rgb(123, 0, 153); 
          .bg-success {
            background-color: #fff !important;
            border: solid 1px #28a745;
          }
        }
        &.icon-blogger { 
          font-size: 19px;
          color: #fb8f3d; 
          color: rgb(251, 143, 61); 
          .bg-success {
            background-color: #fff !important;
            border: solid 1px #28a745;
          }
        }
        &.icon-soundcloud { 
          font-size: 19px;
          color: #ff3a00; 
          color: rgb(255, 58, 0); 
          .bg-success {
            background-color: #fff !important;
            border: solid 1px #28a745;
          }
        }
        &.icon-paypal { 
          font-size: 19px;
          color: #003087; 
          color: rgb(0, 48, 135);
          .bg-success {
            background-color: #fff !important;
            border: solid 1px #28a745;
          } 
        }
        &.icon-tiktok { 
          font-size: 15px;
          color: #f1f1f1;
          text-shadow: -1px -1px 1px #25f4ee, 1px 1px 1px #fe2c55;
          span {
            text-shadow: none;
          }
          .bg-success {
            background-color: #000 !important;
            border: solid 1px #28a745;
          }
        }
        &.icon-globe { 
          font-size: 15px;
          color: #f1f1f1;
          span {
            text-shadow: none;
          }
          .bg-success {
          }
        }
        &.icon-github {
          font-size: 19px;
          color: #000;
          .bg-success {
            background-color: #fff !important;
            border: solid 1px #28a745;
          } 
        }
        &.icon-onlycards {
          font-size: 19px;
          color: #000;
          .bg-success {
            background-color: #fff !important;
            border: solid 1px #28a745;
            overflow: hidden;
          }
          .bi-onlycards {
            display: block;
            background-image: url(/favicon.ico);
            background-size: 90%;
            background-repeat: no-repeat;
            background-position: 2px 2px;
            width: 33px;
            height: 33px;
          }
        }
        &.icon-mercado-shops {
          font-size: 19px;
          color: #000;
          .bg-success {
            background-color: #fff !important;
            border: solid 1px #28a745;
            overflow: hidden;
          }
          .bi-mercado-shops {
            display: inline-block;
            background-image: url(/img/mercado-shops.png);
            background-size: 90%;
            background-repeat: no-repeat;
            background-position: 2px 2px;
            width: 33px;
            height: 33px;
          }
        }
        &.icon-mercado-libre {
          font-size: 19px;
          color: #000;
          .bg-success {
            background-color: #fff !important;
            border: solid 1px #28a745;
            overflow: hidden;
          }
          .bi-mercado-libre {
            display: inline-block;
            background-image: url(/img/mercado-libre.png);
            background-size: 90%;
            background-repeat: no-repeat;
            background-position: 2px 2px;
            width: 33px;
            height: 33px;
          }
        }

        &[class*="icon-"] {
          .icon {
            color: inherit;
          }
          span {
            color: #555;
            white-space: nowrap;
            text-overflow: ellipsis;
            display: inline-block;
            overflow: hidden;
          }
        }

        span {
          font-size: 14px;
          display: flex;
          flex-direction: column;
          small {
            color: var(--gray);
          }
        }
        a { color: inherit; }
      }
      .skills {
        display: flex;
        flex-direction: row;
        margin-bottom: 10px;
        align-content: center;
        justify-content: flex-start;
        align-items: center;
        gap: 0px 5px;
        overflow-x: auto;
        padding: 5px 0 10px;
        flex-wrap: wrap;

        &::-webkit-scrollbar-track {
          -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
          background-color: #F5F5F5;
          border-radius: 10px;
        }

        &::-webkit-scrollbar {
          width: 6px;
          background-color: #F5F5F5;
          height: 6px;
          visibility: hidden;
        }

        &:hover{
          &::-webkit-scrollbar {
            visibility: visible;
          }
        }

        &::-webkit-scrollbar-thumb {
          border-radius: 10px;
          -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
          background-color: #9e9e9e;
        }

        .skill {
        }
      }
      .quote {
        padding-bottom: 10px;
        font-size: 12px;
        color: var(--gray);
        font-style: italic;
        text-align: center;
      }
      .card-title {
        border-left: dashed 1px #9e9e9e;
        padding-left: 10px;
        padding-top: 5px;
      }
      .card-subtitle {
        border-left: dashed 1px #9e9e9e;
        padding-left: 10px;
        padding-top: 10px;
        padding-bottom: 5px;
        .company-name {
          font-style: italic;
          font-weight: normal;
          font-size: 13px;
        }
      }
      .image-cover {
        display: none;
      }
      blockquote {
        background-color: var(--w-e-textarea-slight-bg-color);
        border-left: 8px solid var(--w-e-textarea-selected-border-color);
        display: block;
        font-size: 100%;
        line-height: 1.5;
        margin: 10px 0;
        padding: 10px;
      }
      .profile-job-n-name {
        display: none;
      }
      .social-list {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        justify-content: flex-start;
        margin-bottom: 10px;
        .caracteristica {
          flex: 0 0 auto;
          display: inline;
          border: 0;
          padding: 0;
          margin: 0;
        }
      }
      &.design-1 {
        .avatar-container {
          position: relative;
          z-index: 1;
          > video {
            display: block;
            width: 100%;
            height: 100%;
            -o-object-fit: cover;
            object-fit: cover;    
            border: none !important;
            border-radius: 0;
          }
        }
        .image-cover {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          display: block;
        }
      }
      &.design-2 {
        display: flex;
        .avatar-container {
          order: 2;
          border-radius: 50%;
          border: solid 3px #fff;
          width: 90px;
          height: 90px;
          margin-top: -45px;
          margin-left: 10px;
          overflow: hidden;
          box-shadow: 0 0.125rem 0.25rem rgb(0 0 0 / 8%);
          margin-bottom: 0.25rem;
          > img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          > video {
            display: block;
            width: 100%;
            height: 100%;
            -o-object-fit: cover;
            object-fit: cover;    
            border: none !important;
            border-radius: 0;
          }
        }
        .image-cover {
          display: block;
          order: 1;
          max-height: 200px;
          overflow: hidden; 
        }
        .card-body {
          order: 3;
          .send-whatsapp {
            top: -68px;
          }
          .share-card {
            top: -73px;
          }
          .send-whatsapp + .share-card {
            top: -20px;
          }
        }
      }
      &.design-3 {
        --user-background: #fff;
        display: flex;
        margin-top: 80px;
        overflow: visible !important;
        border-radius: 50px !important;
        background: var(--user-background);
        .avatar-container {
          border-radius: 50%;
          border: solid 3px #fff;
          width: 130px;
          height: 130px;
          margin-top: -60px;
          margin-left: auto;
          margin-right: auto;
          overflow: hidden;
          box-shadow: 0 0.125rem 0.25rem rgb(0 0 0 / 8%);
          margin-bottom: 0.25rem;
          > img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          > video {
            display: block;
            width: 100%;
            height: 100%;
            -o-object-fit: cover;
            object-fit: cover;    
            border: none !important;
            border-radius: 0;
          }
        }
        .image-cover {
          display: none;
        }
        .card-body {
          background: #fff;
          .send-whatsapp {
            top: -68px;
          }
          .share-card {
            top: -68px;
          }
          .send-whatsapp + .share-card {
            top: -20px;
          }
        }
      }
      &.design-4 {
        display: flex;
        .avatar-container {
          order: 2;
          border-radius: 0;
          border: solid 0px #fff;
          width: 90px;
          height: 150px;
          margin-top: -110px;
          margin-left: 50%;
          overflow: hidden;
          box-shadow: 0 0.125rem 0.25rem rgb(0 0 0 / 8%);
          margin-bottom: 0.25rem;
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
          transform: translateX(-150%);
          > img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          > video {
            display: block;
            width: 100%;
            height: 100%;
            -o-object-fit: cover;
            object-fit: cover;    
            border: none !important;
            border-radius: 0;
          }
        }
        .profile-job-n-name {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          order: 3;
          border-radius: 0;
          border: solid 0px #fff;
          width: 176px;
          height: 150px;
          margin-top: -154px;
          margin-left: 50%;
          overflow: hidden;
          box-shadow: 0 0.125rem 0.25rem rgb(0 0 0 / 8%);
          margin-bottom: 0.25rem;
          background: #fff;
          padding: 10px;
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
          transform: translateX(-26%);
          h4 {
            font-size: 1.2rem;
          }
        }
        .image-cover {
          display: block;
          order: 1;
          max-height: 200px;
          overflow: hidden; 
        }
        .card-body {
          order: 4;
          .send-whatsapp {
            top: -27px;
          }
          .share-card {
            top: -27px;
          }
          .send-whatsapp + .share-card {
            top: 23px;
          }
          .profile-name {
            display: none;
          }
          .profile-job {
            display: none;
          }
        }
      }
      &.design-5 {
        display: flex;
        .avatar-container {
          order: 2;
          border-radius: 50%;
          border: solid 3px #fff;
          width: 145px;
          height: 145px;
          margin-top: -138px;
          margin-left: calc(100% - 130px);
          overflow: hidden;
          box-shadow: 0 0.125rem 0.25rem rgb(0 0 0 / 8%);
          margin-bottom: 0.25rem;
          position: relative;
          z-index: 16;
          > img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          > video {
            display: block;
            width: 100%;
            height: 100%;
            -o-object-fit: cover;
            object-fit: cover;
          }
        }
        .image-cover {
          display: block;
          order: 1;
          max-height: 290px;
          overflow: hidden; 
          img {
            border-radius: 0;
          }
        }
        .profile-job-n-name {
          display: block;
          position: absolute;
          top: 3%;
          left: 20px;
          width: 61%;
          color: #fdfffe;
          text-shadow: 0 0 2px #00000061;
          z-index: 21;
          h4 {
            font-weight: bold;
            margin-bottom: 0;
          }
        }
        .card-body {
          order: 3;
          z-index: 14;
          padding-top: 0;
          .send-whatsapp {
            top: -23px;
            left: 16px;
            right: auto;
          }
          .share-card {
            top: -23px;
            left: 16px;
            right: auto;
          }
          .send-whatsapp + .share-card {
            left: 70px;
          }
          .profile-name {
            display: none;
          }
          .profile-job {
            display: none;
          }
          .card-text {
            margin-left: -20px;
            background: #f5f5f5;
            padding: 1.25rem;
            margin-right: -20px;
            color: #4e4e4e;
            margin-bottom: 1rem;
          }
          &:before {
            content: "";
            background: #f5f5f5;
            width: 200%;
            height: 160px;
            position: absolute;
            left: -20px;
            top: -84px;
            transform: rotateZ(-10deg);
            z-index: -1;
            box-shadow: 0px -4px 6px 1px #ededed59;
          }
        }
      }
    }
    .powered-footer {
      position: fixed;
      bottom: 0;
      right: 0;
    }
    .homeView-whatsapp, .homeView-socialnetworks, .homeView-links, .homeView-card {
      display: none;
    }

    &.homeView {
      background-color: transparent;
      .homeView-whatsapp {
        display: block;
        position: absolute;
        z-index: 1030;
        background: #fff;
        border-radius: 5px;
        padding: 10px;
        top: 148px;
        font-weight: bold;
        left: 57px;
        &:before {
          content: '';
          width: 17px;
          height: 20px;
          position: absolute;
          border: solid 2px;
          border-color: #0000 #0000 #54bd95 #54bd95;
          top: 99px;
          left: 86px;
          transform: rotateZ(-148deg);
          z-index: 1030;
        }
        &:after {
          content: '';
          border: 2px solid #54bd95;
          border-color: #0000 #0000 #0000 #54bd95;
          height: 134px;
          width: 141px;
          border-radius: 230px 0 0 150px;
          position: absolute;
          top: -35px;
          left: 31px;
          transform: rotateZ(-51deg);
          z-index: 1030;
        }
      }
      .homeView-socialnetworks {
        display: block;
        position: absolute;
        z-index: 1030;
        background: #fff;
        border-radius: 5px;
        padding: 10px;
        top: 319px;
        font-weight: bold;
        right: 40px;

        &:before {
          content: "";
          width: 17px;
          height: 20px;
          position: absolute;
          border: solid 2px;
          border-color: #0000 #0000 #54bd95 #54bd95;
          top: 99px;
          left: 5px;
          transform: rotateZ(39deg);
          z-index: 1030;
        }
        &:after {
          content: "";
          border: 2px solid #54bd95;
          border-color: #0000 #0000 #0000 #54bd95;
          height: 180px;
          width: 158px;
          border-radius: 230px 0 0 150px;
          position: absolute;
          top: -51px;
          left: -60px;
          transform: rotateZ(231deg);
          z-index: 1030;
        }
      }
      .homeView-links {
        display: block;
        position: absolute;
        z-index: 1030;
        background: #fff;
        border-radius: 5px;
        padding: 10px;
        top: 510px;
        font-weight: bold;
        left: 13px;

        &:before {
          content: "";
          width: 17px;
          height: 20px;
          position: absolute;
          border: solid 2px;
          border-color: #0000 #0000 #54bd95 #54bd95;
          top: 100px;
          right: 13px;
          transform: rotateZ(-140deg);
          z-index: 1030;
        }
        &:after {
          content: "";
          border: 2px solid #54bd95;
          border-color: #0000 #0000 #0000 #54bd95;
          height: 140px;
          width: 89px;
          border-radius: 230px 0 0 150px;
          position: absolute;
          top: -16px;
          right: -8px;
          transform: rotateZ(-52deg);
          z-index: 1030;
        }
      }
      .homeView-card {
        display: block;
        position: absolute;
        z-index: 1030;
        background: #fff;
        border-radius: 5px;
        padding: 10px;
        top: -32px;
        font-weight: bold;
        left: 50%;
        font-size: 18px;
        transform: translateX(-50%);
      }
    }

    .ant-carousel {
      margin-left: -20px;
      margin-right: -20px;
      
      .slick-slide {
        text-align: center;
        height: 160px;
        line-height: 160px;
        background: #4fb76721;
        overflow: hidden;
        
        img {
          display: block;
          object-fit: cover;
          max-width: 100%;
          max-height: 100%;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          z-index: 7;

          &.background-clone {
            opacity: 0.5;
            transform: translateX(0%) scale(1);
            left: 0;
            top: 0;
            z-index: 1;
            width: 100%;
            filter: blur(8px);
            -webkit-filter: blur(8px);
          }
        }
        
        > div {
          height: 100%;
          > div {
            height: 100%;
            position: relative;
          }
        }
      }
      
      .custom-slick-arrow {
        width: 25px;
        height: 25px;
        font-size: 25px;
        color: #fff;
        background-color: #1f2d3d1c;
        border-radius: 50%;
      }
      
      .custom-slick-arrow:before {
        display: none;
      }

      .custom-slick-arrow:hover {
        
      }
    }

    .card-pdf {
      border: 0;
      margin-left: -20px;
      margin-right: -20px;
      min-width: 100%;
      height: 500px;
      iframe {
        border: 0;
      }
    }
    .card-video {
      border: 0;
      margin-left: -20px;
      margin-right: -20px;
      min-width: 100%;
      .video-player {
        width: 100%;
        .video-js {
          width: 100%;
          height: 250px;
          .vjs-big-play-button {
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
    }

    &.blocked-card {
      padding-top: 0;
      .blocked-container {
        background: #e1f3ff;
        flex: 1 1 auto;
      }
      .card {
        min-width: 700px;
        height: auto !important;
        margin-top: 74px;
        margin-left: auto;
        margin-right: auto;

        .lock-icon {
          background: #e1f3ff;
          width: 110px;
          height: 110px;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-content: center;
          align-items: center;
          justify-content: center;
          color: #1994ff;
          position: relative;
          padding-top: 8px;
          transition: all 250ms linear;

          &:before {
            content: '';
            position: absolute;
            width: 35px;
            height: 35px;
            border: solid 2px;
            border-radius: 50%;
          }
          &:after {
            content: '';
            width: 19px;
            height: 17px;
            position: absolute;
            border-top: solid 2px;
            border-left: solid 2px;
            border-right: solid 2px;
            border-top-left-radius: 50%;
            border-top-right-radius: 50%;
            top: 28px;
            transform: rotateY(360deg);
            transform-origin: right;
            transition: all 250ms linear;
          }

          &.open {
            background-color: #e5ffec;
            color: #11b746;
            &:after {
              height: 20px;
              top: 26px;
              transform: rotateY(180deg);
            }
          }

          &.error {
            background-color: #ffebef;
            color: #fb435c;
            &:after {
              
            }
          }
        }

        @media only screen and (max-width: 720px) {
          min-width: auto;
          margin-left: 15px;
          margin-right: 15px;
          width: auto;
          border-radius: 20px;
        }
      }
    }

    .blocked-card {
      width: 500px;
    }

    &.create-card {
      background-color: #0000;
      padding-top: 0;
      justify-content: end;
      .shadow {
        box-shadow: none !important;
      }
      .card {
        margin-bottom: 0 !important;
        border-radius: 0;
        border: 0;
      }
    }

    @media only screen and (max-width: 450px) {
      padding-top: 0;
      flex-direction: column;
      justify-content: flex-start;
      .card {
        width: 100%;
        border-radius: 0;
        border: none;
        box-shadow: none !important;
      }
      .powered-footer {
        position: static;
        margin-top: 10px;
        margin-left: 10px;
        margin-bottom: 5px;
      }
      &.homeView {
        .homeView-whatsapp {
          display: none;
        }
        
        .homeView-socialnetworks {
          display: none;
        }

        .homeView-links {
          display: none;
        }
      }
    }
  }
</style>
