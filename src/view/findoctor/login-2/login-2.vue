<template>
  <main>
    <div class="bg_color_2">
      <div class="container margin_60_35">
        <div id="login">
          <h1>Please login to Findoctor!</h1>
          <div class="box_form">
            <form>
              <a href="#0" class="social_bt facebook">Login with Facebook</a>
              <a href="#0" class="social_bt google">Login with Google</a>
              <a href="#0" class="social_bt linkedin">Login with Linkedin</a>
              <div class="divider"><span>Or</span></div>
              <div class="form-group">
                <input type="email" class="form-control" placeholder="Your email address" v-model="form.username">
              </div>
              <template v-if="!forgot.open">
                <div class="form-group">
                  <input type="password" class="form-control" placeholder="Your password" v-model="form.realPassword">
                </div>
                <a href="" @click.stop.prevent="openForgot"><small>Forgot password?</small></a>
                <div class="form-group text-center add_top_20">
                  <input class="btn_1 medium" type="submit" value="Login" @click.stop.prevent="handleLogin">
                </div>
              </template>
              <template  v-if="forgot.open">
                <a href="#" @click.stop.prevent="closeForgot"><small>Back</small></a>
                <div class="form-group text-center add_top_20">
                  <input class="btn_1 medium" type="submit" value="Recover" @click.stop.prevent="handleRecover">
                </div>
              </template>
            </form>
          </div>
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