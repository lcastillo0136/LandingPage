<template>
  <div id="create_card">
    <div class="d-flex flex-column flex-lg-row create-card-container mx-4 mx-lg-auto">
      <div class="flex-fill d-flex flex-column align-items-center p-3 p-lg-4">
        <div class="flex-fill flex-row w-100">
          <div class="flex-fill d-flex flex-column align-items-center">
            <label>Avatar</label>
            <a-upload
              name="avatar"
              list-type="picture-card"
              class="avatar-uploader"
              :show-upload-list="false"
              :before-upload="beforeUpload"
              accept="image/*"
              :disabled="loading"
            >
              <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
              <div v-else>
                <a-icon :type="loadingAvatar ? 'loading' : 'plus'" />
                <div class="ant-upload-text">
                  Upload
                </div>
              </div>
            </a-upload>
          </div>
          <div class="flex-fill d-flex flex-column align-items-center">
            <label>Portada</label>
            <a-upload
              name="cover"
              list-type="picture-card"
              class="avatar-uploader"
              :show-upload-list="false"
              :before-upload="beforeUploadCover"
              :disabled="loading"
              accept="image/*"
            >
              <img v-if="imageUrlCover" :src="imageUrlCover" alt="avatar" />
              <div v-else>
                <a-icon :type="loadingCover ? 'loading' : 'plus'" />
                <div class="ant-upload-text">
                  Upload
                </div>
              </div>
            </a-upload>
          </div>
        </div>
        <div class="flex-fill d-flex flex-column flex-lg-row w-100" style="gap: 10px;">
          <a-form-model-item prop="first_name" label="Nombre" class="flex-fill">
            <a-input type="text" class="" placeholder="Nombre" v-model="user.first_name" size="large" :disabled="loading" @change="updateUsername">
            </a-input>
          </a-form-model-item>
          <a-form-model-item prop="last_name" label="Apellido" class="flex-fill">
            <a-input type="text" class="" placeholder="Apellido" v-model="user.last_name" size="large" :disabled="loading" @change="updateUsername">
            </a-input>
          </a-form-model-item>
        </div>
        <div class="flex-fill d-flex flex-column flex-lg-row w-100" style="gap: 10px;">
          <a-form-model-item prop="email" label="Correo electronico" class="flex-fill">
            <a-input type="text" class="" placeholder="Correo electronico" v-model="user.email" size="large" :disabled="loading">
            </a-input>
          </a-form-model-item>
          <a-form-model-item prop="phone" label="Telefono (opcional)" class="flex-fill">
            <a-input type="text" class="" placeholder="Telefono" v-model="user.phone" size="large" :disabled="loading">
            </a-input>
          </a-form-model-item>
        </div>
        <div class="flex-fill d-flex flex-column flex-lg-row w-100" style="gap: 10px;">
          <a-form-model-item prop="company_name" label="Empresa (opcional)" class="flex-fill">
            <a-input type="text" class="" placeholder="Empresa" v-model="user.company_name" size="large" :disabled="loading">
            </a-input>
          </a-form-model-item>
          <a-form-model-item prop="especialidad" label="Profesion (opcional)" class="flex-fill">
            <a-input type="text" class="" placeholder="Profesion" v-model="user.profesion" size="large" :disabled="loading">
            </a-input>
          </a-form-model-item>
        </div>
        <div class="flex-fill d-flex flex-column flex-lg-row w-100" style="gap: 10px;">
          <a-form-model-item prop="company_name" label="Diseño">
            <a-select class="" v-model="user.design" size="large" :disabled="loading">
              <a-select-option value="design-1">Diseño 1</a-select-option>
              <a-select-option value="design-2">Diseño 2</a-select-option>
              <a-select-option value="design-3">Diseño 3</a-select-option>
              <a-select-option value="design-4">Diseño 4</a-select-option>
              <a-select-option value="design-5">Diseño 5</a-select-option>
            </a-select>
          </a-form-model-item>
        </div>
        <div class="flex-fill flex-row w-100 username-field" style="gap: 10px;">
          <a-form-model-item prop="username" label="Nombre usuario" :help="'https://www.onlycards.me/@' + (user.username||'')">
            <a-input type="text" class="" placeholder="Nombre usuario" v-model="user.username" size="large" :disabled="loading">
               <span slot="addonBefore" class="font-weight-bold d-none d-lg-inline">
                 https://www.onlycards.me/@
               </span>
               <span slot="addonBefore" class="font-weight-bold d-inline d-lg-none">
                 @
               </span>
            </a-input>
          </a-form-model-item>
        </div>
      </div>
      <div class="flex-fill">
        <CardPage ref="previewCard" :user="dataUser" :homeView="true" :preview="true" :createCardView="true"></CardPage>
      </div>
    </div>
    <div class="d-flex flex-row create-card-button w-75">
      <b-button variant="info" class="w-100" size="lg" @click="register" :disabled="!valid">Crear tarjeta</b-button>
    </div>
  </div>
