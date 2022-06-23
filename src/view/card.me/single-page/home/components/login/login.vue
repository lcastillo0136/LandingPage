<template>
  <b-modal id="login-1" ref="loginModal">
    <template #modal-header="{ cancel }">
      <img :src="appImage" style="max-height: 100px;"/>
      <h4>
        Iniciar sesion
      </h4>
    </template>
    <a-form-model ref="loginForm" :rules="rules" :model="form">
      <div class="box_form clearfix">
        <div class="box_login last flipInX animated" v-if="!forgot.open">
          <div class="form-group">
            <a-form-model-item prop="username" label="Usuario o correo electronico">
              <a-input type="email" :placeholder="$t('login.form.username')" v-model="form.username" size="large">
                <template #prefix>
                  <b-icon-at font-scale="1"></b-icon-at>
                </template>
              </a-input>
            </a-form-model-item>
          </div>
          <div class="form-group">
            <a-form-model-item prop="realPassword" label="Contraseña">
              <a-input :type="passwordType" :placeholder="$t('login.form.password')" v-model="form.realPassword" size="large" ref="password">
                <template #prefix>
                  <b-icon-key></b-icon-key>
                </template>
                <template #suffix>
                  <b-icon-eye-slash font-scale="1.5" @click.stop.prevent="togglePassword" v-if="passwordType =='password'"></b-icon-eye-slash>
                  <b-icon-eye font-scale="1.5" @click.stop.prevent="togglePassword" v-else></b-icon-eye>
                </template>
              </a-input>
              <a slot="help" href="" class="forgot" @click.stop.prevent="openForgot"><small>{{ $t('login.form.forgot_question') }}</small></a>
            </a-form-model-item>
          </div>
        </div>
        <div class="box_login last flipInX animated" v-if="forgot.open">
          <div class="form-group">
            <a-form-model-item prop="username" label="Usuario o correo electronico">
              <a-input type="email" class="form-control" :placeholder="$t('login.form.username')" v-model="form.username" size="large"/>
              <a slot="help" href="" class="forgot" @click.stop.prevent="closeForgot"><small>{{ $t('login.form.login_form') }}</small></a>
            </a-form-model-item>
          </div>
        </div>
      </div>
    </a-form-model>
    <template #modal-footer="{ ok, cancel, hide }">
      <template  v-if="!forgot.open">
        <a-button type="secondary" shape="round" class="btn_1" @click.stop.prevent="cancel">
          Cancelar
        </a-button>
        <a-button type="primary" shape="round" class="btn_1" :loading="loading" @click.stop.prevent="handleLogin1">
          Entrar
        </a-button>
      </template>
      <template v-else>
        <a-button type="primary" shape="round" class="btn_1" :loading="loading" @click.stop.prevent="handleRecover">
          Recuperar
        </a-button>
      </template>
    </template>
  </b-modal>
</template>

<script>
  import { getServerFile } from '@/libs/util'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'Login',
    data() {
      return {
        form: {
          username: '',
          realPassword: ''
        },
        forgot: {
          open: false
        },
        loading: false,
        meta: {},
        reference: {},
        returnPage: false,
        rules: {
          username: [{ validator: (rule, value, callback) => {
            if ((value === '' || !value)) {
              callback(new Error('Favor de no dejar este campo vacio'));
            } else {
              callback();
            }
          }, trigger: 'change' }],
          realPassword: [{ validator: (rule, value, callback) => {
            if ((value === '' || !value) && !this.forgot.open) {
              callback(new Error('Favor de no dejar este campo vacio'));
            } else {
              callback();
            }
          }, trigger: 'change' }],
        },
        passwordType: 'password'
      }
    },
    computed: {
      ...mapGetters([
        'settings'
      ]),
      appName () {
        return this.settings?.COMPANY_NAME
      },
      appImage () {
        return getServerFile('public/company/company_logo.png')
      }
    },
    methods: {
      ...mapActions([
        'handleLogin'
      ]),
      handleLogin1 () {
        this.loading = true
        this.$refs.loginForm.validate().then(valid => {
          if (valid) {
            if (this.form.username !== '' && this.form.realPassword !== '') {
              this.handleLogin({
                userName: this.form.username, 
                password: this.form.realPassword, 
                remember: true
              }).then((response) => {
                let _current_time = this.$moment().isBetween(this.$moment().set({ hour: 6, minute: 0 }), this.$moment().set({ hour: 12, minute: 0 })) ? 'Buen dia' : (this.$moment().isBetween(this.$moment().set({ hour: 12, minute: 1 }), this.$moment().set({ hour: 18, minute: 30 })) ? 'Buenas tardes' : 'Buenas noches')
                this.$notification.success({
                  message: 'Inicio de sesion', 
                  description: `${_current_time} ${response.title || ''} ${response.first_name || ''} ${response.last_name || ''}`
                })

                if (this.returnPage) {
                  this.$router.push({
                    name: this.reference, 
                    params: { ...this.meta }
                  })
                } else {
                  // this.$router.push({ name: response.role.is_provider ? 'profile-details' : 'list-page' })
                  this.$refs.loginModal.hide()
                }
                this.loading = false
              }).catch((error) => {
                switch(error.data.message) {
                  case 'user_inactive':
                    this.$notification.error({
                      message: 'El usuario no se encuentra activo',
                      description: 'Favor de informar al administrador del sistema.'
                    })
                    break;
                  default:
                    this.$notification.error({
                      message: 'No se encontro el usuario',
                      description: 'Favor de revisar su usuario o contraseña he intentar de nuevo.'
                    })
                    break;
                }
                this.loading = false
              });
            } else {
              this.$swal(this.$t('login.messages.error.missing_info'), '', 'error')
              this.loading = false
            }
          } else {
            this.loading = false
          }
        }).catch((error) => {
          this.loading = false
        });
      },
      togglePassword() {
        this.passwordType = this.passwordType == 'password' ? 'text' : 'password'
      },
      openForgot () {
        this.forgot.open = !this.forgot.open
      },
      closeForgot () {
        this.forgot.open = !this.forgot.open
      }
    }
  }
</script>
<style lang="scss">
  #login-1 {
    .modal-content {
      background: #dbf0eb;
      background: linear-gradient(119deg, #dbf0eb 0%, #f9f9f9ef 32%, #f9f9f9 66%, #dbf0eb 100%);
    }
    .modal-header {
      border-bottom: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 1rem 2rem 0;
      h3 {
        font-weight: bold;
      }
    }
    .modal-body {
      label {
        margin-bottom: 0;
      }
      .ant-form-item-label {
        line-height: 1.5;
      }
      .ant-form-item {
        margin-bottom: 0;
      }
    }
    &+.modal-backdrop {
      background-color: #00000085;
      backdrop-filter: blur(6px);
      opacity: inherit;
    }
  }
</style>