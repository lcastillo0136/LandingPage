<template>
  <main>
    <div class="bg_color_2">
      <div class="container margin_60_35">
        <div id="login">
          <h1>{{ $t('login.form.title') }}</h1>
          <div class="box_form">
            <form>
              <a href="#0" class="social_bt facebook">{{ $t('login.social.facebook') }}</a>
              <a href="#0" class="social_bt google">{{ $t('login.social.google') }}</a>
              <a href="#0" class="social_bt linkedin">{{ $t('login.social.linkedin') }}</a>
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
                  <input class="btn_1 medium" type="submit" :value="$t('login.form.login')" @click.stop.prevent="handleLogin">
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
        }
      }
    },
    computed: {
      password () {
        return new Array(this.form.realPassword.trim().length).fill('●').join('')
      }
    },
    methods: {
      handleLogin () {
        if (this.form.username !== '' && this.form.password !== '') {
        this.$swal(this.$t('login.messages.success.welcome', { username: this.form.username }), '', 'success')
      } else {
        this.$swal(this.$t('login.messages.error.missing_info'), '', 'error')
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
    }
  }
</script>