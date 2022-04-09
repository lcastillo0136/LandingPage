<template>
  <main>
    <BreadCrumb :routes="breadcrumb"></BreadCrumb>

    <div class="container margin_60" v-if="order">
      <div class="row">
        <div class="col-xl-8 col-lg-8">
          <vue-html2pdf
            :show-layout="true"
            :float-layout="false"
            :enable-download="true"
            :preview-modal="false"
            :paginate-elements-by-height="1400"
            filename="invoice"
            :pdf-quality="2"
            :manual-pagination="false"
            pdf-format="a4"
            pdf-orientation="portrait"
            pdf-content-width="100%"

            ref="html2Pdf"
          >

            <section slot="pdf-content">
              <div class="box_general_3 cart">
                <div class="invoice-header">
                  <div class="invoice-media">
                    <div>
                      <router-link :style="'background-image: url('+ appImage +');'" :to="{ name: 'home' }" :title="appName" class="logo">{{ appName }}</router-link>
                    </div>
                    <div class="invoice-company-mail">
                      {{ appEmail }}
                    </div>
                  </div>
                  <div class="invoice-company-address">
                    {{ appStreet }}<br>
                    {{ appCity }}, {{ appCP }}<br>
                    {{ appState }}, {{ appCountry }}
                  </div>
                </div>

                <div class="invoice-details">
                  <div>
                    <div>Numero de orden</div>
                    <div><label>{{ order_key }}</label></div>
                    <div><label>Fecha de emision: </label> {{ order.created_at | moment('DD MMM YYYY') }}</div>
                  </div>
                  <div class="text-right">
                    <div>Facturado a</div>
                    <div><label>{{ order.client | fullName }}</label></div>
                    <template v-if="order.client.address">
                      <div>
                        <label>{{ order.client.address.street }}</label>
                      </div>
                      <div>
                        <label>{{ order.client.address.state }}, {{ order.client.address.country }}</label>
                      </div>
                    </template>
                    <div>
                      <label>{{ order.client.phone }}</label>
                    </div>
                    <div>
                      <label>{{ order.client.email }}</label>
                    </div>
                  </div>
                </div>

                <div class="invoice-content">
                  <span>Detalles</span>

                  <a-table :pagination="false" :columns="columns" :data-source="order.products" class="components-table-demo-nested" rowKey="id">
                    <div slot="name" slot-scope="record" class="data-record">
                      {{ record.name }}
                    </div>
                    <div slot="date" slot-scope="record" class="data-record">
                      {{ record | toDate('DD/MM/YYYY hh:mm a') }}
                    </div>
                    <div slot="total" slot-scope="record" class="text-right data-record">
                      {{ record.precio_venta | currency }}
                    </div>
                  </a-table>

                  <a-divider />

                  <div class="invoice-payment">
                    <div class="invoice-payment-details">
                      <div class="invoice-payment-method">
                        <div>Metodo de pago</div>
                        <span>{{ order.method.name }}</span>
                      </div>
                      <div class="invoice-payment-status">
                        <div>Estatus pago</div>
                        <span>
                          <a>
                            {{ order.status.name | paymentStatus }}
                          </a>
                        </span>
                      </div>
                      <template v-if="order.payment_orders.type == 'oxxo'">
                        <div class="invoice-payment-oxxo">
                          <div>Referencia</div>
                          <span>{{ order.payment_orders.metadata_object.reference | oxxo }}</span>
                        </div>
                        <div class="invoice-payment-oxxo-expired">
                          <div>Caducidad</div>
                          <span>
                            Pagar antes de {{ oxxoTime }} 
                          </span>
                          <a-tag color="red" v-if="oxxoExpired && !orderPaid">Expirado</a-tag>
                          <a-tag color="green" v-if="orderPaid">Pagado</a-tag>
                        </div>
                        <div class="invoice-payment-oxxo-barcode">
                          <div>Codigo de barras</div>
                          <span>
                            <img :src="order.payment_orders.metadata_object.barcode_url" />
                          </span>
                        </div>
                      </template>
                    </div>
                    <div class="invoice-totals">
                      <div class="invoice-totals-subtotal">
                        <span>Sub Total</span>
                        <span>{{ order.subtotal | currency }}</span>
                      </div>
                      <div class="invoice-totals-discount">
                        <div>Descuento</div>
                        <span>{{ order.discount | currency }}</span>
                      </div>
                      <div class="invoice-totals-grand">
                        <div>Cantidad Total</div>
                        <span>{{ order.total | currency }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </vue-html2pdf>
        </div>
        <!-- /col -->
        <aside class="col-xl-4 col-lg-4" id="sidebar" v-if="canView">
          <div class="box_general_3 booking">
            <h5>Detalles del cliente</h5>
            <div class="invoice-client">
              <a-avatar :size="64" :src="order.client.avatar" />
              <div class="d-flex flex-column ">
                <span class="font-weight-bold mb-2">{{ order.client | fullName }}</span>
                <span>{{ order.client.email }}</span>
              </div>
            </div>
          </div>
          <div class="box_general_3 booking">
            <h5 class="mb-4">Monto Total</h5>
            <h2 class="mb-0">{{ order.total | currency }} <small>{{ appCurrency }}</small></h2>
          </div>
          <div style="gap: 16px;" class="d-flex flex-row justify-content-between">
            <a-button size="large" style="flex: 1 1 auto;">Compartir</a-button>
            <a-button size="large" style="flex: 1 1 auto;" @click="generateReport">Descargar</a-button>
          </div>
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
  import VueHtml2pdf from 'vue-html2pdf'
  import BreadCrumb from '@/components/breadcrumb'
  import { getOrder } from '@/api/data'
  import { getServerFile } from '@/libs/util'
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import moment from 'moment'

  export default {
    name: 'InvoicePage',
    components: {
      BreadCrumb,
      VueHtml2pdf
    },
    data () {
      return {
        breadcrumb: () => [
          { route: { name: 'home' }, text: 'Inicio' }, 
          { route: { name: 'list-page' }, text: 'Listado' }, 
          { route: { name: 'details-page', params: { id: this.doctor?.id } }, text: this.doctor?.name }
        ],
        order: null,
        columns: [
          { title: 'Nombre', key: 'name', scopedSlots: { customRender: 'name' } },
          { title: 'Fecha de cita', key: 'date', scopedSlots: { customRender: 'date' } },
          { title: 'Total', key: 'total', scopedSlots: { customRender: 'total' } }
        ]
      }
    },
    filters: {
      fullName(value) {
        return `${value.title || ''} ${value.first_name || ''} ${value.last_name || ''}`
      },
      toDate(value, format) {
        return moment(`${value.date} ${value.time}`, 'DDMMYYYY HH:mm').format(format)
      },
      oxxoExpired(value) {
        return moment.unix(value.expires_at).isBefore()
      },
      oxxoTime(value) {
        return moment.unix(value.expires_at).format('DD/MM/YYYY hh:mm a')
      },
    },
    watch: {
      
    },
    computed: {
      ...mapGetters([
        'settings',
        'hasToken',
        'getUser'
      ]),
      appName () {
        return this.settings?.COMPANY_NAME
      },
      appEmail () {
        return this.settings?.COMPANY_EMAIL
      },
      appStreet () {
        return this.settings?.COMPANY_ADDRESS
      },
      appCity () {
        return this.settings?.COMPANY_CITY
      },
      appCP () {
        return this.settings?.COMPANY_CP
      },
      appState () {
        return this.settings?.COMPANY_STATE
      },
      appCountry () {
        return this.settings?.COMPANY_COUNTRY
      },
      appImage () {
        return getServerFile('public/company/company_logo.png')
      },
      appCurrency () {
        return this.settings?.CURRENCY
      },
      doctor () {
        return this.$route.params.dr
      },
      order_key () {
        return this.$route.params.order
      },
      canView() {
        return this.$route.params && this.$route.params.order
      },
      orderPaid() {
        return this.order.payment_orders.status == 'paid'
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
        return this.$moment.unix(this.orderOXXO.expires_at).format('DD/MM/YYYY hh:mm a')
      },
    },
    methods: {
      ...mapActions([
        'getUserInfo'
      ]),
      generateReport () {
        this.$refs.html2Pdf.generatePdf()
      }
    },
    mounted() {
      if (!this.canView) {
        this.$router.replace({ name: 'home' })
      }

      
      if (this.hasToken) {
      }
      
      getOrder(this.$route.params.order).then((response) => response.data).then((response) => {
        this.order = { ...response.data }
        this.$nextTick().then(() => {
          // window['$']('#sidebar').theiaStickySidebar({
          //   additionalMarginTop: 95
          // });
        })
      }).catch(() => {

      })
    }
  }
</script>
<style lang="scss">
    ::root {
      --invoice-primary-color: #96A0B5;
      --invoice-secondary-color: #0C1740;
      --invoice-third-color: #96A0B5;
    }
    *::after {
      display: none;
    }
    .logo {
      width: 163px;
      height: 36px;
      display: block;
      background: url(/img/logox2.png) no-repeat;
      background-size: 163px 36px;
      text-indent: -9999px;
    }
    .invoice-header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      .invoice-media {
        flex: 1 1 auto;
        .invoice-company-mail {
          color: #96A0B5;
          text-indent: 38px;
        }
      }

      .invoice-company-address {
        flex: 0 0 auto;
        text-align: right;
        color: var(--invoice-primary-color);
      }
    }

    .invoice-details {
      background: #3f4079;
      color: #fff;
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      padding: 16px 25px;
      margin: 40px auto;
      border-radius: 10px;
      line-height: 26px;
      font-weight: 500;

      label {
        font-weight: 100;
        margin-bottom: 0;
        font-size: 13px;
      }
    }
    .invoice-content {
      span {
        color: var(--invoice-secondary-color);
        font-weight: 500;
      }

      .ant-table-wrapper {
        margin-top: 30px;
      }
      
      .ant-table-thead > tr {
        > th {
          background: #f000;
          border-top: solid 1px #ECEFF4;
          border-bottom: solid 1px #ECEFF4;
          padding: 10px 16px;
          border-radius: 0;

          &[key="total"] {
            text-align: right;
          }

          span {
            color: var(--invoice-primary-color);
          }
        }
      }
      .ant-table-tbody > tr {
        > td {
          border-bottom: none;
          padding: 16px 16px;
          font-weight: 500;

          &[key="total"] {
            text-align: right;
          }
          .data-record {
            background: #FAFBFC;
            border: solid 1px #EEF1F5;
            border-radius: 10px;
            padding: 10px;
            font-weight: 600;
          }
        }
      }

      .invoice-payment {
        display: flex;
        justify-content: space-between;
        flex-direction: row;

        .invoice-payment-details {
          display: flex;
          flex-direction: column;
          flex: 0 1 auto;
          line-height: 27px;
          > div {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            flex: 0 0 auto;

            &.invoice-payment-oxxo-expired, &.invoice-payment-oxxo-barcode {
              display: flex;
              flex-direction: column;
              align-content: flex-start;
              align-items: flex-start;

              span {
                margin-left: 16px;
                align-self: end;
              }
            }

            .ant-tag {
              margin-right: 0;
            }
          }
        }
        .invoice-totals {
          text-align: right;
          flex: 0 1 35%;
          line-height: 27px;
          display: flex;
          flex-direction: column;

          > div {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            flex: 0 0 auto;

            &.invoice-totals-grand {
              border-top: solid 1px #ededed;
              margin-top: auto;
              margin-bottom: 30px;
            }
          }
        }
      }
    }
    .invoice-client {
      display: flex;
      flex-direction: row;
      align-content: center;
      align-items: center;
      justify-content: space-around;
      margin-top: 32px;
    }
  
</style>