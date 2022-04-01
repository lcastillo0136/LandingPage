<template>
  <main>
    <BreadCrumb :routes="breadcrumb"></BreadCrumb>

    <div class="container margin_60">
      <div class="row">
        <div class="col-xl-8 col-lg-8">
          <div class="box_general_3 cart">
            <div class="message" v-if="!hasToken">
              <p>¿Cliente existente? <router-link :to="{ name: 'login', params: { page: 'booking-page', info: { ...$route.params } } }">Haz click aquí para iniciar sesión</router-link></p>
            </div>

            <div class="form_title">
              <h3><strong>1</strong>Información personal</h3>
              <p>
                
              </p>
            </div>

            <DetailsForm v-model="client"></DetailsForm>

            <hr v-if="canAccount">
            <!--End step -->

            <div class="form_title" v-if="canAccount">
              <h3><strong>2</strong>Información de pago</h3>
              <p>
                
              </p>
            </div>

            <DetailsPayment v-model="account" v-if="canAccount"></DetailsPayment>

            <hr v-if="canBill">
            <!--End step -->

            <div class="form_title" v-if="canBill">
              <h3><strong>3</strong>Dirección de facturación</h3>
              <p>
                (Opcional)
              </p>
            </div>
            
            <BillDetails v-model="bill" v-if="canBill"></BillDetails>

            <hr v-if="canPay">
            <!--End step -->
            <div id="policy" v-if="canPay">
              <h4>Política de cancelación</h4>
              <div class="form-group">
                <div class="checkbox">
                  <input type="checkbox" class="css-checkbox" id="policy_terms" name="policy_terms" v-model="policyTerms">
                  <label for="policy_terms" class="css-label">Acepto la política general y los términos y condiciones.</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- /col -->
        <aside class="col-xl-4 col-lg-4" id="sidebar" v-if="canView">
          <div class="box_general_3 booking">
            <form>
              <div class="title">
                <h3>Datos para agendar</h3>
              </div>
              <div class="summary">
                <ul>
                  <li>Fecha: <strong class="float-right">{{ getDate }}</strong></li>
                  <li>Hora: <strong class="float-right">{{ getTime }}</strong></li>
                  <li>Medico: <strong class="float-right">{{ doctor.name }}</strong></li>
                </ul>
              </div>
              <ul class="treatments checkout clearfix" v-if="getServices.length > 0">
                <li v-for="service in getServices">
                  {{ service.name }} <strong class="float-right">${{ service.price }}</strong>
                </li>
                <li class="total">
                  Total <strong class="float-right">${{ getTotal }} {{ settings.CURRENCY }}</strong>
                </li>
              </ul>
              <template v-if="canPay && policyTerms">
                <template v-if="account.methodSelected == 1">
                  <hr class="fadeIn animated">
                  <a href="confirm.html" class="btn_1 full-width fadeIn animated" @click.stop.prevent="sendPaymentCard">Confirmar y pagar</a>
                </template>
                <template v-if="account.methodSelected == 2">
                  <hr class="fadeIn animated">
                  <a href="confirm.html" class="btn_1 full-width fadeIn animated" @click.stop.prevent="sendPayment">Confirmar y pagar</a>
                </template>
                <template v-if="account.methodSelected == 3">
                  <hr class="fadeIn animated">
                  <a href="confirm.html" class="btn_1 full-width fadeIn animated" @click.stop.prevent="sendPayment">Confirmar y pagar</a>
                </template>

                <template v-if="account.methodSelected == 4">
                  <hr class="fadeIn animated">
                  <div id="paypal-button-container"></div>
                </template>
              </template>
            </form>
          </div>
          <!-- /box_general -->
        </aside>
        <!-- /asdide -->
      </div>
      <!-- /row -->
    </div>
    <!-- /container -->
  </main>
  <!-- /main -->
