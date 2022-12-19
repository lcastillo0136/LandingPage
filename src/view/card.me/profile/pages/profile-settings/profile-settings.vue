<template>
  <div v-if="getUser.id" class="settings-container">
    <a-form-model ref="settingsForm" :rules="rules" :model="user" class="settings-form d-flex flex-column" :label-col="labelCol" :wrapper-col="wrapperCol" :colon="false">
      <!-- <div class="box_general_2 settings-container">
        <h4>Servicios</h4>

        <a-button icon="plus" @click="e => editRecord({})" style="margin-bottom: 10px;">Agregar servicio</a-button>

        <a-table :columns="columns_services" :data-source="user.services" :pagination="false" class="add_bottom_30" rowKey="id" bordered>
          
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
                    <a-input v-model="editPrice" @keyup="e => currencyFormat(editingKey)" @keypress="preventNumericInput($event)" />
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
      </div> -->
      <b-card no-body>
        <b-card-body>
          <h3 class="mb-4">
            Información de cuenta
          </h3>
          <a-form-model-item :validateStatus="validPassword ? '' : 'error'" :help="errorPasswordMessage">
            <template #label>
              <span>Usuario</span>
              <br>
              <small class="text-muted">{{ user.username }}</small>
            </template>
            <a-collapse v-model="activeKey">
              <a-collapse-panel key="1">
                <template #header>
                  <div class="d-flex justify-content-center align-items-center" style="gap: 22px;">
                    <a-button type="primary">Actualizar contraseña</a-button>
                  </div>
                </template>
                <div class="mt-3 d-flex">
                  <div class="flex-fill mr-2">
                    <label>Nueva contraseña</label>
                    <a-input-password has-feedback ref="inputPassword" v-model="user.password" />
                  </div>
                  <div class="flex-fill">
                    <label>Confirmar contraseña</label>
                    <a-input-password ref="confirmPassword" v-model="user.password_confirmation" />
                  </div>
                </div>
              </a-collapse-panel>
            </a-collapse>
          </a-form-model-item>
        </b-card-body>
      </b-card>
      <b-card no-body>
        <b-card-body>
          <h3 class="mb-4">
            Diseño
          </h3>
          <a-form-model-item prop="first_name">
            <template #label>
              <span>Posicion de elementos</span>
              <br>
              <small class="text-muted">Define el tipo de diseño que mostrara tu tarjeta</small>
            </template>
            <div class="d-none d-lg-flex justify-content-center" style="gap: 22px;">
              <div class="design-1" :class="{ 'choosed': user.design == 'design-1' }" @click="user.design = 'design-1'">
                <div class="design-avatar"></div>
                <div class="design-cover"></div>
                <div class="design-content"></div>
              </div>
              <div class="design-2" :class="{ 'choosed': user.design == 'design-2' }" @click="user.design = 'design-2'">
                <div class="design-avatar"></div>
                <div class="design-cover"></div>
                <div class="design-content"></div>
              </div>
              <div class="design-3" :class="{ 'choosed': user.design == 'design-3' }" @click="user.design = 'design-3'">
                <div class="design-avatar"></div>
                <div class="design-cover"></div>
                <div class="design-content"></div>
              </div>
              <div class="design-4" :class="{ 'choosed': user.design == 'design-4' }" @click="user.design = 'design-4'">
                <div class="design-avatar"></div>
                <div class="design-cover"></div>
                <div class="design-content"></div>
              </div>
              <div class="design-5" :class="{ 'choosed': user.design == 'design-5' }" @click="user.design = 'design-5'">
                <div class="design-avatar"></div>
                <div class="design-cover"></div>
                <div class="design-content"></div>
              </div>
            </div>
            <div class="d-flex d-lg-none">
              <a-select placeholder="Please select a country" v-model="user.design">
                <a-select-option value="design-1">
                  Diseño 1
                </a-select-option>
                <a-select-option value="design-2">
                  Diseño 2
                </a-select-option>
                <a-select-option value="design-3">
                  Diseño 3
                </a-select-option>
                <a-select-option value="design-4">
                  Diseño 4
                </a-select-option>
                <a-select-option value="design-5">
                  Diseño 5
                </a-select-option>
              </a-select>
              <a-button class="ml-1" type="primary" @click="openPreview">Ver</a-button>
            </div>
          </a-form-model-item>
          <a-form-model-item>
            <template #label>
              <span>Ocultar teléfono móvil</span>
              <br>
              <small class="text-muted">Activar esta opcion evita que se muestre tu numero telefonico personal en la tarjeta</small>
            </template>
            <div class="d-flex justify-content-center" style="gap: 22px;">
              <a-switch v-model="user.hide_personal_phone"></a-switch>
            </div>
          </a-form-model-item>
          <a-form-model-item>
            <template #label>
              <span>Ocultar teléfono trabajo</span>
              <br>
              <small class="text-muted">Activar esta opcion evita que se muestre tu numero telefonico de oficina en la tarjeta</small>
            </template>
            <div class="d-flex justify-content-center" style="gap: 22px;">
              <a-switch v-model="user.hide_office_phone"></a-switch>
            </div>
          </a-form-model-item>
          <a-form-model-item>
            <template #label>
              <span>Ocultar fecha de nacimiento</span>
              <br>
              <small class="text-muted">Activar esta opcion evita que se muestre tu fecha de nacimiento y edad en la tarjeta</small>
            </template>
            <div class="d-flex justify-content-center" style="gap: 22px;">
              <a-switch v-model="user.hide_bday"></a-switch>
            </div>
          </a-form-model-item>
          <a-form-model-item>
            <template #label>
              <span>Ocultar correo electrónico</span>
              <br>
              <small class="text-muted">Activar esta opcion evita que se muestre tu correo electrónico en la tarjeta</small>
            </template>
            <div class="d-flex justify-content-center" style="gap: 22px;">
              <a-switch v-model="user.hide_email"></a-switch>
            </div>
          </a-form-model-item>
        </b-card-body>
      </b-card>
      <b-card no-body>
        <b-card-body>
          <h3 class="mb-4">
            Seguridad
          </h3>
          <a-form-model-item>
            <template #label>
              <span>Activar codigo de seguridad</span>
              <br>
              <small class="text-muted">Activar esta opcion bloqueara todo acceso a tu tajeta digital y solo podran verla aquiellas personas que cuenten con tu codigo de seguridad.</small>
            </template>
            <div class="d-flex justify-content-center" style="gap: 22px;">
              <a-switch v-model="user.enable_security_code"></a-switch>
            </div>
          </a-form-model-item>
          <a-form-model-item>
            <template #label>
              <span>Codigo de seguridad</span>
              <br>
              <small class="text-muted">Define el codigo de 4 digitos con el cual daras acceso a tu tarjeta si tenes activo el filtro de seguridad</small>
            </template>
            <a-input class="input-security-code" v-model="user.security_code" size="large" :disabled="!user.enable_security_code" read-only type="number" max="9999" min="0">
              <label slot="addonAfter" @click="generateSecurityCode">
                Generar
              </label>
            </a-input>
          </a-form-model-item>
        </b-card-body>
      </b-card>

      <b-card no-body>
        <b-card-body>
          <h3 class="mb-4">
            Notificaciones
          </h3>
          <a-form-model-item>
            <template #label>
              <span>Notificación de falta de pago en número de WhatsApp</span>
              <br>
              <small class="text-muted">Activar esta opción autoriza notificarle a su número de WhatsApp que su tarjeta está suspendida por falta de pago cuando un cliente intente visualizar su tarjeta.</small>
            </template>
            <div class="d-flex justify-content-center" style="gap: 22px;">
              <a-switch v-model="user.notification_payment_whatsapp"></a-switch>
            </div>
          </a-form-model-item>
          <a-form-model-item>
            <template #label>
              <span>Notificación de falta de pago en correo electrónico</span>
              <br>
              <small class="text-muted">Activar esta opción autoriza notificarle a su correo electrónico que su tarjeta está suspendida por falta de pago cuando un cliente intente visualizar su tarjeta.</small>
            </template>
            <div class="d-flex justify-content-center" style="gap: 22px;">
              <a-switch v-model="user.notification_payment_email"></a-switch>
            </div>
          </a-form-model-item>
        </b-card-body>
      </b-card>
    </a-form-model>

    <div style="text-align: right;">
      <a-button type="primary"  class="save-button" shape="circle" size="large" @click="handleSave" :loading="saving">
        <a-icon type="save" theme="filled" v-if="!saving" />
      </a-button>
    </div>
  </div>
