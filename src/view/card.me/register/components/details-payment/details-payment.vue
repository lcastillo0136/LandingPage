<template>
  <div class="step">

    <div class="flex-m w-full payment-methods">
      <template v-for="(method, method_i) in methods">
        <div class="payment-method" @click.stop.prevent="chooseMethod(1)" :class="{ 'selected': account.methodSelected == 1 }" v-if="method.id == 1 && settings && settings.CONEKTA_CLIENT">
          <b-icon-credit-card></b-icon-credit-card>
          Debit / Credit card
        </div>
        <div class="payment-method" @click.stop.prevent="chooseMethod(4)" :class="{ 'selected': account.methodSelected == 4 }" v-if="method.id == 4 && settings && settings.PAYPAL_CLIENT">
          <i class="bi bi-paypal b-icon"></i>
          Paypal
        </div>
        <div class="payment-method" @click.stop.prevent="chooseMethod(3)" :class="{ 'selected': account.methodSelected == 3 }" v-if="method.id == 3">
          <b-icon-cash-coin></b-icon-cash-coin>
          Cash
        </div>
        <div class="payment-method" @click.stop.prevent="chooseMethod(2)" :class="{ 'selected': account.methodSelected == 2 }" v-if="method.id == 2 && settings && settings.CONEKTA_CLIENT">
          <span class="b-icon-oxxo"></span>
          Oxxo
        </div>
      </template>
    </div>

    <template v-if="account.methodSelected == 1">
      <a-form-model-item prop="name" label="Nombre de tarjetahabiente">
        <a-input type="text" class="" placeholder="Nombre" v-model="account.name" size="large" :disabled="loading">
        </a-input>
      </a-form-model-item>

      <a-form-model-item prop="card" label="Número de tarjeta" :help="!isValidCard && cardAlt ? 'La tarjeta no es valida' : ''" :validateStatus="!isValidCard && cardAlt ? 'error' : ''">
        <a-input type="text" class="" placeholder="xxxx - xxxx - xxxx - xxxx" v-model="cardAlt" size="large" :disabled="loading" @change="cardFormat" >
        </a-input>
      </a-form-model-item>
      
      <div class="row">
        <div class="col-md-6">
          <a-form-model-item prop="expiration" label="Fecha de vencimiento" :help="!isValidExpiration && expirationAlt ? 'Fecha de expiracion no valida' : ''" :validateStatus="!isValidExpiration && expirationAlt ? 'error' : ''">
            <a-input type="text" class="" placeholder="MM / AA" v-model="expirationAlt" size="large" :disabled="loading" @change="expirationFormat" >
            </a-input>
          </a-form-model-item>
        </div>
        <div class="col-md-6">
          <a-form-model-item prop="ccv" label="Código de seguridad" :help="!isValidCCV && account.ccv ? 'El codigo no es valido' : ''" :validateStatus="!isValidCCV && account.ccv ? 'error' : ''">
            <a-input type="number" class="" placeholder="CVV" v-model="account.ccv" size="large" :disabled="loading">
            </a-input>
          </a-form-model-item>
        </div>
      </div>
    </template>
    <template v-if="account.methodSelected == 2">
      <p class="add_top_20">
        <small>Al finalizar el flujo se generara el folio a pagar en alguna sucursal de la cadena OXXO</small>
      </p>
    </template>
    <template v-if="account.methodSelected == 3">
      <p class="add_top_20">
        <small>Al finalizar el flujo se generara la orden lista para pagar en las instalaciones</small>
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
  import { mapGetters, mapMutations, mapActions } from 'vuex'
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
    },
    computed: {
      ...mapGetters([
        'settings'
      ]),
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
            this.cardAlt = `${match[1]} - ${match[2]}`
          } else {
            this.cardAlt = this.account.card
          }
        } else if (this.account.card.length <= 11) {
          match = this.account.card.match(/^(\d{4})(\d{4})(\d{1,4})$/)

          if (match) {
            this.cardAlt = `${match[1]} - ${match[2]} - ${match[3]}`
          }
        } else if (this.account.card.length <= 16) {
          match = this.account.card.match(/^(\d{4})(\d{4})(\d{4})(\d{1,4})$/)

          if (match) {
            this.cardAlt = `${match[1]} - ${match[2]} - ${match[3]} - ${match[4]}`
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
      },
      chooseMethod(metodo) {
        this.account.methodSelected = metodo
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
<style lang="scss">
  
  .payment-methods {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 25px;
    margin-top: 30px;
    .payment-method {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 25%;
      text-align: center;
      border: solid 1px #e0e0e0;
      border-radius: 8px;
      padding: 6px;
      font-size: 12px;
      line-height: 1;
      height: 70px;
      justify-content: space-around;
      cursor: pointer;
      .b-icon {
        font-size: 25px;
      }

      .b-icon-oxxo {
        background-image: url(/img/oxxo-pay.png);
        width: 90%;
        background-size: contain;
        height: 27px;
        background-repeat: no-repeat;
        background-position: center center;
      }

      &:hover {
        background-color: #fafafa;
      }

      &.selected { 
        background-color: #54bd95;
        border-color: #54bd95;
        color: #fff;
        .b-icon-oxxo {
          background-image: url(/img/oxxo-pay-selected.png);
        }
      }
    }
  }
</style>