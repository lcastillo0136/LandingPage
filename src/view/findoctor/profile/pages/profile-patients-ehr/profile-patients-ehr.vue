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
        <a-form-model ref="ehrform" :rules="rules" :model="client.last_medical_record">
          <div class="d-flex flex-row gap-2 mb-2">
            <a-form-model-item prop="height" label="Altura">
              <a-input type="number" v-model="client.last_medical_record.height">
                <span slot="suffix">cm</span>
              </a-input>
            </a-form-model-item>
            <a-form-model-item prop="weight" label="Peso">
              <a-input type="number" v-model="client.last_medical_record.weight">
                <span slot="suffix">kg</span>
              </a-input>
            </a-form-model-item>
            <a-form-model-item prop="bmi" label="BMI">
              <a-input type="number" v-model="client.last_medical_record.bmi" />
            </a-form-model-item>
            <a-form-model-item prop="temperature" label="Temperatura">
              <a-input type="number" v-model="client.last_medical_record.temperature">
                <span slot="suffix">°</span>
              </a-input>
            </a-form-model-item>
          </div>
          <div class="d-flex flex-row gap-2 mb-2">
            <a-form-model-item prop="breathing_frequency" label="Frecuencia respiratoria">
              <a-input type="number" v-model="client.last_medical_record.breathing_frequency">
                <span slot="suffix">imv</span>
              </a-input>
            </a-form-model-item>
            <a-form-model-item prop="blood_pressure" label="Presión arterial">
              <a-input type="number" v-model="client.last_medical_record.blood_pressure">
                <span slot="suffix">mmHg</span>
              </a-input>
            </a-form-model-item>
            <a-form-model-item prop="heart_rate" label="Ritmo cardiaco">
              <a-input type="number" v-model="client.last_medical_record.heart_rate">
                <span slot="suffix">bpm</span>
              </a-input>
            </a-form-model-item>
          </div>

          <a-form-model-item prop="blood_type" label="Grupo sanguíneo">
            <a-radio-group v-model="blood_type_letter">
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

            <a-radio-group v-model="blood_type_sign" class="ml-2">
              <a-radio-button value="+">
                +
              </a-radio-button>
              <a-radio-button value="-">
                -
              </a-radio-button>
            </a-radio-group>
            <b class="ml-3">{{ blood_type }}</b>
          </a-form-model-item>
          <a-divider dashed></a-divider>
          <a-form-model-item prop="reason" label="Motivo / Malestar principal">
            <a-textarea :rows="6" v-model="client.last_medical_record.reason" />
          </a-form-model-item>
          <a-form-model-item prop="comments" label="Comentarios">
            <a-textarea :rows="4" type="text" v-model="client.last_medical_record.comments" />
          </a-form-model-item>
        </a-form-model>

        <a-button class=" mt-2" type="primary" @click="saveEHR" :loading="loading">
          <a-icon type="save" style="vertical-align: baseline;"></a-icon>
          Guardar
        </a-button>
      </div>
    </template>
  </div>
</template>
<script>
  import { getClient, postEHR } from '@/api/user'
  import { mapGetters } from 'vuex'

  import * as _ from 'lodash'

  export default {
    data() {
      return {
        client: false,
        provider: false,
        blood_type_letter: 'A',
        blood_type_sign: '+' ,
        loading: false,
        rules: {
          reason: [{ validator: (rule, value, callback) => {
            value = (`${value||''}`).trim()
            if ((value === '' || !value)) {
              callback(new Error('Favor de no dejar este campo vacio'));
            } else {
              callback();
            }
          }, trigger: 'change' }],
          comments: [{ validator: (rule, value, callback) => {
            value = (`${value||''}`).trim()
            if ((value === '' || !value)) {
              callback(new Error('Favor de no dejar este campo vacio'));
            } else {
              callback();
            }
          }, trigger: 'change' }],
          weight: [{ validator: (rule, value, callback) => {
            value = (`${value||''}`).trim()
            if ((value === '' || !value)) {
              callback(new Error('Favor de no dejar este campo vacio'));
            } else {
              callback();
            }
          }, trigger: 'change' }],
          height: [{ validator: (rule, value, callback) => {
            value = (`${value||''}`).trim()
            if ((value === '' || !value)) {
              callback(new Error('Favor de no dejar este campo vacio'));
            } else {
              callback();
            }
          }, trigger: 'change' }],
          temperature: [{ validator: (rule, value, callback) => {
            value = (`${value||''}`).trim()
            if ((value === '' || !value)) {
              callback(new Error('Favor de no dejar este campo vacio'));
            } else {
              callback();
            }
          }, trigger: 'change' }],
          blood_type: [{ validator: (rule, value, callback) => {
            value = (`${value||''}`).trim()
            if ((value === '' || !value)) {
              callback(new Error('Favor de no dejar este campo vacio'));
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
      }
    },
    mounted() {
      if (this.$route.params.client && this.$route.params.provider) {
        this.client = { ...this.$route.params.client }
        this.provider = { ...this.$route.params.provider }

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
        this.blood_type_sign = this.client.last_medical_record.blood_type.split('').pop() || '+'
        this.blood_type_letter = this.client.last_medical_record.blood_type.replace(/[\+\-]/g, '') || 'A'

      }else {
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
    *::after {
      display: none; 
    }
  }
</style>