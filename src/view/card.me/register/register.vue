<template>
  <div class="limiter">
    <div class="container-login100">
      <div class="login100-more" style="background-image: url('img/bg-01.jpg');"></div>
      <div class="wrap-login100 p-l-50 p-r-50 p-t-72 p-b-50">
        <a-form-model class="login100-form validate-form" ref="registerForm" :rules="rules" :model="form">
          <span class="login100-form-title p-b-35">
            Sign Up
          </span>
          <div class="w-100 clearfix">
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
            <DetailsPayment v-model="account" :loading="showLoading"></DetailsPayment>
            <div class="flex-m w-full p-b-33">
              <div class="contact100-form-checkbox">
                <input class="input-checkbox100" id="ckb1" type="checkbox" name="remember-me" v-model="policyTerms">
                <label class="label-checkbox100" for="ckb1">
                  <span class="check"><b-icon-check-2 font-scale="1.2"></b-icon-check-2></span>
                  <span class="txt1">
                    Estoy de acuerdo con los
                    <router-link :to="{ path: '/terminos-y-condiciones' }"class="txt2 hov1">
                      Términos de Usuario
                    </router-link>
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div class="container-login100-form-btn">
            <template v-if="account.methodSelected !== 4">
              <a-button class="btn btn-primary rounded-lg text-white w-100" type="success" :loading="showLoading" @click.stop.prevent="handleRegister" :disabled="!canPay">
                Registrar y Pagar
              </a-button>
            </template>
            <template v-else>
              <div id="paypal-button-container" class="w-100"></div>
              <small>Pagar con paypal y registrarse</small>
            </template>
          </div>
        </a-form-model>
      </div>
    </div>
  </div>
