<template>
  <div class="mt-3 mt-lg-0">
    <template v-if="client">
      <h4 class="mb-3">
        Paciente: {{ client.full_name }} 
        <b-button class="float-md-right mt-2 mt-md-0 ml-md-2 d-block d-md-inline" :to="{ name: 'profile-patients' }" variant="outline-secondary" size="sm">
          <a-icon type="arrow-left" style="vertical-align: baseline;"></a-icon>
          Volver
        </b-button>
      </h4>
      <div class="profile-patient-edit box_general_2">
        <div class="d-flex flex-column gap-2 flex-md-row">
          <div class="profile-picture">
            <img :src="client.avatar" />
          </div>
          <div class="d-flex flex-column flex-fill">
            <h5 class="mb-1">
              <b>{{ client.full_name }}</b> 
              <a-tag color="green" class="ml-1" v-if="client.active" style="vertical-align: top;">activo</a-tag>
              <a-tag color="red" class="ml-1" v-else style="vertical-align: top;">inactivo</a-tag>
            </h5>
            <small>
              <b>
                <template v-if="client.bday">
                  {{ client.bday | moment('from', true) }}<template v-if="client.gender">,</template>
                </template> 
                <template v-if="client.gender">
                  {{ $t('profile.clients.genere.' + client.gender) }}
                </template>
              </b> 
              <template v-if="client.profesion">
                <b-icon-dot class="mx-1 profile-mute" v-if="client.bday || client.gender"></b-icon-dot>
                <span class="mx-1 profile-mute">Profesión: </span>
                <span class="profile-profesion">{{ client.profesion }}</span>
              </template>
            </small>
            <template v-if="client.phone || client.email">
              <a-divider dashed class="my-3"></a-divider>
              <div class="d-flex flex-column flex-md-row">
                <span class="d-flex flex-column flex-fill" v-if="client.phone">
                  <small class="profile-mute">Teléfono</small>
                  <small>
                    <a :href="`tel:${client.phone}`">{{ client.phone | phone }}</a>
                  </small>
                </span>
                <span class="d-flex flex-column flex-fill" v-if="client.email">
                  <small class="profile-mute">Correo electrónico</small>
                  <small>
                    <a :href="`mailto:${client.email}`">{{ client.email }}</a>
                  </small>
                </span>
              </div>
            </template>
            <template v-if="client.next_appointment">
              <a-divider dashed class="my-3"></a-divider>
              <div>
                <span class="d-flex flex-column">
                  <small class="profile-mute">Próxima cita</small>
                  <small>{{ client.next_appointment.start_date | moment('DD/MM/YYYY hh:mm a') }}</small>
                </span>
              </div>
            </template>
          </div>
        </div>
        <template v-if="client.last_medical_record">
          <a-divider dashed class="my-3"></a-divider>
          <div class="row">
            <span class="col-6 col-md-3 d-flex flex-column mb-2">
              <small class="profile-mute">Altura</small>
              <small>{{ client.last_medical_record.height }}cm</small>
            </span>
            <span class="col-6 col-md-3 d-flex flex-column">
              <small class="profile-mute">Peso</small>
              <small>{{ client.last_medical_record.weight }}kg</small>
            </span>
            <span class="col-6 col-md-3 d-flex flex-column">
              <small class="profile-mute">Masa corporal (BMI)</small>
              <small>{{ client.last_medical_record.bmi }}</small>
            </span>
            <span class="col-6 col-md-3 d-flex flex-column">
              <small class="profile-mute">Temperatura</small>
              <small>{{ client.last_medical_record.temperature }}°</small>
            </span>
            <span class="col-6 col-md-3 d-flex flex-column">
              <small class="profile-mute">Frecuencia respiratoria</small>
              <small>{{ client.last_medical_record.breathing_frequency }}</small>
            </span>
            <span class="col-6 col-md-3 d-flex flex-column">
              <small class="profile-mute">Presión arterial</small>
              <small>{{ client.last_medical_record.blood_pressure }}</small>
            </span>
            <span class="col-6 col-md-3 d-flex flex-column">
              <small class="profile-mute">Ritmo cardiaco</small>
              <small>{{ client.last_medical_record.heart_rate }}</small>
            </span>
            <span class="col-6 col-md-3 d-flex flex-column">
              <small class="profile-mute">Grupo sanguíneo</small>
              <small>{{ client.last_medical_record.blood_type }}</small>
            </span>
          </div>
        </template>
      </div>
      <a-tabs class="profile-patient-edit">
        <a-tab-pane key="1">
          <span slot="tab">
            <i class="bi bi-clipboard2-pulse"></i>
            Historial Médico
          </span>
          <div class="box_general_2">
            <div>
              <b-button :to="{ name: 'profile-patients-ehr', params: { client, provider: getUser } }" variant="primary" size="sm" class="text-white">
                <a-icon type="plus" style="vertical-align: baseline;"></a-icon>
                Agregar consulta
              </b-button>
            </div>
            <a-divider dashed class="my-3"></a-divider>
            <template v-if="client.medical_history">
              <a-timeline>
                <a-timeline-item color="green" v-for="(ehr, ehr_i) in client.medical_history" :key="ehr_i">
                  Se consultó el <b class="text-info">{{ ehr.updated_at | moment('dddd DD [de] MMMM [a las] hh:mm a') }}</b>
                   por motivo de <span class="font-italic font-weight-bold text-info">{{ ehr.reason }}</span> se recomendó <span class="font-italic font-weight-bold text-success">{{ ehr.comments }}</span>.
                </a-timeline-item>
              </a-timeline>
            </template>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2">
          <span slot="tab">
            <i class="bi bi-files"></i>
            Archivos
          </span>
          <div class="box_general_2">
            <a-spin :spinning="uploadingprocess">
              <a-upload-dragger ref="uploadDragger" name="file" :multiple="true" class="d-flex mb-3" :beforeUpload="uploadFile" :showUploadList="false" :customRequest="customRequest">
                <p class="ant-upload-drag-icon">
                  <a-icon type="inbox" />
                </p>
                <p class="ant-upload-text">
                  Haga clic aquí <span class="d-none d-md-inline">o suelta tus archivos en esta área para empezar la carga</span>
                </p>
                <p class="ant-upload-hint">
                  Soporte para carga múltiple de archivos. Estrictamente prohibido subir archivos con derechos de autor.
                </p>
              </a-upload-dragger>
            </a-spin>
            <a-list bordered :data-source="uploadErrors" size="small" class="upload-errors-list" v-if="uploadErrors.length > 0">
              <a-list-item slot="renderItem" slot-scope="item, index">
                <a-icon :style="{ color: 'red' }" type="close-circle" /> {{ item }}
              </a-list-item>
            </a-list>
            <a-list bordered :data-source="validFiles" size="small" class="upload-valid-list mt-2" v-if="validFiles.length > 0">
              <a-list-item slot="renderItem" slot-scope="item, index">
                <a-icon type="loading" /> {{ item.name }}
              </a-list-item>
            </a-list>
            <a-divider dashed></a-divider>
            <a-table :columns="columns" :data-source="files" class="table-responsive files-table" rowKey="id" bordered :loading="loading_files">
              <div slot="name" slot-scope="record" >
                <a :href="record.url" target="_blank">
                  <small>{{ record.name }}</small>
                </a>
                <div class="d-flex flex-column gap-1 d-md-none mt-2">
                  <a-tag>{{ record.size | prettyBytes }}</a-tag>
                  <a-tag v-if="record.updated_at">
                    {{ record.updated_at | moment('ddd DD/MM/YYYY') }}<br>
                    {{ record.updated_at | moment('hh:mm a') }}
                  </a-tag>
                </div>
              </div>
              <small slot="tags" slot-scope="record" class="hidden visible-md">
                <a-tag v-for="tag in record.tags" :key="tag.id">
                  {{ tag }}
                </a-tag>
              </small>
              <span slot="size" slot-scope="record">
                <small>{{ record.size | prettyBytes }}</small>
              </span>
              <small slot="last_date" slot-scope="record" class="text-right d-block">
                <small v-if="record.updated_at">
                  {{ record.updated_at | moment('dddd DD/MM/YYYY') }}<br>
                  {{ record.updated_at | moment('hh:mm a') }}
                </small>
              </small>
              <div slot="actions" slot-scope="record" >
                <a-dropdown placement="bottomRight">
                  <a-menu slot="overlay">
                    <a-menu-item key="1">
                      <a :href="record.url" target="_blank">Ver</a>
                    </a-menu-item>
                    <a-menu-item key="2">
                      <a-popconfirm title="¿Estás seguro de eliminar este archivo?" @confirm="() => deleteFile(record)">
                        <a>Borrar</a>
                      </a-popconfirm>
                    </a-menu-item>
                  </a-menu>
                  <a-button shape="circle" type="dashed" >
                    <b-icon-three-dots-vertical></b-icon-three-dots-vertical>
                  </a-button>
                </a-dropdown>
              </div>
            </a-table>
          </div>
        </a-tab-pane>
      </a-tabs>
      
    </template>
    <skeleton-loading v-else>
      <h4 class="mb-3">
        <square-skeleton :boxProperties="{ height: '30px', bottom: '3px', width: '200px' }"></square-skeleton>
      </h4>
      <div class="profile-patient-edit box_general_2">
        <div class="d-flex flex-row gap-2">
          <div class="profile-picture">
            <square-skeleton :boxProperties="{ height: '180px', bottom: '3px', width: '180px' }"></square-skeleton>
          </div>
          <div class="d-flex flex-column flex-fill">
            <h5 class="mb-1 d-flex flex-row">
              <square-skeleton :boxProperties="{ height: '25px', bottom: '3px', width: '180px' }" class="w-auto"></square-skeleton>
              <square-skeleton :boxProperties="{ height: '25px', bottom: '3px', width: '50px' }" class="ml-1"></square-skeleton>
            </h5>
            <div class="mb-1 d-flex flex-row">
              <square-skeleton :boxProperties="{ height: '20px', bottom: '3px', width: '80px' }" class="w-auto"></square-skeleton>
              <square-skeleton :boxProperties="{ height: '20px', bottom: '3px', width: '80px' }" class="w-auto ml-1"></square-skeleton>
              <b-icon-dot class="mx-1 profile-mute"></b-icon-dot>
              <square-skeleton :boxProperties="{ height: '20px', bottom: '3px', width: '80px' }" class="w-auto"></square-skeleton>
              <square-skeleton :boxProperties="{ height: '20px', bottom: '3px', width: '80px' }" class="w-auto ml-1"></square-skeleton>
            </div>
            <a-divider dashed class="my-3"></a-divider>
            <div class="d-flex flex-row">
              <span class="d-flex flex-column flex-fill">
                <square-skeleton :boxProperties="{ height: '20px', bottom: '3px', width: '80px' }" class="w-auto"></square-skeleton>
                <square-skeleton :boxProperties="{ height: '24px', bottom: '3px', width: '100px' }" class="w-auto"></square-skeleton>
              </span>
              <span class="d-flex flex-column flex-fill">
                <square-skeleton :boxProperties="{ height: '20px', bottom: '3px', width: '80px' }" class="w-auto"></square-skeleton>
                <square-skeleton :boxProperties="{ height: '24px', bottom: '3px', width: '100px' }" class="w-auto"></square-skeleton>
              </span>
            </div>
            <a-divider dashed class="my-3"></a-divider>
            <div class="d-flex flex-row">
              <span class="d-flex flex-column flex-fill">
                <square-skeleton :boxProperties="{ height: '20px', bottom: '3px', width: '80px' }" class="w-auto"></square-skeleton>
                <square-skeleton :boxProperties="{ height: '24px', bottom: '3px', width: '100px' }" class="w-auto"></square-skeleton>
              </span>
            </div>
          </div>
        </div>
        <a-divider dashed class="my-3"></a-divider>
        <div class="row">
          <span class="col-md-3 d-flex flex-column mb-2">
            <square-skeleton :boxProperties="{ height: '17px', bottom: '3px', width: '50px' }" class="w-auto"></square-skeleton>
            <square-skeleton :boxProperties="{ height: '17px', bottom: '3px', width: '50px' }" class="w-auto"></square-skeleton>
          </span>
          <span class="col-md-3 d-flex flex-column">
            <square-skeleton :boxProperties="{ height: '17px', bottom: '3px', width: '50px' }" class="w-auto"></square-skeleton>
            <square-skeleton :boxProperties="{ height: '17px', bottom: '3px', width: '50px' }" class="w-auto"></square-skeleton>
          </span>
          <span class="col-md-3 d-flex flex-column">
            <square-skeleton :boxProperties="{ height: '17px', bottom: '3px', width: '50px' }" class="w-auto"></square-skeleton>
            <square-skeleton :boxProperties="{ height: '17px', bottom: '3px', width: '50px' }" class="w-auto"></square-skeleton>
          </span>
          <span class="col-md-3 d-flex flex-column">
            <square-skeleton :boxProperties="{ height: '17px', bottom: '3px', width: '50px' }" class="w-auto"></square-skeleton>
            <square-skeleton :boxProperties="{ height: '17px', bottom: '3px', width: '50px' }" class="w-auto"></square-skeleton>
          </span>
          <span class="col-md-3 d-flex flex-column">
            <square-skeleton :boxProperties="{ height: '17px', bottom: '3px', width: '50px' }" class="w-auto"></square-skeleton>
            <square-skeleton :boxProperties="{ height: '17px', bottom: '3px', width: '50px' }" class="w-auto"></square-skeleton>
          </span>
          <span class="col-md-3 d-flex flex-column">
            <square-skeleton :boxProperties="{ height: '17px', bottom: '3px', width: '50px' }" class="w-auto"></square-skeleton>
            <square-skeleton :boxProperties="{ height: '17px', bottom: '3px', width: '50px' }" class="w-auto"></square-skeleton>
          </span>
          <span class="col-md-3 d-flex flex-column">
            <square-skeleton :boxProperties="{ height: '17px', bottom: '3px', width: '50px' }" class="w-auto"></square-skeleton>
            <square-skeleton :boxProperties="{ height: '17px', bottom: '3px', width: '50px' }" class="w-auto"></square-skeleton>
          </span>
          <span class="col-md-3 d-flex flex-column">
            <square-skeleton :boxProperties="{ height: '17px', bottom: '3px', width: '50px' }" class="w-auto"></square-skeleton>
            <square-skeleton :boxProperties="{ height: '17px', bottom: '3px', width: '50px' }" class="w-auto"></square-skeleton>
          </span>
        </div>
      </div>
      <h4 class="mb-3">
        <square-skeleton :boxProperties="{ height: '30px', bottom: '3px', width: '200px' }"></square-skeleton>
      </h4>
      <div class="profile-patient-edit box_general_2">
      </div>
    </skeleton-loading>
  </div>
