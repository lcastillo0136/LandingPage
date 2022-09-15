<template>
  <div class="mt-3 mt-lg-0">
    <h4 class="mb-3">
      Archivos
    </h4>
    <div class="profile-files box_general_2">
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
          <div class="d-flex flex-column gap-1 d-none d-md-flex mt-2">
            <small>
              Tamaño: <b>{{ record.size | prettyBytes }}</b>
            </small>
            <small v-if="record.updated_at">
              Ultima modifiacion: <b>{{ record.updated_at | moment('from') }}</b>
            </small>
            <small v-if="record.provider">
              Compartido con: <b class="text-success">{{ record.provider.full_name }}</b>
            </small>
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
        <div slot="actions" slot-scope="record" class="text-center">
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
    
    { title: '', key: 'actions', scopedSlots: { customRender: 'actions' } }
  ];

  export default {
    name: 'ProfileFiles',
    data() {
      return {
        columns,
        loading_files: false,
        upload_files: false,
        uploadingprocess: false,
        uploadErrors: [
        ],
        validFiles: []
      };
    },
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
      client () {
        return this.getUser
      },
      files() {
        return this.getUser.files
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
    }
  }
</script>

<style lang="scss">
  .profile-files {
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
    }
  }
</style>