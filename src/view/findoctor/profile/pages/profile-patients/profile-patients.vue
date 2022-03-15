<template>
  <div class="box_general_2">
    <h4>Pacientes</h4>
    <a-table :columns="columns" :data-source="clients" class="components-table-demo-nested">
      <a slot="name" slot-scope="record">{{ record.first_name }} {{ record.last_name }}</a>
      <a slot="phone" slot-scope="record">{{ record.phone | phone }}</a>
    </a-table>
  </div>
</template>
<script>
  const columns = [
    { title: 'Nombre', key: 'name', scopedSlots: { customRender: 'name' } },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Telefono', key: 'phone', scopedSlots: { customRender: 'phone' }  }
  ];

  import { mapGetters } from 'vuex'

  export default {
    data() {
      return {
        columns
      };
    },
    name: 'ProfilePatients',
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
      clients() {
        return this.getUser.clients
      }
    },
    mounted() {
    }
  }
</script>