</template>
<script>
  import { updateUser } from '@/api/user'
  import '@fullcalendar/core/vdom'
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
        labelCol: { 
          md: {
            span: 8
          },
          xs: { 
            span: 24 
          } 
        },
        wrapperCol: { 
          md: { 
            span: 14, 
            offset: 2
          },
          xs: { 
            span: 24, 
            offset: 0 
          } 
        },
        rules: {},
        errors: [],
        activeKey: [],
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
      ]),
      validPassword () {
        return this.activeKey.includes('1') ? (this.user.password === this.user.password_confirmation) : null
      },
      errorPasswordMessage() {
        return this.activeKey.includes('1') && !this.validPassword ? (this.user.password === '' ? 'Favor de llenar el campo contraseña' : (this.user.password_confirmation === '' ? 'Favor de confirmar su contraseña' : 'Las contraseñas no coinciden')) : false
      }
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
        this.errors = []


        if (this.errorPasswordMessage === false) {
          let _data = {
            ...this.user,
            ...{
              bday: this.user.bday && this.user.bday.format('YYYY-MM-DD'),
              phone: (`${this.user.phone||''}`).replace(/\D/g, ''),
            }
          }

          if (!this.validPassword || !_data.password || !_data.password_confirmation) {
            delete _data.password;
            delete _data.password_confirmation;
          } 

          updateUser(_data, this.hasToken)
          .then((response) => response.data)
          .then((response) => {
            // this.user.services = [...response.data.services]

            this.saving = false
            this.$notification.success({
              message: 'Datos guardados',
              description: 'Los datos del usuario han sido actualizados'
            })

            this.activeKey = []
            this.user.password_confirmation = this.user.password = ''
          }).catch((error) => {
            this.saving = false
            
            this.$notification.error({
              message: 'Error al guardar',
              description: 'no se puedo actualizar la información'
            })
          })
        } else {
          this.saving = false
          
          this.$notification.error({
            message: 'Error al guardar',
            description: 'Las contraseñas no coinciden'
          })
        }
      },
      openPreview () {
        this.$emit('preview')
      },
      generateSecurityCode () {
        this.user.security_code = (""+Math.random()).substring(2,6)
      }
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
    .ant-btn {
      &.save-button {
        width: 50px;
        position: fixed;
        bottom: 16px;
        height: 50px;
        font-size: 20px;
        right: 20px;
      }
      .anticon {
        vertical-align: initial;
      }
    }
    .settings-form {
      --border-color: #ececec;
      --border-color-hover: #40a9ff;
      --font-size: 13px;
      gap: 20px;
      .ant-form-item {
        display: flex;
        align-items: center;
        border-bottom: dashed 1px var(--border-color);
        padding-bottom: 10px;
        &:last-child {
          border-bottom: none;
        }

        @media only screen and (max-width: 750px) {
          flex-direction: column;
        }
      }
      .ant-form-item-label {
        line-height: 1;
        text-align: left;
        & > label {
          line-height: 1;
          span {
            white-space: break-spaces;
          }
        }
        small.text-muted {
          margin-top: 2px;
          display: inline-block;
          margin-left: 2px;
          color: #959ba1 !important;
          white-space: normal;
          line-height: 15px;
        }
      }
      .has-feedback .ant-input-affix-wrapper .ant-input-suffix {
        padding-right: 0
      }
      
      .input-checkbox100 {
        display: none;
      }

      .label-checkbox100 {
        margin: 0;

        display: block;
        position: relative;
        padding-left: 26px;
        cursor: pointer;
      }

      .label-checkbox100 > span.check {
        font-size: 13px;
        color: transparent;

        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        width: 16px;
        height: 16px;
        border-radius: 2px;
        background: #e6e6e6;
        left: 0;
        top: 50%;
        -webkit-transform: translateY(-50%);
        -moz-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        -o-transform: translateY(-50%);
        transform: translateY(-50%);
      }

      .input-checkbox100:checked + .label-checkbox100 > span.check {
        color: #c87ef0;
      }

      .ant-collapse {
        background: #0000;
        border: none;
        .ant-collapse-item {
          border: none;
        }
        .ant-collapse-content {
          border: none;
        }
      }

      .ant-collapse-header {
        border: none;
        .ant-collapse-arrow {
          display: none;
        }
      }

      .ant-collapse-content-box {
        label {
          line-height: 11px;
          margin: 0;
          padding: 0;
          display: block;
          height: auto;
        }
      }

      .design-1, .design-2, .design-3, .design-4, .design-5 {
        background: #2c2c2c;
        height: 120px;
        max-width: 70px;
        flex: 1 1 auto;
        border-radius: 10px;
        padding: 5px;
        overflow: hidden;
        transition: transform 250ms linear;
        cursor: pointer;

        [class^="design-"] {
          background: #bdbdbd;
          border-radius: 8px;
          border-radius: 8px;
          min-width: 90%;
          min-height: 10px;
        }
        .design-avatar {
          position: relative;
          overflow: hidden;
          &:before {
            content: "";
            position: absolute;
            width: 37px;
            height: 37px;
            background: #757575;
            border-radius: 37% 37%;
            bottom: -20px;
            left: 50%;
            transform: translateX(-50%);
          }

          &:after {
            content: "";
            position: absolute;
            width: 20px;
            height: 20px;
            background: #757575;
            border-radius: 50%;
            bottom: 18px;
            left: 50%;
            transform: translateX(-50%);
          }
        }

        &.choosed {
          background: #12C39A;
          border: solid 1px #12C39A;
          opacity: 1;
          transform: scale(1.1);
          [class^="design-"] {
            background: #fff;
          }
        }
      }

      .design-1 {
        .design-avatar {
          margin-left: -5px;
          margin-top: -5px;
          margin-right: -5px;
          height: 50px;
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
        }
        .design-cover {
          display: none;
        }
        .design-content {
          height: 100%;
          margin-top: 6px;
          height: 6px;
          min-height: auto;
          position: relative;
          margin-top: 7px;

          &:after {
            content: '';
            position: absolute;
            top: 20px;
            min-width: auto;
            width: 100%;
            height: 6px;
            border-radius: 5px;
            background: #bdbdbd;
          }

          &:before {
            content: '';
            position: absolute;
            top: 10px;
            min-width: auto;
            width: 100%;
            height: 6px;
            border-radius: 5px;
            background: #bdbdbd;
          }
        }

        &.choosed {
          .design-content {
            &:after {
              background: #fff;
            }

            &:before {
              background: #fff;
            }
          }
        }
      }

      .design-2 {
        display: flex;
        flex-direction: column;
        .design-avatar {
          border-radius: 50%;
          min-width: auto;
          min-height: auto;
          width: 20px;
          height: 20px;
          border: solid 1px #fff;
          order: 2;
          flex: 0 0 auto;
          margin-top: -10px;

          &:before {
            width: 13px;
            height: 12px;
            bottom: -6px;
          }

          &:after {
            width: 8px;
            height: 8px;
            bottom: 6px;
          }
        }
        .design-cover {
          flex: 0 0 auto;
          order: 1;
          margin-left: -5px;
          margin-top: -5px;
          margin-right: -5px;
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
          height: 40px
        }
        .design-content {
          flex: 0 1 auto;
          order: 3;
          height: 6px;
          min-height: auto;
          position: relative;
          margin-top: 7px;

          &:after {
            content: '';
            position: absolute;
            top: 20px;
            min-width: auto;
            width: 100%;
            height: 6px;
            border-radius: 5px;
            background: #bdbdbd;
            
          }

          &:before {
            content: '';
            position: absolute;
            top: 10px;
            min-width: auto;
            width: 100%;
            height: 6px;
            border-radius: 5px;
            background: #bdbdbd;
          }
        }

        &.choosed {
          .design-content {
            &:after {
              background: #fff;
            }

            &:before {
              background: #fff;
            }
          }
        }
      }

      .design-3 {
        background: #0000;
        border: solid 1px #ededed;
        position: relative;
        .design-avatar {
          border-radius: 50%;
          width: 30px;
          min-width: auto;
          min-height: auto;
          height: 30px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
          border: solid 1px #fff;

          &:before {
            width: 19px;
            height: 18px;
            bottom: -9px;
          }

          &:after {
            width: 11px;
            height: 11px;
            bottom: 10px;
          }
        }
        .design-cover {
          background: #3F4750;
          position: relative;
          top: -11px;
          z-index: 0;
          height: 85%;
        }
        .design-content {
          position: absolute;
          top: 38%;
          min-width: auto;
          width: 72%;
          left: 50%;
          transform: translateX(-50%);
          height: 6px;
          min-height: auto;
          border-radius: 5px;

          &:after {
            content: '';
            position: absolute;
            top: 20px;
            min-width: auto;
            width: 100%;
            height: 6px;
            border-radius: 5px;
            background: #bdbdbd;
          }

          &:before {
            content: '';
            position: absolute;
            top: 10px;
            min-width: auto;
            width: 100%;
            height: 6px;
            border-radius: 5px;
            background: #bdbdbd;
          }
        }

        &.choosed {
          .design-content {
            background: #bdbdbd;
          }
        }
      }

      .design-4 {
        background: #0000;
        border: solid 1px #ededed;
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: center;
        .design-avatar {
          border-radius: 0;
          width: 45px;
          min-width: auto;
          min-height: auto;
          height: 30px;
          position: relative;
          z-index: 1;
          flex: 0 0 auto;
          border: solid 1px #fff;
          box-shadow: 0px 2px 1px 0px #ededed;
          border-right-width: 25px;
          margin-top: 7px;

          &:before {
            width: 19px;
            height: 18px;
            bottom: -9px;
          }

          &:after {
            width: 11px;
            height: 11px;
            bottom: 10px;
          }
        }
        .design-cover {
          order: 0;
          position: absolute;
          width: 100%;
          height: 34px;
          top: 0;
          left: 0;
          border-radius: 0;
        }
        .design-content {
          position: relative;
          height: 6px;
          min-height: auto;
          border-radius: 5px;
          flex: 0 0 auto;

          &:after {
            content: '';
            position: absolute;
            top: 20px;
            min-width: auto;
            width: 100%;
            height: 6px;
            border-radius: 5px;
            background: #bdbdbd;
          }

          &:before {
            content: '';
            position: absolute;
            top: 10px;
            min-width: auto;
            width: 100%;
            height: 6px;
            border-radius: 5px;
            background: #bdbdbd;
          }
        }

        &.choosed {
          .design-content {
            &:after {
              background: #fff;
            }

            &:before {
              background: #fff;
            }
          }
          .design-avatar {
            border-color: #3f4750;
            box-shadow: 0px 2px 1px 0px #3f4750;
          }
        }
      }

      .design-5 {
        display: flex;
        flex-direction: column;
        .design-avatar {
          border-radius: 50%;
          min-width: auto;
          min-height: auto;
          width: 33px;
          height: 33px;
          border: solid 1px #fff;
          order: 2;
          flex: 0 0 auto;
          margin-top: -20px;
          margin-left: 60%;
          z-index: 2;

          &:before {
            width: 21px;
            height: 15px;
            bottom: -4px;
          }

          &:after {
            width: 12px;
            height: 12px;
            bottom: 12px;
          }
        }
        .design-cover {
          flex: 0 0 auto;
          order: 1;
          margin-left: -16px;
          margin-top: -12px;
          margin-right: -17px;
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
          height: 46px;
          transform: rotateZ(-11deg);

          &:after {
            content: '';
            position: absolute;
            top: 20px;
            min-width: auto;
            width: 30%;
            height: 6px;
            border-radius: 5px;
            background: #838181;
            z-index: 8;
            transform: rotateZ(11deg);
            left: 18px;
          }

          &:before {
            content: "";
            position: absolute;
            top: 28px;
            min-width: auto;
            width: 17%;
            height: 4px;
            border-radius: 5px;
            background: #838181;
            z-index: 8;
            -webkit-transform: rotateZ(11deg);
            transform: rotateZ(11deg);
            left: 17px;
          }
        }
        .design-content {
          flex: 0 1 auto;
          order: 3;
          height: 6px;
          min-height: auto;
          position: relative;
          margin-top: 7px;

          &:after {
            content: '';
            position: absolute;
            top: 20px;
            min-width: auto;
            width: 100%;
            height: 6px;
            border-radius: 5px;
            background: #bdbdbd;
            
          }

          &:before {
            content: '';
            position: absolute;
            top: 10px;
            min-width: auto;
            width: 100%;
            height: 6px;
            border-radius: 5px;
            background: #bdbdbd;
          }
        }

        &.choosed {
          .design-content {
            &:after {
              background: #fff;
            }

            &:before {
              background: #fff;
            }
          }
        }
      }

      .input-security-code {
        .ant-input-group-addon {
          background: var(--blue);
          color: var(--white);
          cursor: pointer;
          label {
            margin-bottom: 0;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>