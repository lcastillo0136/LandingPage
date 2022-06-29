<template>
  <div class="box_general_2 add_bottom_45 d-flex card-columns flex-column profile-payment">
    <template v-if="successPayment">
      <div class="success-alert">
        <div style="border-radius:200px; height:200px; width:200px; background: #F8FAF5; margin:0 auto;">
          <i class="checkmark">✓</i>
        </div>
        <h1>Pago exitoso</h1> 
        <p>Recibimos tu solicitud de compra;<br/> tu tarjeta digital se activara en unos instantes</p>
      </div>
    </template>
    <template v-if="oxxoPayment">
      <div class="Voucher Voucher-pending" ref="OXXOvoucher">
        <div class="OXXO-container d-flex flex-column">
          <img src="/img/oxxo.svg" alt="oxxo" class="Icon Voucher-Logo--oxxo loc_logo Icon--square">
          <div class="ProductHeader d-flex spacing-8 flex-column">
            <div class="flex-fill flex-grow-1">
              <span class="loc_amount Text Text-color--gray900 Text-fontSize--36 Text-fontWeight--600" style="line-height: 1;">
                <span>{{ order.total | currency }}&nbsp;MXN</span>
              </span>
            </div>
            <div class="flex-fill flex-grow-1">
              <span class="Text Text-color--gray500 Text-fontSize--14 Text-fontWeight--500">
                <div class="loc_expireDate flex-fill flex-grow-1">
                  <div class="d-flex spacing-8 flex-row">
                    <div class="flex-fill w-auto flex-grow-0">Caduca el {{ oxxoTime }}</div>
                    <div class="flex-fill w-auto flex-grow-0">
                      <div class="Tag Tag-orange">
                        <span class="Text Text-color--orange Text-fontSize--11 Text-fontWeight--700">{{ oxxoRemain }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </span>
            </div>
          </div>
          <div class="OXXO-barcode">
            <div class="Barcode loc_barcode">
              <img :src="order.payment_orders.metadata_object.barcode_url" />
              <div style="font-family: monospace; font-size: 14px; margin: 4px;">{{ order.payment_orders.metadata_object.reference | oxxo }}</div>
            </div>
          </div>
          <div class="OXXO-instructions loc_instructionsToPay d-flex flex-column">
            <div class="flex-fill flex-grow-1">
              <span class="Text Text-color--gray800 Text-fontSize--14 Text-fontWeight--600">Instrucciones para pagar tu OXXO:</span>
            </div>
            <div class="flex-fill flex-grow-1">
              <ol>
                <li>
                  <p>Acude a la tienda OXXO más cercana. <a href="https://www.google.com.mx/maps/search/oxxo/" target="_blank">Encuéntrala aquí</a>.</p>
                </li>
                <li>
                  <p>Indica en caja que quieres realizar un pago de <strong>OXXOPay</strong>.</p>
                </li>
                <li>
                  <p>Dicta al cajero el número de referencia en esta ficha para que tecleé directamete en la pantalla de venta.</p>
                </li>
                <li>
                  <p>Realiza el pago correspondiente con dinero en efectivo.</p>
                </li>
                <li>
                  <p>Al confirmar tu pago, el cajero te entregará un comprobante impreso. <strong>En el podrás verificar que se haya realizado correctamente.</strong> Conserva este comprobante de pago.</p>
                </li>
              </ol>
            </div>
          </div>
          <div class="OXXO-printInstructions flex-fill flex-grow-1">
            <button class="HostedVoucherButton" type="button" style="background-color: rgb(100, 92, 252); color: rgb(255, 255, 255); box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 1px 0px, rgb(70, 70, 226) 0px 0px 0px 1px, rgba(60, 66, 87, 0.08) 0px 2px 5px 0px;" @click.stop.prevent="downloadOXXO">Descargar</button>
          </div>
        </div>
      </div>
    </template>
    <template v-if="!successPayment && !oxxoPayment">
      <div v-if="product">
        <h3>Activacion de la tarjeta digital - {{ product.precio_venta | currency }}</h3>
      </div>
      <a-divider dashed></a-divider>
      <DetailsPayment v-model="account" :loading="showLoading" class="flex-fill"></DetailsPayment>
      <div class="container-login100-form-btn">
        <template v-if="account.methodSelected !== 4">
          <a-button class="btn btn-primary rounded-lg text-white w-100" type="success" :loading="showLoading" @click.stop.prevent="handlePayment" :disabled="!canBill">
            Pagar y activar tarjeta digital
          </a-button>
        </template>
        <template v-else>
          <div id="paypal-button-container" class="w-100 text-center"></div>
          <small>
            Pagar y activar tarjeta digital
          </small>
        </template>
      </div>
    </template>
  </div>
</template>
<script>
  import { postOrder, getProduct } from '@/api/data'
  import { mapGetters, mapActions } from 'vuex'
  import DetailsPayment from '@/view/card.me/register/components/details-payment'
  import * as conekta from '@/libs/conekta'
  import * as html2canvas from 'html2canvas'

  export default {
    name: 'ProfilePayment',
    props: {
      user: {
        type: Object,
        default: function () {
          return { }
        }
      }
    },
    components: {
      DetailsPayment
    },
    data() {
      return {
        account: {
          name: this.user.full_name,
          card: '',
          expiration:  { month: '00', year: '00'},
          ccv: '',
          token: false,
          paypal: false,
          isValid: false,
          methodSelected: 0
        },
        showLoading: false,
        policyTerms: false,
        paypalready: false,
        product: null,
        successPayment: false,
        oxxoPayment: false,
        order: {
          id: -1,
          name: "",
          phone: "",
          email: "",
          payment_method: 0,
          titular: "",
          card: "",
          expiration: "",
          subtotal: 0,
          discount: 0,
          total: 0,
          uuid_key: "",
          qty: 0,
          status: {},
          user_id: -1,
          conekta_id: "",
          auth_code: null,
          paypal_id: null,
          invoice_path: null,
          rfc: null,
          razon_social: null,
          cfdi: null,
          provider_id: null,
          payment_metadata: null,
          method: { },
          payment_orders: {
          }
        }
      }
    },
    watch: {
      'account': {
        deep: true,
        handler () {
          if (this.account.methodSelected == 4 && this.canBill && !this.paypalready) {
            this.showPaypalButtons();
            this.paypalready = true
          } else if (this.account.methodSelected != 4 ) {
            this.paypalready = false
          }
        }
      },
      'policyTerms' () {
        if (this.account.methodSelected == 4 && this.canBill && !this.paypalready) {
          this.showPaypalButtons();
          this.paypalready = true
        } else if (this.account.methodSelected != 4 ) {
          this.paypalready = false
        }
      },
      settings() {
        this.loadProduct()
      }
    },
    computed: {
      ...mapGetters([
        'settings',
        'getUser'
      ]),
      canBill () {
        return this.account.isValid
      },
      getTotal () {
        return +this.product.precio_venta
      },
      getDiscount () {
        return 0
      },
      getServices () {
        return [this.product]
      },
      orderOXXO() {
        if (this.order.payment_orders.type == 'oxxo') {
          return this.order.method && this.order.method.id == 2 && this.order.payment_orders && this.order.payment_orders.metadata_object
        }

        return {}
      },
      oxxoExpired() {
        return this.$moment.unix(this.orderOXXO.expires_at).isBefore()
      },
      oxxoTime() {
        return this.$moment.unix(this.orderOXXO.expires_at).format('DD [de] MMMM [de] YYYY [a las] hh:mm a')
      },
      oxxoRemain() {
        return this.$moment.unix(this.orderOXXO.expires_at).fromNow()
      }
    },
    methods: {
      ...mapActions([
        'getUserInfo'
      ]),
      handlePayment () {
        this.showLoading = true
        if (this.account.methodSelected == 1) {
          this.sendPaymentCard()
        } else {
          this.sendPayment()
        }
      },
      sendPaymentCard () {
        this.showLoading = true
        this.tokenizeCard().then((tokenize) => {
          this.account.token = tokenize.id

          this.sendPayment()
        }).catch((error) => {
          this.$notification.error({
            message: 'Pago no procesado',
            description: error.message_to_purchaser,
            onClose: () => { this.showLoading = false; }
          })
        })
      },
      tokenizeCard () {
        return new Promise((resolve, reject) => { 
          if (this.account.isValid) {
            conekta.tokenize(this.account.card, this.account.name, this.account.expiration.month, this.account.expiration.year, this.account.ccv).then((token) => {
              resolve(token)
            }).catch((error) => {
              reject(error)
            })
          } else {
            reject('no_card')
          }
        })
      },
      showPaypalButtons () {
        if (this.canBill) {
          this.$nextTick(() => {
            window['paypal'].Buttons({
              style: {
                shape: 'rect',
                color: 'blue',
                layout: 'horizontal',
                label: 'paypal',
                tagline: false
              },
              onError: (err) => {
                this.$notification.error({
                  message: 'Pago no procesado',
                  description: 'No se pudo realizar el pago con paypal, favor de intentar mas tarde.',
                  onClose: () => { this.showLoading = false; }
                })
              },
              // Set up the transaction
              createOrder: (data, actions) => {
                return actions.order.create({
                  purchase_units: [{
                    amount: {
                      currency_code: this.settings.CURRENCY || "USD",
                      value: +this.getTotal.toFixed(2),
                      breakdown: {
                        item_total: { 
                          currency_code: this.settings.CURRENCY || 'USD',
                          value: +this.getTotal.toFixed(2)
                        },
                        discount: {
                          currency_code: this.settings.CURRENCY || "USD",
                          value: +this.getDiscount.toFixed(2)
                        }
                      }
                    },
                    items: this.getServices?.map((p) => Object({
                      name: p.name,
                      unit_amount: {
                        currency_code: this.settings.CURRENCY || 'USD',
                        value: +p.precio_venta.toFixed(2)
                      },
                      quantity: 1,
                      description: p.description
                    }))
                  }],
                  application_context: {
                    brand_name: this.settings.COMPANY_NAME || 'Zibasoft'
                  }
                });
              },
              onApprove: (data, actions) => {
                return actions.order.capture().then((details) => {
                  this.account.paypal = details.id;
                  this.handlePayment();
                })
                .catch(err => {
                  this.$notification.error({
                    message: 'Pago no procesado',
                    description: 'No se pudo realizar el pago con paypal, favor de intentar mas tarde.',
                    onClose: () => { this.showLoading = false; }
                  })
                })
              }
            }).render('#paypal-button-container');
          })
        }
      },
      sendPayment () {
        this.showLoading = true
        let data = {
          // provider_id: this.doctor.id,
          // phone: this.client.phone,
          user_id: this.user.id,
          email: this.user.email,
          name: this.user.first_name,
          // last_name: this.client.lastName,
          send_feedback: false,
          payment_method: this.account.methodSelected, // 1: tarjeta, 2: oxxo, 3: cash, 4: paypal
          Products: this.getServices.map((s) => Object({
            product_id: s.id,
            name: s.name,
            precio_venta: s.precio_venta,
            static_product: true,
            // phone: this.client.phone,
            email: this.user.email
          })),
        };
        let readyToSave = false

        if (this.account.methodSelected == 1 && this.account.token !== false) {
          data.token = this.account.token; // si es con tarjeta,
          // data.card_id = 'cad_dsadsdsadsadsa', // si se usa tarjeta registrada,
          data.card = this.account.card;
          data.expiration = `${this.account.expiration.month}/${this.account.expiration.year}`;
          data.titular = this.account.name;

          readyToSave = true
        } else if ([2,3].includes(this.account.methodSelected)) {
          readyToSave = true
        } else if (this.account.methodSelected == 4 && this.account.paypal !== false) {
          data.paypal_id = this.account.paypal
          readyToSave = true
        }

        if (readyToSave) {
          postOrder(data).then((response) => {
            this.order = { ...response.data.data }
            this.showLoading = false

            if (this.order.method.id == 2) {
              this.oxxoPayment = true
            } else {
              this.successPayment = true
            }
            this.getUserInfo().then(() => {
              if (this.getUser.id) {
                this.user = {
                  ...this.getUser,
                  ...{ 
                    bday: this.getUser.bday && this.$moment(this.getUser.bday, 'YYYY-MM-DD')
                  }
                }
                // this.$router.push({ name: 'profile-orders' })
              }
            })
          }).catch((error) => {
            this.$notification.error({
              message: 'Pago no procesado',
              description: 'No se pudo realizar el pago, favor de intentar mas tarde.',
              onClose: () => { this.showLoading = false; }
            })
            this.showLoading = false
          })
        } else {
          this.showLoading = false
        }
      },
      loadProduct() {
        if (this.settings && this.settings.PRODUCT_FOR_SALE && !this.product) {
          getProduct(this.settings?.PRODUCT_FOR_SALE).then((response) => response.data).then(({ data }) => {
            this.product = data
          })
        }
      },
      downloadOXXO() {
        html2canvas(this.$refs.OXXOvoucher).then((canvas) => {
          let ctx = canvas.getContext("2d")

          var imgd = ctx.getImageData(0, 0, canvas.width, canvas.height),
            pix = imgd.data,
            newColor = {r:255,g:255,b:255, a:255};

          for (var i = 0, n = pix.length; i <n; i += 4) {
            var r = pix[i],
                    g = pix[i+1],
                    b = pix[i+2],
                    a = pix[i+3];

            // If its white then change it
            if (r >= 215 && r <= 220 && g >= 215 && g<= 220 && b >= 215 && b <= 220) { 
              // Change the white to whatever.
              pix[i] = newColor.r;
              pix[i+1] = newColor.g;
              pix[i+2] = newColor.b;
              pix[i+3] = newColor.a;
            }
          }

          ctx.putImageData(imgd, 0, 0);
          this.saveAs(canvas.toDataURL(), 'file-name.png');
          // let _window = window.open()
          // _window.document.write('<img src="'+canvas.toDataURL("image/png")+'"/>');

        });
      },
      saveAs(uri, filename) {
        var link = document.createElement('a');

        if (typeof link.download === 'string') {
          link.href = uri;
          link.download = filename;

          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          window.open(uri);
        }
      }
    },
    mounted() {
      this.loadProduct()
    }
  }
</script>
<style lang="scss">
  .profile-payment {
    .payment-methods {
      margin-top: 0;
    }
    .ant-form-item-label {
      line-height: 1
    }
    .container-login100-form-btn {
      width: 100%;
      display: -webkit-box;
      display: -webkit-flex;
      display: -moz-box;
      display: -ms-flexbox;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;

      .btn {
        padding: 12px;
        height: auto;
        color: #212529;
        background-color: #54bd95;
        border-color: #54bd95;

        &:hover {
          color: #fff;
          background-color: #41a982;
          border-color: #3ea07b;
        }
      }
    }
    .success-alert {
      text-align: center;
      padding: 40px 0;
      h1 {
          color: #88B04B;
          font-weight: 900;
          font-size: 40px;
          margin-bottom: 10px;
        }
        p {
          color: #404F5E;
          font-size:20px;
          margin: 0;
        }
      i {
        color: #9ABC66;
        font-size: 100px;
        line-height: 200px;
        margin-left:-15px;
      }
      .card {
        background: white;
        padding: 60px;
        border-radius: 4px;
        box-shadow: 0 2px 3px #C8D0D8;
        display: inline-block;
        margin: 0 auto;
      }
    }
    .Voucher {
      width: 443px;
      margin-left: auto;
      margin-right: auto;
      padding: 32px;
      border-radius: 6px;
      box-shadow: 0 0 0 1px hsl(0deg 0% 69% / 20%), 0 15px 35px 0 rgb(49 49 93 / 8%), 0 5px 15px 0 rgb(0 0 0 / 6%);
    }
    .OXXO-container {
      .Voucher-Logo {
        width: 100px;
        height: auto;
        margin-bottom: 24px
      }

      .Voucher-Logo--oxxo {
        width: 80px;
        margin: 0 0 16px
      }

      ol {
        -webkit-padding-start: 1.2em;
        padding-inline-start:1.2em
      }
      .spacing-8 {
        margin: -4px;
        &>.flex-fill {
          padding: 4px;
        }
      }
      .Text {
        margin: 0;
      }
      .Text-fontSize--11 {
        font-size: 11px;
      }
      .Text-fontSize--14 {
        font-size: 14px;
      }
      .Text-fontSize--36 {
        font-size: 36px;
      }
      .Text-fontWeight--500 {
        font-weight: 500;
      }
      .Text-fontWeight--600 {
        font-weight: 600;
      }
      .Text-fontWeight--700 {
        font-weight: 700;
      }
      .Text-color--gray500 {
        color: #1a1a1a99;
      }
      .Text-color--gray800 {
        color: #1a1a1ae6;
      }
      .Text-color--gray900 {
        color: #1a1a1a;
      }
      .Text-color--orange {
        color: #bb5504;
      }

      .Tag {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        padding: 2px 4px;
        border-radius: 4px
      }

      .Tag-orange {
        background-color: #ffde92
      }

      .Tag-red {
        background-color: #fde2dd
      }


      .OXXO-barcode {
        -webkit-align-self: center;
        -ms-flex-item-align: center;
        -ms-grid-row-align: center;
        align-self: center;
        margin: 32px 0;
        text-align: center
      }

      .OXXO-instructions {
        font-size: 14px
      }

      .OXXO-instructions ol>li {
        margin: 0 0 1em
      }

      .OXXO-copyUrl,.OXXO-printInstructions {
        margin-top: 16px
      }

      .Link {
        text-decoration: none;
        cursor: pointer
      }

      .Link:focus {
        outline: 1px dotted rgba(26,26,26,.5)
      }

      .Link--primary {
        color: #0074d4
      }

      .Link--secondary {
        color: rgba(26,26,26,.5);
        text-decoration: underline
      }
      .HostedVoucherButton {
        width: 100%;
        border-radius: 4px;
        padding: 12px;
        min-height: 28px;
        font-weight: 400;
        font-size: 14px;
        box-shadow: 0 1px 1px 0 rgb(0 0 0 / 12%), 0 0 0 1px #5469d4, 0 2px 5px 0 rgb(60 66 87 / 8%);
        cursor: pointer;
        border: 0;
        transition-delay: 0s,0s;
        transition-duration: .24s,.24s;
        transition-property: background-color,box-shadow;
        transition-timing-function: ease,ease;
      }
    }
  }
</style>