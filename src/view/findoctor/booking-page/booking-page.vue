<template>
  <main>
    <BreadCrumb :routes="breadcrumb"></BreadCrumb>

    <div class="container margin_60">
      <div class="row">
        <div class="col-xl-8 col-lg-8">
          <div class="box_general_3 cart">
            <div class="message">
              <p>¿Cliente existente? <router-link :to="{ name: 'login' }">Haz click aquí para iniciar sesión</router-link></p>
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
                  <li>Nombre Dr.: <strong class="float-right">{{ doctor.name }}</strong></li>
                </ul>
              </div>
              <ul class="treatments checkout clearfix" v-if="getServices.length > 0">
                <li v-for="service in getServices">
                  {{ service.name }} <strong class="float-right">${{ service.price }}</strong>
                </li>
                <li class="total">
                  Total <strong class="float-right">${{ getTotal }}</strong>
                </li>
              </ul>
              <hr v-if="canPay && policyTerms" class="fadeIn animated">
              <a href="confirm.html" class="btn_1 full-width fadeIn animated" v-if="canPay && policyTerms" @click.stop.prevent="sendPayment">Confirmar y pagar</a>
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
          ccv: ''
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
      'account.name' (newName, oldName) {
        
      }
    },
    computed: {
      canPay () {
        return this.canAccount && this.canBill && this.bill.country && this.bill.state && this.bill.city && this.bill.cp && this.bill.street
      },
      canAccount () {
        return this.client.isValid
      },
      canBill () {
        return this.canAccount && this.account.name && this.account.card && this.account.expiration && this.account.ccv
      },
      getDate () {
        return this.$moment(this.$route.params.booking.date).format('DD/MM/YYYY')
      },
      getTime () {
        return this.$route.params.booking.time
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
      canView() {
        return this.$route.params && this.$route.params.booking && this.$route.params.dr
      }
    },
    methods: {
      sendPayment () {
        this.$swal('Thanks for your booking!', 'You\'ll receive a confirmation email at <a href="mailto:[email protected]">[email protected]</a>','success').then(() => {
          this.$router.back()
        })
      }
    },
    mounted() {
      window['$']('#sidebar').theiaStickySidebar({
        additionalMarginTop: 95
      });

      console.log(this.$route.params)

      if (!this.canView) {
        this.$router.replace({ name: 'home' })
      }
    }
  }
</script>