<template>
  <div>
    <template v-if="client.last_medical_record">
      <h4 class="mb-3">
        Consulta medica para {{ client.full_name }}
        <b-button class="float-right ml-2" @click="$router.back()" variant="outline-secondary" size="sm">
          <a-icon type="arrow-left" style="vertical-align: baseline;"></a-icon>
          Volver
        </b-button>
      </h4>
      <div class="profile-patient-ehr box_general_2">
        <a-form-model ref="ehrform" :rules="rules" :model="client.last_medical_record" :disabled="disableAllFields">
          <div class="d-flex flex-md-row gap-2 mb-2 flex-column">
            <a-form-model-item prop="height" label="Altura">
              <a-input type="number" v-model="client.last_medical_record.height" :readOnly="disableAllFields">
                <span slot="suffix">cm</span>
              </a-input>
            </a-form-model-item>
            <a-form-model-item prop="weight" label="Peso">
              <a-input type="number" v-model="client.last_medical_record.weight" :readOnly="disableAllFields">
                <span slot="suffix">kg</span>
              </a-input>
            </a-form-model-item>
            <a-form-model-item prop="bmi" label="BMI">
              <a-input type="number" v-model="client.last_medical_record.bmi"  :readOnly="disableAllFields"/>
            </a-form-model-item>
            <a-form-model-item prop="temperature" label="Temperatura">
              <a-input type="number" v-model="client.last_medical_record.temperature" :readOnly="disableAllFields">
                <span slot="suffix">°</span>
              </a-input>
            </a-form-model-item>
          </div>
          <div class="d-flex flex-md-row gap-2 mb-2 flex-column">
            <a-form-model-item prop="breathing_frequency" label="Frecuencia respiratoria">
              <a-input type="number" v-model="client.last_medical_record.breathing_frequency" :readOnly="disableAllFields">
                <span slot="suffix">imv</span>
              </a-input>
            </a-form-model-item>
            <a-form-model-item prop="blood_pressure" label="Presión arterial">
              <a-input type="number" v-model="client.last_medical_record.blood_pressure" :readOnly="disableAllFields">
                <span slot="suffix">mmHg</span>
              </a-input>
            </a-form-model-item>
            <a-form-model-item prop="heart_rate" label="Ritmo cardiaco">
              <a-input type="number" v-model="client.last_medical_record.heart_rate" :readOnly="disableAllFields">
                <span slot="suffix">bpm</span>
              </a-input>
            </a-form-model-item>
          </div>

          <a-form-model-item prop="blood_type" label="Grupo sanguíneo">
            <a-radio-group v-model="blood_type_letter" :disabled="disableAllFields">
              <a-radio-button value="A">
                A
              </a-radio-button>
              <a-radio-button value="B">
                B
              </a-radio-button>
              <a-radio-button value="AB">
                AB
              </a-radio-button>
              <a-radio-button value="O">
                O
              </a-radio-button>
            </a-radio-group>

            <a-radio-group v-model="blood_type_sign" class="ml-md-2" :disabled="disableAllFields">
              <a-radio-button value="+">
                +
              </a-radio-button>
              <a-radio-button value="-">
                -
              </a-radio-button>
            </a-radio-group>
            <b class="ml-3 d-block d-md-inline">{{ blood_type }}</b>
          </a-form-model-item>
          <a-divider dashed></a-divider>
          <a-form-model-item prop="reason" label="Motivo / Malestar principal" >
            <a-textarea :rows="3" v-model="client.last_medical_record.reason" :readOnly="recording1 || disableAllFields">
              <a-icon slot="prefix" type="user" />
            </a-textarea>
          </a-form-model-item>
          <div class="d-flex flex-row-reverse" v-if="canRecord && !disableAllFields">
            <template v-if="!recording1">
              <a-button type="secondary" icon="audio" @click="toggleRecord1" class="flex-fill flex-sm-grow-0 mb-4 mb-md-0">
                Dictar
              </a-button>
            </template>
            <template v-else>
              <a-button type="danger" icon="pause-circle" @click="toggleRecord1" class="flex-fill flex-sm-grow-0 mb-4 mb-md-0">
                Escuchando
              </a-button>
            </template>
          </div>
          <a-form-model-item prop="comments" label="Comentarios">
            <a-textarea :rows="2" type="text" v-model="client.last_medical_record.comments" :readOnly="recording2 || disableAllFields" />
            <div class="d-flex flex-row-reverse" v-if="canRecord && !disableAllFields">
              <template v-if="!recording2">
                <a-button type="secondary" icon="audio" @click="toggleRecord2" class="flex-fill flex-sm-grow-0 mb-4 mb-md-0">
                  Dictar
                </a-button>
              </template>
              <template v-else>
                <a-button type="danger" icon="pause-circle" @click="toggleRecord2" class="flex-fill flex-sm-grow-0 mb-4 mb-md-0">
                  Escuchando
                </a-button>
              </template>
            </div>
          </a-form-model-item>
        </a-form-model>

        <a-button class="flex-fill flex-sm-grow-0 mt-2" type="primary" @click="saveEHR" :loading="loading" v-if="!disableAllFields">
          <a-icon type="save" style="vertical-align: baseline;"></a-icon>
          Guardar
        </a-button>
        <br>
        <small v-if="disableAllFields" class="text-info">
          <b-icon-exclamation-triangle></b-icon-exclamation-triangle>
          Las consultas ya generadas no se pueden modificar
        </small>
        <br>
        <small v-if="appointment && appointment.id > 0" class="text-mute">
          Consulta de la cita del {{ appointment.start_date | moment('dddd DD [de] MMMM [a las] hh:mm a') }}
        </small>
      </div>
    </template>
  </div>