</template>
<script>
  import { getClient, uploadFiles, deleteFile } from '@/api/user'
  import { mapGetters } from 'vuex'

  import * as _ from 'lodash'

  import config from '@/config'
  const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

  const columns = [
    { title: 'Nombre', key: 'name', scopedSlots: { customRender: 'name' } },
    { title: 'Etiquetas', key: 'tags', scopedSlots: { customRender: 'tags' }, class: 'd-none d-md-table-cell' },
    { title: 'Tamaño', key: 'size', scopedSlots: { customRender: 'size' }, class: 'd-none d-md-table-cell' },
    { title: '', key: 'last_date', scopedSlots: { customRender: 'last_date' }, class: 'd-none d-md-table-cell' },
    { title: '', key: 'actions', scopedSlots: { customRender: 'actions' } }
  ];

  export default {
    data() {
      return {
        columns,
        client: false,
        loading_files: false,
        upload_files: false,
        uploadingprocess: false,
        uploadErrors: [
        ],
        validFiles: []
      };
    },
    name: 'ProfilePatientsEdit',
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
      files() {
        return this.client.files
      },
      uploadAction () {
        return ``
      },
      uploadHeaders () {
        return {
          
        }
      }
    },
    methods: {
      openFileUpload() {
        this.upload_files = true
      },
      uploadFile(file, fileList) {
        if (this.validateFileType(file) && this.validateFileSize(file.size)) {
          this.validFiles.push(file)
        } else if (!this.validateFileType(file)) {
          this.uploadErrors.push(`El archivo ${file.name} no es valido`);
        } else if (!this.validateFileSize(file.size)) {
          this.uploadErrors.push(`El archivo ${file.name} excede el tamaño máximo permitido (5MB)`);
        } else {
          this.uploadErrors.push(`El archivo ${file.name} no es valido`);
        }

        if (file == _.last(fileList)) {
          this.uploadingprocess = true
          this.loading_files = true
          uploadFiles(this.client, this.hasToken, this.validFiles).then(response => response.data).then((response) => {
            this.client.files = [...response.data].concat(this.client.files)
            this.uploadingprocess = false
            this.loading_files = false
            this.validFiles = []
          }).catch((err) => {
            this.uploadingprocess = false
            this.loading_files = false
            this.validFiles = []
          })

          setTimeout(() => {
            this.uploadErrors = []
            this.uploadingprocess = false
            this.loading_files = false
          }, 10 * 1000)
        }
        return false;
      },
      changeUpload(file, fileList) {
        
      },
      customRequest () {
        
      },
      deleteFile(file) {
        this.loading_files = true
        deleteFile(this.client.id, file.hash_name, this.hasToken).then(r=>r.data).then(response => {
          this.client.files = _.filter(this.client.files, (f) => f.id != file.id)
          this.loading_files = false
        }).catch(err => {
          this.loading_files = false
        })
      },
      validateFileType(file) {
        const valid_extensions = ['.docx', '.jpg', '.jpng', '.png', '.pdf', '.doc', '.ppt', '.pptx', '.csv', '.xls', '.xlsx', '.png', '.gif', '.tiff', '.bmp', '.mp3', '.acc', '.wma', '.json', '.avi'];
        const extension = file.name.slice((file.name.lastIndexOf(".") - 2 >>> 0) + 2);

        return file.type.indexOf('application/pdf') != -1 || 
          file.type.indexOf('application/msword') != -1 ||
          file.type.indexOf('application/vnd.ms-powerpoint') != -1 ||
          file.type.indexOf('application/vnd.ms-excel') != -1 ||
          file.type.indexOf('application/vnd.openxmlformats-officedocument.presentationml.presentation') != -1 ||
          file.type.indexOf('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') != -1 ||
          file.type.indexOf('application/vnd.openxmlformats-officedocument.wordprocessingml.document') != -1 ||
          file.type.indexOf('image/') != -1 ||
          file.type.indexOf('audio/') != -1 ||
          file.type.indexOf('video/') != -1 || 
          file.type.indexOf('text/') != -1 ||
          valid_extensions.includes(extension);
      },
      validateFileSize(size) {
        return size <= 5242880;
      }
    },
    mounted() {
      if (this.$route.params.id) {
        getClient(this.$route.params.id, this.hasToken).then(response=>response.data).then((response) => {
          this.client = { ...response.data }
        })
      } else {
        this.$router.back()
      }
    }
  }
