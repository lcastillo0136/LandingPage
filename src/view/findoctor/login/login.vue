<template>
  <main>
    <div class="bg_color_2">
      <div class="container margin_60_35">
        <div id="login-2">
          <h1>{{ $t('login.form.title') }}</h1>
          <form>
            <div class="box_form clearfix">
              <div class="box_login">
                <a href="#0" class="social_bt facebook">{{ $t('login.social.facebook') }}</a>
                <a href="#0" class="social_bt google">{{ $t('login.social.google') }}</a>
                <a href="#0" class="social_bt linkedin">{{ $t('login.social.linkedin') }}</a>
              </div>
              <div class="box_login last flipInX animated" v-if="!forgot.open">
                <div class="form-group">
                  <input type="email" class="form-control" :placeholder="$t('login.form.username')" v-model="form.username">
                </div>
                <div class="form-group">
                  <input type="password" class="form-control" :placeholder="$t('login.form.password')" v-model="form.realPassword">
                  <a href="" class="forgot" @click.stop.prevent="openForgot"><small>{{ $t('login.form.forgot_question') }}</small></a>
                </div>
                <div class="form-group">
                  <input class="btn_1" type="submit" :value="$t('login.form.login')" @click.stop.prevent="handleLogin">
                </div>
              </div>
              <div class="box_login last flipInX animated" v-if="forgot.open">
                <div class="form-group">
                  <input type="email" class="form-control" :placeholder="$t('login.form.username')" v-model="form.username">
                  <a href="" class="forgot" @click.stop.prevent="closeForgot"><small>{{ $t('login.form.login_form') }}</small></a>
                </div>
                <div class="form-group">
                  <input class="btn_1" type="submit" :value="$t('login.form.recover')" @click.stop.prevent="handleRecover">
                </div>
              </div>
            </div>
          </form>
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
