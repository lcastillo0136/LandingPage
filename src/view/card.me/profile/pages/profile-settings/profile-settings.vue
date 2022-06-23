<template>
  <div v-if="getUser.id">
    <!-- <h4 class="add_bottom_30">Configuraciones</h4> -->
    <div class="box_general_2 settings-container">
      <h4>Configuracion Calendario</h4>
      <div class="row">
        <div class="col-md-6 col-sm-6 helper-container">
          <span class="helper-text">A partir de esta hora se mostraran los horarios de las citas que pueden seleccionar los clientes</span>
        </div>
        <div class="col-md-6 col-sm-6">
          <div class="form-group">
            <label>Hora Apertura</label>
            <a-form-model-item prop="start_date">
              <a-time-picker use12-hours v-model="open_time" size="large" format="h:mm a" />
            </a-form-model-item>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 col-sm-6 helper-container">
          <span class="helper-text">Hasta este horario se pintaran las citas disponibles</span>
        </div>
        <div class="col-md-6 col-sm-6">
          <div class="form-group">
            <label>Hora Cierre</label>
            <a-form-model-item prop="close_time" style="margin-bottom: 4px;">
              <a-time-picker use12-hours v-model="close_time" size="large" format="h:mm a" />
            </a-form-model-item>
            <a-checkbox v-model="extend_last_appointment" style="margin-bottom: 7px;">
              <small class="helper-text">Extender el horario si la ultima cita excede la hora de cierre</small>
            </a-checkbox>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 col-sm-6 helper-container">
          <span class="helper-text">
            El calendario que visualiza el proveedor se dividira en espacios del tiempo seleccionado
          </span>
        </div>
        <div class="col-md-6 col-sm-6">
          <div class="form-group">
            <label>Division de horas en el calendario</label>
            <a-form-model-item prop="date_slot">
              <a-time-picker v-model="date_slot" size="large" format="HH:mm" />
            </a-form-model-item>
          </div>
        </div>
      </div>
    </div>

    <div class="box_general_2 settings-container">
      <h4>Configuracion Servicios</h4>

      <div class="row">
        <div class="col-md-6 col-sm-6 helper-container">
          <span class="helper-text">
            Permitir que el paciente seleccione multiples servicios en en sitio
          </span>
        </div>
        <div class="col-md-6 col-sm-6">
          <div class="form-group">
            <a-form-model-item prop="multiple_services">
              <a-switch v-model="multiple_services"/>
            </a-form-model-item>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 col-sm-6 helper-container">
          <span class="helper-text">
            Cantidad de dias que muestra el calendario
          </span>
        </div>
        <div class="col-md-6 col-sm-6">
          <div class="form-group">
            <label>Maximo de dias</label>
            <a-row>
              <a-col :span="17">
                <a-slider :default-value="7" :min="1" :max="31" v-model="max_days" />
              </a-col>
              <a-col :span="4">
                <a-input-number v-model="max_days" :min="1" :max="31" style="marginLeft: 16px" />
              </a-col>
            </a-row>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 col-sm-6 helper-container">
          <span class="helper-text">
            Muestra los dias disponibles en el calendario a partir del dia actual + los dias aqui seleccionados
          </span>
        </div>
        <div class="col-md-6 col-sm-6">
          <div class="form-group">
            <label>Cantidad de dias</label>
            <a-row>
              <a-col :span="17">
                <a-slider :default-value="7" :min="0" :max="7" v-model="next_day" />
              </a-col>
              <a-col :span="4">
                <a-input-number v-model="next_day" :min="0" :max="7" style="marginLeft: 16px" />
              </a-col>
            </a-row>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 col-sm-6 helper-container">
          <span class="helper-text">
            <div style="background-color: #bce8f14d; width: 20px; height: 20px;display: inline-block;margin-right: 5px;vertical-align: middle;border: solid 1px #bce8f1;"></div>Dias disponibles para seleccionar cita
          </span>
        </div>
        <div class="col-md-6 col-sm-6" v-if="!flag">
          <FullCalendar :options="calendarOptions" ref="fullCalendar" />
        </div>
      </div>
    </div>

    <div class="box_general_2 settings-container">
      <h4>Servicios</h4>

      <a-button icon="plus" @click="e => editRecord({})" style="margin-bottom: 10px;">Agregar servicio</a-button>

      <a-table :columns="columns_services" :data-source="user.services" :pagination="false" class="add_bottom_30" rowKey="id" bordered :row-selection="{ selectedRowKeys: [ editingKey.id ], hideDefaultSelections: true, columnWidth: 0 }">
        
        <template slot="price" slot-scope="record">
          <span>{{ record.price | currency }}</span>
        </template>
        <span slot="active" slot-scope="record">
          <a-tag :color="record.active ? 'green' : 'red'">
            {{ record.active ? 'Activo' : 'Desactivo' }}
          </a-tag>
        </span>
        <template slot="duration" slot-scope="record">
          <span>{{ record.duration }}</span>
        </template>
        <template slot="operation" slot-scope="text, record, index">
          <div class="editable-row-operations">
            <span>
              <a-tooltip>
                <template slot="title">
                  Editar registro
                </template>
                <a-icon type="edit" :disabled="editingKey !== ''" @click="() => editRecord(record)"/>
              </a-tooltip>
              <a-popconfirm
                title="¿Estás seguro de eliminar este registro?"
                ok-text="Si"
                cancel-text="No"
                @confirm="() => deleteRecord(record)"
                @cancel="() => cancelRecord({})"
              >

                <a-tooltip>
                  <template slot="title">
                    Borrar registro
                  </template>
                  <a-icon type="delete" :disabled="editingKey !== ''" />
                </a-tooltip>
              </a-popconfirm>
            </span>
          </div>
        </template>
      </a-table>

      <template v-if="editingKey !== ''">
        <div class="form-update-service">
          <div class="row">
            <div class="col-md-4 col-sm-4 helper-container">
              <div class="form-group">
                <label>Nombre servicio</label>
                <a-form-model-item prop="name">
                  <a-input v-model="editingKey.name" />
                </a-form-model-item>
              </div>
            </div>
            <div class="col-md-3 col-sm-3">
              <div class="form-group">
                <label>Precio</label>
                <a-form-model-item prop="price">
                  <a-input v-model="editPrice" @keyup="e => currencyFormat(editingKey)" @keypress="preventNumericInput($event)" autocomplete="chrome-off" />
                </a-form-model-item>
              </div>
            </div>
            <div class="col-md-3 col-sm-3">
              <div class="form-group">
                <label>Duracion</label>
                <a-form-model-item prop="duration">
                  <a-time-picker v-model="editDuration" format="HH:mm" />
                </a-form-model-item>
              </div>
            </div>
            <div class="col-md-2 col-sm-2">
              <div class="form-group">
                <label>Activo</label>
                <a-form-model-item prop="active">
                  <a-switch v-model="editActive" size="small" />
                </a-form-model-item>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 col-sm-12" style="text-align: right;">
              <a-button type="primary" @click="e => saveRecord(editingKey)" style="margin-right: 5px;">Guardar</a-button>
              <a-button type="secondary" @click="e => cancelRecord(editingKey)">Cancelar</a-button>
            </div>
          </div>
        </div>
        <a-divider/>
      </template>
    </div>

    <div style="text-align: right;">
      <a-button type="primary" size="large" @click="handleSave" :loading="saving">Guardar</a-button>
    </div>
  </div>
