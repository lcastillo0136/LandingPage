<template>
  <div class="box_general_2">
    <h4>Pacientes</h4>
    <a-table :columns="columns" :data-source="clients" class="table-responsive" rowKey="id" bordered>
      <a slot="name" slot-scope="record">{{ record.first_name }} {{ record.last_name }}</a>
      <small slot="contact" slot-scope="record">
        <a :href="`mailto:${record.email}`">{{ record.email }}</a><br>
        <a :href="`tel:${record.phone}`">{{ record.phone | phone }}</a>
      </small>
      <small slot="appointments" slot-scope="record" class="text-right d-block">
        <template v-if="record.next_appointment">
          {{ record.next_appointment.start_date | moment('dddd DD/MM/YYYY') }}<br>
          {{ record.next_appointment.start_date | moment('hh:mm a') }}
        </template>
        <template v-else>
          <span class="text-info">---------------</span>
        </template>
      </small>
      <div slot="actions" slot-scope="record" >
        <a-dropdown placement="bottomRight">
          <a-menu slot="overlay">
            <a-menu-item key="1" @click="viewProfile(record.id)">
              Ver detalles
            </a-menu-item>
            <a-menu-item key="2">
              Iniciar Consulta
            </a-menu-item>
          </a-menu>
          <a-button shape="circle" type="dashed" >
            <b-icon-three-dots-vertical></b-icon-three-dots-vertical>
          </a-button>
        </a-dropdown>
      </div>
    </a-table>
  </div>
</template>
<script>
  import { BIconThreeDotsVertical } from 'bootstrap-vue'

  const columns = [
    { title: 'Nombre', key: 'name', scopedSlots: { customRender: 'name' } },
    { title: 'Contacto', key: 'email', scopedSlots: { customRender: 'contact' } },
    { title: 'Prox. Cita', key: 'appointments', scopedSlots: { customRender: 'appointments' } },
    { title: '', key: 'actions', scopedSlots: { customRender: 'actions' } }
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
      BIconThreeDotsVertical
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
    methods: {
      viewProfile (client_id) {
        this.$router.push({ 
          name: 'profile-patients-edit',
          params: { id: client_id }
        })
      }
    },
    mounted() {
    }
  }
</script>