<template>
  <main class="card-container" v-if="ready">
    <b-card
      :img-src="card.avatar"
      img-alt="Image"
      img-top
      tag="article"
      class="mb-md-4 shadow"
      v-if="card">
      <div v-if="card.phone" class="send-whatsapp">
        <a :href="`https://wa.me/+52${card.phone}`" target="_blank">
          <b-icon-whatsapp></b-icon-whatsapp>
        </a>
      </div>
      <b-card-title class="mb-1">
        {{ card.title || '' }} {{ card.first_name }}<br>{{ card.last_name }}
      </b-card-title>
      <b-card-sub-title>
        {{ card.profesion }} <div v-if="card.company_name" class="company-name">{{ card.company_name }}</div>
      </b-card-sub-title>
      <b-card-text class="mt-3">
        {{ card.biography }}
      </b-card-text>
      <div>
        <div class="caracteristica" v-if="card.bday && isValidBday">
          <div class="rounded-circle bg-success icon">
            <b-icon-calendar2-fill></b-icon-calendar2-fill>
          </div>
          <span>
            <span>{{ card.bday | moment('DD/MM/YYYY') }}</span>
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
            <small>Casa</small>
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
            <small>Oficina</small>
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
            {{ direccion.alias }}
            <small>
              <a :href="'https://www.google.com/maps/search/?api=1&query='+direccion.latitude+','+direccion.longitude" target="_blank">
                {{ direccion.street }} {{ direccion.exterior_number }}, {{ direccion.suburb }} {{ direccion.township }}, {{ direccion.state }} {{ direccion.country }}
              </a>
            </small>
          </span>
        </div>
        <div class="caracteristica" v-if="card.social_facebook">
          <div class="rounded-circle bg-success icon">
            <b-icon-facebook></b-icon-facebook>
          </div>
          <span>
            <a :href="card.social_facebook" target="_blank">{{ card.social_facebook }}</a>
          </span>
        </div>
        <div class="caracteristica" v-if="card.social_twitter">
          <div class="rounded-circle bg-success icon">
            <b-icon-twitter></b-icon-twitter>
          </div>
          <span>
            <a :href="card.social_twitter" target="_blank">{{ card.social_twitter }}</a>
          </span>
        </div>
        <div class="caracteristica" v-if="card.social_instagram">
          <div class="rounded-circle bg-success icon">
            <b-icon-instagram></b-icon-instagram>
          </div>
          <span>
            <a :href="card.social_instagram" target="_blank">{{ card.social_instagram }}</a>
          </span>
        </div>
        <div class="caracteristica" v-if="card.social_linkedin">
          <div class="rounded-circle bg-success icon">
            <b-icon-linkedin></b-icon-linkedin>
          </div>
          <span>
            <a :href="card.social_linkedin" target="_blank">{{ card.social_linkedin }}</a>
          </span>
        </div>
        <div class="caracteristica" v-if="card.social_youtube">
          <div class="rounded-circle bg-success icon">
            <b-icon-youtube></b-icon-youtube>
          </div>
          <span>
            <a :href="card.social_youtube" target="_blank">{{ card.social_youtube }}</a>
          </span>
        </div>
        <div class="caracteristica" v-if="card.social_tiktok">
          <div class="rounded-circle bg-success icon">
            <i class="bi bi-tiktok"></i>
          </div>
          <span>
            <a :href="card.social_tiktok" target="_blank">{{ card.social_tiktok }}</a>
          </span>
        </div>
        <div class="caracteristica" v-if="card.social_paypal">
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

      <b-button variant="primary" @click.stop.prevent="saveContact" class="w-100">Guardar contacto</b-button>
    </b-card>
    <template v-else>
      <div class="d-flex flex-column">
        <h2>No se encontro la tarjeta</h2>
        <img src="/img/blank-card.png" />
      </div>
    </template>
  </main>
</template>

<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import { getCard } from '@/api/user'
  import VCard from 'vcard-creator'
  import * as _ from 'lodash'

  export default {
    name: 'CardPage',
    data() {
      return {
        card: null,
        ready: false
      }
    },
    props: {
    },
    components: { 
    },
    computed: {
      isValidBday() {
        return this.$moment(this.card.bday).isValid()
      }
    },
    methods: {
      ...mapMutations([
        'hasToken',
        'getUser'
      ]),
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
      }
    },
    created () {
      window.addEventListener('scroll', this.handleScroll);
    },
    destroyed () {
      window.removeEventListener('scroll', this.handleScroll);
    },
    mounted() {
      if (this.$route.params && this.$route.params.uuid) {
        getCard(this.$route.params.uuid).then(({ data }) => data).then((result) => {
          this.card = { ... result.data }
          document.title = this.card.full_name
          this.toDataURL(this.card.avatar, (dataUrl) => {
            this.card.base_image = dataUrl
          })
        }).catch((err) => {
          setTimeout(() => {
            this.$router.replace({ name: 'home' })
          }, 10000)
        }).then(() => {
          this.ready = true
        })
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

    @media only screen and (max-width: 450px) {
      padding-top: 0;
      .card {
        width: 100%;
        border-radius: 0;
        border: none;
      }
    }
  }
</style>