</template>
<script>
  import { updateUser } from '@/api/user'
  import '@fullcalendar/core/vdom' // solves problem with Vite
  import FullCalendar from '@fullcalendar/vue'
  import dayGridPlugin from '@fullcalendar/daygrid'
  import interactionPlugin from '@fullcalendar/interaction'
  import timeGridPlugin from '@fullcalendar/timegrid'
  import esLocale from '@fullcalendar/core/locales/es'
  import { mapGetters } from 'vuex'
  import _ from 'lodash'

  esLocale.week.dow = 0
  
  const columns_services = [{
    title: 'Nombre',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: 'Precio',
    scopedSlots: { customRender: 'price' } ,
    key: 'price',
  }, {
    title: 'Duracion',
    scopedSlots: { customRender: 'duration' } ,
    key: 'duration',
  }, {
    title: 'Estatus',
    scopedSlots: { customRender: 'active' } ,
    key: 'active',
  }, {
    title: '',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
  }]

  export default {
    props: {
      user: {
        type: Object,
        default: function () {
          return { }
        }
      }
    },
    components: {
      FullCalendar // make the <FullCalendar> tag available
    },
    data() {
      return {
        open_time: null,
        close_time: null,
        date_slot: null,
        extend_last_appointment: false,
        max_days: 7,
        next_day: 3,
        multiple_services: false,
        refresh: false,
        saving: false,
        flag: false,
        selectedDate: null,
        columns_services,
        editingKey: '',
        editDuration: null,
        editActive: false,
        editPrice: 0,
        calendarOptions: {
          locale: esLocale,
          plugins: [ dayGridPlugin, interactionPlugin, timeGridPlugin ],
          slotDuration: '00:15',
          height: 430,
          nowIndicator: true,
          selectable: false,
          unselectAuto: false,
          headerToolbar: {
            start:   '',
            center: '',
            end:  'today prev,next'
          },
          dayCellDidMount: this.calendardayRender,
        },
      }
    },
    name: 'ProfileSettings',
    watch: {
      'hasToken' () {
        this.setConfiguration()
      },
      'getUser' () {
        this.setConfiguration()
      },
      'open_time' () {
        this.updateCalendar()
      },
      'close_time' () {
        this.updateCalendar()
      },
      'date_slot' () {
        this.updateCalendar()
      },
      'extend_last_appointment' () {
        this.updateCalendar()
      },
      'max_days' () {
        this.updateCalendar()
      },
      'next_day' () {
        this.updateCalendar()
      }
    },
    computed: {
      ...mapGetters([
        'hasToken',
        'settings',
        'getUser'
      ])
    },
    methods: {
      setConfiguration() {
        if (this.getUser.id) {
          let [_hr, _min] = (this.user.open_time || '00:05').split(':')
          let [_hr1, _min1] = (this.user.close_time || '23:55').split(':')
          let [_hr2, _min2] = (this.user.date_slot || '00:30').split(':')

          this.open_time = this.$moment()
          this.open_time.set({
            hour: _hr,
            minute: _min
          })

          this.close_time = this.$moment()
          this.close_time.set({
            hour: _hr1,
            minute: _min1
          })

          this.date_slot = this.$moment()
          this.date_slot.set({
            hour: _hr2,
            minute: _min2
          })

          this.extend_last_appointment = !!this.user.extend_last_appointment
          this.max_days = this.user.max_days
          this.next_day = this.user.next_day

          this.multiple_services = !!this.user.multiple_services

          this.updateCalendar()

          this.refresh = true 
        }
      },
      updateCalendar() {
        if (this.$refs.fullCalendar) {
          this.selectedDate = this.$refs.fullCalendar.getApi().getDate()
        }
        this.flag = true

        this.$nextTick().then(() => {
          this.flag = false
        }).then(() => {
          if (this.$refs.fullCalendar && this.selectedDate) {
            this.$refs.fullCalendar.getApi().gotoDate(this.selectedDate);
          }
        });
      },
      calendardayRender(arg) {
        let start_date = this.$moment().add(this.next_day-1, 'day')
        let end_date = this.$moment().add(this.max_days + this.next_day, 'day')


        if (this.$moment(arg.date).isBetween(start_date, end_date)) {
          arg.el.style.backgroundColor = "rgba(188, 232, 241, 0.3)";
        } else if ([0,6].includes(this.$moment(arg.date).day())) {
          // arg.el.style.backgroundColor = "#ee6c73"
        } else {
          arg.el.style.backgroundColor = ''
        }
      },
      saveRecord(record) {
        const newData = [...this.user.services]
        const target = this.getRecord(record.id)
        
        if (target) {
          target.price = parseFloat(this.editPrice)
          target.duration = this.editDuration.format('HH:mm')
          target.active = this.editActive

          delete target.editable
          delete target.cache
          // delete target.duration_date

          this.user.services = newData
        } else {

          record.price = parseFloat(this.editPrice)
          record.duration = this.editDuration.format('HH:mm')
          record.active = this.editActive

          this.user.services.push({ ...record })
        }
        this.editingKey = '';
      },
      cancelRecord(record) {
        const newData = [...this.user.services]
        const target = this.getRecord(record.id)

        this.editingKey = '';
        if (target) {
          Object.assign(target, target.cache)
          delete target.editable
          delete target.cache

          this.user.services = newData
        }
      },
      editRecord(record) {
        const newData = [...this.user.services]
        const target = this.getRecord(record.id)

        this.editingKey = record;
        if (target) {
          let [_hr2, _min2] = (record.duration || '00:30').split(':')
          this.editDuration = this.$moment()
          this.editDuration.set({
            hour: _hr2,
            minute: _min2
          })
          this.editActive = !!this.editingKey.active
          this.editPrice = this.editingKey.price

          target.editable = true;
          target.cache = { ...target }
          this.user.services = newData;
        } else {
          let [_hr2, _min2] = '00:30'.split(':')
          this.editDuration = this.$moment()
          this.editDuration.set({
            hour: _hr2,
            minute: _min2
          })
          this.editActive = !!this.editingKey.active
          this.editPrice = 0
          this.editingKey.id = Math.min((_.minBy(this.user.services, 'id') ? _.minBy(this.user.services, 'id').id : 0) - 1, -1)
        }
      },
      deleteRecord(record) {
        const target = this.getRecord(record.id)
        if (target) {
          const newData = _.filter(this.user.services, (o) => o.id != record.id)

          this.user.services = newData
        }
      },
      getRecord(id) {
        return _.find(this.user.services, { id })
      },
      preventNumericInput ($event) {
        var keyCode = ($event.keyCode ? $event.keyCode : $event.which);
        if ((keyCode <= 47 || keyCode >= 58) && ![46].includes(keyCode)) {
          $event.preventDefault()
        }
      },
      currencyFormat (record) {
        if (!record.value) {
          record.value = '0.00'
        }
      },
      handleSave () {
        this.saving = true

        this.user.open_time = this.open_time.format('HH:mm')
        this.user.close_time = this.close_time.format('HH:mm')
        this.user.date_slot = this.date_slot.format('HH:mm')

        this.user.extend_last_appointment = this.extend_last_appointment ? 1 : 0
        this.user.max_days = this.max_days
        this.user.next_day = this.next_day
        this.user.multiple_services = this.multiple_services ? 1 : 0

        updateUser(this.user, this.hasToken)
        .then((response) => response.data)
        .then((response) => {
          this.user.services = [...response.data.services]
          this.saving = false
        })
      },
    },
    mounted() {
      this.$nextTick().then(() => {
        this.setConfiguration()
      });
    }
  }
</script>
<style lang="scss">
  .settings-container {
    .ant-time-picker {
      width: 100%
    }
    .helper-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      .helper-text {
        color: var(--secondary);
      }
    }
    .fc-header-toolbar::after {
      content: '';
      display: none !important;
    }
    .fc-toolbar-chunk {
      display: flex;
      flex: 0 1 auto;
    }
    .form-update-service {
      border: solid 1px #ededed;
      padding: 16px;
      border-radius: 3px;
      background: #fcfcfc;
    }
    .editable-row-operations {
      [disabled] {
        color: #ededed;
      }
    }
    [key="selection-column"] .ant-checkbox, .ant-table-selection-column .ant-checkbox{
      display: none;
    }
    .ant-table-row-selected {
      font-weight: bold;
    }
    .editable-row-operations span {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      &::after {
        display: none;
      }
    }
  }
</style>