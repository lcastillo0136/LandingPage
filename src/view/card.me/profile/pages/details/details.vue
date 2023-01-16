<template>
  <div class="profile-page" v-if="profile">
    <a-form-model ref="detailsForm" :rules="rules" :model="user" class="details-form d-flex flex-column" :label-col="labelCol" :wrapper-col="wrapperCol" :colon="false">
      <b-card class="rounded-0">
        <figure class="profile-header">
          <img :src="cover" alt="" class="img-fluid mx-auto d-block"  v-if="isCoverImage"/>
          <img :src="coverFile" alt="" class="img-fluid mx-auto d-block" v-else/>
        </figure>
        <div class="d-flex align-items-center">
          <div v-if="avatar" class="profile-avatar-container">
            <template v-if="typeAsImage">
              <a-avatar :size="120" :src="avatar" v-if="isImage" class="shadow-sm bg-white border border-white"/>
              <a-avatar :size="120" :src="avatarFile"  v-else class="shadow-sm bg-white border border-white"/>
            </template>
            <template v-else>
              <video class="shadow-sm bg-white border border-white ant-avatar ant-avatar-circle ant-avatar-image" autoplay loop muted>
                <source :src="videoAvatarSrc" id="video_here">
                  Your browser does not support HTML5 video.
              </video>
            </template>
          </div>
          <div>
            <h4 class="card-title">Perfil</h4>
            <h6 class="card-subtitle text-muted">Actualiza tu foto y datos personales.</h6>
          </div>
          <div class="ml-auto">
            
          </div>
        </div>
        <div class="d-flex flex-column flex-md-row my-4 row-cols-1 row-cols-md-2" id="profilePicture">
          <a-form-model-item class="px-md-1" :wrapper-col="{ span: 24 }">
            <small class="text-muted">FOTO DE PERFIL</small>
            <a-upload-dragger class="flex-wrap flex-md-nowrap justify-content-center"  name="profile-avatar" :multiple="false" :showUploadList="false" :beforeUpload="handleUpload" accept="image/*,video/*" :disabled="saving" >
              <template v-if="avatarFile">
                <template v-if="typeAsImage">
                  <a-avatar shape="square" :size="64" icon="user" :src="avatarFile" />
                </template>
                <template v-else>
                  <video muted class="rounded button-image">
                    <source :src="videoAvatarSrc" id="video_here">
                      Your browser does not support HTML5 video.
                  </video>
                </template>
                <span class="profile-name ml-4 mr-auto font-weight-bold" >
                  {{ profile.avatar | filename }}
                </span>
              </template>
              <template v-else>
                <div class="rounded button-image">
                  <b-icon-image></b-icon-image>
                </div>
                <span class="profile-name ml-4 mr-auto font-weight-bold">
                  Arrasta aqui o busca una nueva imagen para tu perfil
                </span>
              </template>
              <a-button class=" font-weight-bold" :disabled="saving">Navegar</a-button>
            </a-upload-dragger>
          </a-form-model-item>
          <a-form-model-item class="px-md-1" :wrapper-col="{ span: 24 }">
            <small class="text-muted">FOTO DE PORTADA</small>
            <a-upload-dragger name="profile-cover" :multiple="false" :showUploadList="false" :beforeUpload="handleCoverUpload" accept="image/*" :disabled="saving" >
              <template v-if="coverFile">
                <a-avatar shape="square" :size="64" icon="user" :src="coverFile" />
                <span class="profile-name ml-md-4 mr-auto font-weight-bold" >
                  {{ profile.cover | filename }}
                </span>
              </template>
              <template v-else>
                <div class="rounded button-image">
                  <b-icon-image></b-icon-image>
                </div>
                <span class="profile-name ml-md-4 mr-auto font-weight-bold">
                  Arrasta aqui o busca una nueva imagen para tu portada
                </span>
              </template>
              <a-button class=" font-weight-bold" :disabled="saving">Navegar</a-button>
            </a-upload-dragger>
          </a-form-model-item>
        </div>
        
        <a-form-model-item prop="title">
          <template #label>
            <span>Titulo</span>
            <br>
            <small class="text-muted">Palabra o expresión que antecede al nombre</small>
          </template>
          <a-select v-model="profile.title" size="large" :disabled="saving">
            <a-select-option value="">
              ----
            </a-select-option>
            <a-select-option value="Dr.">
              Dr. (Doctor)
            </a-select-option>
            <a-select-option value="Arq.">
              Arq. (Arquitecto)
            </a-select-option>
            <a-select-option value="Profr.">
              Profr. (Profesor/a)
            </a-select-option>
            <a-select-option value="Lic.">
              Lic. (Licenciado/a)
            </a-select-option>
            <a-select-option value="Ing.">
              Ing. (Ingeniero/a)
            </a-select-option>
            <a-select-option value="Esq.">
              Esq. (Esquire)
            </a-select-option>
            <a-select-option value="Hon.">
              Hon. (Honorable)
            </a-select-option>
            <a-select-option value="Jr.">
              Jr. (Junior)
            </a-select-option>
            <a-select-option value="Mr.">
              Mr.
            </a-select-option>
            <a-select-option value="Mrs.">
              Mrs.
            </a-select-option>
            <a-select-option value="Ms.">
              Ms.
            </a-select-option>
            <a-select-option value="Msgr.">
              Msgr. (Monsignor)
            </a-select-option>
            <a-select-option value="Rev.">
              Rev. (Reverend)
            </a-select-option>
            <a-select-option value="Rt. Hon.">
              Rt. Hon. (Right Honorable)
            </a-select-option>
            <a-select-option value="Sr.">
              Sr. (Senior)
            </a-select-option>
            <a-select-option value="St.">
              St. (Saint)
            </a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item prop="first_name">
          <template #label>
            <span>Nombre(s)</span>
          </template>
          <a-input type="text" placeholder="Nombre(s)" v-model="profile.first_name" :disabled="saving" size="large">
          </a-input>
        </a-form-model-item>
        
        <a-form-model-item prop="last_name">
          <template #label>
            <span>Apellido(s)</span>
          </template>
          <a-input type="text" class="" placeholder="Apellido(s)" v-model="profile.last_name" :disabled="saving" size="large">
          </a-input>
        </a-form-model-item>

        <a-form-model-item prop="phone">
          <template #label>
            <span>Teléfono móvil</span>
            <br>
            <small class="text-muted">Numero de teléfono personal</small>
          </template>
          <a-input type="number" class="" placeholder="Teléfono móvil" v-model="profile.phone" :disabled="saving" size="large">
          </a-input>
          <template #help v-if="profile.hide_personal_phone">
            <small style="opacity: 0.7;">Este dato no sera mostrado en tu tarjeta</small>
          </template>
        </a-form-model-item>

        <a-form-model-item prop="tel_oficina">
          <template #label>
            <span>Teléfono trabajo</span>
            <br>
            <small class="text-muted">Numero de teléfono principal de contacto</small>
          </template>
          <a-input type="number" class="" placeholder="Teléfono trabajo" v-model="profile.tel_oficina" :disabled="saving" size="large">
          </a-input>
          <template #help v-if="profile.hide_office_phone">
            <small style="opacity: 0.7;">Este dato no sera mostrado en tu tarjeta</small>
          </template>
        </a-form-model-item>
        
        <a-form-model-item prop="bday">
          <template #label>
            <span>Fecha de nacimiento</span>
            <br>
            <small class="text-muted"></small>
          </template>
          <a-date-picker v-model="profile.bday" size="large"  :disabled="saving"/>
          <template #help v-if="profile.hide_bday">
            <small style="opacity: 0.7;">Este dato no sera mostrado en tu tarjeta</small>
          </template>
        </a-form-model-item>

        <a-form-model-item prop="email">
          <template #label>
            <span>Correo electrónico</span>
            <br>
            <small class="text-muted">Direccion de correo electrónico de contacto</small>
          </template>
          <a-input type="text" class="" placeholder="Correo electrónico" v-model="profile.email" :disabled="saving" size="large">
          </a-input>
          <template #help v-if="profile.hide_email">
            <small style="opacity: 0.7;">Este dato no sera mostrado en tu tarjeta</small>
          </template>
        </a-form-model-item>

        <a-form-model-item prop="gender">
          <template #label>
            <span>Género</span>
            <br>
            <small class="text-muted"></small>
          </template>
          <a-select v-model="profile.gender" size="large" :disabled="saving">
            <a-select-option value="male">
              Masculino
            </a-select-option>
            <a-select-option value="female">
              Femenino
            </a-select-option>
            <a-select-option value="other">
              Otro
            </a-select-option>
            <a-select-option value="not_sure">
              No estoy seguro
            </a-select-option>
            <a-select-option value="rather_not_say">
              Prefiero no decir
            </a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item prop="quote">
          <template #label>
            <span>Cita</span>
            <br>
            <small class="text-muted">Compartenos una frase que te describa</small>
          </template>
          <a-input type="textarea" placeholder="Frase que te describa" v-model="profile.quote" :disabled="saving" size="large" autoSize>
          </a-input>
        </a-form-model-item>

        <a-form-model-item prop="biography" class="align-items-start">
          <template #label >
            <span class="d-inline-block mt-2">Biografía</span>
            <br>
            <small class="text-muted">Escribe una descripción corta sobre ti mismo</small>
          </template>
          <div class="bio-container">
            <vue-editor v-model="profile.biography" :disabled="saving" :editorToolbar="toolbarConfig" :editorOptions="editorConfig"  placeholder="Escribe una descripción corta sobre ti mismo" />
          </div>
        </a-form-model-item>
      </b-card>
    </a-form-model>
    <!-- 

    <b-card>

      <div>
        <small class="text-muted mx-1">HABILIDADES</small>
        <br>
        <div class="overflow-auto" style="max-height: 500px;">
          <div class="d-flex shadow-sm rounded p-3 border mb-2 mx-1 align-items-center" v-for="(tag, index) in profile.skills">
            <a-input type="text" placeholder="Nombre de la habilidad" class="w-50 mr-3" v-model="tag.name" :disabled="saving" ></a-input>
            <a-input-number class="w-25 mr-auto ant-input-number" v-model="tag.value" :min="1" :max="99" />
            <a-switch class="mr-3" size="small" v-model="tag.active" />
            <a-icon type="minus-circle" :style="{ fontSize: '16px', color: 'var(--red)' }"></a-icon>
          </div>
          <a-tooltip v-if="tag.name.length > 20" :key="tag.name" :title="tag.name">
            <a-tag :key="tag.name" :closable="true" @close="() => handleClose(tag.name)">
              {{ `${tag.name.slice(0, 20)}...` }}
            </a-tag>
          </a-tooltip>
          <a-tag v-else :key="tag.name" :closable="true" @close="() => handleClose(tag.name)">
            {{ tag.name }}
          </a-tag>
        </div>
        <a-input
          v-if="inputVisible"
          ref="input"
          type="text"
          size="small"
          :style="{ width: '78px' }"
          :value="inputValue"
          @change="handleInputChange"
          @blur="handleInputConfirm"
          @keyup.enter="handleInputConfirm"
        />
        <a-tag v-else style="background: #fff; borderStyle: dashed;" @click="showInput">
          <a-icon type="plus" /> Agregar
        </a-tag>
      </div>
    </b-card>
    <Addressess :profile="profile"></Addressess>
    
    -->
    <div style="text-align: right;" class="container">
      <a-button type="primary" class="save-button" shape="circle" size="large" @click="handleSave" :loading="saving" :disabled="!matchPassword">
        <a-icon type="save" theme="filled" v-if="!saving" />
      </a-button>
      <div v-for="(e, ei) in errors">
        <div v-for="ee in e" class="d-block invalid-feedback">
          {{ $t(`errors.${ei}.${ee}`) }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { updateUser } from '@/api/user'
  import { mapGetters, mapMutations } from 'vuex'
  import { PinturaEditor } from 'vue-pintura'
  import { getEditorDefaults } from 'pintura'
  import draggable from 'vuedraggable'
  import { i18nChangeLanguage } from '@wangeditor/editor'
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
  import { VueEditor, Quill } from "vue2-editor";

  import Addressess from './components/addressess'
  import * as _ from 'lodash'

  import { Icon } from 'iview';

  import 'iview/dist/styles/iview.css';
  import '@wangeditor/editor/dist/css/style.css';

  i18nChangeLanguage('en')

  var icons = Quill.import("ui/icons");
  icons["undo"] = `<svg viewbox="0 0 18 18">
    <polygon class="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10"></polygon>
    <path class="ql-stroke" d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"></path>
  </svg>`;
  icons["redo"] = `<svg viewbox="0 0 18 18">
    <polygon class="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10"></polygon>
    <path class="ql-stroke" d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"></path>
  </svg>`;

  function undoChange() {
    this.quill.history.undo();
  }
  function redoChange() {
    this.quill.history.redo();
  }

  export default {
    name: 'ProfileDetails',
    props: {
      user: {
        type: Object,
        default: function () {
          return { }
        }
      }
    },
    components: {
      PinturaEditor,
      Addressess,
      Icon,
      draggable,
      Editor, 
      Toolbar,
      VueEditor
    },
    data () {
      return {
        inputVisible: false,
        inputValue: '',
        editor: null,
        html: '',
        toolbarConfig: [
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          ['blockquote', "bold", "italic", "underline", 'strike', 'link', { list: "bullet" }, { list: "ordered" }],
          ['undo', 'redo','clean'] 
        ],
        editorConfig: { 
          modules: {
            toolbar: {
              container: [
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                ['blockquote', "bold", "italic", "underline", 'strike', 'link', { list: "bullet" }, { list: "ordered" }],
                ['undo', 'redo','clean'] 
              ],
              handlers: {
                undo: undoChange,
                redo: redoChange
              }
            },
            history: {
              delay: 2000,
              maxStack: 500,
              userOnly: true
            }
          }
        },
        mode: 'default', // or 'simple'
        // Pass the editor default configuration options
        editorDefaults: getEditorDefaults(),
        fileList: [],
        saving: false,
        user_pass: {
          password: '',
          confirmpassword: '',
          passwordVisible: false,
          password2Visible: false
        },
        errors: [],
        rules: {
          first_name: [{ validator: (rule, value, callback) => {
            if ((value === '' || !value)) {
              callback(new Error('Favor de no dejar este campo vacío'));
            } else {
              callback();
            }
          }, trigger: 'change' }],
          email: [{ validator: (rule, value, callback) => {
            if ((value === '' || !value)) {
              callback(new Error('Favor de no dejar este campo vacío'));
            } if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))) {
              callback(new Error('No es un correo valido'));
            }else {
              callback();
            }
          }, trigger: 'change' }],
          realPassword: [{ validator: (rule, value, callback) => {
            if ((value === '' || !value)) {
              callback(new Error('Favor de no dejar este campo vacío'));
            } else if (value !== this.form.realPassword2 && this.form.realPassword2) {
              callback(new Error('Las contraseñas no coinciden'));
            } else if (value.length > 20) {
              callback(new Error('Caracteres maximos permitidos: 20'));
            } else {
              callback();
              if (this.form.realPassword == this.form.realPassword2) {
                this.$refs.registerForm.validateField('realPassword2')
              }
            }
          }, trigger: 'change' }],
          realPassword2: [{ validator: (rule, value, callback) => {
            if ((value === '' || !value)) {
              callback(new Error('Favor de no dejar este campo vacío'));
            } if (value !== this.form.realPassword) {
              callback(new Error('Las contraseñas no coinciden'));
            } else {
              callback();
              if (this.form.realPassword == this.form.realPassword2) {
                this.$refs.registerForm.validateField('realPassword')
              }
            }
          }, trigger: 'change' }],
        },
        avatarFile: '',
        coverFile: '',
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
        drag: false,
      }
    },
    watch: {
      'user_pass':{
        deep: true,
        handler() {
          if (this.user_pass.password != this.user_pass.confirmpassword) {
            this.$refs.confirmpassword.setCustomValidity("Invalid field")
          } else {
            this.$refs.confirmpassword.setCustomValidity("")
          }
        }
      },
      cover () {
        if (!this.isCoverImage) {
          var reader = new FileReader();
          reader.onloadend = () => {
            this.coverFile = reader.result;
          }

          if (this.cover) {
            reader.readAsDataURL(this.cover);
          } else {

          }
        }
      }
    },
    computed: {
      ...mapGetters([
        'hasToken',
        'getUser',
        'settings',
      ]),
      matchPassword() {
        return `${this.user_pass.confirmpassword}`.match(`^${this.user_pass.password}$`);
      },
      profile: {
        get() {
          return this.user
        },
        set() {
          
        }
      },
      avatar () {
        return (this.profile && this.profile.avatar) || '/img/blank-profile.webp'
      },
      cover () {
        return (this.profile && this.profile.cover) || '/img/blank-profile.webp'
      },
      isImage() {
        try {
          if (this.profile.avatar && this.profile.avatar instanceof File) {
            return false;
          }
        } catch(e) { }
         
       return true
      },
      typeAsImage() {
        return !this.isImage ? this.profile.avatar.type.indexOf('image/') > -1 : !(['mp4', 'avi', 'mp3', 'mov', 'mkv', 'flv', 'vob', 'avi', 'wmv'].includes(this.avatarExtension))
      },
      videoAvatarSrc () {
        return (!this.isImage && !this.typeAsImage && URL.createObjectURL(this.profile.avatar)) || this.profile.avatar
      },
      isCoverImage() {
        try {
          if (this.profile.cover && this.profile.cover instanceof File) {
            return false;
          }
        } catch(e) { }
         
       return true
      },
      isProvider() {
        return this.user.role && this.user.role.is_provider
      },
      isClient() {
        return this.user.role && this.user.role.is_client
      },
      hasNewProfilePicture() {
        return this.profile.avatar instanceof File
      },
      avatarExtension () {
        return this.profile.avatar.slice((this.profile.avatar.lastIndexOf(".") - 1 >>> 0) + 2)
      }
    },
    filters: {
      filename(value) {
        return value && _(value.name).split('/').last()
      }
    },
    methods: {
      ...mapMutations([
        'setUserEdited'
      ]),
      handleClose(removedTag) {
        const tags = this.profile.skills.filter(tag => tag.name !== removedTag)
        this.profile.skills = tags
        this.setUserEdited(true)
      },
      showInput() {
        this.inputVisible = true
        this.$nextTick(function() {
          this.$refs.input.focus()
        });
      },
      handleInputChange(e) {
        this.inputValue = e.target.value
      },
      handleInputConfirm() {
        const inputValue = this.inputValue
        let tags = this.profile.skills.map(s => s.name)
        if (inputValue && tags.indexOf(inputValue) === -1) {
          this.profile.skills.push({
            active: 1,
            description: null,
            name: inputValue,
            user_id: this.profile.id,
            value: 0
          })
        }
        Object.assign(this, {
          inputVisible: false,
          inputValue: '',
        })
      },
      handleSave () {
        this.saving = true

        this.$refs.detailsForm.validate().then(valid => {
          if (valid) {
            this.errors = []
            updateUser({
              ...this.profile,
              ...{
                bday: this.profile.bday && this.profile.bday.format('YYYY-MM-DD'),
                phone: (`${this.profile.phone||''}`).replace(/\D/g, ''),
              }
            }, this.hasToken).then((response) => {
              this.profile.avatar = this.getUser.avatar = response.data.data.avatar
              this.profile.cover = this.getUser.cover = response.data.data.cover
              this.coverFile = '';
              this.avatarFile = '';

              this.saving = false

              this.$notification.success({
                message: 'Datos guardados',
                description: 'Los datos del usuario han sido actualizados'
              })
            }).catch((error) => {
              this.saving = false
              
              _.each(error.data.error, (e, p) => {
                _.each(e, (ee) => {
                  this.$notification.error({
                    message: 'Error al guardar',
                    description: this.$t(`errors.${p}.${ee}`)
                  })
                })
              })
            })
          } else {
            this.saving = false
          }
        }).catch((error) => {
          this.saving = false
        });
      },
      handleUpload(file) {
        if (file.type.indexOf('video/') > -1 && file.size / (1024 * 1024) > 50) {
          this.$notification.error({
            message: 'Error al seleccionar el archivo',
            description: 'El tamaño del video debe ser menor a 5 MB'
          })
        } else {
          this.profile.avatar = file

          if (!this.isImage) {
            var reader  = new FileReader();
            reader.onloadend = () => {
              this.avatarFile = reader.result;
            }

            if (this.avatar) {
              reader.readAsDataURL(this.avatar);
            } else {

            }
          }
        }
        return false
      },
      handleCoverUpload(file) {
        this.profile.cover = file
        if (!this.isCoverImage) {
          var reader  = new FileReader();
          reader.onloadend = () => {
            this.coverFile = reader.result;
          }

          if (this.cover) {
            reader.readAsDataURL(this.cover);
          } else {

          }
        }
        return false
      },
      togglePassword(field) {
        if (field) {
          field.type = field.type == 'password' ? 'text' : 'password'
        }
      },
      onCreated(editor) {
        this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
      },
    },
    mounted() {
      if (!this.isImage) {
        if (!this.isImage) {
          var readerAvatar  = new FileReader();
          readerAvatar.onloadend = () => {
            this.avatarFile = readerAvatar.result;
          }

          if (this.profile.avatar) {
            readerAvatar.readAsDataURL(this.profile.avatar);
          } else {

          }
        }
      }
      if (!this.isCoverImage) {
        if (!this.isCoverImage) {
          var reader  = new FileReader();
          reader.onloadend = () => {
            this.coverFile = reader.result;
          }

          if (this.profile.cover) {
            reader.readAsDataURL(this.profile.cover);
          } else {

          }
        }
      }
    },
    beforeDestroy() {
      const editor = this.editor
      if (editor == null) return
      editor.destroy() // 组件销毁时，及时销毁编辑器
    }
  }
