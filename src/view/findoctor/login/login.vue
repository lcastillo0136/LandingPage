<template>
  <main>
    <div class="bg_color_2">
      <div class="container margin_60_35">
        <div id="login-2">
          <h1>¡Inicia sesión en {{ appName }}!</h1>
          <a-form-model ref="loginForm" :rules="rules" :model="form">
            <div class="box_form clearfix">
              <div class="box_login">
                <a href="#0" class="social_bt facebook" disabled>{{ $t('login.social.facebook') }}</a>
                <a href="#0" class="social_bt google" disabled>{{ $t('login.social.google') }}</a>
                <a href="#0" class="social_bt linkedin" disabled>{{ $t('login.social.linkedin') }}</a>
                <span>
                  <small>* el registro y sesion por redes sociales no esta activo por el momento</small>
                </span>
              </div>
              <div class="box_login last flipInX animated" v-if="!forgot.open">
                <div class="form-group">
                  <a-form-model-item prop="username">
                    <a-input type="email" class="form-control" :placeholder="$t('login.form.username')" v-model="form.username" />
                  </a-form-model-item>
                </div>
                <div class="form-group">
                  <a-form-model-item prop="realPassword">
                    <a-input type="password" class="form-control" :placeholder="$t('login.form.password')" v-model="form.realPassword" />
                    <a slot="help" href="" class="forgot" @click.stop.prevent="openForgot"><small>{{ $t('login.form.forgot_question') }}</small></a>
                  </a-form-model-item>
                </div>
                <div class="form-group">
                  <a-button type="primary" shape="round" class="btn_1" :loading="loading" @click.stop.prevent="handleLogin1">
                    {{ $t('login.form.login') }}
                  </a-button>
                </div>
              </div>
              <div class="box_login last flipInX animated" v-if="forgot.open">
                <div class="form-group">
                  <a-form-model-item prop="username">
                    <a-input type="email" class="form-control" :placeholder="$t('login.form.username')" v-model="form.username" />
                    <a slot="help" href="" class="forgot" @click.stop.prevent="closeForgot"><small>{{ $t('login.form.login_form') }}</small></a>
                  </a-form-model-item>
                </div>
                <div class="form-group">
                  <input class="btn_1" type="submit" :loading="loading" :value="$t('login.form.recover')" @click.stop.prevent="handleRecover">
                </div>
              </div>
            </div>
          </a-form-model>
          <p class="text-center link_bright">{{ $t('login.register.invitation') }} <router-link :to="{ name: 'register-doctor' }"><strong>{{ $t('login.register.now') }}</strong></router-link></p>
        </div>
        <!-- /login -->
      </div>
    </div>
  </main>
  <!-- /main -->
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    props: {
    },
    data () {
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
      }
    },
    computed: {
      ...mapGetters([
        'hasToken',
        'settings',
        'getUser'
      ]),
      password () {
        return new Array(this.form.realPassword.trim().length).fill('●').join('')
      },
      appName () {
        return this.settings?.COMPANY_NAME
      },
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
                  this.$router.push({ name: response.role.is_provider ? 'profile-details' : 'list-page' })
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
      handleRecover () {
        this.loading = true
        this.$refs.loginForm.validate().then(valid => {
          if (valid) {
            if (this.form.username !== '') {
              this.$swal(this.$t('login.messages.success.recover_send', { username: this.form.username }), '', 'success')
            } else {
              this.$swal(this.$t('login.messages.error.missing_info'), '', 'error')
            }
            this.loading = false
          } else {
            this.loading = false
          }
        }).catch((error) => {
          this.loading = false
        });
      },
      openForgot () {
        this.forgot.open = true
      },
      closeForgot () {
        this.forgot.open = false
      }
    },
    mounted() {
      if (this.hasToken) {
        this.$router.replace({ name: 'profile' })
      }
      if (this.$route.params.page) {
        this.meta = this.$route.params.info
        this.reference = this.$route.params.page
        this.returnPage = true
      } else {
        this.meta = {}
        this.reference = {}
        this.returnPage = false
      }
    }
  }
</script>

<style>
  .loading_btn {
    color: #ffffffa8;
  }

  .loading_btn:before {
    font-family: ElegantIcons;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation: load8 1.1s infinite linear;
    animation: load8 1.1s infinite linear;
    font-size: 1rem;
    color: #fff;
    content: "\e02d";
    vertical-align: middle;
    display: inline-block;
  }
</style>