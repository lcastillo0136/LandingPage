<template>
  <main>
    <div class="bg_color_2">
      <div class="container margin_60_35">
        <div id="login">
          <h1>¡Inicia sesión en {{ appName }}!</h1>
          <div class="box_form">
            <form>
              <a href="#0" class="social_bt facebook" disabled>{{ $t('login.social.facebook') }}</a>
              <a href="#0" class="social_bt google" disabled>{{ $t('login.social.google') }}</a>
              <a href="#0" class="social_bt linkedin" disabled>{{ $t('login.social.linkedin') }}</a>
              <span>
                <small>* el registro y sesion por redes sociales no esta activo por el momento</small>
              </span>
              <div class="divider"><span>{{ $t('login.form.or') }}</span></div>
              <div class="form-group">
                <input type="email" class="form-control" :placeholder="$t('login.form.username')" v-model="form.username">
              </div>
              <template v-if="!forgot.open">
                <div class="form-group">
                  <input type="password" class="form-control" :placeholder="$t('login.form.password')" v-model="form.realPassword">
                </div>
                <a href="" @click.stop.prevent="openForgot"><small>{{ $t('login.form.forgot_question') }}</small></a>
                <div class="form-group text-center add_top_20">
                  <a-button type="primary" shape="round"  class="btn_1" :loading="loading" @click.stop.prevent="handleLogin1">
                    {{ $t('login.form.login') }}
                  </a-button>
                </div>
              </template>
              <template  v-if="forgot.open">
                <a href="#" @click.stop.prevent="closeForgot"><small>{{ $t('login.form.login_form') }}</small></a>
                <div class="form-group text-center add_top_20">
                  <input class="btn_1 medium" type="submit" :value="$t('login.form.recover')" @click.stop.prevent="handleRecover">
                </div>
              </template>
            </form>
          </div>
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
    name: 'Login2',
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
        returnPage: false
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
        if (this.form.username !== '' && this.form.realPassword !== '') {
          this.loading = true
          this.handleLogin({
            userName: this.form.username, 
            password: this.form.realPassword, 
            remember: true
          }).then(() => {
            this.$swal(this.$t('login.messages.success.welcome', { username: this.form.username }), '', 'success')
            if (this.returnPage) {
              this.$router.push({
                name: this.reference, 
                params: { ...this.meta }
              })
            } else {
              this.$router.push({ name: 'home' })
            }
            this.loading = false
          }).catch((error) => {
            this.$swal('No se encontro el usuario', '', 'error')
            this.loading = false
          });
        } else {
          this.$swal(this.$t('login.messages.error.missing_info'), '', 'error')
          this.loading = false
        }
      },
      handleRecover () {
        if (this.form.username !== '') {
          this.$swal(this.$t('login.messages.success.recover_send', { username: this.form.username }), '', 'success')
        } else {
          this.$swal(this.$t('login.messages.error.missing_info'), '', 'error')
        }
      },
      openForgot () {
        this.forgot.open = true
      },
      closeForgot () {
        this.forgot.open = false
      }
    },
    mounted () {
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