</script>
<style lang="scss">
  .profile-page {
    font-family: 'Poppins', 'Montserrat',  sans-serif;
    .profile-header {
      position: relative;
      overflow: hidden;
      height: 220px;
      margin-top: -20px;
      margin-right: -20px;
      margin-left: -20px;
      > img {
        position: absolute;
        top: 0%;
        left: 50%;
        transform: translate(-50%, -10%);
        min-width: 100%;
      }
      @media only screen and (max-width: 750px) {
        height: 120px;
      }
    }
    .profile-avatar-container {
      margin-left: 25px;
      z-index: 100;
      margin-top: -30px;
      margin-right: 16px;
      > span {
        border-width: 4px !important;
      }

      > video {
        display: block;
        width: 100%;
        height: 100%;
        -o-object-fit: cover;
        object-fit: cover;
        width: 120px;
        height: 120px;
        line-height: 120px;
        font-size: 18px;
        border-width: 4px !important;
      }

      @media only screen and (max-width: 750px) {
        margin-left: 0;
        margin-right: 8px;
        .ant-avatar {
          width: 80px !important;
          height: 80px !important;
          border-width: 2px !important;
        }
      }
    }
    .PinturaRoot.PinturaRootComponent.pintura-editor {
      background: #f5f8fa;
      &:after {
        content: none;
      }
    }
    .ant-calendar-picker {
      width: 100%;
      .ant-input {
        
      }
    }
    .ant-tag {
      margin-bottom: 5px;
    }
    .was-validated {
      input.form-control.has-error {
        border-color: #dc3545;
      }
      .invalid-feedback {
        position: absolute;
      }
    }
    .icon-twitter { color: #00aced; color: rgb(0, 172, 237); }
    .icon-facebook { color: #3b5998; color: rgb(59, 89, 152); }
    .icon-googleplus { color: #dd4b39; color: rgb(221, 75, 57); }
    .icon-rss { color: #f26522; color: rgb(242, 101, 34); }
    .icon-pinterest { color: #cb2027; color: rgb(203, 32, 39); }
    .icon-linkedin { color: #007bb6; color: rgb(0, 123, 182); }
    .icon-youtube { color: #bb0000; color: rgb(187, 0, 0); }
    .icon-vimeo { color: #1ab7ea; color: rgb(26, 183, 234); }
    .icon-tumblr { color: #32506d; color: rgb(50, 80, 109); }
    .icon-instagram { color: #bc2a8d; color: rgb(188, 42, 141); }
    .icon-flickr { color: #ff0084; color: rgb(255, 0, 132); }
    .icon-dribbble { color: #ea4c89; color: rgb(234, 76, 137); }
    .icon-quora { color: #a82400; color: rgb(168, 36, 0); }
    .icon-foursquare { color: #0072b1; color: rgb(0, 114, 177)}
    .icon-forrst { color: #5B9A68; color: rgb(91, 154, 104); }
    .icon-vk { color: #45668e; color: rgb(69, 102, 142); }
    .icon-wordpress { color: #21759b; color: rgb(33, 117, 155); }
    .icon-stumbleupon { color: #EB4823; color: rgb(235, 72, 35); }
    .icon-yahoo { color: #7B0099; color: rgb(123, 0, 153); }
    .icon-blogger { color: #fb8f3d; color: rgb(251, 143, 61); }
    .icon-soundcloud { color: #ff3a00; color: rgb(255, 58, 0); }
    .icon-paypal { color: #003087; color: rgb(0, 48, 135); }
    .icon-tiktok { 
      color: #000;
      text-shadow: -1px -1px 1px #25f4ee, 1px 1px 1px #fe2c55;
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

    .details-form {
      --border-color: #ececec;
      --border-color-hover: #40a9ff;
      --font-size: 13px;
      gap: 20px;
      .ant-form-item {
        display: flex;
        align-items: center;

        @media only screen and (max-width: 750px) {
          flex-direction: column;
        }
      }
      .ant-form-item-label {
        line-height: 1;
        text-align: left;
        & > label {
          line-height: 1;
        }
        small.text-muted {
          margin-top: 2px;
          display: inline-block;
          margin-left: 2px;
          color: #959ba1 !important;
          white-space: normal;
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
      .ant-switch {
        opacity: 0.8;
      }
      .ant-switch-checked {
        background: #54bd95;
      }

      .bio-container {
        border: 1px solid #f00;
        margin-top: 10px;
        overflow: hidden;
        border-radius: 4px;
        border-color: var(--border-color);
        .ql-toolbar.ql-snow {
          border: none;
          border-bottom: solid 1px;
          border-color: var(--border-color);
          padding-top: 4px;
          padding-bottom: 0px;
          button svg {
            width: 17px;
            height: 17px;
          }
          .ql-formats {
            margin-bottom: 6px;
          }
        }
        .ql-container.ql-snow {
          border: none;
          .ql-editor {
            min-height: 300px;
          }
        }
      }
    }

    .card-title {
      margin-bottom: 0.2rem;
    }

    .ant-form-item-label {
      line-height: 10px;
      label {
        margin-bottom: 0px;
      }
    }

    .ant-input, .ant-select-selection, .ant-input-number {
      border-color: var(--border-color);
      font-size: var(--font-size);
      &:hover, &:focus {
        border-color: var(--border-color-hover);
      }
    }

    .ant-divider {
      border-color: var(--border-color);
      width: calc(100% - 0.5rem);
      min-width: auto;
    }

    .ant-form-item-control {
      line-height: 1.5;
    }
    
    .ant-input-number { 
      .ant-input-number-input {
        text-align: right;      
      }

      &:hover {
        .ant-input-number-input {
          padding-right: 28px;
        }
      }
    }

    .ant-upload.ant-upload-drag {
      background: #fff;
      border-color: #ececec;
      border-width: 2px;
      .ant-upload {
        padding: 12px;
        .ant-upload-drag-container {
          display: flex;
          flex-direction: row;
          align-items: center;
          .button-image {
            background: #ebf2fd;
            color: #215ad6;
            width: 70px;
            height: 70px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            flex: 0 0 auto;
            object-fit: cover;
          }
          .profile-name {
            
          }

          @media only screen and (max-width: 750px) {
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      }
    }
  }
</style>