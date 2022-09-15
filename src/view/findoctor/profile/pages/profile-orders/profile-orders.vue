<template>
  <div class="box_general_2 mt-3 mt-md-0 ">
    <h4>Órdenes</h4>
    <a-table :columns="columns" :data-source="orders" class="components-table-demo-nested" rowKey="id" bordered>
      <div slot="method" slot-scope="record">
        <a>
          {{ record.method.name }}
          <br>
          <small type="secondary">{{ record.name }}</small>
        </a>

        <div class="d-flex flex-column gap-1 d-md-none mt-2">
          <a-tag :color="record.color">
            {{ record.status.name | paymentStatus }}
          </a-tag>
          <a-tag class="mt-1">
            {{ record.created_at | moment('dddd') }}
            <br/>
            {{ record.created_at | moment('DD/MM/YYYY') }}
          </a-tag>
        </div>
      </div>
      <a-tag :color="record.color" slot="status" slot-scope="record">
        {{ record.status.name | paymentStatus }}
      </a-tag>
      <a slot="total" slot-scope="record">
        {{ record.total | currency }}
      </a>
      <small slot="created_at" slot-scope="record">
        {{ record.created_at | moment('dddd') }}<br/>{{ record.created_at | moment('D [de] MMMM [de] YYYY') }}
      </small>
    </a-table>
  </div>
</template>
<script>
  const columns = [
    { title: 'Método', key: 'method', scopedSlots: { customRender: 'method' } },
    { title: 'Estatus', key: 'status', scopedSlots: { customRender: 'status' }, class: 'd-none d-md-table-cell' },
    { title: 'Total', key: 'total', scopedSlots: { customRender: 'total' } },
    { title: 'Fecha', key: 'created_at', scopedSlots: { customRender: 'created_at' }, class: 'd-none d-md-table-cell' }
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
        return this.getUser.role && this.getUser.role.is_provider ? this.getUser.orders_providers : this.getUser.orders
      }
    },
    mounted() {
    }
  }
</script>