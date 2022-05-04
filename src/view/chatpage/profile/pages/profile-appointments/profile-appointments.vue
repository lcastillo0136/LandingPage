<template>
  <div class="box_general_2 add_bottom_45">
    <FullCalendar :options="calendarOptions" ref="fullCalendar"  />
    <a-modal :visible="modal.open" :width="900" @cancel="handleCancel">
      <div v-if="modal.data" slot="title">Detalles de la cita</div>
      <div v-if="modal.data">
        <h5>
          <small>{{ modal.data.start_date | moment('dddd, D [de] MMMM [de] YYYY') }}</small>
          <template v-if="modal.data.item">
            <br>
            {{ modal.data.item.name}}
          </template>
          <template v-if="modal.data.status">
            <br>
            <a-tag :color="modal.data.status.color">{{ modal.data.status.name }}</a-tag>
          </template>
        </h5>
        <a-divider />
        <a-form-model ref="eventForm" :model="modal.data" :rules="rules">
          <div class="row">
            <div :class="{ 'col-md-8': (modal.data.client || modal.newClient), 'col-md-12': !(modal.data.client||modal.newClient)}">
              <div class="row">
                <template v-if="sameDay">
                  <div class="col-md-6 col-sm-6">
                    <div class="form-group">
                      <label>Hora Inicio</label>
                      <a-form-model-item prop="start_date">
                        <a-time-picker use12-hours v-model="modal.data.start_date" size="large" format="h:mm a"  />
                      </a-form-model-item>
                      <small v-if="eventDuration > 0">
                        Duracion: {{ eventDuration | mtoh }}
                      </small>
                    </div>
                  </div>
                  <div class="col-md-6 col-sm-6">
                    <div class="form-group">
                      <label>Hora Fin</label>
                      <a-form-model-item prop="end_date">
                        <a-time-picker use12-hours v-model="modal.data.end_date" size="large" format="h:mm a"  />
                      </a-form-model-item>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div class="col-md-6 col-sm-6">
                    <div class="form-group">
                      <label>Fecha Inicio</label>
                      <a-form-model-item prop="start_date">
                        <a-date-picker show-time v-model="modal.data.start_date" size="large" />
                      </a-form-model-item>
                      <small v-if="eventDuration > 0">
                        Duracion: {{ eventDuration | mtoh }}
                      </small>
                    </div>
                  </div>
                  <div class="col-md-6 col-sm-6">
                    <div class="form-group">
                      <label>Fecha Fin</label>
                      <a-form-model-item prop="end_date">
                        <a-date-picker show-time v-model="modal.data.end_date" size="large" />
                      </a-form-model-item>
                    </div>
                  </div>
                </template>
              </div>
              <template v-if="!modal.data.id">
                <div class="row">
                  <div class="col-md-6" v-if="!modal.newClient" >
                    <div class="form-group">
                      <label>Paciente</label>
                      <a-select show-search option-filter-prop="children" v-model="modal.data.client_id" allowClear>
                        <a-select-option v-for="(client, client_i) in providerClients" :key="client_i" :value="client.id">
                          {{ client.first_name }} {{ client.last_name }}
                        </a-select-option>
                      </a-select>
                    </div>
                  </div>
                  <div class="col-md-6" v-if="!modal.data.client_id">
                    <div style="width: 2px;height: 28px;" v-if="!modal.newClient"></div>
                    <a-button icon="user-add" type="dashed" @click="handleNewClient">Nuevo paciente</a-button>
                    <div style="width: 2px;height: 15px;" v-if="modal.newClient"></div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Servicios</label>
                      <a-select show-search option-filter-prop="children" v-model="modal.data.order_product_id" allowClear>
                        <a-select-option v-for="(service, service_i) in providerServices" :key="service_i" :value="service.id">
                          {{ service.name }} {{ service.price | currency }}
                        </a-select-option>
                      </a-select>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Metodo de pago</label>
                      <a-form-model-item prop="payment_method" help="*Favor de procesar el pago en ventanilla">
                        <a-select show-search option-filter-prop="children" v-model="modal.data.payment_method" allowClear>
                          <a-select-option value="1">
                            Tarjeta de Debito / Credito
                          </a-select-option>
                          <a-select-option value="3">
                            En Efectivo
                          </a-select-option>
                        </a-select>
                      </a-form-model-item>
                    </div>
                  </div>
                </div>
              </template>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Estatus <span v-if="!modal.data.id">cita</span></label>
                    <a-select show-search option-filter-prop="children" v-model="modal.data.status_id" allowClear>
                      <a-select-option v-for="(status, status_i) in appointmentsStatus" :key="status_i" :value="status.id">
                        {{ status.name }}
                      </a-select-option>
                    </a-select>
                  </div>
                </div>
                <div class="col-md-6" v-if="!modal.data.id">
                  <div class="form-group">
                    <label>Estatus pago</label>
                    <a-form-model-item prop="payment_status">
                      <a-select show-search option-filter-prop="children" v-model="modal.data.payment_status" allowClear>
                        <a-select-option value="1">
                          Cancelado
                        </a-select-option>
                        <a-select-option value="2">
                          Pagado
                        </a-select-option>
                        <a-select-option value="4">
                          Pago Pendiente
                        </a-select-option>
                      </a-select>
                    </a-form-model-item>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label>Comentarios</label>
                    <a-textarea v-model="modal.data.notes" :rows="4" />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <template v-if="modal.data.client">
                <span>Nombre</span>
                <div>
                  <strong>{{ modal.data.client.first_name }} {{ modal.data.client.last_name }}</strong>
                </div>
                <br>
                <span>Correo electronico</span>
                <div>
                  <strong>{{ modal.data.client.email }}</strong>
                </div>
                <br>
                <span>Telefono</span>
                <div>
                  <strong>{{ modal.data.client.phone | phone }}</strong>
                </div>
              </template>
              <template v-if="orderOXXO">
                <br>
                <span>Referencia OXXO</span>
                <div>
                  <strong>{{ orderOXXO.reference | oxxo }}</strong>
                  <a-tag color="green" v-if="orderPaid">Pagado</a-tag>
                  <a-tag color="red" v-if="oxxoExpired && !orderPaid">Expirado</a-tag>
                  <div v-if="!orderPaid && !oxxoExpired">
                    <small>Pagar antes de {{ oxxoTime }}</small>
                  </div>
                </div>
              </template>
              <template v-if="modal.newClient">
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <label>Nombre(s)</label>
                      <a-form-model-item prop="name">
                        <a-input v-model="modal.data.name" type="text" autocomplete="off" placeholder="Nombre" />
                      </a-form-model-item>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <label>Apellido(s)</label>
                      <a-input v-model="modal.data.last_name" type="text" autocomplete="off" placeholder="Apellido" />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <label>Correo electrónico</label>
                      <a-form-model-item prop="email">
                        <a-input v-model="modal.data.email" type="text" autocomplete="off" placeholder="Email" />
                        <!-- <div class="error_message" v-if="modal.data.email && !validEmail(modal.data.email)">
                          Favor de caputurar un email valido
                        </div> -->
                      </a-form-model-item>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <label>Teléfono</label>
                      <a-form-model-item prop="phone">
                        <a-input v-model="modal.data.phone" type="text" autocomplete="off" placeholder="Telefono"/>
                      </a-form-model-item>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </a-form-model>
        <template v-if="modal.data.client_id || modal.newClient">
          <a-divider></a-divider>
          <h6>Archivos relacionados a la cita</h6>
          <a-upload-dragger name="file" :multiple="true" :beforeUpload="handleUpload" :fileList="modal.data.oldPostFiles" :remove="handleRemove" listType="picture" :showUploadList="{ showDownloadIcon : true, showPreviewIcon: true }" :preview="handlePreview" accept="image/*,application/pdf,application/msword,audio/*,video/*,application/vnd.ms-powerpoint,application/vnd.ms-excel,text/*,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.wordprocessingml.document">
            <p class="ant-upload-drag-icon">
              <a-icon type="inbox" />
            </p>
            <p class="ant-upload-text">
              Haga click aquí o suelta tus archivos en esta área para empezar la carga
            </p>
            <p class="ant-upload-hint">
              Soporte para carga multiple de archivos. estrictamente prohibido subir archivos con derechos de autor
            </p>
          </a-upload-dragger>
        </template>
      </div>
      <template slot="footer">
        <a-button @click="handleDelete" v-if="modal.data.id" type="danger" style="float: left;">
          Borrar
        </a-button>
        <a-button key="back" @click="handleCancel">
          Cancelar
        </a-button>
        <a-button key="submit" type="primary" :loading="modal.loading" @click="handleOk" v-if="modal.data.id">
          Actualizar
        </a-button>
        <a-button key="submit" type="primary" :loading="modal.loading" @click="handleOk" v-else>
          Guardar
        </a-button>
      </template>
    </a-modal>
    <a-modal :visible="viewModal.open" :width="900" @cancel="handleViewCancel">
      <div v-if="viewModal.data" slot="title">Detalles de la cita</div>

      <div v-if="viewModal.data">
        <h5>
          <small>{{ viewModal.data.start_date | moment('dddd, D [de] MMMM [de] YYYY') }}</small>
          <template v-if="viewModal.data.item">
            <br>
            {{ viewModal.data.item.name}}
          </template>
          <template v-if="viewModal.data.status">
            <br>
            <a-tag :color="viewModal.data.status.color">{{ $t(`appointment_status.${viewModal.data.status.name.toUpperCase()}`.replace(/\s/g, '_')) }}</a-tag>
          </template>
        </h5>
        <a-divider />
        <div class="row">
          <div class="col-md-8">
            <div class="row">
              <div class="col-md-6 col-sm-6">
                <div class="form-group">
                  <label class="mb-0">Hora Inicio</label>
                  <div class="font-weight-bold " v-if="sameDay">
                    {{ viewModal.data.start_date | moment('hh:mm a') }}
                  </div>
                  <div class="font-weight-bold " v-else>
                    {{ viewModal.data.start_date | moment('DD/MM/YYYY hh:mm a') }}
                  </div>
                  <small v-if="eventDuration > 0">
                    Duracion: {{ eventDuration | mtoh }}
                  </small>
                </div>
              </div>
              <div class="col-md-6 col-sm-6">
                <div class="form-group">
                  <label class="mb-0">Hora Fin</label>
                  <div class="font-weight-bold " v-if="sameDay">
                    {{ viewModal.data.end_date | moment('hh:mm a') }}
                  </div>
                  <div class="font-weight-bold " v-else>
                    {{ viewModal.data.end_date | moment('DD/MM/YYYY hh:mm a') }}
                  </div>
                </div>
              </div>
            </div>
            <div class="row" v-if="viewModal.data.item || viewModal.data.order">
              <div class="col-md-6" v-if="viewModal.data.item">
                <div class="form-group">
                  <label class="mb-0">Servicios</label>
                  <div class="font-weight-bold">{{ viewModal.data.item.name }} - {{ viewModal.data.item.precio_venta | currency }}</div>
                </div>
              </div>
              <div class="col-md-6" v-if="viewModal.data.order">
                <div class="form-group">
                  <label class="mb-0">Metodo de pago</label>
                  <div class="font-weight-bold">{{ viewModal.data.order.method.name }}</div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label class="mb-0">Estatus <span>cita</span></label>
                  <div class="font-weight-bold">{{ $t(`appointment_status.${viewModal.data.status.name.toUpperCase()}`.replace(/\s/g, '_')) }}</div>
                </div>
              </div>
              <div class="col-md-6" v-if="viewModal.data.order">
                <div class="form-group">
                  <label class="mb-0">Estatus pago</label>
                  <div class="font-weight-bold">{{ $t('payment_status.'+viewModal.data.order.status.name) }}</div>
                </div>
              </div>
            </div>

          </div>

          <div class="col-md-4">
            <template>
              <span>Nombre</span>
              <div>
                <strong>{{ viewModal.data.client.first_name }} {{ viewModal.data.client.last_name }}</strong>
              </div>
              <br>
              <span>Correo electronico</span>
              <div>
                <strong>{{ viewModal.data.client.email }}</strong>
              </div>
              <br>
              <span>Telefono</span>
              <div>
                <strong>{{ viewModal.data.client.phone | phone }}</strong>
              </div>
            </template>
            <template v-if="orderOXXO">
              <br>
              <span>Referencia OXXO</span>
              <div>
                <strong>{{ orderOXXO.reference | oxxo }}</strong>
                <a-tag color="green" v-if="orderPaid">Pagado</a-tag>
                <a-tag color="red" v-if="oxxoExpired && !orderPaid">Expirado</a-tag>
                <div v-if="!orderPaid && !oxxoExpired">
                  <small>Pagar antes de {{ oxxoTime }}</small>
                </div>
              </div>
            </template>
          </div>
        </div>
        <a-divider />
        <a-form-model ref="reviewForm" :model="viewModal.review" :rules="review_rules">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label class="mb-0">Calificar</label>
                <div>
                  <a-rate v-model="viewModal.review.rate" :disabled="!!viewModal.data.review"/>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <label class="mb-0">Comentario</label>
                <a-form-model-item prop="comment" :help="!!viewModal.data.review ? '*La reseña ya esta publicada y no se puede editar' : `${(viewModal.review.comment||'').length}/320` ">
                   <a-textarea v-model="viewModal.review.comment" :rows="4" :disabled="!!viewModal.data.review" :maxLength="320"  />
                </a-form-model-item>
              </div>
            </div>
          </div>
        </a-form-model>
      </div>

      <template slot="footer">
        <a-button key="back" @click="handleViewCancel">
          Cancelar
        </a-button>
        <a-button key="submit" type="primary" :loading="viewModal.loading" @click="handleViewOk" v-if="!viewModal.data.review">
          Publicar
        </a-button>
      </template>
    </a-modal>
  </div>
