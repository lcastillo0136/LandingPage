<template>
  <main>
    <div class="container margin_60_35">
      <div class="row">
        <div class="col-lg-4 col-md-4">
          <div>
            <h3>{{ $t('contacts.header.title') }}</h3>
            <p>
              11 Fifth Ave - New York, US<br> + 61 (2) 8093 3400<br>
              <a href="mail:mail@mail.com"><span >mail@mail.com</span></a>
            </p>
          </div>
        </div>
        <div class="col-lg-4 col-md-4">
          <ul>
            <li>
              <strong>{{ $t('contacts.header.administration') }}</strong><br>
              <a href="tel:003823932342">0038 23932342</a><br>
              <a href="mail:mail@mail.com"><span>mail@mail.com</span></a><br>
              <small>Monday to Friday 9am - 7pm</small>
            </li>
            <li>
              <strong>{{ $t('contacts.header.questions') }}</strong><br>
              <a href="tel:003823932342">0038 23932342</a><br>
              <a href="mail:mail@mail.com"><span>mail@mail.com</span></a><br>
              <p><small>Monday to Friday 9am - 7pm</small></p>
            </li>
          </ul>
        </div>
        <div class="col-lg-4 col-md-4">
          <h4>{{ $t('contacts.header.directions.title') }}</h4>
          <form action="http://maps.google.com/maps" method="get" target="_blank">
            <div class="form-group">
              <input type="text" name="saddr" :placeholder="$t('contacts.header.directions.enter_location')" class="form-control styled">
              <input type="hidden" name="daddr" value="New York, NY 11430">
              <!-- Write here your end point -->
            </div>
            <input type="submit" :value="$t('contacts.header.directions.send')" class="btn_1 add_bottom_45">
          </form>
        </div>
      </div>
      <div clasS="row">
        <!--/aside -->
        <div class=" col-lg-12 col-md-12 ml-auto">
          <div class="box_general">
            <h3>{{ $t('contacts.form.title') }}</h3>
            <p>
              {{ $t('contacts.form.legend') }}
            </p>
            <div>
              <div id="message-contact"></div>
              <form method="post" action="/contact" id="contactform">
                <div class="row">
                  <div class="col-md-6 col-sm-6">
                    <div class="form-group">
                      <input type="text" class="form-control" :placeholder="$t('contacts.form.name')" v-model="name">
                    </div>
                  </div>
                  <div class="col-md-6 col-sm-6">
                    <div class="form-group">
                      <input type="text" class="form-control" :placeholder="$t('contacts.form.last_name')" v-model="last_name">
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 col-sm-6">
                    <div class="form-group">
                      <input type="email" class="form-control" :placeholder="$t('contacts.form.email')" v-model="email">
                    </div>
                  </div>
                  <div class="col-md-6 col-sm-6">
                    <div class="form-group">
                      <input type="text" class="form-control" :placeholder="$t('contacts.form.phone')" v-model="phone">
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <textarea rows="5" class="form-control" style="height:100px;" :placeholder="$t('contacts.form.message')" v-model="message"></textarea>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <input type="text" class=" form-control" placeholder=" 3 + 1 =" v-model="validate_control">
                    </div>
                  </div>
                </div>
                <input type="submit" :value="$t('contacts.form.submit')" class="btn_1 add_top_20" id="submit-contact" @click.stop.prevent="handle_submit">
              </form>
            </div>
            <!-- /col -->
          </div>
        </div>
        <!-- /col -->
      </div>
      <!-- End row -->
    </div>
    <!-- /container -->
  </main>
  <!-- /main -->
</template>
<script>
  export default {
    name: 'Contacts',
    data () {
      return  {
        name: '',
        last_name: '',
        email: '',
        phone: '',
        validate_control: '',
        message: ''
      }
    },
    computed: {
      isValidMessage () {
        return this.message !== "" && this.message.length > 30
      },
      isValidName () {
        return this.name != ''
      },
      isValidLastName () {
        return this.last_name != ''
      },
      isValidEmail () {
        return this.email != ''
      },
      isValidPhone () {
        return this.phone != ''
      },
      isValidValidationControl () {
        return this.validate_control === '4'
      }
    },
    methods: {
      handle_submit () {
        if (this.isValidMessage && this.isValidName && this.isValidLastName && this.isValidPhone && this.isValidValidationControl) {
          this.$swal(this.$t('contacts.messages.success.sended'), '', 'success')
        } else {
          this.$swal(this.$t('contacts.messages.error.missing_info'), '', 'error')
        }
      }
    }
  }
</script>