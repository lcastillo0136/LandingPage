<template>
  <main>
    <div class="bg_color_2">
      <div class="container margin_60_35">
        <div id="login-2">
          <h1>Please login to Findoctor!</h1>
          <form>
            <div class="box_form clearfix">
              <div class="box_login">
                <a href="#0" class="social_bt facebook">Login with Facebook</a>
                <a href="#0" class="social_bt google">Login with Google</a>
                <a href="#0" class="social_bt linkedin">Login with Linkedin</a>
              </div>
              <div class="box_login last flipInX animated" v-if="!forgot.open">
                <div class="form-group">
                  <input type="email" class="form-control" placeholder="Your email address" v-model="form.username">
                </div>
                <div class="form-group">
                  <input type="password" class="form-control" placeholder="Your password" v-model="form.realPassword">
                  <a href="" class="forgot" @click.stop.prevent="openForgot"><small>Forgot password?</small></a>
                </div>
                <div class="form-group">
                  <input class="btn_1" type="submit" value="Login" @click.stop.prevent="handleLogin">
                </div>
              </div>
              <div class="box_login last flipInX animated" v-if="forgot.open">
                <div class="form-group">
                  <input type="email" class="form-control" placeholder="Your email address" v-model="form.username">
                  <a href="" class="forgot" @click.stop.prevent="closeForgot"><small>Back</small></a>
                </div>
                <div class="form-group">
                  <input class="btn_1" type="submit" value="Recover" @click.stop.prevent="handleRecover">
                </div>
              </div>
            </div>
          </form>
          <p class="text-center link_bright">Do not have an account yet? <router-link to="/register"><strong>Register now!</strong></router-link></p>
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
        this.$swal('Welcome user: ' + this.form.username, '', 'success')
      } else {
        this.$swal('Missing Information', '', 'error')
      }
    },
    handleRecover () {
      if (this.form.username !== '') {
        this.$swal('New password sended to ' + this.form.username, '', 'success')
      } else {
        this.$swal('Missing Information', '', 'error')
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