</template>
<script>
  import BreadCrumb from '@/components/breadcrumb'
  import DetailsForm from './components/details-form'
  import DetailsPayment from './components/details-payment'
  import BillDetails from './components/bill-details'
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import { postOrder } from '@/api/data'
  import * as conekta from '@/libs/conekta'

  export default {
    name: 'BookingPage',
    components: {
      BreadCrumb,
      DetailsForm,
      DetailsPayment,
      BillDetails
    },
    data () {
      return {
        breadcrumb: () => [
          { route: { name: 'home' }, text: 'Inicio' }, 
          { route: { name: 'list-page' }, text: 'Listado' }, 
          { route: { name: 'details-page', params: { id: this.doctor?.id } }, text: this.doctor?.name }
        ],
        client: {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          isValid: false
        },
        account: {
          name: '',
          card: '',
          expiration:  { month: '00', year: '00'},
          ccv: '',
          token: false,
          paypal: false,
          isValid: false,
          methodSelected: 1
        },
        bill: {
          country: '',
          state: '',
          city: '',
          cp: '',
          street: '',
          street2: ''
        },
        policyTerms: false
      }
    },
    watch: {
      'client.firstName' (newName, oldName) {
        if (this.account.name === '' || this.account.name === oldName)
          this.account.name = newName;
      },
      'account': {
        deep: true,
        handler () {
          if (this.account.methodSelected == 4) {
            this.showPaypalButtons();
          }
        }
      },
      'policyTerms' () {
        if (this.account.methodSelected == 4) {
          this.showPaypalButtons();
        }
      }
    },
    computed: {
      ...mapGetters([
        'settings',
        'hasToken',
        'getUser'
      ]),
      canPay () {
        return this.canAccount && this.canBill
      },
      canAccount () {
        return this.client.isValid
      },
      canBill () {
        return this.canAccount && this.account.isValid
      },
      getDate () {
        return this.$moment(this.$route.params.booking.date).format('DD/MM/YYYY')
      },
      getTime () {
        const [_hr, _min] = (this.$route.params.booking.time||'00:00').split(':')
        return this.$moment().set({ hour: _hr, minute:_min }).format('hh:mm a')
      },
      doctor () {
        return this.$route.params.dr
      },
      getServices () {
        return this.$route.params.booking.service
      },
      getTotal () {
        return this.$route.params.booking.service.map(s => +s.price).reduce((s, s1) => s + s1, 0)
      },
      getDiscount () {
        return 0
      },
      canView() {
        return this.$route.params && this.$route.params.booking && this.$route.params.dr
      }
    },
    methods: {
      ...mapActions([
        'getUserInfo'
      ]),
      sendPaymentCard () {
        this.tokenizeCard().then((tokenize) => {
          this.account.token = tokenize.id

          this.sendPayment()
        }).catch((error) => {
          this.$swal('Pago no procesado', error.message_to_purchaser, 'error').then(() => {

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
        if (this.canPay && this.policyTerms) {
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
                this.errorMessage('No se pudo realizar el pago con paypal, favor de intentar mas tarde.');
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
                        value: +p.price.toFixed(2)
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
                  this.sendPayment();
                })
                .catch(err => {
                  this.errorMessage('No se pudo realizar el pago con paypal, favor de intentar mas tarde.');
                })
              }
            }).render('#paypal-button-container');
          })
        }
      },
      sendPayment () {
        let data = {
          provider_id: this.doctor.id,
          phone: this.client.phone,
          email: this.client.email,
          name: this.client.firstName,
          last_name: this.client.lastName,
          payment_method: this.account.methodSelected, // 1: tarjeta, 2: oxxo, 3: cash, 4: paypal
          Products: this.getServices.map((s) => Object({
            product_id: s.id,
            name: s.name,
            precio_venta: s.price,
            date: this.$moment(this.getDate, 'DD/MM/YYYY').format('DDMMYYYY'),
            time: this.getTime,
            phone: this.client.phone,
            email: this.client.email
          })),
        };
        let readyToSave = false

        if (this.account.methodSelected == 1 && this.account.token !== false) {
          data.token = this.account.token; // si es con tarjeta,
          // data.card_id = 'cad_dsadsdsadsadsa', // si se usa tarjeta registrada,
          data.card = this.account.card;
          data.expiration = `${this.account.expiration.month}/${this.account.expiration.year}`;
          data.titular = this.client.firstName;

          readyToSave = true
        } else if ([2,3].includes(this.account.methodSelected)) {
          readyToSave = true
        } else if (this.account.methodSelected == 4 && this.account.paypal !== false) {
          data.paypal_id = this.account.paypal
          readyToSave = true
        }

        if (this.bill.country && this.bill.state && this.bill.city && this.bill.street) {
          data.addresses = [{
            street: this.bill.street,
            city: this.bill.city, 
            suburb: '', 
            postal_code: this.bill.cp, 
            exterior_number: this.bill.street.replace(/\s+/g, '').match(/\d+/g).join('') || 0, 
            interior_number: '', 
            township: this.bill.city, 
            state: this.bill.state, 
            country: this.bill.country, 
            directions: this.bill.street2, 
            alias: 'direccion'
          }]
        }

        if (readyToSave) {
          postOrder(data).then((response) => {
            // this.$swal('Thanks for your booking!', 'You\'ll receive a confirmation email at <a href="mailto:[email protected]">[email protected]</a>','success').then(() => {
            //   this.$router.back()
            // })
            debugger;
          }).catch((error) => {
            debugger;
          })
        }
      }
    },
    mounted() {
      if (!this.canView) {
        this.$router.replace({ name: 'home' })
      }

      window['$']('#sidebar').theiaStickySidebar({
        additionalMarginTop: 95
      });

      if (this.hasToken) {
        this.client.firstName = this.getUser.first_name || ''
        this.client.lastName = this.getUser.last_name || ''
        this.client.email = this.client.email2 = this.getUser.email || ''
        this.client.phone = this.getUser.phone || ''
      }
    }
  }
</script>