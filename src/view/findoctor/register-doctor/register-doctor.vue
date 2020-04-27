<template>
  <main>
    <div id="hero_register">
      <div class="container margin_120_95">     
        <div class="row">
          <div class="col-lg-6">
            <h1>{{ $t('register_doctor.form.title') }}</h1>
            <p class="lead">{{ $t('register_doctor.form.content.lead') }}</p>
            <div class="box_feat_2">
              <i class="pe-7s-map-2"></i>
              <h3>{{ $t('register_doctor.form.content.box_1.title') }}</h3>
              <p>{{ $t('register_doctor.form.content.box_1.content') }}</p>
            </div>
            <div class="box_feat_2">
              <i class="pe-7s-date"></i>
              <h3>{{ $t('register_doctor.form.content.box_2.title') }}</h3>
              <p>{{ $t('register_doctor.form.content.box_2.content') }}</p>
            </div>
            <div class="box_feat_2">
              <i class="pe-7s-phone"></i>
              <h3>{{ $t('register_doctor.form.content.box_3.title') }}</h3>
              <p>{{ $t('register_doctor.form.content.box_3.content') }}</p>
            </div>
          </div>
          <!-- /col -->
          <div class="col-lg-5 ml-auto">
            <div class="box_form">
              <form>
                <div class="row">
                  <div class="col-md-6 ">
                    <div class="form-group">
                      <input type="text" class="form-control" :placeholder="$t('register_doctor.form.name')" v-model="form.firstname">
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <input type="text" class="form-control" :placeholder="$t('register_doctor.form.last_name')" v-model="form.lastname">
                    </div>
                  </div>
                </div>
                <!-- /row -->
                <div class="row">
                  <div class="col-lg-12">
                    <div class="form-group">
                      <select class="form-control" v-model="form.specialization">
                        <option value="-1">-- {{ $t('register_doctor.form.specialization') }} --</option>
                        <option value="1">Allergy & Immunology</option>
                        <option Value="2">Anesthesiology</option>
                        <option Value="3">Dermatology</option>
                        <option Value="4">Diagnostic Radiology</option>
                        <option Value="5">Emergency Medicine</option>
                        <option Value="6">Family Medicine</option>
                        <option Value="7">Internal Medicine</option>
                        <option Value="8">Medical Genetics</option>
                        <option Value="9">Neurology</option>
                        <option Value="10">Nuclear Medicine</option>
                        <option Value="11">Obstetrics And Gynecology</option>
                        <option Value="12">Ophthalmology</option>
                        <option Value="13">Pathology</option>
                        <option Value="14">Pediatrics</option>
                        <option Value="15">Physical Medicine & Rehabilitation</option>
                        <option Value="16">Preventive Medicine</option>
                        <option Value="17">Psychiatry</option>
                        <option Value="18">Radiation Oncology</option>
                        <option Value="19">Surgery</option>
                        <option Value="20">Urology</option>
                      </select>
                    </div>
                  </div>
                </div>
                <!-- /row -->
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <input type="text" class="form-control" :placeholder="$t('register_doctor.form.city')" v-model="form.city">
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <select class="form-control" v-model="form.country">
                        <option value="">{{ $t('register_doctor.form.country') }}</option>
                        <option value="Europe">Europe</option>
                        <option value="United states">United states</option>
                        <option value="México">México</option>
                        <option value="Asia">Asia</option>
                      </select>
                    </div>
                  </div>
                </div>
                <!-- /row -->
                <div class="row">
                  <div class="col-lg-12">
                    <div class="form-group">
                      <input type="text" class="form-control" :placeholder="$t('register_doctor.form.address')" v-model="form.address">
                    </div>
                  </div>
                </div>
                <!-- /row -->
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <input type="text" class="form-control" :placeholder="$t('register_doctor.form.mobile_phone')" v-model="form.phone.mobile">
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
                      <input type="email" class="form-control" :placeholder="$t('register_doctor.form.email_address')" v-model="form.email">
                    </div>
                  </div>
                </div>
                <!-- /row -->
                <div class="add_bottom_30"><input type="submit" class="btn_1" :value="$t('register_doctor.form.submit')" @click.stop.prevent="handleRegister"></div>
                <div class="text-center"><small>{{ $t('register_doctor.form.footer_tip') }}</small></div>
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
  export default {
    name: 'RegisterDoctor',
    data () {
      return {
        form: {
          firstname: '',
          lastname: '',
          specialization: '-1',
          city: '',
          address: '',
          country: '',
          phone: {
            mobile: '',
            office: ''
          },
          email: ''
        }
      } 
    },
    methods: {
      handleRegister () {
        if (this.form.firstname !== '' && this.form.lastname !== '' && this.form.specialization !== '' && this.form.city !== '' && this.form.country !== '' && (this.form.phone.mobile !== '' || this.form.phone.office !== '') && this.form.email !== '') {
          this.$swal(this.$t('register_doctor.messages.success.sended'), '', 'success')
        } else {
          this.$swal(this.$t('register_doctor.messages.error.missing_info'), '', 'error')
        }
      }
    }
  }
</script>