</template>
<script>
  import { updateAppointment, deleteFile, createAppointment, deleteAppointment, postReview } from '@/api/user'
  import { postOrder } from '@/api/data'
  import { validFileType, validFileSize } from '@/libs/tools'
  import '@fullcalendar/core/vdom' // solves problem with Vite
  import FullCalendar from '@fullcalendar/vue'
  import dayGridPlugin from '@fullcalendar/daygrid'
  import interactionPlugin from '@fullcalendar/interaction'
  import timeGridPlugin from '@fullcalendar/timegrid'
  import { toDuration } from 'moment'
  import esLocale from '@fullcalendar/core/locales/es'
  import _ from 'lodash'

  import { mapGetters } from 'vuex'

  esLocale.week.dow = 0

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
    name: 'ProfileAppointments',
    data() {
      return {
        calendarOptions: {
          locale: esLocale,
          plugins: [ dayGridPlugin, interactionPlugin, timeGridPlugin ],
          initialView: 'timeGridWeek',
          // dateClick: this.handleDateClick,
          events: this.events,
          slotDuration: this.slotDuration || '00:15',
          nowIndicator: true,
          slotLabelFormat: {
            hour: 'numeric',
            minute: '2-digit',
            omitZeroMinute: false,
            meridiem: 'short',
            hour12: !0,
          },
          businessHours: {
            // days of week. an array of zero-based day of week integers (0=Sunday)
            daysOfWeek: [ 1, 2, 3, 4, 5, 6 ], // Monday - Thursday

            startTime: this.startTime, // a start time (10am in this example)
            endTime: this.endTime, // an end time (6pm in this example)
          },
          slotMinTime: '03:00:00',
          slotMaxTime: '24:00:00',
          scrollTimeReset: false,
          eventClick: this.openEvent,
          eventChange: this.eventChange,
          selectable: true,
          select: (data) => {
            this.isProvider && this.handleDateClick({
              start: data.start,
              end: data.end
            })
          }
        },
        modal: {
          open: false,
          loading: false,
          text: 'Modal content',
          date: null,
          data: false,
          newClient: false
        },
        viewModal: {
          open: false,
          data: false,
          loading: false,
          review: {
            rate: 3,
            comment: ''
          }
        },
        rules: {
          start_date: [{ validator: (rule, value, callback) => {
            if (value === '' || !value) {
              callback(new Error('Favor de no dejar este campo vacio'));
            } else {
              if (this.eventDuration <= 0) {
                callback(new Error('No se puede crear una cita sin duracion'))
              } else {
                callback();
              }
            }
          }, trigger: 'change' }],
          end_date: [{ validator: (rule, value, callback) => {
            if (value === '' || !value) {
              callback(new Error('Favor de no dejar este campo vacio'));
            } else {
              if (this.eventDuration <= 0) {
                callback(new Error('No se puede crear una cita sin duracion'))
              } else {
                callback();
              }
            }
          }, trigger: 'change' }],
          payment_method: [{ validator: (rule, value, callback) => {
            if ((value === '' || !value) && !this.modal.data.id && this.modal.data.order_product_id) {
              callback(new Error('Favor de no dejar este campo vacio'));
            } else {
              callback();
            }
          }, trigger: 'change' }],
          payment_status: [{ validator: (rule, value, callback) => {
            if ((value === '' || !value) && !this.modal.data.id && this.modal.data.payment_method) {
              callback(new Error('Favor de no dejar este campo vacio'));
            } else {
              callback();
            }
          }, trigger: 'change' }],
          phone: [{ validator: (rule, value, callback) => {
            const _parsedValue = value && value.replace(/[^0-9.]/g, '')
            if ((value === '' || !value) && this.modal.newClient) {
              callback(new Error('Favor de no dejar este campo vacio'));
            } else if (`${_parsedValue}`.length < 10) { 
              callback(new Error('Favor de caputurar un teléfono valido'))
            } else {
              callback();
            }
          }, trigger: 'change' }],
          name: [{ validator: (rule, value, callback) => {
            if ((value === '' || !value) && this.modal.newClient) {
              callback(new Error('Favor de no dejar este campo vacio'));
            } else {
              callback();
            }
          }, trigger: 'change' }],
          email:  [{ validator: (rule, value, callback) => {
            if ((value === '' || !value) && this.modal.newClient) {
              callback(new Error('Favor de no dejar este campo vacio'));
            } else if (!this.validEmail(value)) {
              callback(new Error('Favor de caputurar un email valido'))
            } else {
              callback();
            }
          }, trigger: 'change' }],
        },
        review_rules: {
          comment: [{ validator: (rule, value, callback) => {
            if ((value === '' || !value)) {
              callback(new Error('Favor de no dejar este campo vacio'));
            } else {
              callback();
            }
          }, trigger: 'change' }],
        },
        phoneAlt: ''
      }
    },
    watch: {
      'getUser' () {
        this.setCalendarData()
      },
      'modal.data.status_id' () {
        if (this.modal.data) {
          this.modal.data.status = _.find(this.appointmentsStatus, { id: this.modal.data.status_id })
        }
      },
      'modal.data.client_id' () {
        if (this.modal.data) {
          this.modal.data.client = _.find(this.providerClients, { id: this.modal.data.client_id })
        }
      },
      'modal.data.order_product_id' () {
        if (this.modal.data) {
          let _service = _.find(this.providerServices, { id: this.modal.data.order_product_id })
          if (_service) {
            var event_minutes = (this.getUser.date_slot || '00:05').split(':').reduce((acc,time) => (60 * acc) + +time)
            var event_minutes2 = (_service.duration || '00:00').split(':').reduce((acc,time) => (60 * acc) + +time)
            var event_duration = this.$moment.duration({'minutes' : Math.max(event_minutes, event_minutes2)})

            this.modal.data.item = _service
            this.modal.data.end_date = this.modal.data.start_date.clone().add(event_duration) 
          }
        }
      },
    },
    computed: {
      ...mapGetters([
        'hasToken',
        'settings',
        'getUser',
        'appointmentsStatus'
      ]),
      events () {
        if (this.user && this.user.id > 0) {
          if (this.user.role.is_provider) {
            return this.user.appointments_provider.map(a => Object({
              id: a.id,
              title: ((a.client && `Cliente: ${a.client.first_name} ${a.client.last_name}`) || a.notes || 'Sin informacion') + ((a.item && a.item.name) || ''), 
              start: a.start_date, 
              end: a.end_date, 
              editable: true,
              backgroundColor: a.status.color,
              borderColor: a.status.color,
              extendedProps: { ... a }
            }))
          } else {
            return this.user.appointments.map(a => Object({ 
              id: a.id,
              title: ((a.client && `Cliente: ${a.client.first_name} ${a.client.last_name}`) || a.notes || 'Sin informacion') + ((a.item && a.item.name) || ''), 
              start: a.start_date, 
              end: a.end_date,
              backgroundColor: a.status.color,
              borderColor: a.status.color,
              extendedProps: { ... a }
            }))
          }
        } else {
          return []
        }
      },
      slotDuration () {
        if (this.user && this.user.id > 0) {
          return this.user.date_slot || '00:15:00'
        } else {
          return '00:15:00'
        }
      },
      startTime () {
        if (this.user && this.user.id > 0) {
          return `${this.user.open_time}:00` || '00:00:00'
        } else {
          return '00:00:00'
        }
      },
      endTime () {
        if (this.user && this.user.id > 0) {
          return `${this.user.close_time}:00` || '23:59:59'
        } else {
          return '23:59:59'
        }
      },
      sameDay () {
        return this.modal.open ? this.modal.data.start_date && this.modal.data.start_date.isSame(this.modal.data.end_date, 'day') : this.viewModal.data.start_date && this.viewModal.data.start_date.isSame(this.viewModal.data.end_date, 'day')
      },
      eventDuration () {
        let duration = 0
        if (this.modal.open) {
          duration = this.$moment.duration(this.$moment(this.modal.data.end_date) - this.$moment(this.modal.data.start_date))
        } else {
          duration = this.$moment.duration(this.$moment(this.viewModal.data.end_date) - this.$moment(this.viewModal.data.start_date))
        }
        return duration.asMinutes()
      },
      providerClients () {
        return this.getUser.clients || []
      },
      providerServices () {
        return this.getUser.services || []
      },
      orderOXXO() {
        if (this.modal.open) {
          return this.modal.data.order && this.modal.data.order.method && this.modal.data.order.method.id == 2 && this.modal.data.order.payment_orders && this.modal.data.order.payment_orders.metadata_object
        } else {
          return this.viewModal.data.order && this.viewModal.data.order.method && this.viewModal.data.order.method.id == 2 && this.viewModal.data.order.payment_orders && this.viewModal.data.order.payment_orders.metadata_object
        }
      },
      orderPaid() {
        if (this.modal.open) {
          return this.modal.data.order.payment_orders.status == 'paid'
        } else {
          return this.viewModal.data.order.payment_orders.status == 'paid'
        }
      },
      oxxoExpired() {
        return this.$moment.unix(this.orderOXXO.expires_at).isBefore()
      },
      oxxoTime() {
        return this.$moment.unix(this.orderOXXO.expires_at).format('DD/MM/YYYY hh:mm a')
      },
      isProvider() {
        return this.user.role && this.user.role.is_provider
      },
      isClient() {
        return this.user.role && this.user.role.is_client
      }
    },
    methods: {
      phoneFormat () {
        this.modal.data.phone = ('' + this.phoneAlt).replace(/\D/g, '')
        let match = ''
        switch (this.modal.data.phone.length) {
          case 10:
            match = this.modal.data.phone.match(/^(\d{3})(\d{3})(\d{4})$/)

            if (match) {
              this.phoneAlt = `(${match[1]}) ${match[2]}-${match[3]}`
            }
            break
          case 11:
          case 12:
          case 13:
            match = this.modal.data.phone.match(/^(\d{1,3})(\d{3})(\d{3})(\d{4})$/)

            if (match) {
              this.phoneAlt = `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}`
            }
            break
          default:
            this.phoneAlt = this.modal.data.phone
            break
        }
      },
      preventNumericInput ($event) {
        var keyCode = ($event.keyCode ? $event.keyCode : $event.which);
        if (keyCode <= 47 || keyCode >= 58) {
          $event.preventDefault()
        }
      },
      handleDateClick: function(arg) {
        var event_minutes = this.getUser.date_slot.split(':').reduce((acc,time) => (60 * acc) + +time)
        var event_duration = this.$moment.duration({'minutes' : event_minutes})

        if (arg.start && arg.end) {
          this.modal.data = {
            start_date: this.$moment(arg.start),
            end_date: this.$moment(arg.end),
            oldPostFiles: [],
            postFiles: []
          }
        } else {
          this.modal.data = {
            start_date: this.$moment(arg.date),
            end_date: this.$moment(arg.date).add(event_duration),
            oldPostFiles: [],
            postFiles: []
          }
        }

        this.showModal()
      },
      openEvent({ event }) {
        if (this.isProvider) {
          this.editEvent({ event })
        } else if (this.isClient) {
          this.viewEvent({ event })
        }
      },
      eventChange ({ event, oldEvent }) {
        if (this.isProvider) {
          if (!this.$moment(event.start).isSame(oldEvent.start) || !this.$moment(event.end).isSame(oldEvent.end)) {
            event.setExtendedProp('start_date', this.$moment(event.start).format("YYYY-MM-DD HH:mm:ss"))
            event.setExtendedProp('end_date', this.$moment(event.end).format("YYYY-MM-DD HH:mm:ss"))

            updateAppointment({ ...event.extendedProps }, this.hasToken).then((response) => {
              let _appointment_list = this.getUser.role.is_provider ? 'appointments_provider' : 'appointments'
              let _appointment = _.find(this.getUser[_appointment_list], { id: +event.id })
              if (_appointment) {
                _appointment.start_date = event.extendedProps.start_date
                _appointment.end_date = event.extendedProps.end_date
              }
              this.$notification.success({
                message: 'Datos Actualizados',
                description: this.$moment(event.start).isSame(oldEvent.start) ? 'La duracion ha sido actualizada' : 'La hora de inicio ha sido actualizada'
              })
            }).catch((error) => {

            })
          }
        }
      },
      editEvent ({ event }) {
        this.modal.data = { 
          ... event.extendedProps,
          ... {
            start_date: this.$moment(event.extendedProps.start_date),
            end_date: this.$moment(event.extendedProps.end_date),
            oldPostFiles: (event.extendedProps.Files || []).map(f => Object({
              uid: f.hash_name,
              name: f.name,
              status: 'done',
              url: f.url,
              thumbUrl: f.url,
              user_id: f.user_id
            })),
            postFiles: []
          }
        }
        this.showModal()
      },
      viewEvent ({ event }) {
        this.viewModal.data = { 
          ... event.extendedProps,
          ... {
            start_date: this.$moment(event.extendedProps.start_date),
            end_date: this.$moment(event.extendedProps.end_date),
            oldPostFiles: (event.extendedProps.Files || []).map(f => Object({
              uid: f.hash_name,
              name: f.name,
              status: 'done',
              url: f.url,
              thumbUrl: f.url,
              user_id: f.user_id
            })),
            postFiles: [],
          }
        }

        if (event.extendedProps.review) {
          this.viewModal.review.rate = event.extendedProps.review.rate
          this.viewModal.review.comment = event.extendedProps.review.message
        } else {
          this.viewModal.review.rate = 3
          this.viewModal.review.comment = ''
        }
        
        this.showViewModal()
      },
      showModal() {
        this.modal.open = true;
      },
      showViewModal() {
        this.viewModal.open = true;
      },
      handleOk(e) {
        this.modal.loading = true;
        this.$refs.eventForm.validate().then(valid => {
          if (valid) {
            if (!this.modal.data.client) delete this.modal.data.client
            if (!this.modal.data.client_id) delete this.modal.data.client_id
            if (this.modal.data.id) {
              let _event = this.$refs.fullCalendar.getApi().getEventById(this.modal.data.id)
              
              if (!this.modal.data.start_date.isSame(_event.start) || !this.modal.data.end_date.isSame(_event.end)) {
                // date changed
              } else {
                // date no changed
              }

              _event.setDates(this.modal.data.start_date.toDate(), this.modal.data.end_date.toDate())
              _event.setProp('backgroundColor', this.modal.data.status.color)
              _event.setProp('borderColor', this.modal.data.status.color)
              _event.setExtendedProp('notes', this.modal.data.notes)
              _event.setExtendedProp('status_id', this.modal.data.status_id)
              _event.setExtendedProp('status', this.modal.data.status)
              
              updateAppointment({ ..._event.extendedProps }, this.hasToken, _.differenceBy(this.modal.data.postFiles, [{ 'status': 'error' }], 'status') || []).then((response) => {
                
                this.$notification.success({
                  mesage: 'Datos actualizados',
                  description: 'Detalles de la cita actualizados' 
                });

                this.modal.loading = false
                
                if ((this.modal.data.postFiles || []).length > 0) {
                  _event.setExtendedProp('Files', response.data.data.Files)

                  let _appointment = _.find(this.getUser.appointments_provider, { id: +this.modal.data.id })
                  _appointment.Files = response.data.data.Files
                }

                this.handleCancel()
              }).catch((error) => {
                this.modal.loading = false
              })
            } else if (this.modal.data.payment_method && this.modal.data.payment_status) {
              this.saveOrder().then((response) => {
                let _order = response.data.data

                if (this.getUser.appointments_provider) {
                  this.getUser.appointments_provider.push(_order.appointments[0])
                } else {
                  this.getUser.appointments_provider = [..._order.appointments[0]]
                }
                
                if (this.getUser.clients) {
                  const _client = _.find(this.getUser.clients, { id: +_order.appointments[0].client.id })
                  if (!_client) {
                    this.getUser.clients.push(_order.appointments[0].client)
                  }
                } else {
                  this.getUser.clients = [..._order.appointments[0].client]
                }

                this.$refs.fullCalendar.getApi().addEvent({
                  id: _order.appointments[0].id,
                  title: ((_order.appointments[0].client && `Cliente: ${_order.appointments[0].client.first_name} ${_order.appointments[0].client.last_name}`) || _order.appointments[0].notes || 'Sin informacion') + ((_order.appointments[0].item && _order.appointments[0].item.name) || ''), 
                  start: _order.appointments[0].start_date, 
                  end: _order.appointments[0].end_date,
                  editable: true,
                  backgroundColor: _order.appointments[0].status.color,
                  borderColor: _order.appointments[0].status.color,
                  extendedProps: { ... _order.appointments[0] }
                }, true)

                // this.$message.success('Datos Guardados');
                // this.modal.loading = false
                // this.handleCancel()

                updateAppointment(_order.appointments[0], this.hasToken, _.differenceBy(this.modal.data.postFiles, [{ 'status': 'error' }], 'status') || []).then((response_update) => {
                  
                  this.$notification.success({
                    mesage: 'Datos Guardados',
                    description: 'Nueva cita creada' 
                  });

                  this.modal.loading = false
                  let _event = this.$refs.fullCalendar.getApi().getEventById(_order.appointments[0].id)
                  
                  if ((this.modal.data.postFiles || []).length > 0) {
                    _event.setExtendedProp('Files', response_update.data.data.Files)

                    let _appointment = _.find(this.getUser.appointments_provider, { id: +_order.appointments[0].id })
                    _appointment.Files = response_update.data.data.Files
                  }

                  this.handleCancel()
                }).catch((error) => {
                  this.modal.loading = false
                })
              }).catch((error) => {
                this.modal.loading = false                
              })
            } else {
              createAppointment({ ...this.modal.data }, this.hasToken, _.differenceBy(this.modal.data.postFiles, [{ 'status': 'error' }], 'status') || []).then((response) => {
                let _appointment = response.data.data

                if (this.getUser.appointments_provider) {
                  this.getUser.appointments_provider.push(_appointment)
                } else {
                  this.getUser.appointments_provider = [..._appointment]
                }
                
                if (_appointment.client) {
                  if (this.getUser.clients) {
                    const _client = _.find(this.getUser.clients, { id: +_appointment.client.id })
                    if (!_client) {
                      this.getUser.clients.push(_appointment.client)
                    }
                  } else {
                    this.getUser.clients = [..._appointment.client]
                  }
                }

                this.$refs.fullCalendar.getApi().addEvent({
                  id: _appointment.id,
                  title: ((_appointment.client && `Cliente: ${_appointment.client.first_name} ${_appointment.client.last_name}`) || _appointment.notes || 'Sin informacion') + ((_appointment.item && _appointment.item.name) || ''), 
                  start: _appointment.start_date, 
                  end: _appointment.end_date,
                  editable: true,
                  backgroundColor: _appointment.status.color,
                  borderColor: _appointment.status.color,
                  extendedProps: { ... _appointment }
                }, true)

                
                this.$notification.success({
                  mesage: 'Datos Guardados',
                  description: 'Nueva cita creada' 
                });

                this.modal.loading = false
                this.handleCancel()
              }).catch((error) => {
                this.modal.loading = false
              })
            }
          } else {
            this.modal.loading = false
          }
        }).catch((error) => {
          this.modal.loading = false
        });
        // }, 2000);
      },
      handleCancel(e) {
        this.modal.open = false
        this.modal.data = false
        this.modal.loading = false

        this.modal.newClient = false
      },
      handleViewCancel(e) {
        this.viewModal.open = false
        this.viewModal.data = false
        this.viewModal.loading = false

        this.viewModal.review.rate = 3
        this.viewModal.review.comment = ''
      },
      handleViewOk(e) {
        this.viewModal.loading = true

        this.$refs.reviewForm.validate().then(valid => {
          if (valid) {
            postReview({
              ...this.viewModal.review,
              ... {
                appointment: this.viewModal.data.id
              }
            }, this.hasToken).then((response) => {

              let _event = this.$refs.fullCalendar.getApi().getEventById(this.viewModal.data.id)
              _event.setExtendedProp('review', { ...response.data.data })
              
              this.$notification.success({
                message: 'Datos Guardados',
                description: 'La reseña ha sido enviada'
              });
              this.viewModal.loading = false
              this.handleViewCancel()
            }).catch((error) => {
              this.viewModal.loading = false
            })
          } else {
            this.viewModal.loading = false
          }
        }).catch((error) => {
          this.viewModal.loading = false
        });
      },
      setCalendarData() {
        this.calendarOptions.events = this.events
        this.calendarOptions.slotDuration = this.slotDuration
        this.calendarOptions.businessHours.startTime = this.startTime
        this.calendarOptions.businessHours.endTime = this.endTime
      },
      handleUpload(file) {
        if (!validFileSize(file.size)) {
          file.status = "error"
          file.response = "Tamaño maximo excedido"
        } 

        if (!validFileType(file)) {
          file.status = "error"
          file.response = "Tipo de archivo no valido"
        }

        this.modal.data.postFiles = [ ...this.modal.data.postFiles, file ]
        this.modal.data.oldPostFiles = [ ...this.modal.data.oldPostFiles, file ]
        return false;
      },
      handleDelete() {
        this.$confirm({
          title: 'Desea borrar la cita seleccionada?',
          content: 'Al aceptar esta ventana no se podra recuperar la informacion de la cita eliminada',
          okText: 'Aceptar',
          cancelText: 'Cancelar',
          onOk: (close) => {
            return deleteAppointment(this.modal.data, this.hasToken).then((response) => {
              this.$notification.success({
                message: 'Cita eliminada',
                description: 'El espacio ya esta disponible para mas citas' 
              });

              let _event = this.$refs.fullCalendar.getApi().getEventById(this.modal.data.id)
              _.remove(this.getUser.appointments_provider, { id: + this.modal.data.id })
              _event.remove()

              this.handleCancel();
            })
          },
          onCancel () {

          }
        })
      },
      handleRemove(file) {
        if (file.user_id) {
          this.$confirm({
            title: 'Desea borrar el archivo seleccionado?',
            content: 'Al aceptar esta ventana no se podra recuperar el archivo eliminado',
            okText: 'Aceptar',
            cancelText: 'Cancelar',
            onOk: (close) => {
              return deleteFile(file.user_id, file.uid, this.hasToken).then((response) => {
                this.$notification.success({
                  message: 'Archivo eliminado',
                  description: 'El archivo ya no estara disponble en el sistema'
                });
                
                _.remove(this.modal.data.oldPostFiles, { uid: file.uid })

                let _appointment = _.find(this.getUser.appointments_provider, { id: +this.modal.data.id })
                _.remove(_appointment.Files, { hash_name: file.uid })

                this.$forceUpdate()
              })
            },
            onCancel () {

            }
          });
        } else {
          _.remove(this.modal.data.postFiles, { uid: file.uid })
          _.remove(this.modal.data.oldPostFiles, { uid: file.uid })
          this.$forceUpdate()
        }
      },
      handlePreview(file) {
      },
      handleNewClient() {
        this.modal.newClient = !this.modal.newClient
      },
      validEmail: function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      },
      saveOrder() {
        let _service = _.find(this.providerServices, { id: this.modal.data.order_product_id })
        let data = {
          provider_id: this.getUser.id,
          phone: this.modal.data.phone,
          email: this.modal.data.email,
          name: this.modal.data.name,
          last_name: this.modal.data.last_name,
          payment_method: this.modal.data.payment_method, // 1: tarjeta, 3: cash
          process_order: false,
          payment_status: this.modal.data.payment_status,
          Products: [{
            product_id: this.modal.data.order_product_id,
            name: _service.name,
            precio_venta: _service.price,
            date: this.modal.data.start_date.format('DDMMYYYY'),
            time: this.modal.data.start_date.format('HH:mm'),
            date_end: this.modal.data.end_date.format('DDMMYYYY'),
            time_end: this.modal.data.end_date.format('HH:mm'),
            phone: this.modal.data.phone,
            email: this.modal.data.email,
            status: this.modal.data.status_id || 5,
            notes: this.modal.data.notes
          }],
        };
        let readyToSave = true

        if (this.modal.data.client_id > 0 && this.modal.data.client) {
          data.phone = this.modal.data.client.phone
          data.email = this.modal.data.client.email
          data.name = this.modal.data.client.first_name
          data.last_name = this.modal.data.client.last_name
          data.user_id = this.modal.data.client.id
          data.Products = [{
            product_id: this.modal.data.order_product_id,
            name: _service.name,
            precio_venta: _service.price,
            date: this.modal.data.start_date.format('DDMMYYYY'),
            time: this.modal.data.start_date.format('HH:mm'),
            date_end: this.modal.data.end_date.format('DDMMYYYY'),
            time_end: this.modal.data.end_date.format('HH:mm'),
            user_id: this.modal.data.client.id,
            phone: this.modal.data.client.phone,
            email: this.modal.data.client.email,
            status: this.modal.data.status_id || 5,
            notes: this.modal.data.notes
          }]
        }

        return postOrder(data)
      }
    },
    mounted() {
      this.setCalendarData()
    }
  }
</script>
<style lang="scss">
  .fc-toolbar-chunk {
    &:last-child {
      margin-left: auto;
    }
  }
  .ant-modal-body {
    padding-top: 10px;
    .ant-time-picker {
      width: 100%
    }
    .ant-form-item:not(.ant-form-item-with-help) {
      margin-bottom: 0
    }
    .ant-divider {
      margin-top: 15px;
    }
    .ant-form-explain {
      white-space: nowrap;
    }
    .ant-rate {
      line-height: 0;
    }
    .ant-input[disabled] {
      background-color: var(--vs-state-disabled-bg);
    }
  }
  .ant-modal {
    max-width: 95%;
  }
</style>