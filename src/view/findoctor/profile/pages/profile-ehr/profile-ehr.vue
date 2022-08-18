<template>
  <div class="mt-3 mt-lg-0">
    <h4 class="mb-3">
      Historial Médico
    </h4>
    <div class="profile-ehr box_general_2">
      <template v-if="client.next_appointment">
        <div>
          <span class="d-flex flex-column">
            <small class="profile-mute">Próxima cita</small>
            <small>{{ client.next_appointment.start_date | moment('DD/MM/YYYY hh:mm a') }}</small>
          </span>
        </div>
        <a-divider dashed class="my-3"></a-divider>
      </template>
      <template v-if="client.last_medical_record">
        <div class="row">
          <span class="col-6 col-md-3 d-flex flex-column mb-2">
            <small class="profile-mute font-weight-bold">Altura</small>
            <small>{{ client.last_medical_record.height }}cm</small>
          </span>
          <span class="col-6 col-md-3 d-flex flex-column">
            <small class="profile-mute font-weight-bold">Peso</small>
            <small>{{ client.last_medical_record.weight }}kg</small>
          </span>
          <span class="col-6 col-md-3 d-flex flex-column">
            <small class="profile-mute font-weight-bold">Masa corporal (BMI)</small>
            <small>{{ client.last_medical_record.bmi }}</small>
          </span>
          <span class="col-6 col-md-3 d-flex flex-column">
            <small class="profile-mute font-weight-bold">Temperatura</small>
            <small>{{ client.last_medical_record.temperature }}°</small>
          </span>
          <span class="col-6 col-md-3 d-flex flex-column">
            <small class="profile-mute font-weight-bold">Frecuencia respiratoria</small>
            <small>{{ client.last_medical_record.breathing_frequency }}</small>
          </span>
          <span class="col-6 col-md-3 d-flex flex-column">
            <small class="profile-mute font-weight-bold">Presión arterial</small>
            <small>{{ client.last_medical_record.blood_pressure }}</small>
          </span>
          <span class="col-6 col-md-3 d-flex flex-column">
            <small class="profile-mute font-weight-bold">Ritmo cardiaco</small>
            <small>{{ client.last_medical_record.heart_rate }}</small>
          </span>
          <span class="col-6 col-md-3 d-flex flex-column">
            <small class="profile-mute font-weight-bold">Grupo sanguíneo</small>
            <small>{{ client.last_medical_record.blood_type }}</small>
          </span>
        </div>
        <a-divider dashed class="my-3"></a-divider>
      </template>
      <h5 class="mb-3">Consultas</h5>
      <a-timeline>
        <a-timeline-item color="green" v-for="(ehr, ehr_i) in client.medical_history" :key="ehr_i">
          Se consultó el <b class="text-info">{{ ehr.updated_at | moment('dddd DD [de] MMMM [a las] hh:mm a') }}</b>
           por motivo de <span class="font-italic font-weight-bold text-info">{{ ehr.reason }}</span> se recomendó <span class="font-italic font-weight-bold text-success">{{ ehr.comments }}</span>.
           <br>
           Fue atendido por <span class="font-italic font-weight-bold">{{ ehr.user.full_name }}</span>
        </a-timeline-item>
      </a-timeline>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'ProfileEHR',
    computed: {
      ...mapGetters([
        'hasToken',
        'settings',
        'getUser'
      ]),
      client () {
        return this.getUser
      }
    },
  }
</script>
<style lang="scss">
  
</style>