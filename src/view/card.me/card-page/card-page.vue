<template>
  <main class="card-container" v-if="ready">
    <template v-if="card">
      <b-card tag="article" class="mb-md-4 shadow" no-body>
        <template v-if-="card.avatar">
          <b-card-img :src="card.avatar" alt="Image" top v-if="isImage"></b-card-img>
          <b-card-img :src="avatarFile" alt="Image" top v-else></b-card-img>
        </template>
        <b-card-body>
          <div v-if="card.phone" class="send-whatsapp">
            <a :href="`https://wa.me/+${card.phone}`" target="_blank">
              <b-icon-whatsapp></b-icon-whatsapp>
            </a>
          </div>
          <b-card-title class="mb-1">
            {{ card.title || '' }} {{ card.first_name }}<br>{{ card.last_name }}
          </b-card-title>
          <b-card-sub-title>
            {{ card.profesion }} <div v-if="card.company_name" class="company-name">{{ card.company_name }}</div>
          </b-card-sub-title>
          <b-card-text class="mt-3" v-html="card.biography">
          </b-card-text>
          <div>
            <div class="caracteristica" v-if="card.bday && isValidBday">
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
            <div class="caracteristica" v-if="card.phone">
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
            <div class="caracteristica" v-if="card.tel_oficina">
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
            <div class="caracteristica" v-if="card.email">
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
            <div class="caracteristica icon-facebook" v-if="card.social_facebook">
              <div class="rounded-circle bg-success icon">
                <b-icon-facebook></b-icon-facebook>
              </div>
              <span>
                <a :href="(isMobile ? 'fb://facewebmodal/f?href=' : '')+card.social_facebook" target="_blank">{{ card.social_facebook }}</a>
              </span>
            </div>
            <div class="caracteristica icon-twitter" v-if="card.social_twitter">
              <div class="rounded-circle bg-success icon">
                <b-icon-twitter></b-icon-twitter>
              </div>
              <span>
                <a :href="card.social_twitter" target="_blank">{{ card.social_twitter }}</a>
              </span>
            </div>
            <div class="caracteristica icon-instagram" v-if="card.social_instagram">
              <div class="rounded-circle bg-success icon">
                <b-icon-instagram></b-icon-instagram>
              </div>
              <span>
                <a :href="card.social_instagram" target="_blank">{{ card.social_instagram }}</a>
              </span>
            </div>
            <div class="caracteristica icon-linkedin" v-if="card.social_linkedin">
              <div class="rounded-circle bg-success icon">
                <b-icon-linkedin></b-icon-linkedin>
              </div>
              <span>
                <a :href="card.social_linkedin" target="_blank">{{ card.social_linkedin }}</a>
              </span>
            </div>
            <div class="caracteristica icon-youtube" v-if="card.social_youtube">
              <div class="rounded-circle bg-success icon">
                <b-icon-youtube></b-icon-youtube>
              </div>
              <span>
                <a :href="card.social_youtube" target="_blank">{{ card.social_youtube }}</a>
              </span>
            </div>
            <div class="caracteristica icon-tiktok" v-if="card.social_tiktok">
              <div class="rounded-circle bg-success icon">
                <i class="bi bi-tiktok"></i>
              </div>
              <span>
                <a :href="card.social_tiktok" target="_blank">{{ card.social_tiktok }}</a>
              </span>
            </div>
            <div class="caracteristica icon-paypal" v-if="card.social_paypal">
              <div class="rounded-circle bg-success icon">
                <i class="bi bi-paypal"></i>
              </div>
              <span>
                <a :href="card.social_paypal" target="_blank">{{ card.social_paypal }}</a>
              </span>
            </div>
          </div>
          
          <div class="skills">
            <div class="skill " v-for="(skill) in card.skills">
              <b-badge pill variant="light">#{{ skill.name }}</b-badge>
            </div>
          </div>
          
          <div class="quote">{{ card.quote }}</div>

          <b-button variant="primary" @click.stop.prevent="saveContact" class="w-100" v-if="!isPreview">Guardar contacto</b-button>
        </b-card-body>
      </b-card>
      <footer class="powered-footer" v-if="!isPreview">
        <router-link :to="{ name: 'home' }">Onlycards</router-link> powered with <b-icon-heart></b-icon-heart> by <a target="_blank" href="https://www.zibasoft.com/">Zibasoft</a>
      </footer>
    </template>
    <template v-else>
      <div class="d-flex flex-column">
        <h2>No se encontro la tarjeta</h2>
        <img src="/img/blank-card.png" />
      </div>
    </template>
  </main>
</template>

