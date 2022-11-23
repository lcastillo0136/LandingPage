<template>
  <div class="pb-5 mb-5">
    <b-card no-body>
      <b-card-body>
        <h3 class="mb-4">
          Pagos realizados
        </h3>
        <div class="table-responsive">
          <a-table :columns="columns" :data-source="orders" class="components-table-demo-nested" rowKey="id" :rowClassName="rowClassName">
            <a slot="icon" slot-scope="record" class="">
              <template v-if="record.status && record.status.id == 2">
                <a-avatar src="/img/sprites/creditcard.jpg" v-if="record.method.id == 1"></a-avatar>
                <a-avatar src="/img/sprites/oxxo.jpg" v-else-if="record.method.id == 2"></a-avatar>
                <a-avatar src="/img/sprites/paypal.jpg" v-else-if="record.method.id == 4"></a-avatar>
              </template>
            </a>
            <a slot="method" slot-scope="record">
              <div class="d-none d-md-flex flex-column">
                {{ record.method.name }}
                <br>
                <small type="secondary">{{ record.name }}</small>
              </div>
              <div class="d-md-none">
                <small type="secondary" class="font-weight-bold">{{ record.name }}</small>
                <br>
                <small class="text-muted">{{ record.created_at | moment('MMM DD, YYYY') }}</small>
              </div>
            </a>
            <a-tag :color="record.status.color" slot="status" slot-scope="record">
              {{ record.status.name | paymentStatus }}
            </a-tag>
            <a slot="total" slot-scope="record">
              {{ record.total | currency }} <small class="text-lowercase">{{ record.currency || 'usd' }}</small>
              <div class="d-md-none d-block">
                <a-tag :color="record.status.color" class="mr-0">
                  {{ record.status.name | paymentStatus }}
                </a-tag>
              </div>
            </a>
            <small slot="created_at" slot-scope="record">
              {{ record.created_at | moment('MMM DD, YYYY') }}
            </small>
          </a-table>
        </div>
      </b-card-body>
    </b-card>
  </div>
</template>
<script>
  const columns = [
    { title: '', key: 'icon', scopedSlots: { customRender: 'icon' }, className: 'p-0'},
    { title: 'Metodo', key: 'method', scopedSlots: { customRender: 'method' }, className: ''},
    { title: 'Estatus', key: 'status', scopedSlots: { customRender: 'status' }, className: 'd-none d-md-table-cell' },
    { title: 'Total', key: 'total', scopedSlots: { customRender: 'total' }, className: 'text-right text-md-left' },
    { title: 'Fecha', key: 'created_at', scopedSlots: { customRender: 'created_at' }, className: 'd-none d-md-table-cell text-capitalize' }
  ];

  import { mapGetters } from 'vuex'

  export default {
    data() {
      return {
        columns,
      }
    },
    name: 'ProfileOrders',
    watch: {
    },
    components: {
    },
    computed: {
      ...mapGetters([
        'hasToken',
        'settings',
        'getUser'
      ]),
      orders() {
        return this.getUser.orders
      }
    },
    methods: {
      rowClassName() {
        
      }
    },
    mounted() {
    }
  }
</script>
<style lang="scss">
  .ant-table-thead > tr > th, 
  .ant-table-tbody > tr > td {
    &:first-child {
      padding: 0px;
      text-align: center;
    }
  }
</style>