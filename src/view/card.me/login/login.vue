<template>
  <div class="limiter">
    <div class="container-login100">
      <div class="login100-more" style="background-image: url('img/bg-01.jpg');"></div>
      <div class="wrap-login100 p-l-50 p-r-50 pt-5 p-b-50">
        <a-form-model class="login100-form validate-form" ref="loginForm" :rules="rules" :model="form" :loading="showLoading">
          <router-link :to="{ name: 'home' }">
            <img src="/img/logo.svg" style="max-height: 100px;max-width: 100%;" class="mb-3"/>
          </router-link>
          <span class="login100-form-title p-b-35">
            Inicio de sesion
          </span>

          <div class="w-100 clearfix">
            <div class="box_login last flipInX animated">
              <div class="">
                <a-form-model-item prop="username" label="Usuario">
                  <a-input type="email" :placeholder="$t('login.form.username')" v-model="form.username" size="large" :disabled="showLoading" />
                </a-form-model-item>
              </div>
              <div class="">
                <a-form-model-item prop="realPassword" label="Contraseña">
                  <a-input :type="passwordType" :placeholder="$t('login.form.password')" v-model="form.realPassword" size="large" ref="password1" :disabled="showLoading" :maxLength="20" >
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
            </div>
          </div>
          <div class="container-login100-form-btn">
            <a-button class="btn btn-primary rounded-lg text-white w-100" type="success" :loading="showLoading" @click.stop.prevent="handleLogin1" :disabled="!canLogin">
              Iniciar sesion
            </a-button>
          </div>
        </a-form-model>
      </div>
    </div>
  </div>
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
              callback(new Error('Favor de no dejar este campo vacío'));
            } else {
              callback();
            }
          }, trigger: 'change' }],
          realPassword: [{ validator: (rule, value, callback) => {
            if ((value === '' || !value) && !this.forgot.open) {
              callback(new Error('Favor de no dejar este campo vacío'));
            } else {
              callback();
            }
          }, trigger: 'change' }],
        },
        showLoading: false,
        passwordType: 'password',
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
      canLogin() {
        return this.form.username && this.form.realPassword
      },
    },
    methods: {
      ...mapActions([
        'handleLogin'
      ]),
      handleLogin1 () {
        this.showLoading = true
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
                  message: 'Inicio de sesión', 
                  description: `${_current_time} ${response.title || ''} ${response.first_name || ''} ${response.last_name || ''}`
                })

                if (this.returnPage) {
                  this.$router.push({
                    name: this.reference, 
                    params: { ...this.meta }
                  })
                } else {
                  this.$router.push({ name: 'profile-details' })
                }
                this.showLoading = false
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
                      message: 'No se encontró el usuario',
                      description: 'Favor de revisar su usuario o contraseña he intentar de nuevo.'
                    })
                    break;
                }
                this.showLoading = false
              });
            } else {
              this.$swal(this.$t('login.messages.error.missing_info'), '', 'error')
              this.showLoading = false
            }
          } else {
            this.showLoading = false
          }
        }).catch((error) => {
          this.showLoading = false
        });
      },
      handleRecover () {
        this.loading = true
        this.$refs.loginForm.validate().then(valid => {
          if (valid) {
            if (this.form.username !== '') {
              this.$notification.success({
                message: this.$t('login.messages.success.recover_send', { username: this.form.username }), 
                description: ''
              })
            } else {
              this.$notification.error({
                message: 'No se encontró el usuario',
                description: 'Favor de revisar su usuario o contraseña he intentar de nuevo.'
              })
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
      },
      togglePassword() {
        this.passwordType = this.passwordType == 'password' ? 'text' : 'password'
      },
    },
    mounted() {
      if (this.$route.params.page) {
        this.meta = this.$route.params.info
        this.reference = this.$route.params.page
        this.returnPage = true
      } else {
        this.meta = {}
        this.reference = {}
        this.returnPage = false
      }

      if (this.$route.query && this.$route.query.r) {
        this.reference = atob(this.$route.query.r)
        this.returnPage = true

        if (this.hasToken) {
          this.$router.replace({ name: this.reference })
        }
      } else if (this.hasToken) {
        this.$router.replace({ name: 'profile-details' })
      }
    }
  }
</script>

<style lang="scss">
  /*//////////////////////////////////////////////////////////////////
  [ Utility ]*/
  .txt1 {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-size: 15px;
    color: #999999;
    line-height: 1.4;
  }

  .txt2 {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-size: 15px;
    color: #666666;
    line-height: 1.4;
  }

  .txt3 {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-size: 16px;
    color: #666666;
    line-height: 1.4;
  }

  .hov1:hover {
    color: #c87ef0;
  }



  /*//////////////////////////////////////////////////////////////////
  [ login ]*/
  .limiter {
    width: 100%;
    margin: 0 auto;
  }

  .container-login100 {
    width: 100%;  
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    flex-wrap: wrap;
    height: 100%;
  }


  .wrap-login100 {
    width: 100%;
    max-width: 520px;
    min-height: 100vh;
    background: #fff;
    border-radius: 2px;
    position: relative;
    overflow: auto;
    max-height: 100%
  }

  /*------------------------------------------------------------------
  [ Login100 more ]*/
  .login100-more {
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: calc(100% - 520px);
    position: relative;
    z-index: 1;
  }

  .login100-more::before {
    content: "";
    display: block;
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: #e8519e;
    background: -webkit-linear-gradient(to top, #e8519e, #c77ff2);
    background: -o-linear-gradient(to top, #e8519e, #c77ff2);
    background: -moz-linear-gradient(to top, #e8519e, #c77ff2);
    background: linear-gradient(to top, #e8519e, #c77ff2);
    opacity: 0.8;
    background: linear-gradient(73deg, #fff 0%, #f9f9f9ef 22%, #f9f9f9 47%, #dbf0eb 81%);
  }

  /*==================================================================
  [ Form ]*/

  .login100-form {
    width: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .ant-form-item-label {
      line-height: 1.5;
      label {
        margin-bottom: 0
      }
    }
  }

  .login100-form-title {
    display: block;
    width: 100%;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-size: 39px;
    color: #333333;
    line-height: 1.2;
    text-align: left;
  }



  /*------------------------------------------------------------------
  [ Input ]*/

  .wrap-input100 {
    width: 100%;
    position: relative;
    border-bottom: 2px solid #dbdbdb;
    margin-bottom: 45px;
  }

  .label-input100 {
    font-family: Poppins-SemiBold;
    font-size: 18px;
    color: #999999;
    line-height: 1.2;
    padding-left: 2px;
  }

  .input100 {
    display: block;
    width: 100%;
    height: 50px;
    background: transparent;
    font-family: Poppins-Regular;
    font-size: 22px;
    color: #555555;
    line-height: 1.2;
    padding: 0 2px;
  }

  .focus-input100 {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
  }

  .focus-input100::before {
    content: "";
    display: block;
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;

    -webkit-transition: all 0.4s;
    -o-transition: all 0.4s;
    -moz-transition: all 0.4s;
    transition: all 0.4s;

    background: #d5007d;
    background: -webkit-linear-gradient(45deg, #d5007d, #e53935);
    background: -o-linear-gradient(45deg, #d5007d, #e53935);
    background: -moz-linear-gradient(45deg, #d5007d, #e53935);
    background: linear-gradient(45deg, #d5007d, #e53935);
  }


  .input100:focus + .focus-input100::before {
    width: 100%;
  }

  .has-val.input100 + .focus-input100::before {
    width: 100%;
  }

  /*==================================================================
  [ Restyle Checkbox ]*/

  .input-checkbox100 {
    display: none;
  }

  .label-checkbox100 {
    margin: 0;

    display: block;
    position: relative;
    padding-left: 26px;
    cursor: pointer;
  }

  .label-checkbox100 > span.check {
    font-size: 13px;
    color: transparent;

    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 2px;
    background: #e6e6e6;
    left: 0;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
  }

  .input-checkbox100:checked + .label-checkbox100 > span.check {
    color: #c87ef0;
  }

  /*------------------------------------------------------------------
  [ Button ]*/
  .container-login100-form-btn {
    width: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;

    .btn:not(.btn-outline-primary) {
      padding: 12px;
      height: auto;
      color: #212529;
      background-color: #54bd95;
      border-color: #54bd95;

      &:hover {
        color: #fff;
        background-color: #41a982;
        border-color: #3ea07b;
      }
    }
  }

  .wrap-login100-form-btn {
    display: block;
    position: relative;
    z-index: 1;
    border-radius: 25px;
    overflow: hidden;
  }

  .login100-form-bgbtn {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 300%;
    background: #e8519e;
    background: -webkit-linear-gradient(to bottom, #e8519e, #c77ff2, #e8519e, #c77ff2);
    background: -o-linear-gradient(to bottom, #e8519e, #c77ff2, #e8519e, #c77ff2);
    background: -moz-linear-gradient(to bottom, #e8519e, #c77ff2, #e8519e, #c77ff2);
    background: linear-gradient(to bottom, #e8519e, #c77ff2, #e8519e, #c77ff2);
    bottom: -100%;
    left: 0;

    -webkit-transition: all 0.4s;
    -o-transition: all 0.4s;
    -moz-transition: all 0.4s;
    transition: all 0.4s;
  }

  .login100-form-btn {
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    min-width: 244px;
    height: 50px;

    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-size: 16px;
    color: #fff;
    line-height: 1.2;
    outline: none !important;
    border: none;
    background: #0000;
    &:hover {
      color: #fff;
      background: #0000;
    }
  }

  .wrap-login100-form-btn:hover .login100-form-bgbtn {
    bottom: 0;
  }


  /*------------------------------------------------------------------
  [ Alert validate ]*/

  .validate-input {
    position: relative;
  }

  .alert-validate::before {
    content: attr(data-validate);
    position: absolute;
    max-width: 70%;
    background-color: #fff;
    border: 1px solid #c80000;
    border-radius: 2px;
    padding: 4px 30px 4px 10px;
    bottom: calc((100% - 25px) / 2);
    -webkit-transform: translateY(50%);
    -moz-transform: translateY(50%);
    -ms-transform: translateY(50%);
    -o-transform: translateY(50%);
    transform: translateY(50%);
    right: 2px;
    pointer-events: none;

    font-family: Poppins-Medium;
    color: #c80000;
    font-size: 14px;
    line-height: 1.4;
    text-align: left;

    visibility: hidden;
    opacity: 0;

    -webkit-transition: opacity 0.4s;
    -o-transition: opacity 0.4s;
    -moz-transition: opacity 0.4s;
    transition: opacity 0.4s;
  }

  .alert-validate::after {
    content: "\f06a";
    font-family: FontAwesome;
    display: block;
    position: absolute;
    color: #c80000;
    font-size: 18px;
    bottom: calc((100% - 25px) / 2);
    -webkit-transform: translateY(50%);
    -moz-transform: translateY(50%);
    -ms-transform: translateY(50%);
    -o-transform: translateY(50%);
    transform: translateY(50%);
    right: 8px;
  }

  .alert-validate:hover:before {
    visibility: visible;
    opacity: 1;
  }

  @media (max-width: 992px) {
    .alert-validate::before {
      visibility: visible;
      opacity: 1;
    }
  }

  .true-validate::after {
    content: "\f26b";
    font-family: Material-Design-Iconic-Font;
    font-size: 22px;
    color: #00ad5f;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: calc((100% - 25px) / 2);
    -webkit-transform: translateY(50%);
    -moz-transform: translateY(50%);
    -ms-transform: translateY(50%);
    -o-transform: translateY(50%);
    transform: translateY(50%);
    right: 5px;
  }

  /*//////////////////////////////////////////////////////////////////
  [ Responsive ]*/

  @media (max-width: 576px) {
    .wrap-login100 {
      padding-left: 15px;
      padding-right: 15px;
    }
  }
  #page {
    height: 100%;
    .limiter {
      height: 100%;
    }
  }
  .oxxo-modal {
    .Voucher {
      width: 443px;
      margin-left: auto;
      margin-right: auto;
      padding: 32px;
      border-radius: 6px;
      box-shadow: 0 0 0 1px hsl(0deg 0% 69% / 20%), 0 15px 35px 0 rgb(49 49 93 / 8%), 0 5px 15px 0 rgb(0 0 0 / 6%);
      background-color: #fff;
      @media only screen and (max-width: 450px) {
        padding: 16px;
      }
      &.generando-imagen {
        margin: 0;
      }
    }
    .OXXO-container {
      .Voucher-Logo {
        width: 100px;
        height: auto;
        margin-bottom: 24px
      }

      .Voucher-Logo--oxxo {
        width: 80px;
        margin: 0 0 16px
      }

      ol {
        -webkit-padding-start: 1.2em;
        padding-inline-start:1.2em
      }
      .spacing-8 {
        margin: -4px;
        &>.flex-fill {
          padding: 4px;
        }
      }
      .Text {
        margin: 0;
      }
      .Text-fontSize--11 {
        font-size: 11px;
      }
      .Text-fontSize--14 {
        font-size: 14px;
      }
      .Text-fontSize--36 {
        font-size: 36px;
      }
      .Text-fontWeight--500 {
        font-weight: 500;
      }
      .Text-fontWeight--600 {
        font-weight: 600;
      }
      .Text-fontWeight--700 {
        font-weight: 700;
      }
      .Text-color--gray500 {
        color: #1a1a1a99;
      }
      .Text-color--gray800 {
        color: #1a1a1ae6;
      }
      .Text-color--gray900 {
        color: #1a1a1a;
      }
      .Text-color--orange {
        color: #bb5504;
      }

      .Tag {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        padding: 2px 4px;
        border-radius: 4px
      }

      .Tag-orange {
        background-color: #ffde92
      }

      .Tag-red {
        background-color: #fde2dd
      }


      .OXXO-barcode {
        -webkit-align-self: center;
        -ms-flex-item-align: center;
        -ms-grid-row-align: center;
        align-self: center;
        margin: 32px 0;
        text-align: center
      }

      .OXXO-instructions {
        font-size: 14px
      }

      .OXXO-instructions ol>li {
        margin: 0 0 1em
      }

      .OXXO-copyUrl,.OXXO-printInstructions {
        margin-top: 16px
      }

      .Link {
        text-decoration: none;
        cursor: pointer
      }

      .Link:focus {
        outline: 1px dotted rgba(26,26,26,.5)
      }

      .Link--primary {
        color: #0074d4
      }

      .Link--secondary {
        color: rgba(26,26,26,.5);
        text-decoration: underline
      }
      .HostedVoucherButton {
        width: 100%;
        border-radius: 4px;
        padding: 12px;
        min-height: 28px;
        font-weight: 400;
        font-size: 14px;
        box-shadow: 0 1px 1px 0 rgb(0 0 0 / 12%), 0 0 0 1px #5469d4, 0 2px 5px 0 rgb(60 66 87 / 8%);
        cursor: pointer;
        border: 0;
      }
    }
    @media only screen and (max-width: 450px) {
      padding: 16px;
    }
  }

</style>