<template>
  <div v-if="profile">
    <div class="box_general_2 add_bottom_45">
      <h4>Datos personales</h4>
      <div class="row">
        <div class="col-md-3 col-sm-12">
          <div class="form-group">
            <label>Titulo</label>
            <select v-model="profile.title" class="form-control" >
              <option value="">&nbsp;</option>
              <option value="Dr.">
                Dr. (Doctor)
              </option>
              <option value="Esq.">
                Esq. (Esquire)
              </option>
              <option value="Hon.">
                Hon. (Honorable)
              </option>
              <option value="Jr.">
                Jr. (Junior)
              </option>
              <option value="Mr.">
                Mr.
              </option>
              <option value="Mrs.">
                Mrs.
              </option>
              <option value="Ms.">
                Ms.
              </option>
              <option value="Msgr.">
                Msgr. (Monsignor)
              </option>
              <option value="Prof.">
                Prof. (Professor)
              </option>
              <option value="Rev.">
                Rev. (Reverend)
              </option>
              <option value="Rt. Hon.">
                Rt. Hon. (Right Honorable)
              </option>
              <option value="Sr.">
                Sr. (Senior)
              </option>
              <option value="St.">
                St. (Saint)
              </option>
            </select>
          </div>
        </div>
        <div class="col-md-5 col-sm-6">
          <div class="form-group">
            <label>Nombre(s)</label>
            <input type="text" class="form-control" placeholder="Tu nombre" v-model="profile.first_name" autocomplete="chrome-off">
          </div>
        </div>
        <div class="col-md-4 col-sm-6">
          <div class="form-group">
            <label>Apellido(s)</label>
            <input type="text" class="form-control" placeholder="Tu apelido" v-model="profile.last_name" autocomplete="chrome-off">
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-3 col-sm-6">
          <div class="form-group">
            <label>Telefono</label>
            <input type="text" class="form-control" placeholder="Tel." v-model="profile.phone" autocomplete="chrome-off">
          </div>
        </div>
        <div class="col-md-5 col-sm-6">
          <div class="form-group">
            <label>Correo electronico</label>
            <input type="text" class="form-control" placeholder="Correo electronico" v-model="profile.email" autocomplete="chrome-off">
          </div>
        </div>
        <div class="col-md-4 col-sm-6">
          <div class="form-group">
            <label>Fecha nacimiento</label>
            <a-date-picker v-model="profile.bday" size="large" />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-3">
          <div class="form-group">
            <label>Genero</label>
            <select v-model="profile.gender" class="form-control">
              <option value="">&nbsp;</option>
              <option value="male">
                Masculino
              </option>
              <option value="female">
                Femenino
              </option>
              <option value="other">
                Otro
              </option>
              <option value="not_sure">
                No estoy seguro
              </option>
              <option value="rather_not_say">
                Prefiero no decir
              </option>
            </select>
          </div>
        </div>
        <div class="col-md-7" style="padding-top: 23px;">

          <a-form-model-item help="*Hay que guardar para que se reflejen los cambios en el sitio">
            <a-upload name="file" :multiple="false" accept="image/*" :showUploadList="false" size="large" :beforeUpload="handleUpload">
              <a-button> <a-icon type="upload" /> Cambiar imagen de perfil </a-button>
            </a-upload>
          </a-form-model-item>
        </div>
      </div>
    </div>

    <div class="box_general_2 add_bottom_45">
      <h4>Informacion de cuenta</h4>
      <form ref="registerForm">
        <div class="row">
          <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <label>Usuario</label>
              <input type="text" class="form-control" placeholder="Usuario" :value="profile.username" autocomplete="off" disabled>
            </div>
          </div>
          <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <label>Contraseña</label>
              <div class="hideShowPassword-wrapper">
                <input type="password" class="form-control" placeholder="Contraseña" v-model="user_pass.password" autocomplete="off" ref="password">

                <button type="button" role="button" aria-label="Mostrar contraseña" title="Mostra contraseña" tabindex="0" class="my-toggle hideShowPassword-toggle-show" aria-pressed="false" @click.stop.prevent="togglePassword($refs.password);user_pass.passwordVisible=true" v-if="!user_pass.passwordVisible">Mostrar</button>

                <button type="button" role="button" aria-label="Ocultar contraseña" title="Ocultar contraseña" tabindex="0" class="my-toggle hideShowPassword-toggle-show" aria-pressed="false" @click.stop.prevent="togglePassword($refs.password);user_pass.passwordVisible=false" v-else>Ocultar</button>
              </div>
            </div>
          </div>
          <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <label>Confirmar contraseña</label>
              <div class="hideShowPassword-wrapper">
                <input type="password" class="form-control" placeholder="Confirmar contraseña" v-model="user_pass.confirmpassword" autocomplete="off" ref="confirmpassword">
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
      <h4>Informacion profesional</h4>

      <div class="row">
        <div class="col-md-6 col-sm-6">
          <div class="form-group">
            <label>Cedula Profesional</label>
            <input type="text" class="form-control" placeholder="----------" v-model="profile.cedula_profesional" autocomplete="chrome-off">
          </div>
        </div>
        <div class="col-md-6 col-sm-6">
          <div class="form-group">
            <label>Especialidad</label>
            <input type="text" class="form-control" placeholder="---------" v-model="profile.especialidad" autocomplete="chrome-off">
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
      <h4>Informacion adicional</h4>
      <div class="form-group">
        <label>Cita</label>
        <input type="text" class="form-control" placeholder="Frase que te describa" v-model="profile.quote" autocomplete="chrome-off">
      </div>
      <div class="form-group">
        <label>Biografia</label>
        <a-textarea :autoSize="true" class="form-control" placeholder="Biografia" v-model="profile.biography" :rows="4"/>
      </div>
    </div>
    <div style="text-align: right;">
      <a-button type="primary" size="large" @click="handleSave" :loading="saving" :disabled="!matchPassword">Guardar</a-button>
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
        errors: []
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
          updateUser({
            ...this.profile,
            ...{
              bday: this.profile.bday && this.profile.bday.format('YYYY-MM-DD'),
              phone: (this.profile.phone||'').replace(/\D/g, ''),
            }, ...(this.user_pass.password != "" && this.matchPassword ? {
              password: this.user_pass.password,
              password_confirmation: this.user_pass.password,
            } : {})
          }, this.hasToken).then((response) => {
            this.profile.avatar = this.getUser.avatar = response.data.data.avatar
            this.saving = false
            this.$refs.registerForm.classList.remove('was-validated')
            this.user_pass.password = this.user_pass.confirmpassword = ''
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
</style>