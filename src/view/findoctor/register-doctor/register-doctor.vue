<template>
  <main>

    <loading-general :loading="showLoading"></loading-general>
    <div id="hero_register">
      <div class="container margin_120_95">     
        <div class="row">
          <div class="col-lg-6">
            <h1>{{ $t('register_doctor.form.title') }}</h1>
            <p class="lead">A travez de nuestros servicios puedes llegar a concretar citas de tus servicios con tus pacientes de manera facil y segura</p>
            <div class="box_feat_2">
              <i class="pe-7s-map-2"></i>
              <h3>{{ $t('register_doctor.form.content.box_1.title') }}</h3>
              <p>Gracias a nuestro buscador basado en la posicion del paciente es mas facil de ubicar al medico mas cercano</p>
            </div>
            <div class="box_feat_2">
              <i class="pe-7s-date"></i>
              <h3>{{ $t('register_doctor.form.content.box_2.title') }}</h3>
              <p>Con el administrador de citas podras prevenir que se agenden dos o mas citas en el mismo horario</p>
            </div>
            <div class="box_feat_2">
              <i class="pe-7s-phone"></i>
              <h3>{{ $t('register_doctor.form.content.box_3.title') }}</h3>
              <p>Nuestro sistema esta desarrollado para ajustarse a la comodidad de dispositivos moviles</p>
            </div>
          </div>
          <!-- /col -->
          <div class="col-lg-5 ml-auto">
            <div class="box_form">
              <form ref="registerForm">

                <div class="row">
                  <div class="col-md-6 ">
                    <div class="form-group">
                      <input type="text" class="form-control" :placeholder="$t('register_doctor.form.name')" v-model="form.firstname" required>
                      <div class="invalid-feedback">
                        {{ $t('register.messages.error.empty_name') }}
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <input type="text" class="form-control" :placeholder="$t('register_doctor.form.last_name')" v-model="form.lastname" required>
                      <div class="invalid-feedback">
                        {{ $t('register.messages.error.empty_name') }}
                      </div>
                    </div>
                  </div>
                </div>
                <!-- /row -->
                <div class="row">
                  <div class="col-lg-12">
                    <div class="form-group">
                      <v-select v-model="form.specialization" taggable class="form-control chosen" required :class="{'is-invalid': !form.specialization && validated, 'is-valid': form.specialization && validated }" :options="specializations"/>
                      <div class="invalid-feedback">
                        {{ $t('register.messages.error.empty_name') }}
                      </div>
                      <small class="blockquote-footer">Si tu especialidad no aparece en la lista puedes agregarla precionando tu tecla <i>Enter</i></small>
                    </div>
                  </div>
                </div>
                <!-- /row -->
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <input type="text" class="form-control" :placeholder="$t('register_doctor.form.city')" v-model="form.city" required>
                      <div class="invalid-feedback">
                        {{ $t('register.messages.error.empty_name') }}
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <select class="form-control" v-model="form.country" required>
                        <option value="">{{ $t('register_doctor.form.country') }}</option>
                        <option value="Europa">Europa</option>
                        <option value="United states">United states</option>
                        <option value="México">México</option>
                        <option value="Canada">Canada</option>
                      </select>
                      <div class="invalid-feedback">
                        {{ $t('register.messages.error.empty_name') }}
                      </div>
                    </div>
                  </div>
                </div>
                <!-- /row -->
                <div class="row">
                  <div class="col-lg-12">
                    <div class="form-group">
                      <input type="text" class="form-control" :placeholder="$t('register_doctor.form.address')" v-model="form.address" required>
                      <div class="invalid-feedback">
                        {{ $t('register.messages.error.empty_name') }}
                      </div>
                    </div>
                  </div>
                </div>
                <!-- /row -->
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <input type="text" class="form-control" :placeholder="$t('register_doctor.form.mobile_phone')" v-model="form.phone.mobile" required>
                      <div class="invalid-feedback">
                        {{ $t('register.messages.error.empty_name') }}
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <input type="text" class="form-control" :placeholder="$t('register_doctor.form.office_phone')" v-model="form.phone.office">
                    </div>
                  </div>
                </div>
                <!-- /row -->
                <div class="row">
                  <div class="col-lg-12">
                    <div class="form-group">
                      <input type="text" class="form-control" :placeholder="$t('register_doctor.form.email_address')" v-model="form.email" required autocomplete="off">
                      <div class="invalid-feedback">
                        {{ $t('register.messages.error.empty_name') }}
                      </div>
                    </div>
                  </div>
                </div>
                <!-- /row -->


                <!-- /row -->
                <div class="row">
                  <div class="col-lg-12">
                    <div class="form-group">
                      <label>{{ $t('register.form.password.label') }}</label>
                      
                      <div class="hideShowPassword-wrapper">
                        <input type="password" class="form-control" autocomplete="off" :placeholder="$t('register.form.password.placeholder')"  v-model="form.user.password" ref="password" required>
                        
                        <button type="button" role="button" aria-label="Mostrar contraseña" title="Mostra contraseña" tabindex="0" class="my-toggle hideShowPassword-toggle-show" aria-pressed="false" @click.stop.prevent="togglePassword($refs.password);form.user.passwordVisible=true" v-if="!form.user.passwordVisible">Mostrar</button>

                        <button type="button" role="button" aria-label="Ocultar contraseña" title="Ocultar contraseña" tabindex="0" class="my-toggle hideShowPassword-toggle-show" aria-pressed="false" @click.stop.prevent="togglePassword($refs.password);form.user.passwordVisible=false" v-else>Ocultar</button>

                        <div class="invalid-feedback">
                          {{ $t('register.messages.error.empty_password') }}
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <label>{{ $t('register.form.confirm_password.label') }}</label>
                      <div class="hideShowPassword-wrapper">
                        <input type="password" class="form-control" :placeholder="$t('register.form.confirm_password.placeholder')"  v-model="form.user.confirmpassword" ref="confirmpassword" required autocomplete="off">
                        
                        <button type="button" role="button" aria-label="Mostrar contraseña" title="Mostra contraseña" tabindex="0" class="my-toggle hideShowPassword-toggle-show" aria-pressed="false" @click.stop.prevent="togglePassword($refs.confirmpassword);form.user.password2Visible=true" v-if="!form.user.password2Visible">Mostrar</button>

                        <button type="button" role="button" aria-label="Ocultar contraseña" title="Ocultar contraseña" tabindex="0" class="my-toggle hideShowPassword-toggle-show" aria-pressed="false" @click.stop.prevent="togglePassword($refs.confirmpassword);form.user.password2Visible=false" v-else>Ocultar</button>

                        <div class="invalid-feedback" v-if="form.user.confirmpassword">
                          {{ $t('register.messages.error.incorrect_password') }}
                        </div>
                        <div class="invalid-feedback" v-if="!form.user.confirmpassword">
                          {{ $t('register.messages.error.empty_password') }}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
                <!-- /row -->

                <div class="add_bottom_30"><input type="submit" class="btn_1" :value="$t('register_doctor.form.submit')" @click.stop.prevent="handleRegister"></div>
                <div class="text-center"><small>La informacion de tu registro sera enviada al correo electronico que nos proporciones.</small></div>
              </form>
            </div>
            <!-- /box_form -->
          </div>
          <!-- /col -->
        </div>
        <!-- /row -->
      </div>
      <!-- /container -->
    </div>
    <!-- /hero_register -->
  </main>
  <!-- /main -->