</template>
<script>
  import { getClient, postEHR } from '@/api/user'
  import { mapGetters } from 'vuex'

  import * as _ from 'lodash'

  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  var recognition = new SpeechRecognition();

  recognition.lang = "es-ES";
  recognition.continuous = true;
  recognition.interimResults = true;

  export default {
    data() {
      return {
        client: false,
        provider: false,
        appointment: false,
        blood_type_letter: 'A',
        blood_type_sign: '+' ,
        loading: false,
        recording1: false,
        recording2: false,
        field: 'reason',
        canRecord: !!SpeechRecognition,
        disableAllFields: false,
        rules: {
          reason: [{ validator: (rule, value, callback) => {
            value = (`${value||''}`).trim()
            if ((value === '' || !value)) {
              callback(new Error('Favor de no dejar este campo vacío'));
            } else {
              callback();
            }
          }, trigger: 'change' }],
          comments: [{ validator: (rule, value, callback) => {
            value = (`${value||''}`).trim()
            if ((value === '' || !value)) {
              callback(new Error('Favor de no dejar este campo vacío'));
            } else {
              callback();
            }
          }, trigger: 'change' }],
          weight: [{ validator: (rule, value, callback) => {
            value = (`${value||''}`).trim()
            if ((value === '' || !value)) {
              callback(new Error('Favor de no dejar este campo vacío'));
            } else {
              callback();
            }
          }, trigger: 'change' }],
          height: [{ validator: (rule, value, callback) => {
            value = (`${value||''}`).trim()
            if ((value === '' || !value)) {
              callback(new Error('Favor de no dejar este campo vacío'));
            } else {
              callback();
            }
          }, trigger: 'change' }],
          temperature: [{ validator: (rule, value, callback) => {
            value = (`${value||''}`).trim()
            if ((value === '' || !value)) {
              callback(new Error('Favor de no dejar este campo vacío'));
            } else {
              callback();
            }
          }, trigger: 'change' }],
          blood_type: [{ validator: (rule, value, callback) => {
            value = (`${value||''}`).trim()
            if ((value === '' || !value)) {
              callback(new Error('Favor de no dejar este campo vacío'));
            } else {
              callback();
            }
          }, trigger: 'change' }]
        }
      }
    },
    name: 'ProfilePatientsEhr',
    watch: {
      'client.last_medical_record.weight' () {
        this.calculateBMI()
      },
      'client.last_medical_record.height' () {
        this.calculateBMI()
      },
      'blood_type_letter' () {
        this.client.last_medical_record.blood_type = this.blood_type
      },
      'blood_type_sign' () {
        this.client.last_medical_record.blood_type = this.blood_type
      }
    },
    components: {
    },
    computed: {
      ...mapGetters([
        'hasToken',
        'settings',
        'getUser'
      ]),
      blood_type () {
        return `${this.blood_type_letter}${this.blood_type_sign}`
      }
    },
    methods: {
      calculateBMI() {
        let { weight, height } = this.client.last_medical_record

        this.client.last_medical_record.bmi = (((weight || 1) / ((height * height) || 1)) * 10000).toFixed(2)
      },
      saveEHR() {
        this.loading = true
        this.$refs.ehrform.validate().then(valid => {
          if (valid) {
            postEHR({
              ...this.client.last_medical_record
            }, this.hasToken).then((response) => response.data).then(response => {
              this.loading = false
              if (this.appointment && this.appointment.id > 0) {
                let _appt = _.find(this.getUser.appointments_provider, { id: this.appointment.id })

                _appt.ehr_id = response.data.id
                _appt.ehr = { ...response.data }
              }

              this.$router.back()
            }).catch((err) => {
              this.loading = false
            })
          } else {
            this.loading = false
          }
        }).catch((err) => {
          this.loading = false
        })
      },
      toggleRecord1() {
        this.field = 'reason'
        this.recording1 = !this.recording1
        if (this.recording1) {
          recognition.start()
        } else {
          recognition.stop()
        }
      },
      toggleRecord2() {
        this.field = 'comment'
        this.recording2 = !this.recording2
        if (this.recording2) {
          recognition.start()
        } else {
          recognition.stop()
        }
      }
    },
    mounted() {
      if (this.$route.params.client && this.$route.params.provider) {
        this.client = { ...this.$route.params.client }
        this.provider = { ...this.$route.params.provider }
        this.appointment = { ...this.$route.params.appointment }

        if (!this.client.last_medical_record) {
          this.client.last_medical_record = {
            blood_pressure: '',
            blood_type: 'A+',
            bmi: '',
            breathing_frequency: '',
            client_id: this.client.id,
            comments: '',
            ehr_type: 1, 
            heart_rate: 0,
            height: 0,
            reason: '',
            temperature: 0,
            user_id: this.provider.id,
            weight: 0
          }
        } else {
          this.client.last_medical_record.id = -1
          this.client.last_medical_record.client_id = this.client.id
          this.client.last_medical_record.comments = ''
          this.client.last_medical_record.ehr_type = 1
          this.client.last_medical_record.reason = ''
          this.client.last_medical_record.user_id = this.provider.id
        }

        if (this.appointment && this.appointment.id > 0) {
          this.client.last_medical_record.appointment_id = this.appointment.id
        }

        if (this.$route.params.ehr && this.$route.params.ehr.id > 0) {
          this.disableAllFields = true
          this.client.last_medical_record = { ...this.$route.params.ehr }
        }

        this.blood_type_sign = this.client.last_medical_record.blood_type.split('').pop() || '+'
        this.blood_type_letter = this.client.last_medical_record.blood_type.replace(/[\+\-]/g, '') || 'A'

        recognition.onresult = (event) => {
          for (var i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              console.log(event.results[i][0].transcript);

              if (this.field == 'reason') {
                this.client.last_medical_record.reason += event.results[i][0].transcript
              } else if (this.field == 'comment') {
                this.client.last_medical_record.comments += event.results[i][0].transcript
              }
            }
          }
        }
      } else {
        this.$router.back()
      }
    }
  }
</script>

<style lang="scss">
  .profile-patient-ehr {
    .ant-form-item {
      margin-bottom: 15px;
      &.ant-form-item-with-help { 
        margin-bottom: 5px;
      }
      label {
        margin-bottom: 0;
      }
      .ant-form-item-label {
        line-height: 20px;
      }
      textarea.ant-input {
        line-height: inherit;
      }
    }
    .gap-0 {
      gap: 0 !important;
    }
    .gap-1 {
      gap: 0.25rem !important;
    }
    .gap-2 {
      gap: 0.5rem !important;
    }
    .gap-3 {
      gap: 1rem !important;
    }
    .gap-4 {
      gap: 1.5rem !important;
    }
    .gap-5 {
      gap: 3rem !important;
    }

    .ant-btn {
      .anticon {
        vertical-align: baseline;
      }
    }
    *::after {
      display: none; 
    }
  }
</style>