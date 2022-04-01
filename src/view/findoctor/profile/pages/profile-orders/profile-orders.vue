<template>
  <div class="box_general_2">
    <h4>Ordenes</h4>
    <a-table :columns="columns" :data-source="orders" class="components-table-demo-nested" rowKey="id">
      <a slot="method" slot-scope="record">
        {{ record.method.name }}
        <br>
        <small type="secondary">{{ record.name }}</small>
      </a>
      <a-tag :color="record.color" slot="status" slot-scope="record">
        {{ record.status.name }}
      </a-tag>
      <a slot="total" slot-scope="record">
        {{ record.total | currency }}
      </a>
    </a-table>
  </div>
</template>
<script>
  const columns = [
    { title: 'Metodo', key: 'method', scopedSlots: { customRender: 'method' } },
    { title: 'Estatus', key: 'status', scopedSlots: { customRender: 'status' } },
    { title: 'Total', key: 'total', scopedSlots: { customRender: 'total' } }
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