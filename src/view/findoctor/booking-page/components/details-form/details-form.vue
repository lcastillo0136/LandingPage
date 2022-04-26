<template>
  <div>
    <div class="step">
      <div class="row">
        <div class="col-md-6 col-sm-6">
          <div class="form-group">
            <label>Nombre(s)</label>
            <input type="text" class="form-control" placeholder="Tu nombre" v-model="client.firstName" autocomplete="chrome-off" :disabled="loading">
          </div>
        </div>
        <div class="col-md-6 col-sm-6">
          <div class="form-group">
            <label>Apellido(s)</label>
            <input type="text" class="form-control" placeholder="Tu apelido" v-model="client.lastName" autocomplete="chrome-off" :disabled="loading">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 col-sm-6">
          <div class="form-group">
            <label>Correo electrónico</label>
            <input type="email" class="form-control" placeholder="Tu email" v-model="client.email" autocomplete="chrome-off" :disabled="loading">
            <div class="error_message" v-if="client.email && !validEmail(client.email)">
              Favor de caputurar un email valido
            </div>
          </div>
        </div>
        <div class="col-md-6 col-sm-6">
          <div class="form-group">
            <label>Confirmar correo electrónico</label>
            <input type="email" class="form-control" placeholder="Tu email" v-model="client.email2" autocomplete="chrome-off" :disabled="loading">
            <div class="error_message" v-if="client.email && client.email2 && client.email !== client.email2">
              El correo electrónico no es el mismo
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 col-sm-6">
          <div class="form-group">
            <label>Teléfono</label>
            <input type="text" class="form-control" placeholder="(99) 9999-9999" v-model="phoneAlt" @keyup="phoneFormat" @keypress="preventNumericInput($event)" autocomplete="chrome-off" :disabled="loading">
            <div class="error_message" v-if="client.phone && `${client.phone}`.length < 10">
              Favor de caputurar un teléfono valido
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'DetailsForm',
    model: {
      prop: 'client',
      event: 'change'
    },
    props: {
      client: {
        type: Object,
        default: function () {
          return {
            firstName: '',
            lastName: '',
            email: '',
            email2: '',
            phone: '',
            isValid: true
          }
        }
      },
      loading: Boolean
    },
    data () {
      return {
        phoneAlt: ''
      }
    },
    computed: {
      ...mapGetters([
        'hasToken'
      ])
    },
    watch: {
      client: {
        deep: true,
        handler () {
          this.validateEmails()
          this.phoneAlt = this.client.phone
          this.phoneFormat()
        }
      }
    },
    methods: {
      phoneFormat () {
        this.client.phone = ('' + this.phoneAlt).replace(/\D/g, '')
        let match = ''
        switch (this.client.phone.length) {
          case 10:
            match = this.client.phone.match(/^(\d{3})(\d{3})(\d{4})$/)

            if (match) {
              this.phoneAlt = `(${match[1]}) ${match[2]}-${match[3]}`
            }
            break
          case 11:
          case 12:
          case 13:
            match = this.client.phone.match(/^(\d{1,3})(\d{3})(\d{3})(\d{4})$/)

            if (match) {
              this.phoneAlt = `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}`
            }
            break
          default:
            this.phoneAlt = this.client.phone
            break
        }
        
      },
      preventNumericInput ($event) {
        var keyCode = ($event.keyCode ? $event.keyCode : $event.which);
        if (keyCode <= 47 || keyCode >= 58) {
          $event.preventDefault()
        }
      },
      validateEmails () {
        this.client.isValid = 
          this.client.email === this.client.email2 && 
          this.client.phone !== '' && 
          this.client.phone.length > 9 && 
          this.validEmail(this.client.email)
      },
      validEmail: function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      }
    },
    mounted() {
      if (this.hasToken) {
      }
    }
  }
</script>