</template>
<script>
  import CardPage from '../../../../card-page'
  import { getBase64 } from '@/libs/util'

  export default {
    name: 'CreateCard',
    props: {
      loading: {
        type: Boolean,
        default: false
      }      
    },
    data() {
      return {
        user: {
          id: -1,
          first_name: '',
          last_name: '',
          active: 1,
          company_name: '',
          design: 'design-1',
          avatar: 'http://cardme-api.zibasoft.com/storage/avatars/596e9324-5c2e-4d63-b4ff-c5cc0b08e033.png',
          cover: 'http://cardme-api.zibasoft.com/storage/avatars/596e9324-5c2e-4d63-b4ff-c5cc0b08e033.png',
          email: '',
          especialidad: '',
          phone: null,
          profesion: '',
          enable_security_code: false,
          active_account: this.$moment().add(1, 'day')
        },
        loadingAvatar: false,
        imageUrl: '',
        loadingCover: false,
        imageUrlCover: '',
      }
    },
    components: {
      CardPage
    },
    computed: {
      dataUser() {
        return this.user
      },
      isImage() {
        try {
          if (this.profile.avatar && this.profile.avatar instanceof File) {
            return false;
          }
        } catch(e) { }
         
       return true
      },
      isImageCover() {
        try {
          if (this.profile.cover && this.profile.cover instanceof File) {
            return false;
          }
        } catch(e) { }
         
       return true
      },
      valid() {
        return this.user.first_name && this.user.last_name && this.user.email  
      }
    },
    methods: {
      beforeUpload(file) {
        if (file.type.indexOf('video/') > -1 && file.size / (1024 * 1024) > 50) {
          this.$notification.error({
            message: 'Error al seleccionar el archivo',
            description: 'El tamaño del video debe ser menor a 5 MB'
          })
        } else {
          this.user.avatar = file

          if (!this.isImage) {
            var reader  = new FileReader();
            reader.onloadend = () => {
              this.imageUrl = reader.result;
              this.loading = false;
            }

            if (this.user.avatar) {
              reader.readAsDataURL(this.user.avatar);
            } else {

            }
          }
        }
        return false
      },
      beforeUploadCover(file) {
        if (file.type.indexOf('video/') > -1 && file.size / (1024 * 1024) > 50) {
          this.$notification.error({
            message: 'Error al seleccionar el archivo',
            description: 'El tamaño del video debe ser menor a 5 MB'
          })
        } else {
          this.user.cover = file

          if (!this.isImageCover) {
            var reader  = new FileReader();
            reader.onloadend = () => {
              this.imageUrlCover = reader.result;
              this.loadingCover = false;
            }

            if (this.user.cover) {
              reader.readAsDataURL(this.user.cover);
            } else {

            }
          }
        }
        return false
      },
      register() {
        if (this.valid) {
          this.$emit('onRegister', this.user, () => {
            alert('complete')
          })
        } else {
          this.$notification.error({
            message: 'Favor de llenar todos los campos requeridos',
            description: h => {
              return h(
                'span',
                {},
                [
                  'Revise que ', 
                  h('i', {}, 'nombre, apellido y correo electrónico'),
                  ' se encuentren con informacion'
                ]
              )
            }
          })
        }
      },
      updateUsername() {
        this.user.username = this.user.first_name.replace(/[^a-zA-Z\s\d]/g, '').replace(/^\s|\s$/g,'').replace(/\s/g, '_') + (this.user.last_name ? '_' + this.user.last_name.replace(/[^a-zA-Z\s\d]/g, '').replace(/^\s|\s$/g,'').replace(/\s/g, '_') : '')
      }
    },
  }
</script>
<style lang="scss">
  .create-card-container {
    background: var(--teal);
    margin: 20px;
    border-radius: 20px;
    border: solid 1px var(--teal);
    overflow: hidden;
    margin-right: auto;
    margin-left: auto;
    @media only screen and (min-width: 1000px) {
      max-width: 75%;
    }
    .ant-form-item-label {
      line-height: 16px;
      margin-bottom: 0;
    }
    .username-field {
      .ant-form-explain {
        display: none;
        @media only screen and (max-width: 720px) {
          display: block;
        }
      }
    }
  }
  .create-card-button {
    margin-right: auto;
    margin-left: auto;
  }
</style>