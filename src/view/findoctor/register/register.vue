<template>
  <main>
    <div class="bg_color_2">
      <div class="container margin_60_35">
        <div id="register">
          <h1>{{ $t('register.form.title') }}</h1>
          <div class="row justify-content-center">
            <div class="col-md-5">
              <form>
                <div class="box_form">
                  <div class="form-group">
                    <label>{{ $t('register.form.name.label') }}</label>
                    <input type="text" class="form-control" :placeholder="$t('register.form.name.placeholder')" v-model="form.firstname">
                  </div>
                  <div class="form-group">
                    <label>{{ $t('register.form.last_name.label') }}</label>
                    <input type="text" class="form-control" :placeholder="$t('register.form.last_name.placeholder')" v-model="form.lastname">
                  </div>
                  <div class="form-group">
                    <label>{{ $t('register.form.email.label') }}</label>
                    <input type="email" class="form-control" :placeholder="$t('register.form.email.placeholder')" v-model="form.email">
                  </div>
                  <div class="form-group">
                    <label>{{ $t('register.form.password.label') }}</label>
                    <input type="password" class="form-control" id="password1" :placeholder="$t('register.form.password.placeholder')"  v-model="form.user.password">
                  </div>
                  <div class="form-group">
                    <label>{{ $t('register.form.confirm_password.label') }}</label>
                    <input type="password" class="form-control" id="password2" :placeholder="$t('register.form.confirm_password.placeholder')"  v-model="form.user.confirmpassword">
                  </div>
                  <div id="pass-info" class="clearfix"></div>
                  <div class="checkbox-holder text-left">
                    <div class="checkbox_2">
                      <input type="checkbox" value="accept_2" id="check_2" name="check_2" v-model="form.acceptTerms">
                      <label for="check_2"><span v-html="$t('register.form.agree_terms')"></span></label>
                    </div>
                  </div>
                  <div class="form-group text-center add_top_30">
                    <input class="btn_1" type="submit" :value="$t('register.form.send')" @click.stop.prevent="handleRegister">
                  </div>
                </div>
                <p class="text-center"><small>{{ $t('register.form.footer_tip') }}</small></p>
              </form>
            </div>
          </div>
          <!-- /row -->
        </div>
        <!-- /register -->
      </div>
    </div>
  </main>
  <!-- /main -->
</template>
<script>
  export default {
    name: 'Register',
    data () {
      return {
        form: {
          firstname: '',
          lastname: '',
          email: '',
          user: {
            password: '',
            confirmpassword: ''
          },
          acceptTerms: false
        }
      } 
    },
    methods: {
      handleRegister () {
        if (this.form.firstname !== '' && this.form.lastname !== '' && this.form.email !== '' && this.form.user.password !== '' && this.form.user.password === this.form.user.confirmpassword && this.form.acceptTerms) {
          this.$swal(this.$t('register.messages.success.registered'), '', 'success')
        } else {
          this.$swal(this.$t('register.messages.error.missing_info'), '', 'error')
        }
      }
    }
  }
</script>