<template>
  <div v-if="profile">
    <a-form-model class="details-form validate-form" ref="detailsForm" :rules="rules" :model="user">
      <div class="box_general_2 add_bottom_45">
        <h4>Datos personales <small class="ml-4 text-black-50">(vistas: {{ profile.viewed || 0 }})</small></h4>
        <div class="row">
          <div class="col-md-3 col-sm-12">
            <a-form-model-item prop="title" label="Titulo">
              <a-select v-model="profile.title" size="large">
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
          </div>
          <div class="col-md-5 col-sm-6">
            <a-form-model-item prop="first_name" label="Nombre(s)">
              <a-input type="text" class="" placeholder="Nombre(s)" v-model="profile.first_name" :disabled="saving" size="large">
              </a-input>
            </a-form-model-item>
          </div>
          <div class="col-md-4 col-sm-6">
            <a-form-model-item prop="last_name" label="Apellido(s)">
              <a-input type="text" class="" placeholder="Apellido(s)" v-model="profile.last_name" :disabled="saving" size="large">
              </a-input>
            </a-form-model-item>
          </div>
        </div>

        <div class="row">
          <div class="col-md-3 col-sm-6">
            <a-form-model-item prop="phone" label="Teléfono móvil">
              <a-input type="number" class="" placeholder="Teléfono móvil" v-model="profile.phone" :disabled="saving" size="large">
              </a-input>
            </a-form-model-item>
          </div>
          <div class="col-md-3 col-sm-6">
            <a-form-model-item prop="tel_oficina" label="Teléfono trabajo">
              <a-input type="number" class="" placeholder="Teléfono trabajo" v-model="profile.tel_oficina" :disabled="saving" size="large">
              </a-input>
            </a-form-model-item>
          </div>
          <div class="col-md-6 col-sm-6">
            <a-form-model-item prop="email" label="Correo electrónico">
              <a-input type="text" class="" placeholder="Correo electrónico" v-model="profile.email" :disabled="saving" size="large">
              </a-input>
            </a-form-model-item>
          </div>
        </div>

        <div class="row">
          <div class="col-md-3 col-sm-6">
            <a-form-model-item prop="bday" label="Fecha de nacimiento">
              <a-date-picker v-model="profile.bday" size="large" />
            </a-form-model-item>
          </div>

          <div class="col-md-3">
            <a-form-model-item prop="gender" label="Género">
              <a-select v-model="profile.gender" size="large">
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
          </div>
          <div class="col-md-6" style="padding-top: 18px;">
            <a-form-model-item help="*Hay que guardar para que se reflejen los cambios en el sitio">
              <a-upload name="file" :multiple="false" accept="image/*" :showUploadList="false" size="large" :beforeUpload="handleUpload">
                <a-button> <a-icon type="upload" /> Cambiar imagen de perfil </a-button>
              </a-upload>
            </a-form-model-item>
          </div>
        </div>
      </div>
    </a-form-model>

    <div class="box_general_2 add_bottom_45">
      <h4>Información de cuenta</h4>
      <form ref="registerForm">
        <div class="row">
          <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <label>Usuario</label>
              <input type="text" class="form-control" placeholder="Usuario" :value="profile.username" autocomplete="off" disabled>
            </div>
          </div>
          <div class="col-md-4 col-sm-4">
            <div class="form-group was-validated">
              <label>Contraseña</label>
              <div class="hideShowPassword-wrapper">
                <input type="password" class="form-control" placeholder="Contraseña" v-model="user_pass.password" autocomplete="off" ref="password" :class="{ 'has-error is-invalid': !matchPassword }">
                <button type="button" role="button" aria-label="Mostrar contraseña" title="Mostra contraseña" tabindex="0" class="my-toggle hideShowPassword-toggle-show" aria-pressed="false" @click.stop.prevent="togglePassword($refs.password);user_pass.passwordVisible=true" v-if="!user_pass.passwordVisible">Mostrar</button>

                <button type="button" role="button" aria-label="Ocultar contraseña" title="Ocultar contraseña" tabindex="0" class="my-toggle hideShowPassword-toggle-show" aria-pressed="false" @click.stop.prevent="togglePassword($refs.password);user_pass.passwordVisible=false" v-else>Ocultar</button>
                <div class="invalid-feedback">
                  Las contraseñas no coinciden
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <label>Confirmar contraseña</label>
              <div class="hideShowPassword-wrapper">
                <input type="password" class="form-control" placeholder="Confirmar contraseña" v-model="user_pass.confirmpassword" autocomplete="off" ref="confirmpassword" :class="{ 'has-error is-invalid': !matchPassword } ">
                <button type="button" role="button" aria-label="Mostrar contraseña" title="Mostra contraseña" tabindex="0" class="my-toggle hideShowPassword-toggle-show" aria-pressed="false" @click.stop.prevent="togglePassword($refs.confirmpassword);user_pass.password2Visible=true" v-if="!user_pass.password2Visible">Mostrar</button>

                <button type="button" role="button" aria-label="Ocultar contraseña" title="Ocultar contraseña" tabindex="0" class="my-toggle hideShowPassword-toggle-show" aria-pressed="false" @click.stop.prevent="togglePassword($refs.confirmpassword);user_pass.password2Visible=false" v-else>Ocultar</button>
                <div class="invalid-feedback">
                  {{ $t('register.messages.error.incorrect_password') }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="box_general_2 add_bottom_45">
      <h4>Redes sociales</h4>

      <div class="row">
        <div class="col-md-4 col-sm-6">
          <div class="form-group">
            <label>Url personal</label>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <b-icon-link></b-icon-link>
                </span>
              </div>
              <input type="text" class="form-control" placeholder="----------" v-model="profile.personal_url" autocomplete="chrome-off">
            </div>
          </div>
        </div>
      </div>
      <a-divider dashed ></a-divider>
      <div class="row">
        <div class="col-md-4 col-sm-6">
          <div class="form-group">
            <label>Facebook</label>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text icon-facebook">
                  <b-icon-facebook></b-icon-facebook>
                </span>
              </div>
              <input type="text" class="form-control" placeholder="----------" v-model="profile.social_facebook" autocomplete="chrome-off">
              <small id="passwordHelpBlock" class="form-text text-muted">
                <a-popover placement="bottom">
                  <template #content>
                    <img src="/img/urls/facebook-url.png" alt="" border="0" style="width: 420px;max-width: 100%;" />
                  </template>
                  Copia y pega en el campo la url desde el navegador web.<a-icon type="info-circle" style="vertical-align: baseline;margin-left: 5px;cursor: pointer;"></a-icon>
                </a-popover>
              </small>
            </div>
          </div>
        </div>
        <div class="col-md-4 col-sm-6">
          <div class="form-group">
            <label>Instagram</label>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text icon-instagram">
                  <b-icon-instagram></b-icon-instagram>
                </span>
              </div>
              <input type="text" class="form-control" placeholder="----------" v-model="profile.social_instagram" autocomplete="chrome-off">
              <small id="passwordHelpBlock" class="form-text text-muted">
                <a-popover placement="bottom">
                  <template #content>
                    <img src="/img/urls/instagram-url.png" alt="" border="0" style="width: 420px;max-width: 100%;" />
                  </template>
                  Copia y pega en el campo la url desde el navegador web.<a-icon type="info-circle" style="vertical-align: baseline;margin-left: 5px;cursor: pointer;"></a-icon>
                </a-popover>
              </small>
            </div>
          </div>
        </div>
        <div class="col-md-4 col-sm-6">
          <div class="form-group">
            <label>Linkedin</label>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text icon-linkedin">
                  <b-icon-linkedin></b-icon-linkedin>
                </span>
              </div>
              <input type="text" class="form-control" placeholder="----------" v-model="profile.social_linkedin" autocomplete="chrome-off">
              <small id="passwordHelpBlock" class="form-text text-muted">
                <a-popover placement="bottom">
                  <template #content>
                    <img src="/img/urls/linkedin-url.png" alt="" border="0" style="width: 420px;max-width: 100%;" />
                  </template>
                  Copia y pega en el campo la url desde el navegador web.<a-icon type="info-circle" style="vertical-align: baseline;margin-left: 5px;cursor: pointer;"></a-icon>
                </a-popover>
              </small>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4 col-sm-6">
          <div class="form-group">
            <label>PayPal</label>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text icon-paypal">
                  <i class="bi bi-paypal"></i>
                </span>
              </div>
              <input type="text" class="form-control" placeholder="----------" v-model="profile.social_paypal" autocomplete="chrome-off">
              <small id="passwordHelpBlock" class="form-text text-muted">
                <a-popover placement="bottom">
                  <template #content>
                    <img src="/img/urls/paypal-url.png" alt="" border="0" style="width: 420px;max-width: 100%;" />
                  </template>
                  Copia y pega en el campo la url desde el navegador web.<a-icon type="info-circle" style="vertical-align: baseline;margin-left: 5px;cursor: pointer;"></a-icon>
                </a-popover>
              </small>
            </div>
          </div>
        </div>
        <div class="col-md-4 col-sm-6">
          <div class="form-group">
            <label>TikTok</label>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text icon-tiktok">
                  <i class="bi bi-tiktok"></i>
                </span>
              </div>
              <input type="text" class="form-control" placeholder="----------" v-model="profile.social_tiktok" autocomplete="chrome-off">
              <small id="passwordHelpBlock" class="form-text text-muted">
                <a-popover placement="bottom">
                  <template #content>
                    <img src="/img/urls/tiktok-url.png" alt="" border="0" style="width: 420px;max-width: 100%;" />
                  </template>
                  Copia y pega en el campo la url desde el navegador web.<a-icon type="info-circle" style="vertical-align: baseline;margin-left: 5px;cursor: pointer;"></a-icon>
                </a-popover>
              </small>
            </div>
          </div>
        </div>
        <div class="col-md-4 col-sm-6">
          <div class="form-group">
            <label>Twitter</label>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text icon-twitter">
                  <b-icon-twitter></b-icon-twitter>
                </span>
              </div>
              <input type="text" class="form-control" placeholder="----------" v-model="profile.social_twitter" autocomplete="chrome-off">
              <small id="passwordHelpBlock" class="form-text text-muted">
                <a-popover placement="bottom">
                  <template #content>
                    <img src="/img/urls/twitter-url.png" alt="" border="0" style="width: 420px;max-width: 100%;" />
                  </template>
                  Copia y pega en el campo la url desde el navegador web.<a-icon type="info-circle" style="vertical-align: baseline;margin-left: 5px;cursor: pointer;"></a-icon>
                </a-popover>
              </small>
            </div>
          </div>
        </div>
        <div class="col-md-4 col-sm-6">
          <div class="form-group">
            <label>Youtube</label>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text icon-youtube">
                  <b-icon-youtube></b-icon-youtube>
                </span>
              </div>
              <input type="text" class="form-control" placeholder="----------" v-model="profile.social_youtube" autocomplete="chrome-off">
              <small id="passwordHelpBlock" class="form-text text-muted">
                <a-popover placement="bottom">
                  <template #content>
                    <img src="/img/urls/youtube-url.png" alt="" border="0" style="width: 420px;max-width: 100%;" />
                  </template>
                  Copia y pega en el campo la url desde el navegador web.<a-icon type="info-circle" style="vertical-align: baseline;margin-left: 5px;cursor: pointer;"></a-icon>
                </a-popover>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Addressess :profile="profile"></Addressess>
    <div class="box_general_2 add_bottom_45">
      <h4>Información profesional</h4>

      <div class="row">
        <div class="col-md-3 col-sm-6">
          <div class="form-group">
            <label>Profesión</label>
            <input type="text" class="form-control" placeholder="----------" v-model="profile.profesion" autocomplete="chrome-off">
          </div>
        </div>
        <div class="col-md-3 col-sm-6">
          <div class="form-group">
            <label>Especialidad</label>
            <input type="text" class="form-control" placeholder="---------" v-model="profile.especialidad" autocomplete="chrome-off">
          </div>
        </div>
        <div class="col-md-3 col-sm-6">
          <div class="form-group">
            <label>Cédula Profesional</label>
            <input type="text" class="form-control" placeholder="----------" v-model="profile.cedula_profesional" autocomplete="chrome-off">
          </div>
        </div>
        <div class="col-md-3 col-sm-6">
          <div class="form-group">
            <label>Compañía / Empresa</label>
            <input type="text" class="form-control" placeholder="" v-model="profile.company_name" autocomplete="chrome-off">
          </div>
        </div>
      </div>

      <div>
        <label>Habilidades</label>
        <br>
        <template v-for="(tag, index) in profile.skills">
          <a-tooltip v-if="tag.name.length > 20" :key="tag.name" :title="tag.name">
            <a-tag :key="tag.name" :closable="true" @close="() => handleClose(tag.name)">
              {{ `${tag.name.slice(0, 20)}...` }}
            </a-tag>
          </a-tooltip>
          <a-tag v-else :key="tag.name" :closable="true" @close="() => handleClose(tag.name)">
            {{ tag.name }}
          </a-tag>
        </template>
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
    </div>
    <div class="box_general_2 add_bottom_30">
      <h4>Información adicional</h4>
      <div class="form-group">
        <label>Cita</label>
        <input type="text" class="form-control" placeholder="Frase que te describa" v-model="profile.quote" autocomplete="chrome-off">
      </div>
      <div class="form-group">
        <label>Biografía</label>
        <a-textarea :autoSize="true" class="form-control" placeholder="Biografía" v-model="profile.biography" :rows="4"/>
      </div>
    </div>
    <div style="text-align: right;">
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
  import Addressess from './components/addressess'

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
      Addressess
    },
    data () {
      return {
        inputVisible: false,
        inputValue: '',
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
        }
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
      isProvider() {
        return this.user.role && this.user.role.is_provider
      },
      isClient() {
        return this.user.role && this.user.role.is_client
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
        this.$refs.registerForm.classList.add('was-validated')
        if ((this.user_pass.password != "" && this.matchPassword) || this.user_pass.password == '') {
          this.errors = []
          updateUser({
            ...this.profile,
            ...{
              bday: this.profile.bday && this.profile.bday.format('YYYY-MM-DD'),
              phone: (`${this.profile.phone||''}`).replace(/\D/g, ''),
            }, ...(this.user_pass.password != "" && this.matchPassword ? {
              password: this.user_pass.password,
              password_confirmation: this.user_pass.password,
            } : {})
          }, this.hasToken).then((response) => {
            this.profile.avatar = this.getUser.avatar = response.data.data.avatar
            this.saving = false
            this.$refs.registerForm.classList.remove('was-validated')
            this.user_pass.password = this.user_pass.confirmpassword = ''

            this.$notification.success({
              message: 'Datos guardados',
              description: 'Los datos del usuario han sido actulizados'
            })
          }).catch((error) => {
            this.saving = false
            this.errors = error.data.error
          })
        } else {
          this.saving = false  
        }
      },
      handleUpload(file) {
        this.profile.avatar = file
        return false
      },
      togglePassword(field) {
        if (field) {
          field.type = field.type == 'password' ? 'text' : 'password'
        }
      }
    },
    mounted() {
    }
  }
</script>
<style lang="scss">
  .PinturaRoot.PinturaRootComponent.pintura-editor {
    background: #f5f8fa;
    &:after {
      content: none;
    }
  }
  .ant-calendar-picker {
    width: 100%;
    .ant-input {
      border-color: #e1e8ed;
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
    .ant-form-item-label {
      line-height: 1;
      & > label {
        line-height: 1;
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
  }
</style>