<script>
  import Vue from 'vue'
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import { getCard, getUserInfo } from '@/api/user'
  import VCard from 'vcard-creator'
  import VueAnalytics from 'vue-analytics'

  import * as _ from 'lodash'

  export default {
    name: 'CardPage',
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
        ready: false,
        avatarFile: '',
        coverFile: '',
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
    components: { 
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
        return this.user || false
      },
      isMobile() {
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          return true
        } else {
          return false
        }
      },
      isPreview() {
        return this.$route.meta.preview
      },
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
          _.forEach([
            'social_paypal', 
            'social_tiktok', 
            'social_youtube', 
            'social_linkedin',
            'social_instagram',
            'social_twitter',
            'social_facebook',
            'personal_url'
          ], (p) => {
            this.card[p] = this.validateUrl(this.card[p]);
            switch(p) {
              case 'social_facebook':
                this.card[p] = this.$options.filters.facebook(this.card[p])
                break;
              case 'social_twitter':
                this.card[p] = this.$options.filters.twitter(this.card[p])
                break;
              case 'social_youtube': 
                this.card[p] = this.$options.filters.youtube(this.card[p])
                break;
              default:
                break;
            }
          })

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
      }
    },
    created () {
      //window.addEventListener('scroll', this.handleScroll);
    },
    destroyed () {
      //window.removeEventListener('scroll', this.handleScroll);
    },
    mounted() {
      if (this.card) {
        // _.forEach([
        //   'social_paypal', 
        //   'social_tiktok', 
        //   'social_youtube', 
        //   'social_linkedin',
        //   'social_instagram',
        //   'social_twitter',
        //   'social_facebook',
        //   'personal_url'
        // ], (p) => {
        //   this.card[p] = this.validateUrl(this.card[p]);
        //   switch(p) {
        //     case 'social_facebook':
        //       this.card[p] = this.$options.filters.facebook(this.card[p])
        //       break;
        //     case 'social_twitter':
        //       this.card[p] = this.$options.filters.twitter(this.card[p])
        //       break;
        //     case 'social_youtube': 
        //       this.card[p] = this.$options.filters.youtube(this.card[p])
        //       break;
        //     default:
        //       break;
        //   }
        // })
        this.ready = true
      } else if (this.$route.params && this.$route.params.uuid) {
        this.$fingerprint.get((components) => {
          let _fingerprint = this.$fingerprint.x64hash128(components.map((pair) => { return pair.value }).join(), 31)
          getCard({ 
            fingerprint: _fingerprint,
            uuid: this.$route.params.uuid
          }).then(({ data }) => data).then((result) => {
            this.card = { ... result.data }

            _.forEach([
              'social_paypal', 
              'social_tiktok', 
              'social_youtube', 
              'social_linkedin',
              'social_instagram',
              'social_twitter',
              'social_facebook',
              'personal_url'
            ], (p) => {
              this.card[p] = this.validateUrl(this.card[p]);
              switch(p) {
                case 'social_facebook':
                  this.card[p] = this.$options.filters.facebook(this.card[p])
                  break;
                case 'social_twitter':
                  this.card[p] = this.$options.filters.twitter(this.card[p])
                  break;
                case 'social_youtube': 
                  this.card[p] = this.$options.filters.youtube(this.card[p])
                  break;
                default:
                  break;
              }
            })

            document.title = this.card.full_name
            this.toDataURL(this.card.avatar, (dataUrl) => {
              this.card.base_image = dataUrl
            })

            if (this.card.google_trackid) {
              // a Promise
              Vue.use(VueAnalytics, {
                id: this.card.google_trackid
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
    display: flex;
    flex: 1 1 auto;
    justify-content: center;
    padding-top: 20px;
    background-color: #fafafa;
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
          color: #dd4b39; 
          color: rgb(221, 75, 57); 
        }
        &.icon-rss { 
          color: #f26522; 
          color: rgb(242, 101, 34); 
        }
        &.icon-pinterest { 
          color: #cb2027; 
          color: rgb(203, 32, 39); 
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
          color: #1ab7ea; 
          color: rgb(26, 183, 234); 
        }
        &.icon-tumblr { 
          color: #32506d; 
          color: rgb(50, 80, 109); 
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
          color: #ff0084; 
          color: rgb(255, 0, 132); 
        }
        &.icon-dribbble { 
          color: #ea4c89; 
          color: rgb(234, 76, 137); 
        }
        &.icon-quora { 
          color: #a82400; 
          color: rgb(168, 36, 0); 
        }
        &.icon-foursquare { 
          color: #0072b1; 
          color: rgb(0, 114, 177);
        }
        &.icon-forrst { 
          color: #5B9A68; 
          color: rgb(91, 154, 104); 
        }
        &.icon-vk { 
          color: #45668e; 
          color: rgb(69, 102, 142); 
        }
        &.icon-wordpress { 
          color: #21759b; 
          color: rgb(33, 117, 155); 
        }
        &.icon-stumbleupon { 
          color: #EB4823; 
          color: rgb(235, 72, 35); 
        }
        &.icon-yahoo { 
          color: #7B0099; 
          color: rgb(123, 0, 153); 
        }
        &.icon-blogger { 
          color: #fb8f3d; 
          color: rgb(251, 143, 61); 
        }
        &.icon-soundcloud { 
          color: #ff3a00; 
          color: rgb(255, 58, 0); 
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
    }
    .powered-footer {
      position: fixed;
      bottom: 0;
      right: 0;
    }

    @media only screen and (max-width: 450px) {
      padding-top: 0;
      flex-direction: column;
      .card {
        width: 100%;
        border-radius: 0;
        border: none;
      }
      .powered-footer {
        position: static;
        margin-top: 10px;
        margin-left: 10px;
        margin-bottom: 5px;
      }
    }
  }
</style>
