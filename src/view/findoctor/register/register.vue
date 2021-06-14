<template>
  <main>

    <loading-general :loading="showLoading"></loading-general>

    <div class="bg_color_2">
      <div class="container margin_60_35">
        <div id="register">
          <h1>{{ $t('register.form.title') }}</h1>
          <div class="row justify-content-center">
            <div class="col-md-5">
              <form ref="registerForm">
                <div class="box_form">
                  <div class="form-group">
                    <label>{{ $t('register.form.name.label') }}</label>
                    <input type="text" class="form-control" :placeholder="$t('register.form.name.placeholder')" v-model="form.firstname" required>
                    <div class="invalid-feedback">
                      {{ $t('register.messages.error.empty_name') }}
                    </div>
                  </div>
                  <div class="form-group">
                    <label>{{ $t('register.form.last_name.label') }}</label>
                    <input type="text" class="form-control" :placeholder="$t('register.form.last_name.placeholder')" v-model="form.lastname">
                  </div>
                  <div class="form-group">
                    <label>{{ $t('register.form.email.label') }}</label>
                    <input type="email" class="form-control" :placeholder="$t('register.form.email.placeholder')" v-model="form.email" required  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$">
                    <div class="invalid-feedback" v-if="form.email == ''">
                      {{ $t('register.messages.error.empty_email') }}
                    </div>
                    <div class="invalid-feedback" v-if="form.email != ''">
                      {{ $t('register.messages.error.invalid_email') }}
                    </div>
                  </div>
                  <div class="form-group">
                    <label>{{ $t('register.form.password.label') }}</label>
                    
                    <div class="hideShowPassword-wrapper">
                      <input type="password" class="form-control" id="password1" :placeholder="$t('register.form.password.placeholder')"  v-model="form.user.password" ref="password" required>
                      <button type="button" role="button" aria-label="Show Password" title="Show Password" tabindex="0" class="my-toggle hideShowPassword-toggle-show" aria-pressed="false" @click.stop.prevent="togglePassword($refs.password)">Show</button>
                      <div class="invalid-feedback">
                        {{ $t('register.messages.error.empty_password') }}
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label>{{ $t('register.form.confirm_password.label') }}</label>
                    <div class="hideShowPassword-wrapper">
                      <input type="password" class="form-control" id="password2" :placeholder="$t('register.form.confirm_password.placeholder')"  v-model="form.user.confirmpassword" ref="confirmpassword" required>
                      <button type="button" role="button" aria-label="Show Password" title="Show Password" tabindex="0" class="my-toggle hideShowPassword-toggle-show" aria-pressed="false" @click.stop.prevent="togglePassword($refs.confirmpassword)">Show</button>
                      <div class="invalid-feedback" v-if="form.user.confirmpassword">
                        {{ $t('register.messages.error.incorrect_password') }}
                      </div>
                      <div class="invalid-feedback" v-if="!form.user.confirmpassword">
                        {{ $t('register.messages.error.empty_password') }}
                      </div>
                    </div>
                  </div>
                  <div id="pass-info" class="clearfix"></div>
                  <div class="checkbox-holder text-left">
                    <div class="checkbox_2">
                      <input type="checkbox" value="accept_2" id="check_2" name="check_2" v-model="form.acceptTerms" required>
                      <label for="check_2">
                        <span v-html="$t('register.form.agree_terms')"></span>
                        <div class="invalid-feedback">
                          {{ $t('register.messages.error.please_accept_terms') }}
                        </div>
                      </label>
                      
                    </div>
                  </div>
                  <div class="form-group text-center add_top_30">
                    <input class="btn_1" type="submit" :value="$t('register.form.send')" @click.stop.prevent="handleRegister">
                  </div>
                </div>
                <p class="text-center">
                  <small>{{ $t('register.form.footer_tip') }}</small>
                </p>
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
  import { registerCustomer } from '@/api/data'
  import LoadingGeneral from '@/components/loading-general'

  export default {
    name: 'Register',
    components: {
      LoadingGeneral
    },
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
        },
        showLoading: false
      } 
    },
    watch: {
      'form.user':{
        deep: true,
        handler() {
          if (this.form.user.password != this.form.user.confirmpassword) {
            this.$refs.confirmpassword.setCustomValidity("Invalid field")
          } else {
            this.$refs.confirmpassword.setCustomValidity("")
          }
        }
      }
    },
    computed: {
      matchPassword() {
        return `${this.form.user.confirmpassword}`.match(`^${this.form.user.password}$`);
      }
    },
    methods: {
      handleRegister () {
        this.showLoading = true
        this.$refs.registerForm.classList.add('was-validated')
        if (this.$refs.registerForm.checkValidity()) {
            registerCustomer({
              email: this.form.email, 
              password: this.form.user.password, 
              first_name: this.form.firstname, 
              last_name: this.form.lastname
            }).then((response) => {
              if (response.data.success) {
                this.$swal(this.$t('register.messages.success.registered'), '', 'success').then(() => {
                  this.$router.push('/')
                });   
              } else {
                this.showLoading = false
                // this.$swal(this.$t('register.messages.error.missing_info'), '', 'error')    
              }
            }).catch((reason) => {
              this.showLoading = false
              this.$swal(this.$t('register.messages.error.' + reason.message), '', 'error')  
            })            
        } else {
          this.showLoading = false
          // this.$swal(this.$t('register.messages.error.missing_info'), '', 'error')
        }
      },
      togglePassword(field) {
        if (field) {
          field.type = field.type == 'password' ? 'text' : 'password'
        }
      }
    }
  }
</script>