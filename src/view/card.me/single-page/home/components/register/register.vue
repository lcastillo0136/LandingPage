<template>
  <b-modal id="register-1" ref="registerModal">
    <template #modal-header="{ cancel }">
      <img :src="appImage" style="max-height: 100px;"/>
      <h4>
        Comenzemos
        <small></small>
      </h4>
    </template>
    <a-form-model ref="registerForm" :rules="rules" :model="form">
      <div class="box_form clearfix">
        <div class="box_login last flipInX animated">
          <div class="">
            <a-form-model-item prop="first_name" label="Nombre">
              <a-input type="text" class="" placeholder="Nombre" v-model="form.first_name" size="large">
              </a-input>
            </a-form-model-item>
          </div>
          <div class="">
            <a-form-model-item prop="email" label="Correo electronico">
              <a-input type="email" class="" placeholder="Correo electronico" v-model="form.email" size="large">
                <template #prefix>
                  <b-icon-envelope></b-icon-envelope>
                </template>
              </a-input>
            </a-form-model-item>
          </div>
          <div class="">
            <a-form-model-item prop="realPassword" label="Contraseña">
              <a-input :type="passwordType" :placeholder="$t('login.form.password')" v-model="form.realPassword" size="large" ref="password1">
                <template #prefix>
                  <b-icon-key></b-icon-key>
                </template>
                <template #suffix>
                  <b-icon-eye-slash font-scale="1.5" @click.stop.prevent="togglePassword" v-if="passwordType =='password'"></b-icon-eye-slash>
                  <b-icon-eye font-scale="1.5" @click.stop.prevent="togglePassword" v-else></b-icon-eye>
                </template>
              </a-input>
            </a-form-model-item>
          </div>
          <div class="">
            <a-form-model-item prop="realPassword2" label="Confirmar contraseña">
              <a-input :type="passwordType2" placeholder="Confirmar contraseña" v-model="form.realPassword2" size="large">
                <template #prefix>
                  <b-icon-key></b-icon-key>
                </template>
                <template #suffix>
                  <b-icon-eye-slash font-scale="1.5" @click.stop.prevent="togglePassword2" v-if="passwordType2 =='password'"></b-icon-eye-slash>
                  <b-icon-eye font-scale="1.5" @click.stop.prevent="togglePassword2" v-else></b-icon-eye>
                </template>
              </a-input>
            </a-form-model-item>
          </div>
        </div>
      </div>
    </a-form-model>
    <template #modal-footer="{ ok, cancel, hide }">
      <a-button type="secondary" shape="round" class="btn_1" @click.stop.prevent="cancel">
        Cancelar
      </a-button>
      <a-button type="primary" shape="round" class="btn_1" :loading="showLoading" @click.stop.prevent="handleRegister">
        Registrar
      </a-button>
    </template>
  </b-modal>
</template>
<script>
  import { registerCustomer } from '@/api/data'
  import { getServerFile } from '@/libs/util'
  import { mapGetters, mapActions } from 'vuex'
  import * as $ from 'jquery'
  export default {
    name: 'RegisterForm',
    props: {
    },
    data () {
      return {
        form: {
          first_name: '',
          email: '',
          realPassword: '',
          realPassword2: ''
        },
        forgot: {
          open: false
        },
        showLoading: false,
        rules: {
          first_name: [{ validator: (rule, value, callback) => {
            if ((value === '' || !value)) {
              callback(new Error('Favor de no dejar este campo vacio'));
            } else {
              callback();
            }
          }, trigger: 'change' }],
          email: [{ validator: (rule, value, callback) => {
            if ((value === '' || !value)) {
              callback(new Error('Favor de no dejar este campo vacio'));
            } if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))) {
              callback(new Error('No es un correo valido'));
            }else {
              callback();
            }
          }, trigger: 'change' }],
          realPassword: [{ validator: (rule, value, callback) => {
            if ((value === '' || !value)) {
              callback(new Error('Favor de no dejar este campo vacio'));
            } else {
              callback();
            }
          }, trigger: 'change' }],
          realPassword2: [{ validator: (rule, value, callback) => {
            if ((value === '' || !value)) {
              callback(new Error('Favor de no dejar este campo vacio'));
            } if (value !== this.form.realPassword) {
              callback(new Error('Las contraseñas no coinciden'));
            }else {
              callback();
            }
          }, trigger: 'change' }],
        },
        complete: 'text',
        passwordType: 'text',
        passwordType2: 'text'
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
      handleRegister () {
        this.showLoading = true
        this.$refs.registerForm.validate().then(valid => {
          if (valid) {
            registerCustomer({
              email: this.form.email, 
              password: this.form.realPassword, 
              first_name: this.form.first_name,
              password_confirmation: this.form.realPassword2,
            }).then((response) => {
              this.showLoading = false
              if (response.data.success) {
                this.$swal(this.$t('register.messages.success.registered'), '', 'success').then(() => {
                  this.handleLogin({
                    userName: response.data.data.username, 
                    password: this.form.realPassword, 
                    remember: true
                  }).then(() => {
                    // this.$router.push({ name: 'profile' })
                    this.$refs.registerModal.hide()
                  }).catch((error) => {
                  });
                });   
              } else {  
              }
            }).catch((reason) => {
              
              this.showLoading = false
              if (reason.data.message) {
                this.$notification.error({
                  message: 'No se pudo crear el usuario',
                  description: this.$t(`errors.${reason.data.message}`)
                })
              } else if (reason.data.error) {
                Object.keys(reason.data.error).forEach((e) => {
                  this.$notification.error({
                    message: 'No se pudo crear el usuario',
                    description: this.$t(`errors.${e}.${reason.data.error[e][0]}`)
                  })
                });
              }
            })
          } else {
            this.showLoading = false
          }
        }).catch((error) => {
          this.showLoading = false
        });
      },
      togglePassword() {
        this.passwordType = this.passwordType == 'password' ? 'text' : 'password'
      },
      togglePassword2() {
        this.passwordType2 = this.passwordType2 == 'password' ? 'text' : 'password'
      },
    },
    mounted() {
      this.$nextTick().then(()=>{
        setTimeout(()=> {
          this.togglePassword2()
          this.togglePassword()
        }, 300)
      })
    }
  }
</script>
<style lang="scss">
  #register-1 {
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
        margin-bottom: 10px;
      }
    }
    &+.modal-backdrop {
      background-color: #00000085;
      backdrop-filter: blur(6px);
      opacity: inherit;
    }
  }
</style>