</template>
<script>
  import { registerProvider, getSpecialitiesList } from '@/api/data'
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  import LoadingGeneral from '@/components/loading-general'

  export default {
    name: 'RegisterDoctor',
    components: {
      LoadingGeneral
    },
    data () {
      return {
        specializations: [],
        form: {
          firstname: '',
          lastname: '',
          specialization: '',
          city: '',
          address: '',
          country: '',
          user: {
            password: '',
            confirmpassword: '',
            passwordVisible: false,
            password2Visible: false
          },
          phone: {
            mobile: '',
            office: ''
          },
          email: ''
        },
        showLoading: false,
        validated: false
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
      ...mapGetters([
        'container',
        'settings'
      ]),
      matchPassword() {
        return `${this.form.user.confirmpassword}`.match(`^${this.form.user.password}$`);
      },
      appName () {
        return this.settings?.COMPANY_NAME
      },
    },
    methods: {
      ...mapActions([
        'handleLogin'
      ]),
      handleRegister () {
        this.showLoading = true
        this.validated = true
        this.$refs.registerForm.classList.add('was-validated')
        if (this.$refs.registerForm.checkValidity()) {
            registerProvider({
              email: this.form.email, 
              password: this.form.user.password, 
              first_name: this.form.firstname, 
              last_name: this.form.lastname,
              especialidad: this.form.specialization,
              addresses: JSON.stringify([{
                favorite: true,
                city: this.form.city,
                street: this.form.address,
                country: this.form.country
              }]),
              phone: (this.form.phone.mobile||'').replace(/\D/g, ''),
              tel_oficina: (this.form.phone.office||'').replace(/\D/g, '')
            }).then((response) => {
              this.showLoading = false
              if (response.data.success) {
                this.$swal(this.$t('register.messages.success.registered'), '', 'success').then(() => {
                  this.handleLogin({
                    userName: response.data.data.username, 
                    password: this.form.user.password, 
                    remember: true
                  }).then(() => {
                    this.$router.push({ name: 'profile-details' })
                  }).catch((error) => {
                  });
                });
              } else {
              }
            }).catch((reason) => {
              this.showLoading = false
              this.$swal(this.$t('register.messages.error.' + reason.message), '', 'error')  
            })
        } else {
          this.showLoading = false  
        }
      },
      togglePassword(field) {
        if (field) {
          field.type = field.type == 'password' ? 'text' : 'password'
        }
      }
    },
    mounted () {
      getSpecialitiesList({
        limit: 1000
      }).then((response) => response.data).then((response) => {
        this.specializations = response.data.specialities.map(s => s.name)
      })
    }
  }
</script>
<style lang="scss">
  #hero_register {
    .chosen {
      --vs-border-width: 0px;
      .vs__dropdown-toggle   {
        padding: 0
      }
    }
    .blockquote-footer {
      &:before {
        content: '* ';
      }
    }
  }
</style>