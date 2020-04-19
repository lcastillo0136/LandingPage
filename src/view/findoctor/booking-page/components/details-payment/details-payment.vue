<template>
  <div class="step">
    <div class="form-group">
      <label>Name on card</label>
      <input type="text" class="form-control" placeholder="Jhon Doe" v-model="account.name">
    </div>
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label>Card number</label>
          <input type="text" class="form-control" placeholder="xxxx - xxxx - xxxx - xxxx" v-model="cardAlt" @keyup="cardFormat" @keypress="preventNumericInput($event)">
        </div>
      </div>
      <div class="col-md-6 col-sm-6">
        <img src="img/payments.png" alt="Cards" class="cards">
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <label>Expiration date</label>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="MM / YY" v-model="expirationAlt" @keyup="expirationFormat" @keypress="preventNumericInput($event)">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="form-group">
          <label>Security code</label>
          <div class="row">
            <div class="col-md-4">
              <div class="form-group">
                <input type="text" class="form-control" placeholder="CCV" v-model="account.ccv" @keypress="preventNumericInput($event)">
              </div>
            </div>
            <div class="col-md-8">
              <img src="img/icon_ccv.gif" width="50" height="29" alt="ccv"><small>Last 3 digits</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--End row -->
  </div>
</template>
<script>
  export default {
    name: 'DetailsPayment',
    model: {
      prop: 'account',
      event: 'change'
    },
    props: {
      account: {
        type: Object,
        default: function () {
          return {
            name: '',
            card: '',
            expiration: { month: '00', year: '00'},
            ccv: ''
          }
        }
      }
    },
    data () {
      return {
        cardAlt: '',
        expirationAlt: ''
      }
    },
    methods: {
      cardFormat () {
        this.account.card = ('' + this.cardAlt).replace(/\D/g, '')
        let match = ''
        if (this.account.card.length <= 7) {
          match = this.account.card.match(/^(\d{4})(\d{1,4})$/)

          if (match) {
            this.cardAlt = `${match[1]} ${match[2]}`
          }
        } else if (this.account.card.length <= 11) {
          match = this.account.card.match(/^(\d{4})(\d{4})(\d{1,4})$/)

          if (match) {
            this.cardAlt = `${match[1]} ${match[2]} ${match[3]}`
          }
        } else if (this.account.card.length <= 16) {
          match = this.account.card.match(/^(\d{4})(\d{4})(\d{4})(\d{1,4})$/)

          if (match) {
            this.cardAlt = `${match[1]} ${match[2]} ${match[3]} ${match[4]}`
          }
        } else {
          this.cardAlt = this.account.card = this.account.card.substring(0,16)
          this.cardFormat()
        }
      },
      expirationFormat () {
        let exp = ('' + this.expirationAlt).replace(/\D/g, '')
        this.account.expiration = { month: '00', year: '00'}
        let match = ''

        if (exp.length <= 4){
          match = exp.match(/^(\d{1,2})(\d{1,2})$/)

          if (match) {
            if (match[1] == '00') match[1] = '01'
            if (+match[1] > 12) match[1] = '12'

            this.expirationAlt = `${match[1]} / ${match[2]}`
            this.account.expiration = { month: match[1], year: match[2]}
          }
        } else {
          this.expirationAlt = exp.substring(0,4)
          this.expirationFormat()
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