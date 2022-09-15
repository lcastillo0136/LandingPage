<template>
  <div class="step">
    <a-radio-group v-model="account.methodSelected" button-style="solid" :disabled="loading">
      <a-radio-button v-for="(method, method_i) in methods" :key="method_i" :value="method.id">
        {{ method.name }}
      </a-radio-button>
    </a-radio-group>

    <template v-if="account.methodSelected == 1">
      <a-divider></a-divider>
      <div class="form-group">
        <label>Nombre en la tarjeta</label>
        <input type="text" class="form-control" placeholder="" v-model="account.name" :disabled="loading">
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Número de tarjeta</label>
            <input type="text" class="form-control" placeholder="xxxx - xxxx - xxxx - xxxx" v-model="cardAlt" @keyup="cardFormat" @keypress="preventNumericInput($event)" :disabled="loading">
            <div class="error_message" v-if="!isValidCard && cardAlt">
              La tarjeta no es válida
            </div>
          </div>
        </div>
        <div class="col-md-6 col-sm-6">
          <img src="img/payments.png" alt="Cards" class="cards" :class="{ 'invalid': CardBrand }">
          <template v-if="CardBrand">
            <div class="brand" v-bind:class="CardBrand"></div>
          </template>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <label>Fecha de vencimiento</label>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <input type="text" class="form-control" placeholder="MM / YY" v-model="expirationAlt" @keyup="expirationFormat" @keypress="preventNumericInput($event)" :disabled="loading">
              </div>
              <div class="error_message" v-if="!isValidExpiration && expirationAlt">
                Fecha de expiración no válida
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label>Código de seguridad</label>
            <div class="row">
              <div class="col-md-4">
                <div class="form-group">
                  <input type="text" class="form-control" placeholder="CCV" v-model="account.ccv" @keypress="preventNumericInput($event)" :disabled="loading">
                  <div class="error_message" v-if="!isValidCCV && account.ccv">
                    El código no es válido
                  </div>
                </div>
              </div>
              <div class="col-md-8">
                <img src="img/icon_ccv.gif" width="50" height="29" alt="ccv"><small>Últimos 3 dígitos</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-if="account.methodSelected == 2">
      <p class="add_top_20">
        <small>Al finalizar el flujo se generará el folio a pagar en alguna sucursal de la cadena OXXO</small>
      </p>
    </template>
    <template v-if="account.methodSelected == 3">
      <p class="add_top_20">
        <small>Al finalizar el flujo se generará la orden y cita lista para pagar en las instalaciones</small>
      </p>
    </template>
    <template v-if="account.methodSelected == 4">
      <!-- <a-divider></a-divider>
      <div id="paypal-button-container"></div> -->
    </template>

    <!--End row -->
  </div>
</template>
<script>
  import { getPaymentMethods } from '@/api/data'
  import * as conekta from '@/libs/conekta'
  
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
            ccv: '',
            isValid: false,
            methodSelected: 1
          }
        }
      },
      loading: Boolean
    },
    data () {
      return {
        cardAlt: '',
        expirationAlt: '',
        methods: []
      }
    },
    watch: {
      account: {
        deep: true,
        handler () {
          switch (this.account.methodSelected) {
            case 1: 
              this.account.isValid = this.isValidCard && this.isValidExpiration && this.isValidCCV && this.account.name != ''
              break;
            case 2:
            case 3:
            case 4:
              this.account.isValid = true
              break;
          }
        }
      },
      // methodSelected (value) {
        // if (value == 4) {
        //   this.$nextTick(() => {
        //     window['paypal'].Buttons({
        //       style: {
        //         shape: 'rect',
        //         color: 'blue',
        //         layout: 'horizontal',
        //         label: 'paypal',
        //         tagline: false
        //       },
        //       onError: (err) => {
        //         this.errorMessage('No se pudo realizar el pago con paypal, favor de intentar mas tarde.');
        //       },
        //       // Set up the transaction
        //       // createOrder: (data, actions) => {
        //       //   return actions.order.create({
        //       //     purchase_units: [{
        //       //       amount: {
        //       //         currency_code: this._settings.getCurrentSettings().currency || "USD",
        //       //         value: +this.CartTotal.toFixed(2),
        //       //         breakdown: {
        //       //           item_total: { 
        //       //             currency_code: this._settings.getCurrentSettings().currency || 'USD',
        //       //             value: +this.CartTotal.toFixed(2)
        //       //           },
        //       //           discount: {
        //       //             currency_code: this._settings.getCurrentSettings().currency || "USD",
        //       //             value: +this.CartDescuento.toFixed(2)
        //       //           }
        //       //         }
        //       //       },
        //       //       items: this.Cart?.map((p) => Object({
        //       //         name: p.name,
        //       //         unit_amount: {
        //       //           currency_code: this._settings.getCurrentSettings().currency || 'USD',
        //       //           value: +p.precio_venta.toFixed(2)
        //       //         },
        //       //         quantity: p.servicios.length,
        //       //         description: p.description,
        //       //         sku: p.sku
        //       //       }))
        //       //     }],
        //       //     application_context: {
        //       //       brand_name:  this._settings.getCurrentSettings().company_name || 'Zibasoft'
        //       //     }
        //       //   });
        //       // },
        //       // onApprove: (data, actions) => {
        //       //   return actions.order.capture().then((details) => {
        //       //       console.log(data, actions, details);
        //       //       this.showLoading();
        //       //       this.processPayment('', details.id);
        //       //     })
        //       //     .catch(err => {
        //       //       this.errorMessage('No se pudo realizar el pago con paypal, favor de intentar mas tarde.');
        //       //     })
        //       // }
        //     }).render('#paypal-button-container');
        //   })
        // } 
      // }
    },
    computed: {
      CardBrand () {
        return this.getCardBrand()
      },
      isValidCard () {
        return this.validateCard()
      },
      isValidExpiration () {
        return this.validExpiration()
      },
      isValidCCV () {
        return this.validCCV()
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
      },
      getCardBrand () {
        return conekta.getCardBrand(this.account.card)
      },
      validateCard () {
        return conekta.validateCardNumber(this.account.card)
      },
      validExpiration () {
        return conekta.validateExpirationDate(this.account.expiration.month, this.account.expiration.year)
      },
      validCCV () {
        return conekta.validateCvc(this.account.ccv)
      },
      tokenizeCard () {
        conekta.tokenize(this.account.card, this.account.name, this.account.expiration.month, this.account.expiration.year, this.account.ccv).then((token) => {
          console.log(token)
        })
      },
      errorMessage (message) {
        this.$swal(message, '', 'error')
      }
    },
    mounted() {
      getPaymentMethods().then((response) => {
        if (response.status == 200) {
          this.methods = response.data.data
        }
      }).catch((error) => {
      })
    }
  }
</script>