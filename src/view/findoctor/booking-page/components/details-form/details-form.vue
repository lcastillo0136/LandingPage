<template>
  <div>
    <div class="step">
      <div class="row">
        <div class="col-md-6 col-sm-6">
          <div class="form-group">
            <label>First name</label>
            <input type="text" class="form-control" placeholder="Jhon" v-model="client.firstName" autocomplete="chrome-off">
          </div>
        </div>
        <div class="col-md-6 col-sm-6">
          <div class="form-group">
            <label>Last name</label>
            <input type="text" class="form-control" placeholder="Doe" v-model="client.lastName" autocomplete="chrome-off">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 col-sm-6">
          <div class="form-group">
            <label>Email</label>
            <input type="email" class="form-control" placeholder="jhon@doe.com" v-model="client.email" autocomplete="chrome-off">
          </div>
        </div>
        <div class="col-md-6 col-sm-6">
          <div class="form-group">
            <label>Confirm email</label>
            <input type="email" class="form-control" placeholder="jhon@doe.com" v-model="client.email2" autocomplete="chrome-off">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 col-sm-6">
          <div class="form-group">
            <label>Telephone</label>
            <input type="text" class="form-control" placeholder="004 467 8943" v-model="phoneAlt" @keyup="phoneFormat" @keypress="preventNumericInput($event)" autocomplete="chrome-off">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
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
            firstName: 'l',
            lastName: 'c',
            email: 'c',
            email2: 'c',
            phone: 'c',
            isValid: true
          }
        }
      }
    },
    data () {
      return {
        phoneAlt: '1'
      }
    },
    computed: {
    },
    watch: {
      client: {
        deep: true,
        handler () {
          this.validateEmails()
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
        this.client.isValid = this.client.email === this.client.email2
      }
    }
  }
</script>