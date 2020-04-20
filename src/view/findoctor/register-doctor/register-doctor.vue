<template>
  <main>
    <div id="hero_register">
      <div class="container margin_120_95">     
        <div class="row">
          <div class="col-lg-6">
            <h1>It's time to find you!</h1>
            <p class="lead">Te pri adhuc simul. No eros errem mea. Diam mandamus has ad. Invenire senserit ad has, has ei quis iudico, ad mei nonumes periculis.</p>
            <div class="box_feat_2">
              <i class="pe-7s-map-2"></i>
              <h3>Let patients to Find you!</h3>
              <p>Ut nam graece accumsan cotidieque. Has voluptua vivendum accusamus cu. Ut per assueverit temporibus dissentiet.</p>
            </div>
            <div class="box_feat_2">
              <i class="pe-7s-date"></i>
              <h3>Easly manage Bookings</h3>
              <p>Has voluptua vivendum accusamus cu. Ut per assueverit temporibus dissentiet. Eum no atqui putant democritum, velit nusquam sententiae vis no.</p>
            </div>
            <div class="box_feat_2">
              <i class="pe-7s-phone"></i>
              <h3>Instantly via Mobile</h3>
              <p>Eos eu epicuri eleifend suavitate, te primis placerat suavitate his. Nam ut dico intellegat reprehendunt, everti audiam diceret in pri, id has clita consequat suscipiantur.</p>
            </div>
          </div>
          <!-- /col -->
          <div class="col-lg-5 ml-auto">
            <div class="box_form">
              <form>
                <div class="row">
                  <div class="col-md-6 ">
                    <div class="form-group">
                      <input type="text" class="form-control" placeholder="Name" v-model="form.firstname">
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <input type="text" class="form-control" placeholder="Last Name" v-model="form.lastname">
                    </div>
                  </div>
                </div>
                <!-- /row -->
                <div class="row">
                  <div class="col-lg-12">
                    <div class="form-group">
                      <select class="form-control" v-model="form.specialization">
                        <option value="-1">-- Specialization --</option>
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
                      <input type="text" class="form-control" placeholder="City" v-model="form.city">
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <select class="form-control" v-model="form.country">
                        <option value="">Country</option>
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
                      <input type="text" class="form-control" placeholder="Address" v-model="form.address">
                    </div>
                  </div>
                </div>
                <!-- /row -->
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <input type="text" class="form-control" placeholder="Mobile Phone" v-model="form.phone.mobile">
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <input type="text" class="form-control" placeholder="Office Phone" v-model="form.phone.office">
                    </div>
                  </div>
                </div>
                <!-- /row -->
                <div class="row">
                  <div class="col-lg-12">
                    <div class="form-group">
                      <input type="email" class="form-control" placeholder="Email Address" v-model="form.email">
                    </div>
                  </div>
                </div>
                <!-- /row -->
                <div class="add_bottom_30"><input type="submit" class="btn_1" value="Submit" @click.stop.prevent="handleRegister"></div>
                <div class="text-center"><small>Ut nam graece accumsan cotidieque. Has voluptua vivendum accusamus cu. Ut per assueverit temporibus dissentiet.</small></div>
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
          this.$swal('Succesfull Doctor Registered', '', 'success')
        } else {
          this.$swal('Missing Information', '', 'error')
        }
      }
    }
  }
</script>