</script>

<style lang="scss">
  .profile-patient-edit {
    .profile-picture {
      max-width: 180px;
      max-height: 180px;
      overflow: hidden;
      border-radius: 6px;
      img {
        max-width: 100%;
      }
    }
    .profile-mute {
      color: #9a9a9a;
    }
    .profile-profesion {
      font-weight: 500;
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
    .btn .anticon {
      vertical-align: baseline;
    }
    .files-table {
      a {
        color: #639bbe;
      }
      .ant-pagination {
        .anticon {
          vertical-align: text-top;
        }
      }
    }
    .ant-tabs-bar {
      background: #fff;
      border-radius: 5px;
      border: 1px solid #e1e8ed;
    }
    .ant-tabs-ink-bar {
      bottom: auto;
      top: 0px;
    }
    .upload-errors-list {
      border: 1px solid #ff8989;
      color: #ff2020;
      font-size: 12px;
      .ant-list-item {
        padding: 5px 8px;
        border-bottom: 1px solid #ff8989;
        &:last-child {
          border-bottom: none;
        }
      }
      .anticon {
        vertical-align: baseline;
      }
    }
    .upload-valid-list {
      border: 1px solid #388e3c;
      color: #388e3c;
      font-size: 12px;
      .ant-list-item {
        padding: 5px 8px;
        border-bottom: 1px solid #388e3c;
        &:last-child {
          border-bottom: none;
        }
      }
      .anticon {
        vertical-align: baseline;
      }
    }
    *::after {
      display: none; 
    }
    a {
      color: #007bff;
    }
    @media (max-width: 426px) {
      &.box_general_2, .box_general_2 {
        padding: 16px;
      }
      .profile-picture {
        max-width: 80%;
        max-height: 100%;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 16px;
      }
    }
  }
</style>