</template>
<script>
  import { registerCustomer, postOrder, getProduct } from '@/api/data'
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  import LoadingGeneral from '@/components/loading-general'
  import DetailsPayment from './components/details-payment'
  import * as conekta from '@/libs/conekta'

  export default {
    name: 'Register',
    components: {
      LoadingGeneral,
      DetailsPayment
    },
    data() {
      return {
        form: {
          first_name: '',
          email: '',
          realPassword: '',
          realPassword2: '',
          user_id: ''
        },
        account: {
          name: '',
          card: '',
          expiration:  { month: '00', year: '00'},
          ccv: '',
          token: false,
          paypal: false,
          isValid: false,
          methodSelected: 0
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
            } if (value !== this.form.realPassword2 && this.form.realPassword2) {
              callback(new Error('Las contraseñas no coinciden'));
            } else {
              callback();
              if (this.form.realPassword == this.form.realPassword2) {
                this.$refs.registerForm.validateField('realPassword2')
              }
            }
          }, trigger: 'change' }],
          realPassword2: [{ validator: (rule, value, callback) => {
            if ((value === '' || !value)) {
              callback(new Error('Favor de no dejar este campo vacio'));
            } if (value !== this.form.realPassword) {
              callback(new Error('Las contraseñas no coinciden'));
            } else {
              callback();
            }
          }, trigger: 'change' }],
        },
        complete: 'text',
        passwordType: 'text',
        passwordType2: 'text',
        policyTerms: false,
        paypalready: false,
        product: null
      }
    },
    watch: {
      'form.user': {
        deep: true,
        handler() {
          if (this.form.user.password != this.form.user.confirmpassword) {
            this.$refs.confirmpassword.setCustomValidity("Invalid field")
          } else {
            this.$refs.confirmpassword.setCustomValidity("")
          }
        }
      },
      'account': {
        deep: true,
        handler () {
          if (this.account.methodSelected == 4 && this.canPay && !this.paypalready) {
            this.showPaypalButtons();
            this.paypalready = true
          } else if (this.account.methodSelected != 4 ) {
            this.paypalready = false
          }
        }
      },
      'policyTerms' () {
        if (this.account.methodSelected == 4 && this.canPay && !this.paypalready) {
          this.showPaypalButtons();
          this.paypalready = true
        } else if (this.account.methodSelected != 4 ) {
          this.paypalready = false
        }
      },
      settings() {
        this.loadProduct()
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
      },
      canPay () {
        return this.canBill && this.policyTerms && this.form.first_name && this.form.email && this.form.realPassword2 && this.form.realPassword == this.form.realPassword2
      },
      canBill () {
        return this.account.isValid
      },
      getTotal () {
        return +this.product.precio_venta
      },
      getDiscount () {
        return 0
      },
      getServices () {
        return [this.product]
      },
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
                this.$swal(this.$t('register.messages.success.registered'), '', 'success');
                this.form.user_id = response.data.data.id
                if (this.account.methodSelected == 1) {
                  this.sendPaymentCard()
                } else {
                  this.sendPayment()
                }
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
      sendPaymentCard () {
        this.showLoading = true
        this.tokenizeCard().then((tokenize) => {
          this.account.token = tokenize.id

          this.sendPayment()
        }).catch((error) => {
          this.$notification.error({
            message: 'Pago no procesado',
            description: error.message_to_purchaser,
            onClose: () => { this.showLoading = false; }
          })
        })
      },
      tokenizeCard () {
        return new Promise((resolve, reject) => { 
          if (this.account.isValid) {
            conekta.tokenize(this.account.card, this.account.name, this.account.expiration.month, this.account.expiration.year, this.account.ccv).then((token) => {
              resolve(token)
            }).catch((error) => {
              reject(error)
            })
          } else {
            reject('no_card')
          }
        })
      },
      showPaypalButtons () {
        if (this.canPay && this.policyTerms) {
          this.$nextTick(() => {
            window['paypal'].Buttons({
              style: {
                shape: 'rect',
                color: 'blue',
                layout: 'horizontal',
                label: 'paypal',
                tagline: false
              },
              onError: (err) => {
                this.errorMessage('No se pudo realizar el pago con paypal, favor de intentar mas tarde.');
              },
              // Set up the transaction
              createOrder: (data, actions) => {
                return actions.order.create({
                  purchase_units: [{
                    amount: {
                      currency_code: this.settings.CURRENCY || "USD",
                      value: +this.getTotal.toFixed(2),
                      breakdown: {
                        item_total: { 
                          currency_code: this.settings.CURRENCY || 'USD',
                          value: +this.getTotal.toFixed(2)
                        },
                        discount: {
                          currency_code: this.settings.CURRENCY || "USD",
                          value: +this.getDiscount.toFixed(2)
                        }
                      }
                    },
                    items: this.getServices?.map((p) => Object({
                      name: p.name,
                      unit_amount: {
                        currency_code: this.settings.CURRENCY || 'USD',
                        value: +p.precio_venta.toFixed(2)
                      },
                      quantity: 1,
                      description: p.description
                    }))
                  }],
                  application_context: {
                    brand_name: this.settings.COMPANY_NAME || 'Zibasoft'
                  }
                });
              },
              onApprove: (data, actions) => {
                return actions.order.capture().then((details) => {
                  this.account.paypal = details.id;
                  this.handleRegister();
                })
                .catch(err => {
                  this.errorMessage('No se pudo realizar el pago con paypal, favor de intentar mas tarde.');
                })
              }
            }).render('#paypal-button-container');
          })
        }
      },
      sendPayment () {
        this.showLoading = true
        let data = {
          // provider_id: this.doctor.id,
          // phone: this.client.phone,
          user_id: this.form.user_id,
          email: this.form.email,
          name: this.form.first_name,
          // last_name: this.client.lastName,
          send_feedback: false,
          payment_method: this.account.methodSelected, // 1: tarjeta, 2: oxxo, 3: cash, 4: paypal
          Products: this.getServices.map((s) => Object({
            product_id: s.id,
            name: s.name,
            precio_venta: s.precio_venta,
            static_product: true,
            // phone: this.client.phone,
            email: this.form.email
          })),
        };
        let readyToSave = false

        if (this.account.methodSelected == 1 && this.account.token !== false) {
          data.token = this.account.token; // si es con tarjeta,
          // data.card_id = 'cad_dsadsdsadsadsa', // si se usa tarjeta registrada,
          data.card = this.account.card;
          data.expiration = `${this.account.expiration.month}/${this.account.expiration.year}`;
          data.titular = this.account.name;

          readyToSave = true
        } else if ([2,3].includes(this.account.methodSelected)) {
          readyToSave = true
        } else if (this.account.methodSelected == 4 && this.account.paypal !== false) {
          data.paypal_id = this.account.paypal
          readyToSave = true
        }

        if (readyToSave) {
          postOrder(data).then((response) => {
            this.showLoading = false
            this.$router.replace({ name: 'invoice-page', params: { order: response.data.data.uuid_key } })
          }).catch((error) => {
            this.showLoading = false
          })
        } else {
          this.showLoading = false
        }
      },
      loadProduct() {
        if (this.settings && this.settings.PRODUCT_FOR_SALE && !this.product) {
          getProduct(this.settings?.PRODUCT_FOR_SALE).then((response) => response.data).then(({ data }) => {
            this.product = data
          })
        }
      }
    },
    mounted() {
      this.$nextTick().then(()=>{
        setTimeout(()=> {
          this.togglePassword2()
          this.togglePassword()
        }, 300)
      })
      this.loadProduct()
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

    .btn {
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

</style>